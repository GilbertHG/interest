'use client';
import {Spinner} from "flowbite-react";
import {notFound} from "next/navigation";
import {useSession} from "next-auth/react";

/**
 * SessionCheck component for checking the user session status.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {JSX.Element} props.component - The component to render if the user is authenticated.
 * @returns {JSX.Element} The SessionCheck component.
 */
export const SessionCheck = ({component}) => {
	const { data: session, status } = useSession();
	
	/**
	 * Render the SessionCheck component based on the user session status.
	 *
	 * @returns {JSX.Element} The rendered component.
	 */
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
