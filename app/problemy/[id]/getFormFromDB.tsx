'use server'
import client from "@/lib/mongodb";


export interface Form{
    "dateCreated":string,
    "tags":string[],
    "components": { props: { data:string } }[],
    "uuid":string,
}


export default async function loadFormWithUUID(uuid:string):Promise<Form|null>{
    try{
        await client.connect();
        const db = client.db("FORMS").collection("Forms")
        const cursor = db.find({uuid:uuid} )
        const arr = await cursor.toArray();
        const elem = arr[0]
        return {
                "components": elem["components"],
                "tags": elem["tags"],
                "dateCreated": elem["dateCreated"],
                "uuid": elem["uuid"]
        }
    }catch(err){
      console.log(err)
      console.log(uuid)
    }
    return null
}