import {connectToDB} from "@/serviceClients/mongodb";
import Image from "@/models/image";

export const GET = async (request) => {
    try {
        await connectToDB();

        const images = await Image.find({}).populate('creator');
        return new Response(JSON.stringify(images), {
            status: 200
        });
    } catch (e) {
        return new Response("Failed to fetch all prompts", {
            status: 500
        });
    }
};