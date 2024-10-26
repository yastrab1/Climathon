'use server'
import client from "@/lib/mongodb";

export default async function PostToDB(payload:object){
    console.log("PAYLOAD")
    console.log(payload)
    await client.connect();
    const db = client.db("FORMS").collection("Forms")
    await db.insertOne(payload)
}