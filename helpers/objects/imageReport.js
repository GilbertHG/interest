/**
 * Represents a report for an image with URL and filename.
 *
 * @class
 */
class ImageReport {
	/**
	 * Creates an instance of ImageReport.
	 *
	 * @constructor
	 * @param {string} url - The URL of the image.
	 * @param {string} fileName - The filename of the image.
	 */
	constructor(url, fileName) {
		/**
		 * The URL of the image.
		 *
		 * @type {string}
		 */
		this.url = url;
		
		/**
		 * The filename of the image.
		 *
		 * @type {string}
		 */
		this.fileName = fileName;
	}
}

export default ImageReport;