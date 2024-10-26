import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';
import client from "@/lib/mongodb";

const TAGS = ["Nábytok","Deti","Chovateľské potreby","Záhrada","Textil","Knihy, CD, DVD a pod."]

const model = openai('gpt-4o-2024-08-06');

const schema = z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.enum(TAGS)),
});

async function addToDB(imageData:string,message:object){
    try{
        await client.connect();
        const db = client.db("IMAGES").collection("Images")
        const result = db.insertOne({
            "imageData":imageData,
            "message":message
        } );
        console.log(result)
    }catch(err){

    }
}

export async function POST(req: NextRequest) {
    try {
        const stream = await req.json();
        const data = stream.image;

        if (data === undefined) {
            return NextResponse.json({ message: "Failed to read image A" }, { status: 500 });
        }

        const { object } = await generateObject({
            model: model,
            schema: schema,
            messages: [
                {
                    role: 'user',
                    content: [
                        { type: 'text', text: "This is an image of an item submited to a reuse center. Assign tags to it:" },
                        { type: 'image', image: data }
                    ],
                },
            ],
        });
        await addToDB(data, object)
        console.log(object)
        return NextResponse.json({ message: object }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Failed to read image" }, { status: 500 });
    }
}