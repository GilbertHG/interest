'use client';
import {Button} from "flowbite-react";
import SourceType from "@/constants/sourceType";
import {useCallback} from "react";

const StorageSelector = ({ storageType, setStorageType }) => {
	
	const handleStorageType = useCallback((sourceType) => {
		setStorageType(sourceType);
	}, []);
	
	return (
		<>
			<div className={"container mx-auto text-center mb-5"}>
				<Button.Group>
					<Button color={storageType === SourceType.s3 ? "info" : "gray"} onClick={() => handleStorageType(SourceType.s3)}>S3</Button>
					<Button color={storageType === SourceType.filecoin ? "info" : "gray"} onClick={() => handleStorageType(SourceType.filecoin)}>Filecoin</Button>
				</Button.Group>
			</div>
		</>
	)
}

export default StorageSelector;