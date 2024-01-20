import {connectToDB} from "@/serviceClients/mongodb";
import ResponseHandler from "@/helpers/objects/response";
import Image from "@/models/image";
import SourceType from "@/constants/SourceType";
import {deleteS3Object} from "@/services/uploadToS3";

/**
 * Purges an image from storage based on the specified source type.
 *
 * @param {string} fileName - The name or key of the image file.
 * @param {string} sourceType - The source type of the storage (e.g., 's3').
 *
 * @throws Will throw an error if the source type is not supported or if there is an issue
 *         deleting the object from the specified storage.
 */
async function purgeImageFromStorage(fileName, sourceType) {
	if (sourceType === SourceType.s3) {
		console.log("fileName : " + fileName)
		// Assuming deleteS3Object is a function that deletes an object from an S3 bucket
		await deleteS3Object(fileName);
	} else if (sourceType !== SourceType.filecoin) {
		throw new Error(`Unsupported source type: ${sourceType}`);
	}
}

/**
 * Deletes an image based on the provided parameters.
 *
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} params - The parameters from the request.
 * @returns {Response} - The HTTP response object.
 */
export const DELETE = async (req, { params }) => {
	let response = new ResponseHandler();
	try {
		await connectToDB();
		
		const searchParams = req.nextUrl.searchParams;
		const sessionUserId = searchParams?.get("sessionUserId");
		console.log(sessionUserId);
		const image = await Image.findById(params.imageId)
			.populate('creator');
		console.log(image)
		if (!image) {
			response.status = 404;
			response.message = "Image not found";
			
			return new Response(response.toJson(), {
				status: response.status
			});
		}
		
		console.log("creator id: " + image.creator._id.toString());
		console.log("session user id: " + sessionUserId.toString());
		if (image.creator._id.toString() === sessionUserId.toString()) {
			// Delete the image
			await purgeImageFromStorage(image.fileName, image.type);
			await Image.findByIdAndDelete(image._id);
			response.status = 200;
			response.message = "Image Deleted successfully";
		} else {
			response.status = 404;
			response.error = "You do not have permission to delete this image.";
		}
		return new Response(response.toJson(), {
			status: response.status
		});
	} catch (error) {
		console.error('Error during file delete:', error);
		
		// Return an error response
		response.error = 'Internal Server Error'
		return new Response(response?.toJson(), {
			status: 500
		});
	}
}