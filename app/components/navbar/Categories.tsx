'use client'

import Container from "../Container";
import CategoryBox from "../CategoryBox";
import { TbBeach } from "react-icons/tb";
import { GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";

export const categories = [
    {
        label: "beach",
        icon: TbBeach,
        description: "Find places close to the beach!"
    },
    {
        label: "Windmills",
        icon: GiWindmill,
        description: "Places that has Windmills!"
    },
    {
        label: "Modern",
        icon: MdOutlineVilla,
        description: "Modern places!"
    },
]

const Categories = () => {
  return (
    <Container>
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
            {categories.map((item) => (
                <CategoryBox 
                    key={item.label}
                    label={item.label}
                    description={item.description}
                    icon={item.icon}
                />
            ))}
        </div>
    </Container>
  )
}

export default Categories