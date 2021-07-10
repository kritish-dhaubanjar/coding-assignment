import HttpStatus from 'http-status-codes';

class NotAuthenticatedException extends Error {
  /**
   * NotAuthenticatedException.
   *
   * @param {string} message
   * @returns {NotAuthenticatedException}
   */
  constructor(message = HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED)) {
    super();

    this.message = message;
    this.code = this.constructor.name;
    this.time = new Date().toISOString();
    this.statusCode = HttpStatus.UNAUTHORIZED;
  }
}

export default NotAuthenticatedException;
