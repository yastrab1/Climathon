import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';
import client from "@/lib/mongodb";

const model = openai('gpt-4o-2024-08-06');

const schema = z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.enum(["doprava","zdravie","neporiadok","odvod_odpadu"])),
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
                        { type: 'text', text: 'This image is a report of a problem in town summarize it in title of the problem (around 10 words max) and description of the problem (around 50 words max) and add tags, answer in slovak,do NOT change language to czech' },
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