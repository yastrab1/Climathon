"use client";
import Camera from "@/app/camera/Camera";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const onFinishedProcessing = (uuid: string) => {
    router.push("/problemy/" + uuid);
  };
  return (
    <div className="flex flex-col p-4 gap-4">
      <Camera onFinishedProcessing={onFinishedProcessing} />
      <ul className="bg-white rounded-xl p-4 font-bold text-base flex flex-col gap-2">
        <li>
          1. Dôjdite na pobočku KOLA a prídte s objektom ktorý chceš odovzdať k
          pokladni
        </li>
        <li>2. Následne stlačte odfotiť a odfoťte fotku objektu</li>
        <li>3. Na pokladni je kód ktorý zadáte po odfotení</li>
        <li>4. Pokladňa vytlačí QR kód, ktorý nalepíte na objekt</li>
        <li>5. Objekt položte na miesto vedľa pokľadne </li>
      </ul>
    </div>
  );
}
