const fs = require("fs");
const path = require("path");
const moment = require("moment");

// define dirname here so it will always resolve to the same directory
const errorLogDir = path.join(__dirname, "..", "..", "logs");

// log each day's errors separately
const fileName = moment().format("YYYY-MM-DD");

/**
 * this is a logger function. Error that have nothing to do with user and should be handled by
 * developers only do not have a place in the current error handlers
 * Insted, we log them into a text file for the website maintainer to track and fix any bugs.
 * @param {object} error the error thrown somewhere in the server
 * @param {string} dir the directory of log file.
 * This should always be imported from this file's {errorLogDir} above
 *
 * @param {*} currentPath the path from which the function was called.
 * This should always be passed as {__dirname}
 *
 * @returns {null} this function has no return value
 */

const errorLogger = (error, dir, currentPath) => {
  const errorObject = {
    errorTime: moment().format("YYYY-MM-DD hh:mm a"),
    errorStack: error,
    path: currentPath,
  };
  const writeStream = fs.createWriteStream(path.join(dir, `${fileName}.txt`), { flags: "a" });
  const errorString = JSON.stringify(errorObject, null, 2); // format the json string with 2 spaces.
  writeStream.write(`${errorString},\n`);
  writeStream.end();
};

module.exports = { errorLogger, errorLogDir };
