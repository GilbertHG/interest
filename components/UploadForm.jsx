'use client';
import {Button, Select, Toast} from "flowbite-react";
import sourceType from "@/constants/SourceType";
import UploadField from "@/components/UploadField";
import {useForm} from "react-hook-form";
import React, {useCallback, useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {uploadFormSchema} from "@/services/validations/uploadForm";
import {useSession} from "next-auth/react";
import {HiFire} from "react-icons/hi";
import {Toaster, ToasterType} from "@/components/Toaster";

/**
 * Component for handling image uploads with a form.
 *
 * @component
 * @returns {JSX.Element} JSX element representing the image upload form.
 */
export const UploadForm = () => {
	const { data: session } = useSession();
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(uploadFormSchema)
	});
	const [submitting, setSubmitting] = useState(false);
	const [form, setForm] = useState({
		sourceType: sourceType.s3,
		images: {}
	});
	const [toaster, setToaster] = useState({
		type: null,
		message: null
	});
	
	/**
	 * Handles the form submission to upload images.
	 *
	 * @function
	 * @param {Event} e - The form submission event.
	 */
	const handleUploadFormSubmit = useCallback(async (e) => {
		e.preventDefault();
		if (Object.keys(form.images).length <= 0) return;
		
		setSubmitting(true);
		
		const formData = new FormData();
		Object.values(form.images).forEach(function (image, i) {
			formData.append(`file-${i}`, image.file);
		});
		formData.append('sourceType', form.sourceType);
		formData.append('userId',  session?.user?.id);
		try {
			const response = await fetch(`/api/image/upload`, {
				method: "POST",
				body: formData
			});
			setSubmitting(false);
			
			if (response.ok) {
				setForm(prevForm => ({
					...prevForm,
					images: {}
				}));
			}
			
			const jsonData = await response.json();
			
			const respToasterType = response.ok ? ToasterType.SUCCESS : ToasterType.ERROR;
			const message = response.ok ? jsonData.message : jsonData.error;
			
			setToaster({
				type: respToasterType,
				message: message
			});
		} catch (e) {
			console.log(e);
			setSubmitting(false);
			setToaster({
				type: ToasterType.ERROR,
				message: "Failed to upload images"
			});
		}
	}, [form, session]);
	
	return (
		<>
			<Toaster
				toaster={toaster}
				setToaster={setToaster}
			/>
			<form onSubmit={(e) => {
				handleSubmit(handleUploadFormSubmit(e));
			}}>
				<div className={"w-1/2 sm:w-1/6 my-2"}>
					<Select color={errors.sourceType?.message ? "failure" : ""} {...register("sourceType")} name={"sourceType"} onChange={(e) => setForm({...form, sourceType: e.target.value})} required={true}>
						{
							Object.values(sourceType).map(function (type) {
								return (
									<>
										<option key={type} value={type}>{type}</option>
									</>
								)
							})
						}
					</Select>
					{
						errors.sourceType?.message &&
						<p className={"mt-2 my-4 text-sm text-red-600 dark:text-red-500"}>
							{errors.sourceType?.message}
						</p>
					}
				</div>
				<UploadField
					form={form}
					setForm={setForm}
				/>
				<div className={"my-2 grid justify-items-end"}>
					<Button isProcessing={submitting} disabled={submitting} type={"submit"} size={"sm"} gradientMonochrome="info">
						Upload
					</Button>
				</div>
			</form>
		</>
	)
}