'use client';

import {SessionCheck} from "@/components/SessionCheck";
import Gallery from "@/components/Gallery";
import {useSession} from "next-auth/react";

export default function MyImage() {
	const { data: session } = useSession();
	
	let component = (
		<>
			<section className={"w-full flex-center"}>
				<h1 className={"head_text text-center mb-5"}>My Image</h1>
				<Gallery userId={session?.user.id}/>
			</section>
		</>
	);
	
	return <SessionCheck component={component} />
};