'use client';

import { User } from "@prisma/client";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserProfile from "./UserProfile";

interface NavbarProps {
	currentUser?: User | null
}


const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
   	return (
    	<div className="fixed w-full z-10 shadow-sm bg-white">
        	<div className="py-4 borber-b-[1px]">
          	<Container>
				<div className="flex flex-row items-center justify-between gap md:gap-0">
					<Logo/>
					<Search/>
					<UserProfile currentUser={currentUser} />
				</div>
          	</Container>
        	</div>
    	</div>
  	)
}

export default Navbar;