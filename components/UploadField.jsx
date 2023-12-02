'use client';
import {ImageUpload} from "@/components/ImageUpload";
import React, {useEffect, useState} from "react";
import {z, ZodError} from "zod";

const MAX_FILE_SIZE=process.env.MAX_FILE_SIZE ? parseInt(process.env.NUMERIC_STRING, 52428800) : 52428800;

const imageSchema = z.any()
	.refine((file) => !file || (!!file && file.size <= MAX_FILE_SIZE), {
		message: "The profile picture must be a maximum of 500MB."})
	.refine((file) => !file || (!!file && file.type?.startsWith("image")), {
		message: "Only images are allowed to be sent."});

const UploadField = ({form, setForm}) => {
	
	
	const [fileError, setFileError] = useState(null)
	
	const handleInputImage = async function (e) {
		e.preventDefault();
		
		setFileError(null);
		let hasError = false;
		const error = await imageSchema.parseAsync(e.target.files[0]).catch(function (e) {
			hasError = true;
			let errorMsg = 'Something has wrong!'
			if (e instanceof ZodError) {
				errorMsg = e.flatten()?.formErrors[0];
			} else if (e instanceof Error) {
				errorMsg = e.message;
			}
			return errorMsg
		});
		if (hasError) {
			setFileError(error);
			return;
		}
		
		let randUUID = crypto.randomUUID();
		if (!e.target || e.target.files?.length <= 0) return;
		setForm(prevForm => ({
			...prevForm,
			images: {
				...prevForm.images,
				[randUUID]: { id: randUUID, image: URL.createObjectURL(e.target.files[0]) }
			}
		}));
	}
	
	var deleteImage = function (e, id) {
		e.preventDefault();

		setForm((prevForm) => {
			// Create a new object without the object to be removed
			const updatedImages = { ...prevForm.images };
			delete updatedImages[id];
			
			// Update the form state with the modified images object
			return {
				...prevForm,
				images: updatedImages,
			};
		});
	};
	
	return (
		<>
			<div className="flex items-center justify-center w-full">
				<label htmlFor="dropzone-file" className="flex flex-col items-left overflow-auto justify-center w-full h-96 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
					{Object.keys(form.images)?.length > 0 ? (
						<>
							<div className={"flex flex-col flex-nowrap sm:flex-row mx-2 w-auto h-2/3"}>
								{Object.values(form.images)?.map((obj) => {
									return <ImageUpload key={obj.id} id={obj.id} src={obj.image} deleteImage={deleteImage} />
								})}
							</div>
						</>
					) : (
						<>
							<div className="flex flex-col items-center justify-center pt-5 pb-6">
								<svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
									<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
								</svg>
								<p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
							</div>
						</>
					)}
					<input className="hidden" name={"image"} onChange={handleInputImage} accept="image/*" id="dropzone-file" type="file" />
				</label>
			</div>
			{
				fileError &&
				<p className={"mt-2 mb-4 text-sm text-red-600 dark:text-red-500"}>
					{fileError}
				</p>
			}
		</>
	)
}

export default UploadField;