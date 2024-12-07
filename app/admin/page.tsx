'use client'
import { useState } from "react"
export default function Page(){
    const [tag, setTag] = useState('')


    const handleGet = async() => {
        // const response = await fetch("api/getTags", {
        //     method: "GET",
        //     headers: {'Content-Type': 'application/json'}, 
        // }
        // )
        // const data = await response.json()
        // console.log(data)
    }

    const handlePost = async() => {
        const response = await fetch('/api/createTag', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({tag})
        })

        console.log(response)
        setTag('')
    }

    return(
        <>
        <input value={tag} onChange={e => setTag(e.target.value)} placeholder="new tag"></input>
        <button onClick = {handlePost}>Create a tag</button>
        <br />
        <button onClick={handleGet}>Getdata</button>
        </>
    )
}