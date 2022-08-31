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

/**********************
 * Example get method *
 **********************/

var AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1',
  accessKeyId: 'AKIAXWJDN6H77YNPD26N',
  secretAccessKey: '2B2jWFViMmJWTWStAvstWGC345YDWMmC3c++XW8F',
});

const userPoolId = 'us-east-1_D0lwrPd8k';
var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

app.get('/user', async function (req, res) {
  res.json({ success: 'auth', auth: req.headers });
});

app.get('/user/*', function (req, res) {
  // Add your code here
  res.json({ success: 'get call succeed!', url: req.url });
});

/****************************
 * Example post method *
 ****************************/

app.post('/user', async function (req, res) {
  try {
    res.json({ success: 'post call succeed!', url: req.url });
  } catch (e) {
    res.json({ success: false, message: e });
  }
});

app.post('/user/*', function (req, res) {
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body });
});

/****************************
 * Example put method *
 ****************************/

app.put('/user', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body });
});

app.put('/user/:param', async function (req, res) {
  try {
    const param = req.params.param;

    switch (param) {
      case 'reset-password':
        if (req.body.userId === null || req.body.userId === undefined) {
          return res.json({
            success: false,
            message: 'User id is required !',
          });
        }

        if (req.body.password === null || req.body.password === undefined) {
          return res.json({
            success: false,
            message: 'Password is required !',
          });
        }
        var params = {
          Password: req.body.password /* required */,
          UserPoolId: userPoolId /* required */,
          Username: req.body.userId /* required */,
          Permanent: true || false,
        };

        await cognitoidentityserviceprovider
          .adminSetUserPassword(params)
          .promise();
        return res.json({
          success: true,
          message: 'Password reset successfully',
        });

      default:
        return res.status(404).json({ success: false, message: 'not found' });
    }

    return res.json({ success: true, message: 'Password reset successfully' });
  } catch (e) {
    res.json({ success: false, errors: e });
  }
});

/****************************
 * Example delete method *
 ****************************/

app.delete('/user', async function (req, res) {});

app.delete('/user/:paths', async function (req, res) {
  try {
    if (req.body.userId === null || req.body.userId === undefined) {
      return res.json({ success: false, message: 'User id is required !' });
    }
    var params = {
      UserPoolId: userPoolId /* required */,
      Username: req.body.userId /* required */,
    };

    const path = req.params.paths;

    switch (path) {
      case 'enable':
        await cognitoidentityserviceprovider.adminEnableUser(params).promise();
        return res
          .status(200)
          .json({ success: true, message: 'User have been enabled' });
      case 'disable':
        await cognitoidentityserviceprovider.adminDisableUser(params).promise();
        return res
          .status(200)
          .json({ success: true, message: 'User have been disabled' });
      default:
        return res.status(404).json({ success: true, message: 'not found' });
    }
  } catch (e) {
    res.json({ success: false, message: e });
  }
});

app.listen(3000, function () {
  console.log('App started');
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
