const { admin } = require("../config");

/**
 * Get a signed URL for uploading or downloading a file to google cloud storage
 *
 * @param {string} bucketName Bucket name to upload files to.
 * @param {string} filename The name of the file to be uploaded.
 * @param {string} action The type of the action "write" / "read"
 *
 * @return {string} v4 signed URL for uploading/ downloading a file
 */

async function generateV4SignedUrl(bucketName, filename, action) {
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
}

function getPublicFileUrl(bucketName, fileName) {
  const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
  return publicUrl;
}

module.exports = { generateV4SignedUrl, getPublicFileUrl };
