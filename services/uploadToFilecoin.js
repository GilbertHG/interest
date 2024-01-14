import {connectToFilecoin} from "@/serviceClients/filecoin";
import { File } from '@/helpers/objects/shims'

/**
 * Uploads files to Filecoin using the provided array of File objects.
 *
 * @async
 * @function
 * @param {File[]} files - An array of File objects representing the files to be uploaded.
 * @throws {Error} Throws an error if there's an issue with connecting to Filecoin or uploading the files.
 * @returns {Promise<{success: boolean, cid: string | undefined}>} A promise that resolves when the files are successfully uploaded.
 */
const uploadToFileCoin = async (files) => {
	let success = true;
	let cid;
    try {
        const client = await connectToFilecoin();

	    let response = await client.uploadDirectory(files, {});
	    console.log('File uploaded successfully. CID:', response);
	    cid = response?.toString();
    } catch (error) {
		success = false;
        console.error('Error uploading file:', error);
    }
	
	return {
		success: success,
		cid: cid
	};
};

export default uploadToFileCoin;