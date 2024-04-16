'use client';

import { AiOutlineMenu } from "react-icons/ai";
import { useCallback, useState } from "react";

import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";

import Profile from "../Profile";
import MenuItems from "./MenuItems";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserProfileProps {
   currentUser?: SafeUser | null;
}

const UserProfile: React.FC<UserProfileProps> = ({ currentUser }) => {
   const registerModal = useRegisterModal();
   const loginModal = useLoginModal();
   const RentModal = useRentModal();
   const router = useRouter();
   const [isOpen, setIsOpen] = useState(false);

   const toggleOpen = useCallback(() => {
     setIsOpen((value) => !value);
   }, [])

   const onRent = useCallback(() => {
      if (!currentUser) {
         return loginModal.onOpen();
      }

      RentModal.onOpen();
   }, [currentUser, loginModal, RentModal])

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
               onClick={onRent}
            >
            	Add Yours!
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
                  <Profile src={currentUser?.image}/>
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
                           onClick={() => router.push('/trips')}
                        />
                        <MenuItems 
                           label="Wishlist"
                           onClick={() => router.push('/wishlist')}
                        />
                        <MenuItems 
                           label="Reservations"
                           onClick={() => router.push('/reservations')}
                        />
                        <MenuItems 
                           label="Properties"
                           onClick={() => router.push('/properties')}
                        />
                        <MenuItems 
                           label="Add Properties" 
                           onClick={onRent} 
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