const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey,
  },
  region: 'ap-southeast-1',
});

module.exports = (app) => {
  app.get('/api/upload', requireLogin, (req, res) => {
    // s3://image-upload-app/{userId}/{fileName}
    const key = `${req.user.id}/${uuid()}.jpeg`;

    s3.getSignedUrl(
      'putObject',
      {
        Bucket: 'image-upload-app',
        ContentType: 'image/jpeg',
        Key: key,
        Expires: 60 * 5, // 5 minutes
      },
      (err, url) => res.send({ key, url })
    );
  });
};
