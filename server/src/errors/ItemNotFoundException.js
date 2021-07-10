import HttpStatus from 'http-status-codes';

class ItemNotFoundException extends Error {
  /**
   * ItemNotFoundException.
   *
   * @param {string} message
   * @returns {ItemNotFoundException}
   */
  constructor(message = HttpStatus.getStatusText(HttpStatus.NOT_FOUND)) {
    super();

    this.message = message;
    this.code = this.constructor.name;
    this.time = new Date().toISOString();
    this.statusCode = HttpStatus.NOT_FOUND;
  }
}

export default ItemNotFoundException;
