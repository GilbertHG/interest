'use client';

import Image from "@/components/Image";
import StorageSelector from "@/components/StorageSelector";
import {useEffect, useRef, useState} from "react";
import {useSearchContext} from "@/context/SearchContext";
import {Toaster} from "@/components/Toaster";
import ImageCard from "@/components/ImageCard";

/**
 * Gallery component for displaying images with infinite scrolling and highlighting features.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.userId - The user ID for filtering images.
 * @returns {JSX.Element} The Gallery component.
 */
const Gallery = ({ userId }) => {
	/**
	 * The context providing search-related data such as query and sourceType.
	 *
	 * @type {Object}
	 * @property {string} query - The search query.
	 * @property {string} sourceType - The source type for filtering images.
	 */
	const { query, sourceType } = useSearchContext();
	
	/**
	 * The state for storing the list of images.
	 *
	 * @type {Array}
	 * @property {Object} image - The image data.
	 */
	const [images, setImages] = useState([]);
	
	/**
	 * A flag indicating whether there are more images to fetch.
	 *
	 * @type {boolean}
	 * @property {boolean} hasMoreImages - Indicates whether there are more images.
	 */
	const [hasMoreImages, setHasMoreImages] = useState(false);
	
	/**
	 * The offset used for paginating through images.
	 *
	 * @type {number}
	 * @property {number} offset - The current offset for fetching images.
	 */
	const [offset, setOffset] = useState(0);
	
	/**
	 * The state for displaying toasts.
	 *
	 * @type {Object}
	 * @property {string} type - The type of the toast (e.g., 'SUCCESS', 'ERROR').
	 * @property {string} message - The message to display in the toast.
	 */
	const [toaster, setToaster] = useState({
		type: null,
		message: null
	});
	
	/**
	 * State variable for the highlighted image.
	 *
	 * @type {object | null}
	 * @default null
	 * @property {string} _id - The unique identifier of the highlighted image.
	 * @property {string} url - The URL of the highlighted image.
	 * @property {string} fileName - The name of the highlighted image file.
	 * @property {Object} creator - The creator information of the highlighted image.
	 */
	const [highlightedImage, setHighlightedImage] = useState(null);
	
	const [highlightedImageIndex, setHighlightedImageIndex] = useState(null);
	
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
	
	/**
	 * Effect hook that runs once when the component mounts. It initiates the fetching of images with the initial parameters.
	 *
	 * @effect
	 * @param {boolean} processFetchImages(true) - Initiates fetching of images with the initial parameters.
	 * @dependencies sourceType, userId, query - Triggers the effect when any of these values change.
	 */
	useEffect(() => {
		processFetchImages(true);
	}, [sourceType, userId, query]);
	
	/**
	 * Effect hook for handling the scroll event. It adds and removes the event listener for infinite scrolling.
	 *
	 * @effect
	 * @param {Function} handleScroll - The function to handle scroll events.
	 * @dependencies offset - Triggers the effect when the offset changes.
	 * @cleanup Removes the scroll event listener when the component unmounts.
	 */
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
			
			<ImageCard
				setImages={setImages}
				images={images}
				setHighlightedImageIndex={setHighlightedImageIndex}
				highlightedImageIndex={highlightedImageIndex}
				setHighlightedImage={setHighlightedImage}
				highlightedImage={highlightedImage}
			/>
			
			<div className="container column-1 sm:columns-4 gap-3 mx-auto space-y-3 mb-5">
				{images.map((imageSource, index) => (
					<Image
						key={index}
						imageIndex={index}
						setImages={setImages}
						images={images}
						userId={imageSource?.creator?._id}
						imageId={imageSource?._id}
						src={imageSource.url}
						alt={imageSource.fileName}
						className={"mb-4 rounded-lg"}
						setToaster={setToaster}
						setHighlightedImageIndex={setHighlightedImageIndex}
						setHighlightedImage={setHighlightedImage}
					/>
				))}
			</div>
		</>
	);
};

export default Gallery;
