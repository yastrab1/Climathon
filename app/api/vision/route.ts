import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';
import client from "@/lib/mongodb";

const model = openai('gpt-4o-2024-08-06');

const schema = z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.enum([
        // Nábytok
        "Knižnica", "Komoda", "Stolík malý", "Stolík veľký", "Pohovka", "Kreslo", "Skriňa", "Posteľ", 
        "Jedálenský stôl", "Jedálenské stoličky", "Nočný stolík", "Police", "Lavica", "Záhradný nábytok",
      
        // Domáce spotrebiče a potreby
        "Vankúše", "Prikrývky", "Obliečky", "Koberce", "Závesy", "Lampy", "Dekorácie", "Zrkadlá", 
        "Obrazy", "Sviečky", "Hrnce", "Panvice", "Príbory", "Riad", "Poháre", "Dózy na potraviny", 
        "Chladnička", "Mraznička", "Mikrovlnka", "Vysávač", "Žehlička", "Práčka", "Sušička", 
        "Umývačka riadu", "Rúra", "Kávovar", "Klimatizácia", "Televízor", "Skriňa", "Skrinky",
      
        // Oblečenie a doplnky
        "Tričká", "Nohavice", "Bundy", "Sukne", "Šaty", "Svetre", "Šály", "Čiapky", "Topánky", 
        "Opasky", "Kabelky", "Batohy", "Peňaženky", "Rukavice", "Detské oblečenie",
      
        // Športové vybavenie
        "Futbalové lopty", "Tenisové rakety", "Činky", "Bicykle", "Helmy", "Športové tašky", 
        "Lyžiarske vybavenie", "Korčule", "Ruksaky na šport",
      
        // Hračky a detské potreby
        "Plyšové hračky", "Stavebnice", "Spoločenské hry", "Bábiky", "Autíčka", "Lego", "Puzzle", 
        "Kolobežky", "Detské knihy", "Dojčenské potreby", "Kočíky", "Detské sedačky",
      
        // Knihy a médiá
        "Romány", "Vzdelávacie knihy", "Učebnice", "Kuchárske knihy", "Detektívky", "Cestopisy", 
        "Knihy pre deti", "Beletria", "Poézia", "Encyklopédie", "Časopisy",
      
        // Záhradné potreby
        "Kvetináče", "Záhradné náradie", "Sadenice", "Krhla", "Záhradné dekorácie", 
        "Záhradný nábytok", "Hnojivá", "Trávne osivo",
      
        // Kancelárske potreby
        "Stoly", "Stoličky", "Poličky", "Organizéry", "Tabule", "Písacie potreby", "Papier", 
        "Zošívačky", "Šanóny", "Kancelárske doplnky",
      
        // Ostatné potreby
        "Náradie", "Bicykle", "Kočíky", "Košíky", "Úložné boxy", "Vysávače", 
        "Šijacie stroje", "Fľaše na vodu", "Termosky", "Práčky", "Ručné nástroje",
      
        // Kategórie podľa stavu
        "Nové", "Použité, ale funkčné", "Poškodené", "Na náhradné diely", "Renovované",
      
        // Kategórie podľa materiálu
        "Drevo", "Plast", "Kov", "Textil", "Sklo", "Papier",
      
        // Kategórie podľa veľkosti
        "Malé predmety", "Stredne veľké predmety", "Veľké predmety",
      
        // Kategórie podľa dostupnosti
        "Na sklade", "Rezervované"
      ];)),
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
        console.log(err)
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
        return NextResponse.json({ message: object }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Failed to read image" }, { status: 500 });
    }
}//sigma