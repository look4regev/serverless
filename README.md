# serverless
[![Build Status](https://travis-ci.org/look4regev/serverless.svg?branch=master)](https://travis-ci.org/look4regev/serverless)
[![Known Vulnerabilities](https://snyk.io/test/github/look4regev/serverless/badge.svg)](https://snyk.io/test/github/look4regev/serverless)

Using [serverless](https://serverless.com) infra for different AWS Lambda operations

## How does it work?
Using serverless you easily create, deploy and test serverless services. Useful docs:
1. [serverless with AWS](https://serverless.com/framework/docs/providers/aws/)
2. serverless [plugins](https://github.com/serverless/plugins)

## Prerequisite
1. You are running with an administrator AWS account
2. Run: `yarn global add serverless` - to install the `serverless` cli in your `/usr/local/bin`. Use it also with the `sls` alias.
3. FYI: Each directory here is a "service" with a deploy of its own. Useless to say you need to run `yarn install` for every dir with `package.json`.

## Creating new services
1. Create new serverless template service: `serverless create --template aws-nodejs --path "my-service"` (See other [templates](https://serverless.com/framework/docs/providers/aws/guide/services/))
2. `cd my-service`

## Testing in local
1. To test your function locally no need to deploy it: `serverless invoke local --function my_function --log`.
2. If this function is an HTTP route which recieves route params- can send them with adding `--data '{ "pathParameters": {"route_param_name": "param_value"}}'`.
3. If you have `require` in your function, make sure to do locally `yarn add` for it to get a local `node_modules` otherwise you'll have `MODULE_NOT_FOUND` error.

## Deploy

### To dev
This is the default. Use `serverless deploy -v`

### To prod
`serverless deploy --stage prod`

### Tips and debugging
1. It's not mandatory to use serverless.com dashboard and give them any access to your project. If you don't want it than **Ignore** from the warning `WARNING: Missing "tenant" and "app" properties in serverless.yml.`. If you do than open there and complete here your `app: my-serverless`, `tenant: my-tenant`.
2. To prevent uploading unneeded directories such as `node_modules`, add it to your `yml` with `package... exclude...`
3. When making changes only to a specific function it'll be much faster to use `serverless deploy function --function my_function` (replaces only the function and not recreating the whole stack)
4. To debug a function after it was deployed use: `serverless invoke --function my_function --log`.

### Setup a domain for http routes
Background docs: See this [basic guide](https://serverless.com/blog/serverless-api-gateway-domain/) and this [advanced guide](https://serverless.com/blog/api-gateway-multiple-services/)
1. Prerequisit: Add manually to your `serverless.yml`: `plugins: [serverless-domain-manager]`. **Do not** run the `serverless plugin install` because it uses npm, and I install it with yarn by the `package.json` found here.
2. As written in the docs, after configuring the domain in the `serverless.yml`, you need to run one time `sls create_domain --stage prod` (for every stage env). Then deploy.

# Contributing
Fork, implement, add tests, pull request, get my everlasting thanks and a respectable place here :)

# Copyright
Copyright (c) 2019 [Regev Golan](https://www.linkedin.com/in/look4regev/). See [LICENSE](https://github.com/look4regev/serverless/blob/master/LICENSE) for further details.
