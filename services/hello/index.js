/**
 * @service hello
 * @description give the service a name like the line above otherwise it will crash
 */

class Hello {
	/**
	 * Returns back the given string
	 * @param {string} text - Text to return
	 * @returns {string} String to return
	 */
	greet(text) {
		return text;
	}
}

module.exports = new Hello();