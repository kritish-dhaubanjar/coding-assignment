# Coding Assignment [Node] Setup

#### 1. Deploying DynamoDB Locally on Your Computer

Download DynamoDB for from [here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html).

1. Start DynamoDB from terminal.

```
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
```

2. Configure your credentials to enable authorization for your applications.

```
aws configure

AWS Access Key ID: accessKeyId
AWS Secret Access Key: secretAccessKey
Default region name : us-east-1
Default output format : json
```

3.  Use the following command to list DynamoDB tables from AWS CLI.

```
aws dynamodb list-tables --endpoint-url http://localhost:8000
```

#### 2. Setup Github OAuth App

1. [Create an OAuth App](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app)

2. Setup Authorization callback URL

```
http://localhost:8080/api/github/oauth/callback
```

#### 3. Configure .env

```
cp .env.example .env
```

.env

```
# Application
APP_NAME=CABN
APP_PORT=8080
APP_HOST=localhost

# JWT
JWT_SECRET=jwtsecret
JWT_SECRET_EXPIRE="1d"

# AWS
TABLE_NAME=cabn
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_ENDPOINT=http://localhost:8000

# Github OAuth
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_USER_URL=https://api.github.com/user
GITHUB_ACCESS_TOKEN_URL=https://github.com/login/oauth/access_token

```

#### 4. Database Migration

```
yarn
```

Migrate: `yarn migrate`\
Rollback: `yarn migrate:rollback`\
Refresh: `yarn migrate:refresh`

#### 5. Development Setup

```
yarn dev
```
