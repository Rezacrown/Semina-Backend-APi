// class CustomAPIError extends Error {
//   constructor(message) {
//     super(message);
//   }
// }
// module.exports = CustomAPIError;

class CustomApiError extends Error {
    constructor(message) {
        super(message);
    }
}

module.exports = CustomApiError