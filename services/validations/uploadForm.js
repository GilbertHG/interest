import {z} from "zod";
import sourceType from "@/constants/sourceType";

export const uploadFormSchema = z.object({
	sourceType: z.string()
		.refine((value) => {
			console.log(value)
			return Object.values(sourceType).includes(value);
		}, { message: "Invalid Type" })
});