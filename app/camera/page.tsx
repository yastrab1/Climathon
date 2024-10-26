'use client'
import Camera from "@/app/camera/Camera";
import { useRouter } from 'next/navigation';


export default function Page(){
    const router = useRouter()
    const onFinishedProcessing = (uuid:string) => {
        console.log("Fiinisned")
        router.push('/problemy/'+uuid);
    }
    return (
        <Camera onFinishedProcessing={onFinishedProcessing}/>
    )
}