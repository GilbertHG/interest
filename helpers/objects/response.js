/**
 * Class for handling HTTP responses with message, error, status, and data properties.
 */
class ResponseHandler {
	/**
	 * Creates a new ResponseHandler instance.
	 * @param {string} message - The response message.
	 * @param {string|null} error - The error message (if any).
	 * @param {number} status - The HTTP status code.
	 * @param {any} data - Additional data to include in the response.
	 */
	constructor(message = '', error = '', status = 200, data = null) {
		this.message = message;
		this.error = error;
		this.status = status;
		this.data = data;
	}
	
	/**
	 * Creates a successful response.
	 * @param {string} message - The response message.
	 * @param {number} status - The HTTP status code.
	 * @param {any} data - Additional data to include in the response.
	 * @returns {ResponseHandler} A ResponseHandler instance for a successful response.
	 */
	static success(message, status = 200, data = null) {
		return new ResponseHandler(message, null, status, data);
	}
	
	/**
	 * Creates an error response.
	 * @param {string} message - The response message.
	 * @param {string} error - The error message.
	 * @param {number} status - The HTTP status code.
	 * @param {any} data - Additional data to include in the response.
	 * @returns {ResponseHandler} A ResponseHandler instance for an error response.
	 */
	static error(message, error, status = 500, data = null) {
		return new ResponseHandler(message, error, status, data);
	}
	
	/**
	 * Converts the ResponseHandler instance to a simple object.
	 * @returns {Object} The response object with message, error, status, and data properties.
	 */
	toObject() {
		return {
			message: this.message,
			error: this.error,
			status: this.status,
			data: this.data,
		};
	}
	
	/**
	 * Converts the ResponseHandler instance to a JSON string.
	 * @returns {string} The JSON string representation of the response.
	 */
	toJson() {
		return JSON.stringify(this.toObject());
	}
}

// Default export
export default ResponseHandler;
