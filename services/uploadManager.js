import { File } from '@/helpers/objects/shims'
import * as mime from "next/dist/server/serve-static";
import UploadReport from "@/helpers/objects/uploadReport";
import uploadToFileCoin from "@/services/uploadToFilecoin";
import sourceType from "@/constants/SourceType";
import ImageReport from "@/helpers/objects/imageReport";
import {uploadToS3} from "@/services/uploadToS3";

/**
 * Generates a Filecoin URL for a given Content Identifier (CID) and file name.
 *
 * @function
 * @param {string} cid - The Content Identifier (CID) representing the content on Filecoin.
 * @param {string} fileName - The name of the file.
 * @returns {string} A Filecoin URL constructed from the provided CID and file name.
 */
function getFilecoinUrl(cid, fileName) {
	return `https://${cid}.ipfs.w3s.link/${fileName}`;
}

/**
 * Generates a unique file name by appending a timestamp and random suffix to the original file name.
 *
 * @param {string} fileName - The original file name.
 * @param {string} fileExtension - The file extension of the original file.
 * @returns {string} The generated unique file name.
 */
function getFileName(fileName, fileExtension) {
	const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
	return `${fileName.replace(
		/\.[^/.]+$/,
		""
	)}-${uniqueSuffix}.${fileExtension}`;
}

/**
 * Process the S3 upload for an array of file form data entries, updating an UploadReport.
 *
 * @async
 * @function
 * @param {File[]} fileFormDataEntryValues - An array of File objects representing the files to be uploaded.
 * @returns {Promise<UploadReport>} A promise that resolves with an UploadReport indicating the result of the S3 upload process.
 */
async function processS3Upload(fileFormDataEntryValues) {
	let report = new UploadReport();
	for (const fileFormDataEntryValue of fileFormDataEntryValues) {
		try {
			const file = fileFormDataEntryValue;
			const fileName = getFileName(file?.name, mime.getExtension(file?.type))

			const buffer = Buffer.from(await file.arrayBuffer());
			var resp = await uploadToS3(buffer, fileName, file?.type);
			console.log("S3 Response")
			console.log(resp)
			if (resp?.success) {
				report.totalSucceed++;
				report.data?.push(new ImageReport(resp?.url, fileName));
			} else {
				report.totalFailed++;
			}
		} catch (e) {
			report.totalFailed++;
			report.error = e;
			console.log(e);
		}
	}
	report.message = "Images have been uploaded!";
	return report
}

/**
 * Process the Filecoin upload for an array of file form data entries, updating an UploadReport.
 *
 * @async
 * @function
 * @param {File[]} fileFormDataEntryValues - An array of File objects representing the files to be uploaded.
 * @returns {Promise<UploadReport>} A promise that resolves with an UploadReport indicating the result of the Filecoin upload process.
 */
async function processFilecoinUpload(fileFormDataEntryValues) {
	let report = new UploadReport();
	try {
		let files = fileFormDataEntryValues?.map(file => {
			const fileName = getFileName(file?.name, mime.getExtension(file?.type))
			return new File([file], fileName);
		});
		console.log(files)
		
		var resp = await uploadToFileCoin(files);
		console.log(resp)
		if (resp.success && resp.cid) {
			report.message = "Images have been uploaded!";
			report.totalSucceed = fileFormDataEntryValues.length;
			report.data = files.map(file => {
				return new ImageReport(getFilecoinUrl(resp?.cid, file?.name), file?.name);
			})
		} else {
			report.totalFailed = fileFormDataEntryValues.length;
		}
	} catch (e) {
		report.totalFailed = fileFormDataEntryValues.length;
		report.error = e;
		console.log(e);
	}
	return report
}

/**
 * Uploads files based on the specified source type, either to Filecoin or S3.
 *
 * @async
 * @function
 * @param {sourceType} type - The source type for file upload (e.g., 'filecoin' or 's3').
 * @param {File[]} fileFormDataEntryValues - An array of File objects representing the files to be uploaded.
 * @returns {Promise<UploadReport>} A promise that resolves with an UploadReport indicating the result of the file upload process.
 */
export default async function uploadFile(type, fileFormDataEntryValues) {
	return (type === sourceType.filecoin) ? await processFilecoinUpload(fileFormDataEntryValues) : await processS3Upload(fileFormDataEntryValues);
}
