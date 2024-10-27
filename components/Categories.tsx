import React from 'react';
import { GiBabyBottle } from "react-icons/gi";
import { PiArmchairFill } from "react-icons/pi";
import { PiFlowerTulipBold } from "react-icons/pi";
import { FaBook } from "react-icons/fa";
import { MdSportsTennis } from "react-icons/md";
import { FaDog } from "react-icons/fa";
import Category from "@/components/Category";

export default function Categories() {
  return (
    <div className="grid grid-cols-2 gap-4 w-full bg-yellow-600 p-2 rounded-xl shadow-xl">
        <Category text="Deti" component={<GiBabyBottle/>} count={6145}/>
        <Category text="Nábytok" component={<PiArmchairFill/>} count={326}/>
        <Category text="Chov" component={<FaDog/>} count={12548}/>
        <Category text="Záhrada" component={<PiFlowerTulipBold/>} count={98}/>
        <Category text="Knihy" component={<FaBook/>} count={763}/>
        <Category text="Šport" component={<MdSportsTennis/>} count={697}/>
      </div>
  )
}