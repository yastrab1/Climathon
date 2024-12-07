'use server'
import { connect } from "http2";
import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/mongodb";


export async function gettags(): Promise<string[]>{
        await client.connect()
        const db = client.db('TAGS').collection('Tags')
        const data = await db.find({}).toArray()
        // console.log(data)
        const tags = []
        for (let i = 0, len = data.length; i < len; i++) {
            tags.push(data[i].tag)

        }
        // console.log(tags)
        return tags

}