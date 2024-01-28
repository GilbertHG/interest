import {useSession} from "next-auth/react";
import PopUpDelete from "@/components/PopUpDelete";
import {useCallback, useState} from "react";
import {ToasterType} from "@/components/Toaster";

/**
 * Image component for displaying images with optional delete functionality.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Function} props.setImages - Function to update the array of displayed images.
 * @param {string} props.userId - The user ID associated with the image.
 * @param {string} props.imageId - The unique identifier for the image.
 * @param {string} props.src - The source URL of the image.
 * @param {string} props.alt - The alternative text for the image.
 * @param {string} props.className - The CSS class for styling the image.
 * @param {Function} props.setToaster - Function to set the toaster message.
 * @param {Function} props.setHighlightedImageIndex - Function to set the highlight image.
 * @returns {JSX.Element} The Image component.
 */
const Image = ({ images, imageIndex, setImages, userId, imageId, src, alt, className, setToaster, setHighlightedImageIndex, setHighlightedImage }) => {
	/**
	 * React hook to access the authentication session.
	 * @type {Object}
	 * @property {Object} data - The session data containing user information.
	 */
	const { data: session } = useSession();
	
	/**
	 * State hook for managing the visibility of the delete confirmation modal.
	 * @type {[boolean, Function]}
	 */
	const [openModal, setOpenModal] = useState(false);
	
	/**
	 * Callback function to handle the highlighting of the image.
	 *
	 * @function
	 * @param {number} index - The index of the highlighted image.
	 */
	const handleHighlightImage = useCallback(function (index) {
		setHighlightedImageIndex(index);
		setHighlightedImage(images[index]);
	}, [images  ])
	
	/**
	 * Callback function to handle the deletion of the image.
	 * @function
	 * @async
	 * @returns {void}
	 */
	const handleDelete = useCallback(async () => {
		try {
			const queryParams = new URLSearchParams({
				sessionUserId: session?.user.id
			});
			
			const response = await fetch(`/api/image/${imageId}?${queryParams.toString()}`, {
				method: 'DELETE'
			});

			const jsonData = await response.json();
			
			let respToasterType = response.ok ? ToasterType.SUCCESS : ToasterType.ERROR;
			let message = response.ok ? jsonData.message : jsonData.error;
			
			if (response.ok) {
				setImages((prevImages) => {
					const filteredImages = prevImages.filter((image) => image._id !== imageId);
					console.log(filteredImages)
					return filteredImages;
				});
				
				setHighlightedImageIndex(null);
				setHighlightedImage(null);
			}
			
			setToaster({
				type: respToasterType,
				message: message
			});
		} catch (e) {
			console.log(e);
			setToaster({
				type: ToasterType.ERROR,
				message: "Failed to upload images"
			});
		}
		setOpenModal(false);
	}, []);
	
	/**
	 * Render the Image component.
	 */
	if (session?.user.id === userId) {
		return (
			<>
				<div className="relative group" onClick={() => {
					handleHighlightImage(imageIndex);
				}}>
					<div className="absolute z-20 bottom-1 right-1">
						<button onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							setOpenModal(true);
						}} type="button"
						        className="group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-cyan-700 border border-transparent hover:bg-cyan-800 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 rounded-lg focus:ring-2">
					<span className="flex items-center transition-all duration-200 rounded-md text-sm px-4 py-2">
						<img className="h-6 w-6" src="/assets/icons/trash.svg" alt="Delete Icon" />
					</span>
						</button>
					</div>
					<div className="group-hover:brightness-75 cursor-zoom-in transition-all duration-300">
						<img
							src={src}
							alt={alt}
							className={className}
						/>
					</div>
				</div>
				
				<PopUpDelete openModal={openModal} setOpenModal={setOpenModal} show={openModal}
				             handleDelete={handleDelete} />
			</>
		);
	} else {
		return (
			<>
				<div className="group-hover:brightness-75 cursor-zoom-in transition-all duration-300" onClick={() => {
					handleHighlightImage(imageIndex);
				}}>
					<img
						src={src}
						alt={alt}
						className={className}
					/>
				</div>
			</>
		);
	}
};

export default Image;