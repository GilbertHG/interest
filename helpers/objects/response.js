/**
 * Class for handling HTTP responses with message, error, status, data, and hasMore properties.
 */
class ResponseHandler {
	/**
	 * Creates a new ResponseHandler instance.
	 * @param {string} message - The response message.
	 * @param {string|null} error - The error message (if any).
	 * @param {number} status - The HTTP status code.
	 * @param {any} data - Additional data to include in the response.
	 * @param {boolean} hasMore - Indicates whether there is more data available.
	 */
	constructor(message = '', error = '', status = 200, data = null, hasMore = false) {
		this.message = message;
		this.error = error;
		this.status = status;
		this.data = data;
		this.hasMore = hasMore;
	}
	
	/**
	 * Creates a successful response.
	 * @param {string} message - The response message.
	 * @param {number} status - The HTTP status code.
	 * @param {any} data - Additional data to include in the response.
	 * @param {boolean} hasMore - Indicates whether there is more data available.
	 * @returns {ResponseHandler} A ResponseHandler instance for a successful response.
	 */
	static success(message, status = 200, data = null, hasMore = false) {
		return new ResponseHandler(message, null, status, data, hasMore);
	}
	
	/**
	 * Creates an error response.
	 * @param {string} message - The response message.
	 * @param {string} error - The error message.
	 * @param {number} status - The HTTP status code.
	 * @param {any} data - Additional data to include in the response.
	 * @param {boolean} hasMore - Indicates whether there is more data available.
	 * @returns {ResponseHandler} A ResponseHandler instance for an error response.
	 */
	static error(message, error, status = 500, data = null, hasMore = false) {
		return new ResponseHandler(message, error, status, data, hasMore);
	}
	
	/**
	 * Converts the ResponseHandler instance to a simple object.
	 * @returns {Object} The response object with message, error, status, data, and hasMore properties.
	 */
	toObject() {
		return {
			message: this.message,
			error: this.error,
			status: this.status,
			data: this.data,
			hasMore: this.hasMore,
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