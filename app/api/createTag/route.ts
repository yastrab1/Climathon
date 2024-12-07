'use server'
import { connect } from "http2";
import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/mongodb";


export async function POST (req: NextRequest){
    
    try{
        const data = await req.json()
        console.log(data)
        await client.connect()
        const db = client.db('TAGS').collection('Tags')
        await db.insertOne(data)
        return NextResponse.json({success: true})
    }

    catch(error){
        return NextResponse.json({success: false, message: error})
    }
}