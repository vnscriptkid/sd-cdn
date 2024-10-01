const fs = require('fs');
const path = require('path');
const { getSignedUrl } = require('aws-cloudfront-sign');

// Load your private key from the correct path
// TODO: ideally this should come from env variables
const privateKeyPath = path.join(__dirname, '..', 'cloudfrontkeys', 'private_key.pem');
const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

// The ID of your public key in CloudFront
// TODO: ideally this should come from env variables
const YOUR_CLOUDFRONT_KEY_PAIR_ID = 'KW0F91O3YCDM1'

if (!YOUR_CLOUDFRONT_KEY_PAIR_ID || !privateKey) {
  throw new Error('CLOUDFRONT_KEY_PAIR_ID or privateKey is not set');
}

// Function to generate a signed URL
function generateCloudFrontSignedUrl(url) {
  const signedUrl = getSignedUrl(url, {
    keypairId: YOUR_CLOUDFRONT_KEY_PAIR_ID,
    privateKeyString: privateKey,
    // URL expires in 5 minutes in milliseconds
    expireTime: Date.now() + 60 * 5 * 1000,
  });

  return signedUrl;
}

module.exports = {
  generateCloudFrontSignedUrl
};