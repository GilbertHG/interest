import {Button, Modal} from "flowbite-react";
import {HiOutlineExclamationCircle} from "react-icons/hi";
import {useEffect, useState} from "react";
import Image from "@/components/Image";

/**
 * PopUpDelete component for rendering a confirmation modal for deletion.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {boolean} props.openModal - Flag indicating whether the modal is open.
 * @param {Function} props.setOpenModal - Function to toggle the modal open/close state.
 * @param {boolean} props.show - Flag indicating whether the modal should be shown.
 * @param {Function} props.handleDelete - Function to handle the deletion action.
 * @returns {JSX.Element} The PopUpDelete component.
 */
const PopUpDelete = ({ openModal, setOpenModal, show, handleDelete }) => {
	/**
	 * Effect hook to synchronize the openModal state with the show prop.
	 *
	 * @function
	 * @returns {void}
	 */
	useEffect(() => {
		setOpenModal(show);
	}, [show]);
	
	/**
	 * Render the PopUpDelete component.
	 *
	 * @returns {JSX.Element}
	 */
	return (
		<>
			<Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
				<Modal.Header />
				<Modal.Body>
					<div className="text-center">
						<HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
						<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
							Are you sure you want to delete this product?
						</h3>
						<div className="flex justify-center gap-4">
							<Button color="failure" onClick={handleDelete}>
								{"Yes, I'm sure"}
							</Button>
							<Button color="gray" onClick={() => setOpenModal(false)}>
								No, cancel
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default PopUpDelete;