'use client';
import {ImageUpload} from "@/components/ImageUpload";
import React, {useEffect, useState} from "react";
import {z, ZodError} from "zod";
import {imageSchema} from "@/services/validations/image";
import Dropzone from "react-dropzone";

/**
 * Component for handling file uploads and displaying images.
 *
 * @component
 * @param {Object} props - The properties of the component.
 * @param {Object} props.form - The form state.
 * @param {function} props.setForm - Function to update the form state.
 * @returns {JSX.Element} JSX element representing the file upload component.
 */
const UploadField = ({form, setForm}) => {
	
	/**
	 * State to manage file error messages.
	 * @type {[string, function]}
	 */
	const [fileError, setFileError] = useState(null);
	
	/**
	 * Handles the input of an image file.
	 *
	 * @function
	 * @param {File} file - The image file to be processed.
	 * @returns {Promise<void>} Promise that resolves after processing the file.
	 */
	const handleInputImage = async function (file) {
		setFileError(null);
		let hasError = false;
		const error = await imageSchema.parseAsync(file).catch(function (e) {
			hasError = true;
			let errorMsg = 'Something went wrong!'
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
		setForm(prevForm => ({
			...prevForm,
			images: {
				...prevForm.images,
				[randUUID]: {
					tempId: randUUID,
					file: file,
				}
			}
		}));
	}
	
	/**
	 * Deletes an image from the form state.
	 *
	 * @function
	 * @param {Event} e - The click event triggering the image deletion.
	 * @param {string} id - The ID of the image to be deleted.
	 */
	var deleteImage = function (e, id) {
		e.preventDefault();
		
		setForm((prevForm) => {
			// Create an upload object without the object to be removed
			const updatedImages = { ...prevForm.images };
			delete updatedImages[id];
			
			// Update the form state with the modified image object
			return {
				...prevForm,
				images: updatedImages,
			};
		});
	};
	
	return (
		<>
			<Dropzone onDrop={acceptedFiles => handleInputImage(acceptedFiles[0])}>
				{({getRootProps, getInputProps}) => (
					<div {...getRootProps()} className="flex items-center justify-center w-full">
						<label htmlFor="dropzone-file" className="flex flex-col items-left overflow-auto justify-center w-full h-96 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
							{Object.keys(form.images)?.length > 0 ? (
								<>
									<div className={"flex flex-col flex-nowrap sm:flex-row mx-2 w-auto h-2/3"}>
										{Object.values(form.images)?.map((obj, i) => {
											return <ImageUpload key={obj.tempId} id={obj.tempId} src={URL.createObjectURL(obj.file)} deleteImage={deleteImage} />
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
							<input {...getInputProps()} className="hidden" name={"image"} onChange={handleInputImage} accept="image/*" id="dropzone-file" type="file" />
						</label>
					</div>
				)}
			</Dropzone>
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