"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import loadFormWithUUID from "@/app/problemy/[id]/getFormFromDB";

export interface Form {
  dateCreated: string;
  tags: string[];
  components: { props: { data: string } }[];
  uuid: string;
}

export default function Home() {
  const params = useParams();
  const id = params.id as string;

  const [components, setComponents] = React.useState<Form>();

  useEffect(() => {
    loadFormWithUUID(id).then((val) => {
      if (val === null) {
        throw new Error();
      }
      setComponents(val);
    });
  }, [id]);

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden relative mx-auto text-black">
        <div className="p-4 flex flex-col gap-4">
          <div className="overflow-hidden justify-center items-center rounded-md max-w-[40rem] max-h-[40rem] aspect-square text-red-950">
            <img
              src={components && components.components[2].props.data}
              alt="item"
              className="w-full aspect-square"
            />
          </div>

          <div className="mb-2">
            <p className="text-sm font-bold">{components?.tags.map((item, index) => (index != 0) ? (" | " + item) : item)}</p>
            {/*<textarea
              placeholder="Popis..."
              className="w-full border border-gray-300 rounded-md p-2 h-28"
              defaultValue={components && components.tags}
            ></textarea>*/}
          </div>
        </div>
      </div>
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
//sigma