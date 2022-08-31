/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

var AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1',
  accessKeyId: 'AKIAXWJDN6H77YNPD26N',
  secretAccessKey: '2B2jWFViMmJWTWStAvstWGC345YDWMmC3c++XW8F',
});

var ses = new AWS.SES({ apiVersion: '2010-12-01' });

/**********************
 * Example get method *
 **********************/

app.get('/sendMail', async function (req, res) {
  res.json({ success: 'get call succeed!', url: req.url });
});

app.get('/sendMail/*', function (req, res) {
  // Add your code here
  res.json({ success: 'get call succeed!', url: req.url });
});

/****************************
 * Example post method *
 ****************************/

app.post('/sendMail', async function (req, res) {
  try {
    if (typeof req.body.toAddresses !== 'object') {
      return res.status(403).json({
        success: false,
        message: 'To address must be an array emails',
      });
    }

    if (typeof req.body.replyToAddresses !== 'object') {
      return res.status(403).json({
        success: false,
        message: 'Reply Addresses must be an array emails',
      });
    }

    if (
      req.body.source === undefined ||
      req.body.source === '' ||
      req.body.source === null
    ) {
      return res.status(403).json({
        success: false,
        message: 'Please provide source email',
      });
    }

    if (
      req.body.title === undefined ||
      req.body.title === '' ||
      req.body.title === null
    ) {
      return res.status(403).json({
        success: false,
        message: 'Please provide title ',
      });
    }

    if (
      req.body.content === undefined ||
      req.body.content === '' ||
      req.body.content === null
    ) {
      return res.status(403).json({
        success: false,
        message: 'Please provide content ',
      });
    }

    var params = {
      Destination: {
        // BccAddresses: [],
        // CcAddresses: ['recipient3@example.com'],
        ToAddresses: req.body.toAddresses,
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: req.body.content,
          },
          Text: {
            Charset: 'UTF-8',
            Data: 'This is the message body in text format.',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: req.body.title,
        },
      },
      ReplyToAddresses: [...req.body.replyToAddresses],
      // ReturnPath: '',
      // ReturnPathArn: '',
      Source: req.body.source,
      // SourceArn: '',
    };

    await ses.sendEmail(params).promise();
    res.status(200).json({ success: true, message: 'Mail have sent' });
  } catch (e) {
    res.status(500).json({ success: true, message: e });
  }
});

app.post('/sendMail/:path', async function (req, res) {
  try {
    const { path } = req.params;
    switch (path) {
      case 'add-source-email':
        if (
          req.body.email === undefined ||
          req.body.email === '' ||
          req.body.email === undefined
        )
          return res.status(403).json({
            success: false,
            message: 'email is required',
          });

        var params = {
          EmailAddress: req.body.email,
        };

        await ses.verifyEmailIdentity(params).promise();
        return res.status(200).json({
          success: true,
          message: 'Please check mail inbox to be verify',
        });

      default:
        return res.status(404).json({
          success: false,
          message: 'Not found!',
        });
    }
  } catch (e) {
    res.status(500).json({ success: true, message: e });
  }
});

/****************************
 * Example put method *
 ****************************/

app.put('/sendMail', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body });
});

app.put('/sendMail/*', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body });
});

/****************************
 * Example delete method *
 ****************************/

app.delete('/sendMail', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.delete('/sendMail/*', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.listen(3000, function () {
  console.log('App started');
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
