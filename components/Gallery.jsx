'use client';

import Image from "@/components/Image";
import StorageSelector from "@/components/StorageSelector";
import {useCallback, useEffect, useRef, useState} from "react";
import SourceType from "@/constants/SourceType";
import {useSearchContext} from "@/context/SearchContext";

const fetchImages = async (sourceType, userId, query, offset) => {
	try {
		const queryParams = new URLSearchParams({
			sourceType: sourceType,
			userId: userId ? userId : '',
			query: query ? query : '',
			offset: offset,
		});
		
		const response = await fetch(`/api/image/?${queryParams.toString()}`, {
			method: "GET",
		});
		
		return await response.json();
	} catch (error) {
		// Handle errors here
		console.error(error);
	}
};

const Gallery = ({ userId }) => {
	const { query, sourceType } = useSearchContext();
	const [images, setImages] = useState([]);
	const [offset, setOffset] = useState(0);
	
	useEffect(() => {
		const processFetchImages = async () => {
			setOffset(0);
			const jsonData = await fetchImages(sourceType, userId, query, offset);
			setImages(jsonData.data);
		}
		
		const data = processFetchImages(); // Call the async function
	}, [sourceType, query]);
	
	return (
		<>
			<StorageSelector />
			
			<div className="container column-1 sm:columns-4 gap-3 mx-auto space-y-3 mb-5">
				{images.map((imageSource, index) => (
					<Image key={index} src={imageSource.url} alt={imageSource.fileName} className={"mb-4 rounded-lg"} />
				))}
			</div>
		</>
	)
}

export default Gallery;