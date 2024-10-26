'use client'
import React, {useEffect} from "react";
import {useParams, useRouter} from "next/navigation";
import loadFormWithUUID from "@/app/problemy/[id]/getFormFromDB";


export interface Form{
  "dateCreated":string,
  "tags":string[],
  "components": { props: { data:string } }[],
  "uuid":string,
}

export default function Home() {
  const params = useParams();
  const id = params.id as string;

  const router = useRouter()

  const [components,setComponents] = React.useState<Form>();

  useEffect(()=>{
    loadFormWithUUID(id).then((val)=>{
      if(val === null) {throw new Error()}
      setComponents(val)
    })

  },[id])

  return (
    <div className=" bg-white shadow-lg rounded-lg overflow-hidden relative mx-auto mt-2 text-black">
      <h1 className={"font-extrabold text-4xl text-center"}>Nahlásenie problému v Prešove</h1>
      {/* Content */}
      <div className="p-4">
        {/* Scalable Image Upload Section */}
        <div className="flex flex-col border border-gray-300 justify-center items-center rounded-md mb-4 h-48 md:h-64 lg:h-72 text-red-950">
          <img src={components && components.components[2].props.data} alt={"component"} className={"h-[100%]"}/>
        </div>

        {/* Name Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Názov..."
            className="w-full border border-gray-300 rounded-md p-2"
            defaultValue={components && components.components[0].props.data}
          />
        </div>

        {/* Description Input */}
        <div className="mb-2">
          <textarea
            placeholder="Popis..."
            className="w-full border border-gray-300 rounded-md p-2 h-28"
            defaultValue={components && components.components[1].props.data}
          ></textarea>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Názov..."
            className="w-full border border-gray-300 rounded-md p-2"
            defaultValue={components && components.tags}
          />
        </div>
      </div>

      {/* Submit Button at Bottom Right */}
      <div className="absolute bottom-10 right-4">
        <button className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg" onClick={()=> {
          router.push('/');
        }}>
          Odoslať
        </button>
      </div>

    </div>
  );
}