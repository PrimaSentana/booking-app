'use client'

import Container from "../Container";
import Categories from "./Categories";
import Logo from "./Logo";
import Search from "./Search";
import UserProfile from "./UserProfile";
import { SafeUser } from "@/app/types";

interface NavbarProps {
	currentUser?: SafeUser | null
}


const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
   	return (
    	<div className="fixed w-full z-10 shadow-sm bg-white">
        	<div className="py-4 borber-b-[1px]">
			<Container>
				<div className="flex flex-row items-center justify-between gap md:gap-0">
					<div className="flex flex-row items-center gap md:gap-6">
						<Logo userName={currentUser?.name}/>
					</div>
					<Search/>
					<UserProfile currentUser={currentUser} />
				</div>
			</Container>
        	</div>
			<Categories />
    	</div>
  	)
}

export default Navbar;