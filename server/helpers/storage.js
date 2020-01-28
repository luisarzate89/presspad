const { admin } = require("../config");

/**
 * Get a signed URL for uploading or downloading a file to google cloud storage
 *
 * @param {string} bucketName Bucket name e.g. my-cool-bucket
 * @param {string} filename The name of the file e.g. cool.txt
 * @param {string} action The type of the action "write" / "read"
 *
 * @return {string} v4 signed URL for uploading/ downloading a file
 */

const generateV4SignedUrl = async (bucketName, filename, action) => {
  // Creates a client
  const storage = admin.storage();

  // These options will allow temporary uploading of the file with outgoing
  // Content-Type: application/octet-stream header.
  const options = {
    version: "v4",
    action,
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  };
  if (action === "write") {
    options.contentType = "application/octet-stream";
  }

  // Get a v4 signed URL for uploading/downloading the file
  const [url] = await storage
    .bucket(bucketName)
    .file(filename)
    .getSignedUrl(options);

  return url;
};


/**
 * Generate image public url
 *
 * @param {string} bucketName Bucket name e.g. my-cool-bucket.
 * @param {string} filename The name of the file to be uploaded.
 *
 * @return {string} public url
 */

const getPublicFileUrl = (bucketName, fileName) => {
  const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
  return publicUrl;
};


/**
 * List all or prefixed objects in a bucket
 *
 * @param {string} bucketName Bucket name e.g. my-cool-bucket.
 * @param {string} [prefix] Prefix by which to filter, e.g. public/'
 * @param {string} [delimiter] Delimiter to use, e.g. /
 *
 * @return {Array<Object>} Array of file objects
 */

const listFiles = async (bucketName, prefix, delimiter) => {
  // Creates a client
  const storage = admin.storage();
  const options = {};

  if (prefix) {
    options.prefix = prefix;
  }

  if (delimiter) {
    options.delimiter = delimiter;
  }

  // Lists files in the bucket
  const [files] = await storage.bucket(bucketName).getFiles(options);

  return files;
};


/**
 * Deletes the file from the bucket
 *
 * @param {string} bucketName Name of a bucket, e.g. my-cool-bucket
 * @param {string} filename File to delete, e.g. app.js
 */

const deleteFile = async (bucketName, filename) => {
  // start a client
  const storage = admin.storage();

  await storage
    .bucket(bucketName)
    .file(filename)
    .delete();
};


module.exports = {
  generateV4SignedUrl, getPublicFileUrl, listFiles, deleteFile,
};
