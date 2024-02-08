'use client';

import { AiOutlineMenu } from "react-icons/ai";
import Profile from "../Profile";
import { useCallback, useState } from "react";
import MenuItems from "./MenuItems";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

interface UserProfileProps {
   currentUser?: User | null;
}

const UserProfile: React.FC<UserProfileProps> = ({ currentUser }) => {
   const registerModal = useRegisterModal();
   const loginModal = useLoginModal();
   const [isOpen, setIsOpen] = useState(false);

   const toggleOpen = useCallback(() => {
     setIsOpen((value) => !value);
   }, [])
   return (
     	<div className="relative">
         <div className="flex flex-row items-center gap-3">
            <div 
               className="
                  hidden
                  md:block
                  text-sm
                  font-semibold
                  py-3
                  px-4
                  rounded-full
                  hover:bg-neutral-100
                  transition
                  cursor-pointer
               "
               onClick={() => {}}
            >
            	Home Profile
            </div>

				{/* hamburger */}
            <div
               className="
                  p-4
                  md:py-1
                  md:px-2
                  border-[1px]
                  border-neutral-200
                  flex
                  flex-row
                  items-center
                  gap-3
                  rounded-full
                  cursor-pointer
                  hover:shadow-md
                  transition
               " 
               onClick={toggleOpen}
                
            >
              <AiOutlineMenu/>
              <div className="hidden md:block">
                  <Profile/>
              </div>
            </div>
   		</div>

			{isOpen && (
				<div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
					<div className="flex flex-col cursor-pointer">
                  {currentUser ? (
                     <>
                        <MenuItems 
                           label="Trips"
                           onClick={() => {}}
                        />
                        <MenuItems 
                           label="Wishlist"
                           onClick={() => {}}
                        />
                        <MenuItems 
                           label="Reservations"
                           onClick={() => {}}
                        />
                        <MenuItems 
                           label="Properties"
                           onClick={() => {}}
                        />
                        <MenuItems 
                           label="Home Profile"
                           onClick={() => {}}
                        />
                        <hr />
                        <MenuItems 
                           label="Logout"
                           onClick={() => signOut()}
                        />
						   </>
                  ) : (
                     <>
                        <MenuItems 
                           label="Login"
                           onClick={loginModal.onOpen}
                        />
                        <MenuItems 
                           label="Sign Up"
                           onClick={registerModal.onOpen}
                        />
						   </>
                  )}
					</div>
				</div>
			)}

      </div>
   )
}

export default UserProfile;