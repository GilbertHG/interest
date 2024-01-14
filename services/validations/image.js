import {z} from "zod";
import sourceType from "@/constants/sourceType";

const MAX_FILE_SIZE=process.env.MAX_FILE_SIZE ? parseInt(process.env.NUMERIC_STRING, 52428800) : 52428800;

export const imageSchema = z.any()
	.refine((file) => !file || (!!file && file.size <= MAX_FILE_SIZE), {
		message: "The profile picture must be a maximum of 500MB."})
	.refine((file) => !file || (!!file && file.type?.startsWith("image")), {
		message: "Only image are allowed to be sent."});

export const imagesSchema = z.any()
	.refine((file) => !file || (!!file && file.size <= MAX_FILE_SIZE), {
		message: "The profile picture must be a maximum of 500MB."})
	.refine((file) => !file || (!!file && file.type?.startsWith("image")), {
		message: "Only image are allowed to be sent."});