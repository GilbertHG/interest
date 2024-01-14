'use client';
import {Button} from "flowbite-react";
import SourceType from "@/constants/SourceType";
import {useCallback} from "react";
import {useSearchContext} from "@/context/SearchContext";

const StorageSelector = () => {
	const { sourceType, updateSourceType } = useSearchContext();
	const handleStorageType = useCallback((sourceType) => {
		updateSourceType(sourceType);
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
	)
}

export default StorageSelector;