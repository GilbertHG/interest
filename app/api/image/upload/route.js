
import uploadFile from "@/services/uploadManager";
import ResponseHandler from "@/helpers/objects/response";
import Image from "@/models/image";

/**
 * Saves image to the database.
 *
 * @function
 * @param {ImageReport} imagesReports - An array of URLs representing the image to be saved.
 * @param {sourceType} type - The source type for file upload (e.g., 'filecoin' or 's3').
 * @param {string} userId - The identifier of the user creating the image.
 * @returns {void} This function does not return a value.
 */
function saveImages(imagesReports, type, userId) {
	console.log(imagesReports);
	imagesReports?.map(imageReport => {
		var newImage = new Image({
			type: type,
			creator: userId,
			url: imageReport.url,
			fileName: imageReport.fileName,
		});
		
		newImage.save();
	});
}

/**
 * Handles the HTTP POST request for uploading files to a storage service.
 *
 * @async
 * @function
 * @param {Request} req - The HTTP request object.
 * @returns {Promise<Response>} A promise that resolves with a Response object indicating the result of the file upload.
 */
export const POST = async (req) => {
	let response = new ResponseHandler();
	try {
		const formData = await req.formData();
		const sourceType = formData.get('sourceType');
		const userId = formData.get('userId');
		
		// Filter out values that are objects with "arrayBuffer" property
		const fileFormDataEntryValues = Array.from(formData.values())?.filter(value => typeof value === "object" && "arrayBuffer" in value);
		
		const uploadReport = await uploadFile(sourceType, fileFormDataEntryValues);
		
		if (uploadReport.totalSucceed > 0) {
			saveImages(uploadReport?.data, sourceType, userId);
			
			response.status = 201;
			response.message = uploadReport.message;
		} else {
			response.status = 400;
			response.error = uploadReport.message;
		}
		return new Response(response?.toJson(), {
			status: response.status
		});
	} catch (error) {
		console.error('Error during file upload:', error);
		
		// Return an error response
		response.error = 'Internal Server Error'
		return new Response(response?.toJson(), {
			status: 500
		});
	}
};