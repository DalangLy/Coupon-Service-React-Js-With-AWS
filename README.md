# Coupon Managment Application

## Description

Coupon Management System is a tool that helps to manage and track coupon. A coupon management system helps you engage with your customers while giving you of how and when the coupons are being used.

## Getting Started

### Installing

- How/where to download your program

```
git clone https://github.com/KHChanna/coupon-service.git
```

- Go to project folder and type command

```
npm install
```

- This project were used with aws amplify as backend. [Amplify Framwork](https://docs.amplify.aws/lib/q/platform/js)
  If you have not yet install amplify command then:

```
npm install -g @aws-amplify/cli
```

or you can visit on amplify document [Installation](https://docs.amplify.aws/cli/start/install)

### Use Existing IAM Amplify Profile

- In Project folder type

```
amplify configure
```

after you typed command above it will go aws account and login your account.

- Go to the project and press Enter.
- Select where is your IAM profile region. example : `us-east-1`
- Then enter your username of IAM user. example : `atech-sale`
- And press Enter then type the `AccessKeyId` and `AccessKeySecret`.

* Then you can the start the project.

```
npm start
```
