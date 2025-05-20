import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import { PassThrough } from 'stream';

// Set ffmpeg path for fluent-ffmpeg
ffmpeg.setFfmpegPath(ffmpegPath);

/**
 * Generates a thumbnail buffer from a video buffer.
 * @param {Buffer} videoBuffer - The video file buffer.
 * @param {Object} [options] - Optional settings.
 * @param {string} [options.size='320x240'] - Thumbnail size.
 * @param {string} [options.format='png'] - Output image format.
 * @param {string} [options.timemark='1'] - Time in seconds to capture the thumbnail.
 * @returns {Promise<Buffer>} - Resolves with the thumbnail image buffer.
 */
export function generateThumbnail(
  videoBuffer,
  { size = '320x240', format = 'png', timemark = '1' } = {}
) {
  return new Promise((resolve, reject) => {
    const readable = new PassThrough();
    readable.end(videoBuffer);

    let bufferData = Buffer.alloc(0);

    ffmpeg(readable)
      .on('error', (err) => reject(err))
      .on('end', () => resolve(bufferData))
      .screenshots({
        count: 1,
        timemarks: [timemark],
        size,
        filename: `thumbnail.${format}`,
        folder: '/tmp', // Not used, but required by API
      })
      .on('filenames', () => {})
      .on('end', () => {})
      .on('data', (data) => {
        bufferData = Buffer.concat([bufferData, data]);
      });
  });
}
