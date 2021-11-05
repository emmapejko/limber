require('dotenv').config();
const { Router } = require('express');

const imageRouter = Router();
const AWS = require('aws-sdk');

imageRouter.get('/:pose', (req, res) => {
  const { pose } = req.params;

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const s3 = new AWS.S3();

  async function getImage() {
    const data = s3.getObject(
      {
        Bucket: 'limberbucket',
        Key: `${pose}.jpeg`,
      },
    ).promise();
    return data;
  }

  getImage()
    .then((img) => {
      const image = `data:image/jpeg;base64,${encode(img.Body)}`;
      res.send(image);
    }).catch((e) => {
      res.send(e);
    });

  function encode(data) {
    const buf = Buffer.from(data);
    const base64 = buf.toString('base64');
    return base64;
  }
});

imageRouter.get('/otherImages/:image', (req, res) => {
  const { image } = req.params;

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const s3 = new AWS.S3();

  async function getImage() {
    const data = s3.getObject(
      {
        Bucket: 'limberbucket',
        Key: image,
      },
    ).promise();
    return data;
  }

  getImage()
    .then((img) => {
      const image = `data:image/jpeg;base64,${encode(img.Body)}`;
      res.send(image);
    }).catch((e) => {
      res.send(e);
    });

  function encode(data) {
    const buf = Buffer.from(data);
    const base64 = buf.toString('base64');
    return base64;
  }
});

module.exports = imageRouter;
