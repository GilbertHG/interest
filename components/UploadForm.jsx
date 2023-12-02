'use client';
import {Button, Select} from "flowbite-react";
import sourceType from "@/constants/sourceType";
import UploadField from "@/components/UploadField";
import {useForm} from "react-hook-form";
import React, {useState} from "react";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

const schema = z.object({
	sourceType: z.string()
	.refine((value) => {
		console.log(value)
		return Object.values(sourceType).includes(value);
	}, { message: "Invalid Type" })
});

export const UploadForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(schema)
	});
	const [submitting, setSubmitting] = useState(false);
	const [form, setForm] = useState({
		sourceType: sourceType.s3,
		images: {}
	});
	
	const handleUploadFormSubmit = async (e) => {
		e.preventDefault();
		if (Object.keys(form.images).length <= 0) return;
		setSubmitting(true);
		setSubmitting(false);
	};
	
	return (
		<>
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