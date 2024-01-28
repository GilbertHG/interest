'use client';

import Image from 'next/image';;
import {Dropdown, Navbar} from "flowbite-react";
import Search from "@/components/Search";
import {getProviders, signIn, signOut, useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import user from "@/models/user";
import {SearchContextProvider} from "@/context/SearchContext";

/**
 * Nav component for rendering the navigation bar with logo, search, and user authentication links.
 * @component
 * @returns {JSX.Element} The Nav component.
 */
const Nav = () => {
	/**
	 * React hook to access the authentication session.
	 * @type {Object}
	 * @property {Object} data - The session data containing user information.
	 */
	const { data: session } = useSession();
	
	/**
	 * State hook for storing authentication providers.
	 * @type {[Object|null, Function]}
	 */
	const [providers, setProviders] = useState(null);
	
	/**
	 * Custom hook to get the current pathname from Next.js navigation.
	 * @type {string}
	 */
	const pathname = usePathname();
	
	/**
	 * Effect hook to fetch authentication providers when the component mounts.
	 * @function
	 * @returns {void}
	 */
	useEffect(() => {
		const setUpProviders = async () => {
			const response = await getProviders();
			
			setProviders(response);
		};
		
		setUpProviders();
	}, []);
	
	/**
	 * Render the Nav component.
	 */
	return (
		<>
			<div className={"container mx-auto"}>
				<Navbar fluid rounded>
					{/* Logo and brand */}
					<Navbar.Brand href="/">
						<Image
							src="/assets/images/logo.svg"
							className="mr-3 sm:h-9"
							width={30}
							height={30}
							alt="Interest Logo"
						/>
						<span className="logo_text">
              Interest
            </span>
					</Navbar.Brand>
					
					{/* Search component */}
					<Search />
					
					{/* User profile and authentication links */}
					{session?.user && (
						<div className="flex md:order-2">
							<Dropdown
								arrowIcon={false}
								inline
								label={
									<Image src={session?.user.image}
									       width={37}
									       height={37}
									       className={"rounded-full"}
									       alt={"profile"}
									/>
								}
							>
								<Dropdown.Header>
									<span className="block text-sm">{session?.user.name}</span>
									<span className="block truncate text-sm font-medium">{session?.user.email}</span>
								</Dropdown.Header>
								<Dropdown.Item href={"/my-image/" + session?.user.id}>My Image</Dropdown.Item>
							</Dropdown>
						</div>
					)}
					
					{/* Navbar toggle button */}
					<Navbar.Toggle />
					
					{/* Navbar links */}
					<Navbar.Collapse>
						<Navbar.Link href="/" {...(pathname === "/" ? { active: true } : {})}>
							Home
						</Navbar.Link>
						{session?.user ? (
							<>
								<Navbar.Link href="/upload" {...(pathname === "/upload" ? { active: true } : {})}>
									Upload
								</Navbar.Link>
								<li key={"logout"}>
									<button
										onClick={() => signOut()}
										className="block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white" href="#">
										Logout
									</button>
								</li>
							</>
						) : (
							<>
								{providers &&
									Object.values(providers).map((provider) => (
										<li key={"login"}>
											<button
												type={"button"}
												key={provider.name}
												onClick={() => signIn(provider.id)}
												className="block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white" href="#">
												Login
											</button>
										</li>
									))}
							</>
						)}
					</Navbar.Collapse>
				</Navbar>
			</div>
		</>
	);
};

export default Nav;