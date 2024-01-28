import {Card, Carousel, Flowbite} from "flowbite-react";
import {useCallback, useState} from "react";

/**
 * ImageCard component for displaying detailed information about a highlighted image.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Function} props.setImages - Function to set the list of images.
 * @param {Array} props.images - List of images.
 * @param {Function} props.setHighlightedImageIndex - Function to set the index of the highlighted image.
 * @param {number | null} props.highlightedImageIndex - Index of the highlighted image.
 * @param {Function} props.setHighlightedImage - Function to set the highlighted image.
 * @param {Object | null} props.highlightedImage - The highlighted image data.
 * @returns {JSX.Element} The ImageCard component.
 */
const ImageCard = ({setImages, images, setHighlightedImageIndex, highlightedImageIndex, setHighlightedImage, highlightedImage}) => {
	// Flowbite custom style
	const customTheme = {
		"root": {
			"base": "flex mx-auto rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800",
			"children": "flex h-full flex-col justify-center gap-4 p-6",
			"horizontal": {
				"off": "flex-col",
				"on": "flex-col sm:flex-row"
			},
			"href": "hover:bg-gray-100 dark:hover:bg-gray-700"
		},
		"img": {
			"base": "",
			"horizontal": {
				"off": "rounded-t-lg",
				"on": "w-full rounded-t-lg object-cover lg:w-1/2 sm:w-1/2 md:rounded-none md:rounded-l-lg"
			}
		}
	};
	

	const navigationDirection = {
		left: "left",
		right: "right"
	};
	
	/**
	 * Handles image navigation based on the specified direction (left or right).
	 *
	 * @function
	 * @param {string} direction - The direction of image navigation ('left' or 'right').
	 */
	const handleImageNavigation = useCallback((direction) => {
		if (navigationDirection.hasOwnProperty(direction)) {
			if (direction === navigationDirection.left && highlightedImageIndex > 0) {
				const updatedIndex = highlightedImageIndex - 1;
				setHighlightedImageIndex(updatedIndex);
				setHighlightedImage(images[updatedIndex]);
			} else if (direction === navigationDirection.right && highlightedImageIndex < (images.length - 1)) {
				const updatedIndex = highlightedImageIndex + 1;
				setHighlightedImageIndex(updatedIndex);
				setHighlightedImage(images[updatedIndex]);
			}
		}
	}, [images, highlightedImageIndex, highlightedImage, navigationDirection]);
	
	/**
	 * Closes the detailed view of the highlighted image.
	 *
	 * @function
	 */
	const handleClose = useCallback(function () {
		setHighlightedImageIndex(null);
		setHighlightedImage(null);
	}, []);
	
	return (
		<>
			{highlightedImageIndex !== null&& highlightedImage !== null && (
				<div className={"flex flex-row items-center"}>
					{(highlightedImageIndex > 0) &&
						<div className={"mr-2"}>
						<button className="rounded-full bg-gray-300 p-3" onClick={(e) => handleImageNavigation(navigationDirection.left)}>
							<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
							     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
								<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
								      stroke-width="2"
								      d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"/>
							</svg>
						</button>
					</div>
					}
					<div className={"basis-full relative"}>
						<Card theme={customTheme} className={"max-w-7xl mb-5 relative"}
						      imgSrc={highlightedImage.url} horizontal>
							<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white break-words">
								File:
							</h5>
							<p className="font-normal text-gray-700 dark:text-gray-400">
								{highlightedImage.fileName}
							</p>
							<p className="font-normal text-gray-700 dark:text-gray-400">
								Credit: {highlightedImage.creator?.username}
							</p>
							<div className={"absolute right-0 top-0 mt-4 mr-4"}>
								<button className="p-3" onClick={handleClose}>
									<svg className="w-6 h-6 text-gray-800 dark:text-white"
									     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
									     stroke-width="1.5" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
									</svg>
								</button>
							</div>
							<div className={"absolute right-0 bottom-0 mb-4 mr-4"} onClick={() => window.open(highlightedImage.url, '_blank')}>
								<button className="p-3">
									<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
									     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
										<path
											d="M17 0h-5.768a1 1 0 1 0 0 2h3.354L8.4 8.182A1.003 1.003 0 1 0 9.818 9.6L16 3.414v3.354a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1Z"/>
										<path
											d="m14.258 7.985-3.025 3.025A3 3 0 1 1 6.99 6.768l3.026-3.026A3.01 3.01 0 0 1 8.411 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V9.589a3.011 3.011 0 0 1-1.742-1.604Z"/>
									</svg>
								</button>
							</div>
						</Card>
					</div>
					{(highlightedImageIndex < (images.length - 1)) &&
						<div className={"ml-2"}>
							<button className="rounded-full bg-gray-300 p-3" onClick={(e) => handleImageNavigation(navigationDirection.right)}>
								<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
								     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
									<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
									      stroke-width="2"
									      d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
								</svg>
							</button>
						</div>
					}
				</div>
			)}
		</>
	)
};

export default ImageCard;