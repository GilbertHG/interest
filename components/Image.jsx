import {useSession} from "next-auth/react";
import PopUpDelete from "@/components/PopUpDelete";
import {useCallback, useState} from "react";
import {ToasterType} from "@/components/Toaster";

const Image = ({setImages, userId, imageId, src, alt, className, setToaster}) => {
	const { data: session } = useSession();
	const [openModal, setOpenModal] = useState(false);
	
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
				setImages((prevImages) => prevImages.filter((image) => image._id !== imageId));
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
	
	if (session?.user.id === userId) {
		return (
			<>
				<div className={"relative"}>
					<div className={"absolute z-20 bottom-1 right-1"}>
						<button onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							
							setOpenModal(true);
						}} type="button"
						        className="group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800 rounded-lg focus:ring-2">
						<span className="flex items-center transition-all duration-200 rounded-md text-sm px-4 py-2">
							<img className="h-6 w-6" src="/assets/icons/trash.svg" alt="Interest Logo"/>
						</span>
						</button>
					</div>
					<img
						src={src}
						alt={alt}
						className={className}
					/>
				</div>
				<PopUpDelete openModal={openModal} setOpenModal={setOpenModal} show={openModal} handleDelete={handleDelete} />
			</>
		)
	} else {
		return (
			<>
				<img
					src={src}
					alt={alt}
					className={className}
				/>
			</>
		)
	}
}

export default Image;