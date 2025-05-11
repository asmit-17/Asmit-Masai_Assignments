const transactionLoggerMiddleware = (bookId, transactionType, readerName = null) => {
  const timestamp = new Date().toISOString();
  let logMessage = `[${timestamp}] Transaction: ${transactionType}, Book ID: ${bookId}`;
  if (readerName) {
    logMessage += `, Reader: ${readerName}`;
  }
  console.log(logMessage);
};

module.exports = transactionLoggerMiddleware;