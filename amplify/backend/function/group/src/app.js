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
  secretAccessKey: '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',
});
const userPoolId = 'us-east-1_D0lwrPd8k';
var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

/**********************
 * Example get method *
 **********************/

app.get('/group', async function (req, res) {
  try {
    var listGroupParams = {
      UserPoolId: userPoolId /* required */,
      Limit: 10,
    };

    const groups = await cognitoidentityserviceprovider
      .listGroups(listGroupParams)
      .promise();

    res.status(200).json({
      success: true,
      message: 'Get group successfully',
      data: groups.Groups,
    });
  } catch (e) {
    res.status(500).json({ success: false, message: e });
  }
});

app.get('/group/*', function (req, res) {
  // Add your code here
  res.json({ success: 'get call succeed!', url: req.url });
});

/****************************
 * Example post method *
 ****************************/

app.post('/group', async function (req, res) {
  try {
    if (req.body.group === null || req.body.group === undefined) {
      return res.json({ success: false, message: 'Group is required !' });
    }

    if (req.body.userId === null || req.body.userId === undefined) {
      return res.json({ success: false, message: 'User id is required !' });
    }

    var params = {
      GroupName: req.body.group, //your confirmed user gets added to this group
      UserPoolId: userPoolId,
      Username: req.body.userId,
    };

    await cognitoidentityserviceprovider.adminAddUserToGroup(params).promise();
    res.json({
      success: true,
      message: 'User added to group ' + req.body.group,
    });
  } catch (e) {
    res.json({ success: false, message: e });
  }
});

app.post('/group/:path', async function (req, res) {
  try {
    const { path } = req.params;

    switch (path) {
      case 'create':
        const createGroups = [
          {
            GroupName: 'Administrators' /* required */,
            UserPoolId: userPoolId /* required */,
            Description: 'Administrators',
            Precedence: 1,
          },
          {
            GroupName: 'Sales' /* required */,
            UserPoolId: userPoolId /* required */,
            Description: 'Sales',
            Precedence: 1,
          },
          {
            GroupName: 'Supports' /* required */,
            UserPoolId: userPoolId /* required */,
            Description: 'Supports',
            Precedence: 2,
          },
          {
            GroupName: 'Finances' /* required */,
            UserPoolId: userPoolId /* required */,
            Description: 'Finances',
            Precedence: 2,
          },
          {
            GroupName: 'Guests' /* required */,
            UserPoolId: userPoolId /* required */,
            Description: 'Guests',
            Precedence: 3,
          },
        ];

        for (const group of createGroups) {
          await cognitoidentityserviceprovider.createGroup(group).promise();
        }

        return res.json({ success: true, message: 'groups created' });
      default:
        return res.json({ success: false, message: '404 not found!' });
    }
  } catch (e) {
    res.json({ success: false, message: e });
  }
});

/****************************
 * Example put method *
 ****************************/

app.put('/group', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body });
});

app.put('/group/*', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body });
});

/****************************
 * Example delete method *
 ****************************/

app.delete('/group', async function (req, res) {
  try {
    if (req.body.group === null || req.body.group === undefined) {
      return res.json({ success: false, message: 'Group is required !' });
    }

    if (req.body.userId === null || req.body.userId === undefined) {
      return res.json({ success: false, message: 'User id is required !' });
    }

    var params = {
      GroupName: req.body.group, //your confirmed user gets added to this group
      UserPoolId: userPoolId,
      Username: req.body.userId,
    };

    await cognitoidentityserviceprovider
      .adminRemoveUserFromGroup(params)
      .promise();
    res.json({
      success: true,
      message: 'User removed from ' + req.body.group,
    });
  } catch (e) {
    res.json({ success: false, message: e });
  }
});

app.delete('/group/*', function (req, res) {
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
