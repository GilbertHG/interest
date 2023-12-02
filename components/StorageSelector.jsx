'use client';
import {Button} from "flowbite-react";

const StorageSelector = () => {
	return (
		<>
			<div className={"container mx-auto text-center mb-5"}>
				<Button.Group>
					<Button color="gray">S3</Button>
					<Button color="gray">Filecoin</Button>
				</Button.Group>
			</div>
		</>
	)
}

export default StorageSelector;