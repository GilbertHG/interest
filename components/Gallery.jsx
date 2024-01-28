'use client';

import Image from "@/components/Image";
import StorageSelector from "@/components/StorageSelector";
import {useEffect, useRef, useState} from "react";
import {useSearchContext} from "@/context/SearchContext";
import {Toaster} from "@/components/Toaster";
import ImageCard from "@/components/ImageCard";

/**
 * Gallery component for displaying images with infinite scrolling.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.userId - The user ID for filtering images.
 * @returns {JSX.Element} The Gallery component.
 */
const Gallery = ({ userId }) => {
	/**
	 * The context providing search-related data such as query and sourceType.
	 * @type {Object}
	 * @property {string} query - The search query.
	 * @property {string} sourceType - The source type for filtering images.
	 */
	const { query, sourceType } = useSearchContext();
	
	/**
	 * The main image state for detailed view.
	 * @type {Object}
	 * @property {string} mainImage - The main image data.
	 */
	const [mainImage, setMainImage] = useState(null);
	
	/**
	 * The state for storing the list of images.
	 * @type {Array}
	 * @property {Object} image - The image data.
	 */
	const [images, setImages] = useState([]);
	
	/**
	 * A flag indicating whether there are more images to fetch.
	 * @type {boolean}
	 * @property {boolean} hasMoreImages - Indicates whether there are more images.
	 */
	const [hasMoreImages, setHasMoreImages] = useState(false);
	
	/**
	 * The offset used for paginating through images.
	 * @type {number}
	 * @property {number} offset - The current offset for fetching images.
	 */
	const [offset, setOffset] = useState(0);
	
	/**
	 * The state for displaying toasts.
	 * @type {Object}
	 * @property {string} type - The type of the toast (e.g., 'SUCCESS', 'ERROR').
	 * @property {string} message - The message to display in the toast.
	 */
	const [toaster, setToaster] = useState({
		type: null,
		message: null
	});
	
	/**
	 * Fetches images from the server based on the current state and query parameters.
	 *
	 * @async
	 * @function
	 * @returns {Promise<Object>} A Promise that resolves to the JSON data containing images.
	 * @throws {Error} If there is an error fetching images.
	 */
	const fetchImages = async () => {
		try {
			const queryParams = new URLSearchParams({
				sourceType: sourceType,
				userId: userId || '',
				query: query || '',
				offset: offset,
			});
			
			const response = await fetch(`/api/image/?${queryParams.toString()}`, {
				method: "GET",
			});
			
			return await response.json();
		} catch (error) {
			console.error('Error fetching images:', error);
			throw error;
		}
	};
	
	/**
	 * Processes the fetched images and updates the component state accordingly.
	 *
	 * @async
	 * @function
	 * @param {boolean} overrideImages - Indicates whether to override existing images.
	 */
	const processFetchImages = async (overrideImages) => {
		try {
			const jsonData = await fetchImages();
			setHasMoreImages(jsonData.hasMore);
			if (overrideImages) {
				setImages(jsonData.data);
			} else if (jsonData.hasMore) {
				setImages((prevImages) => [...prevImages, ...jsonData.data]);
			}
		} catch (error) {
			console.error('Error fetching images:', error);
		}
	};
	
	/**
	 * Handles the scroll event and triggers additional image fetching when reaching the end of the page.
	 *
	 * @function
	 */
	const handleScroll = () => {
		const scrollY = window.scrollY || window.pageYOffset;
		const windowHeight = window.innerHeight || document.documentElement.clientHeight;
		const documentHeight = document.documentElement.scrollHeight;
		
		if (hasMoreImages && (scrollY + windowHeight >= documentHeight - 100)) {
			setOffset((prevOffset) => prevOffset + 20);
			processFetchImages();
			console.log('Reached the end of the page!');
		}
	};
	
	useEffect(() => {
		processFetchImages(true);
	}, [sourceType, userId, query]);
	
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [offset]);
	
	return (
		<>
			<StorageSelector />
			
			<Toaster
				toaster={toaster}
				setToaster={setToaster}
			/>
			
			{mainImage && <ImageCard setMainImage={setMainImage} mainImage={mainImage}/>}
			
			<div className="container column-1 sm:columns-4 gap-3 mx-auto space-y-3 mb-5">
				{images.map((imageSource, index) => (
					<Image
						key={index}
						setImages={setImages}
						userId={imageSource?.creator?._id}
						imageId={imageSource?._id}
						src={imageSource.url}
						alt={imageSource.fileName}
						className={"mb-4 rounded-lg"}
						setToaster={setToaster}
					/>
				))}
			</div>
		</>
	);
};

export default Gallery;
