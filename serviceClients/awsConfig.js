import AWS from 'aws-sdk';

/**
 * AWS S3 client for interacting with Amazon Simple Storage Service.
 *
 * @constant {AWS.S3} s3
 * @description An instance of the AWS.S3 class.
 * @throws {Error} Throws an error if the required environment variables are not set.
 */
export const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
	region: process.env.AWS_S3_AWS_REGION,
});