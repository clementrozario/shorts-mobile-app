import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

// For __dirname in ES modules
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

/**
 * Upload a file buffer to S3
 * @param {Buffer} fileBuffer - The file buffer
 * @param {string} originalName - The original file name
 * @param {string} folder - S3 folder (e.g., 'videos')
 * @param {string} mimeType - File MIME type
 * @returns {Promise<string>} - S3 file key
 */
export async function uploadFile(fileBuffer, originalName, folder, mimeType) {
  const ext = path.extname(originalName);
  const key = `${folder}/${uuidv4()}${ext}`;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Body: fileBuffer,
    ContentType: mimeType,
    // ACL: 'public-read', 
  };

  await s3.upload(params).promise();
  return key;
}

/**
 * Generate a signed URL for a file in S3
 * @param {string} key - S3 object key
 * @param {number} expiresIn - Expiry time in seconds (default: 1 hour)
 * @returns {string} - Signed URL
 */
export function getSignedUrl(key, expiresIn = 3600) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Expires: expiresIn,
  };
  return s3.getSignedUrl('getObject', params);
}
