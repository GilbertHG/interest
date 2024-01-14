import {connectToDB} from "@/serviceClients/mongodb";
import Image from "@/models/image";

/**
 * Handles the HTTP GET request for fetching all image from the database.
 *
 * @async
 * @function
 * @param {Request} request - The HTTP request object.
 * @returns {Response} A Response object containing a JSON representation of the fetched image.
 */
export const GET = async (request) => {
    try {
        await connectToDB();

        const images = await Image.find({}).populate('creator');
        return new Response(JSON.stringify(images), {
            status: 200
        });
    } catch (e) {
        return new Response("Failed to fetch all image", {
            status: 500
        });
    }
};