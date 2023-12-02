'use client';
import {Spinner} from "flowbite-react";
import {notFound} from "next/navigation";
import {useSession} from "next-auth/react";

export const SessionCheck = ({component}) => {
	const { data: session, status } = useSession();
	
	if (status === 'loading') {
		return (
			<>
				<div className={"w-full h-screen flex items-center justify-center"}>
					<Spinner aria-label="SessionCheck Component" />
				</div>
			</>
		)
	} else {
		return (
			session?.user ? component : notFound()
		)
	}
}