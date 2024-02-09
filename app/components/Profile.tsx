'use client';

import Image from "next/image";

interface ProfileProps {
	src: string | null | undefined
}

const Profile: React.FC<ProfileProps> = ({ src }) => {
  	return (
    	<Image
			className="rounded-full"
			height={30}
			width={30}
			alt="Profile Picture"
			src={src || "/placeholder.jpg"}
    	/>
  	)
}

export default Profile;