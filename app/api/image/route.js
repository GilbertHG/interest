import {connectToDB} from "@/serviceClients/mongodb";
import Image from "@/models/image";
import ResponseHandler from "@/helpers/objects/response";

/**
 * Handles the HTTP GET request for fetching all image from the database.
 *
 * @async
 * @function
 * @param {Request} request - The HTTP request object.
 * @returns {Response} A Response object containing a JSON representation of the fetched image.
 */
export const GET = async (request) => {
	let response = new ResponseHandler();
	try {
        await connectToDB();
		const searchParams = request.nextUrl.searchParams
		const sourceType = searchParams?.get("sourceType");
		const query = searchParams?.get("query");
		const userId = searchParams?.get("userId");
		const offset = searchParams?.get("offset");
		
		let queryObject = {
			type: sourceType,
			fileName: query ? { $regex: new RegExp(query, 'i') } : { $exists: true },
		};

		if (userId) {
			queryObject.creator = userId;
		}

		const images = await Image.find(queryObject)
			.skip(offset)
			.populate('creator');

		response.data = images.map(image => {
			return image._doc;
		});
		response.status = 200;
		response.message = "Success to fetch images";
        return new Response(response.toJson(), {
            status: 200
        });
    } catch (e) {
		console.error(e);
		response.status = 500;
		response.error = "Failed to fetch images";
        return new Response("Failed to fetch images", {
            status: 500
        });
    }
};