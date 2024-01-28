'use client';
import {Button} from "flowbite-react";
import SourceType from "@/constants/SourceType";
import {useCallback} from "react";
import {useSearchContext} from "@/context/SearchContext";

/**
 * StorageSelector component for selecting storage types.
 *
 * @component
 * @returns {JSX.Element} The StorageSelector component.
 */
const StorageSelector = () => {
	const { sourceType, updateSourceType } = useSearchContext();
	
	/**
	 * Handle the selection of a storage type.
	 *
	 * @param {string} selectedType - The selected storage type.
	 * @returns {void}
	 */
	const handleStorageType = useCallback((selectedType) => {
		updateSourceType(selectedType);
	}, []);
	
	return (
		<>
			<div className={"container mx-auto text-center mb-5"}>
				<Button.Group>
					<Button color={sourceType === SourceType.s3 ? "info" : "gray"} onClick={() => handleStorageType(SourceType.s3)}>S3</Button>
					<Button color={sourceType === SourceType.filecoin ? "info" : "gray"} onClick={() => handleStorageType(SourceType.filecoin)}>Filecoin</Button>
				</Button.Group>
			</div>
		</>
	);
}

export default StorageSelector;