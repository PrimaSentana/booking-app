'use client';

import Image from "next/image";
import { useRouter } from 'next/navigation';

const Logo = () => {
   const router = useRouter();
    
   return (
     <Image
         className="hidden md:block cursor-pointer"
         onClick={() => router.push('/')}
         width={120}
         height={120}
         src={"/logo.svg"}
         alt="Roamradar"
		/>
   )
}

export default Logo;