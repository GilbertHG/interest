"use client";
import { SessionProvider } from "next-auth/react";

/**
 * Provider component for wrapping the application with NextAuth session provider.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {ReactNode} props.children - The child components to be wrapped by the session provider.
 * @param {object} props.session - The session object containing user authentication information.
 * @returns {JSX.Element} The Provider component.
 */
const Provider = ({ children, session }) => {
	/**
	 * Render the Provider component.
	 *
	 * @returns {JSX.Element}
	 */
	return (
		<SessionProvider session={session}>
			{children}
		</SessionProvider>
	);
};

export default Provider;