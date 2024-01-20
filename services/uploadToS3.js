// upload-to-s3.js

import {s3} from "@/serviceClients/awsConfig";

/**
 * Uploads a file to Amazon S3.
 *
 * @async
 * @function
 * @param {Buffer} fileContent - The content of the file as a Buffer.
 * @param {string} fileName - The name of the file.
 * @param {string} fileType - The MIME type that describes the format of the object data.
 * @returns {Promise<{url: string | null, success: boolean}>} A promise that resolves with an object containing the S3 file location (URL) and a success indicator.
 * @throws {Error} Throws an error if there's an issue with uploading the file to S3.
 */
export const uploadToS3 = async (fileContent, fileName, fileType ) => {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `${process.env.AWS_S3_TO_ADD}/${fileName}`,
        Body: fileContent,
	    ContentType: fileType, // A standard MIME type that describes the format of the object data.
	    ACL: 'public-read' // The canned access control list (ACL) to apply to the object.
    };

	let url = null;
	let success = true;
    try {
        const data = await s3.upload(params).promise();
        console.log('File uploaded successfully. Location:', data.Location);
	    url = data?.Location;
    } catch (error) {
		success = false;
        console.error('Error uploading file:', error);
    }
	return {
		url: url,
		success: success
	};
};

export const deleteS3Object = async (objectKey) => {
	const params = {
		Bucket: process.env.AWS_S3_BUCKET,
		Key: `${process.env.AWS_S3_TO_ADD}/${objectKey}`,
	};
	
	s3.deleteObject(params, (err, data) => {
		if (err) {
			console.error('Error deleting object:', err);
		} else {
			console.log('Object deleted successfully:', data);
		}
	});
};