'use client';

import { SafeUser } from "@/app/types";
import Image from "next/image";
import { useRouter } from 'next/navigation';

interface LogoProps {
   userName?: string | null;
}

const Logo: React.FC<LogoProps> = ({ userName }) => {
   const router = useRouter();
    
   return (
      <>
         <Image
         className="hidden md:block cursor-pointer"
         onClick={() => router.push('/')}
         width={120}
         height={120}
         src={"/logo.svg"}
         alt="Roamradar"
		   />
         {userName && (
            <div>Hi, <span className="text-md font-semibold">{userName}</span></div>
         )}
      </>
     
      
   )
}

export default Logo;