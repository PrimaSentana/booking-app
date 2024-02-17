'use client'

import Container from "../Container";
import CategoryBox from "../CategoryBox";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { GiFishingBoat, GiForestCamp, GiMeditation, GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
    {
        label: "Beach",
        icon: TbBeach,
        description: "Find places close to the beach!"
    },
    {
        label: "Windmills",
        icon: GiWindmill,
        description: "Places that have Windmills!"
    },
    {
        label: "Modern",
        icon: MdOutlineVilla,
        description: "Modern places!"
    },
    {
        label: "Countryside",
        icon: TbMountain,
        description: "This property is in the countryside!"
    },
    {
        label: "Pools",
        icon: TbPool,
        description: "This property have a pool!"
    },
    {
        label: "Temple",
        icon: GiMeditation ,
        description: "This property have a pool!"
    },
    {
        label: "Lake",
        icon: GiFishingBoat,
        description: "This property is close to a lake!"
    },
    {
        label: "Camping",
        icon: GiForestCamp,
        description: "This property have camping activities!"
    },
    
]

const Categories = () => {
    
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if (!isMainPage) {
        return null;
    }

    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((item) => (
                    <CategoryBox 
                        key={item.label}
                        label={item.label}
                        selected={category === item.label}
                        icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    )
}

export default Categories