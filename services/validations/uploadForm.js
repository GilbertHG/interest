import {z} from "zod";
import sourceType from "@/constants/SourceType";

export const uploadFormSchema = z.object({
	sourceType: z.string()
		.refine((value) => {
			console.log(value)
			return Object.values(sourceType).includes(value);
		}, { message: "Invalid Type" })
});