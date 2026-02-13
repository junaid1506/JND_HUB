const ImageKit = require("imagekit");

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

function uploadFile(file, fileName) {
  return new Promise((resolve, reject) => {
    imageKit.upload(
      {
        file: file, // Buffer / Base64 / URL
        fileName: fileName,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );
  });
}

module.exports = {
  uploadFile,
};
