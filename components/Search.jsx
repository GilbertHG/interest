import {useSession} from "next-auth/react";
import {useEffect} from "react";
import {useSearchContext} from "@/context/SearchContext";

/**
 * Search component for rendering a search input form.
 *
 * @component
 * @returns {JSX.Element} The Search component.
 */
const Search = () => {
	const { data: session } = useSession();
	const { query, sourceType, updateQuery, updateSourceType } = useSearchContext();
	
	/**
	 * Handle the change event when the user types in the search input.
	 *
	 * @param {Object} e - The change event object.
	 * @returns {void}
	 */
	const handleChange = (e) => {
		updateQuery(e.target.value);
	};
	
	/**
	 * Render the Search component.
	 *
	 * @returns {JSX.Element}
	 */
	return (
		<>
			<form className={"sm:basis-1/2 " + (session?.user ? "basis-3/6" : "basis-4/6")}>
				<label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
					Search
				</label>
				<div className="relative">
					<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
						<svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
							<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
						</svg>
					</div>
					<input
						onChange={handleChange}
						type="search"
						id="default-search"
						className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Search Images..."
						required={true}
					/>
					{/*<button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-primary hover:bg-hover-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary dark:hover:bg-hover-primary dark:focus:ring-blue-800 invisible sm:visible">Search</button>*/}
				</div>
			</form>
		</>
	);
};

export default Search;