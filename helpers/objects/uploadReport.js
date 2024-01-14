class UploadReport {
	constructor(totalUpdated = 0, totalFailed = 0, message = '', error = '', data = []) {
		this.totalSucceed = totalUpdated;
		this.totalFailed = totalFailed;
		this.message = message;
		this.error = error;
		this.data = data;
		
	}
	
	/**
	 * Converts the UploadReport instance to a simple object.
	 * @returns {Object} The upload report object with totalUpdated, totalFailed, message, and error properties.
	 */
	toObject() {
		return {
			totalSucceed: this.totalSucceed,
			totalFailed: this.totalFailed,
			message: this.message,
			error: this.error,
			data: this.data
		};
	}
	
	/**
	 * Converts the UploadReport instance to a JSON string.
	 * @returns {string} The JSON string representation of the upload report.
	 */
	toJson() {
		return JSON.stringify(this.toObject());
	}
}

export default UploadReport;