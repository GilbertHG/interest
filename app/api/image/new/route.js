
export const POST = async (req) => {
	const { type, images } = await req.json();
	
	try {
	
	} catch (e) {
		return new Response("Failed to create a new prompt", {
			status: 500
		});
	}
};