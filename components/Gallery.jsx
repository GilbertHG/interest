'use client';

import Image from "@/components/Image";
import StorageSelector from "@/components/StorageSelector";
import {useCallback, useEffect, useState} from "react";
import SourceType from "@/constants/sourceType";


const Gallery = ({ userId }) => {
	const [storageType, setStorageType] = useState(SourceType.s3);
	
	useEffect((e) => {
		console.log("Gallery Effect");
	}, [storageType])
	
	return (
		<>
			<StorageSelector
				storageType={storageType}
				setStorageType={setStorageType} />
			
			<div className="container column-1 sm:columns-4 gap-3 mx-auto space-y-3 mb-5">
				<Image src={"https://source.unsplash.com/600x500?rainbow"} alt={"Image"} className={"mb-4 rounded-lg"} />
				<img src="https://source.unsplash.com/600x500?computer" alt="Image" className="mb-4 rounded-lg"/>
				<img src="https://source.unsplash.com/700x600?couple" alt="Image" className="mb-4 rounded-lg"/>
				<img src="https://source.unsplash.com/600x700?color" alt="Image" className="mb-4 rounded-lg"/>
				<img src="https://source.unsplash.com/600x350?onepiece" alt="Image" className="mb-4 rounded-lg"/>
				<img src="https://source.unsplash.com/600x200?naruto" alt="Image" className="mb-4 rounded-lg"/>
				<img src="https://source.unsplash.com/600x250?android" alt="Image" className="mb-4 rounded-lg"/>
				<img src="https://source.unsplash.com/600x300?meme" alt="Image" className="mb-4 rounded-lg"/>
				<img src="https://source.unsplash.com/900x600?donald" alt="Image" className="mb-4 rounded-lg"/>
				<img src="https://source.unsplash.com/600x900?sora" alt="Image" className="mb-4 rounded-lg"/>
				<img src="https://source.unsplash.com/600x900?aoi" alt="Image" className="mb-4 rounded-lg"/>
				<img src="https://source.unsplash.com/600x900?sea" alt="Image" className="mb-4 rounded-lg"/>
				<img src="https://source.unsplash.com/600x900?android" alt="Image" className="mb-4 rounded-lg"/>
			</div>
		</>
	)
}

export default Gallery;