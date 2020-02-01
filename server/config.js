const admin = require('firebase-admin');

require('dotenv').config();

const privateKey = process.env.private_key
  .replace(new RegExp('\\\\n', 'g'), '\n')
  .replace('"', '');

const cred = {
  type: process.env.type,
  project_id: process.env.project_id,
  private_key_id: process.env.private_key_id,
  private_key: privateKey,
  client_email: process.env.client_email,
  client_id: process.env.client_id,
  auth_uri: process.env.auth_uri,
  token_uri: process.env.token_uri,
  auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.client_x509_cert_url,
};

module.exports.cred = cred;
const { storageBucket } = process.env;

module.exports.storageBucket = storageBucket;

admin.initializeApp({
  credential: admin.credential.cert(cred),
  storageBucket,
});

module.exports.admin = admin;

module.exports.email = process.env.EMAIL;
module.exports.pass = process.env.MAIL_PASSWORD;
module.exports.domain = process.env.DOMAIN;

module.exports.links = {
  fb: process.env.FACEBOOK_GROUP_LINK,
  whatsapp: process.env.WHATSAPP_GROUP_LINK,
  calendly: process.env.CALENDLY_LINK,
};
