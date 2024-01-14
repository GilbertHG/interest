'use client';

import { createContext, useContext, useState } from 'react';
import SourceType from "@/constants/SourceType";

const SearchContext = createContext();

export const useSearchContext = () => {
	return useContext(SearchContext);
};

export const SearchContextProvider = ({ children }) => {
	const [query, setQuery] = useState('');
	const [sourceType, setSourceType] = useState(SourceType.s3);
	
	const updateQuery = newQuery => {
		setQuery(newQuery);
	};
	
	const updateSourceType = newSourceType => {
		setSourceType(newSourceType);
	};
	
	const contextValue = {
		query,
		sourceType,
		updateQuery,
		updateSourceType,
	};
	
	return (
		<SearchContext.Provider value={contextValue}>
			{children}
		</SearchContext.Provider>
	);
};
