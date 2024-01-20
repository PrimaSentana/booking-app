'use client';

import Image from "next/image";


const Profile = () => {
  	return (
    	<Image
			className="rounded-full"
			height={30}
			width={30}
			alt="Profile Picture"
			src={"/placeholder.jpg"}
    	/>
  	)
}

export default Profile;