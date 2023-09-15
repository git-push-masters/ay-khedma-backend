# Ay Khedma Backend Application

This application is the backend application for the API which Ay Khedma Application is supposed to work on.

## Contributers

* [Seif El-Din Sweilam](https://github.com/saifsweelam)
* [Mohamed El-Sherbiny](https://github.com/El-Zayat)

## Dependencies

### Main Dependencies

* `bcrypt`: Used in hashing passwords to be stored safely inside database
* `cors`: Used to customize the behaviour of CORS-Policy restricted by browsers by setting CORS HTTP Headers
* `dotenv`: Used to simplify the process of setting environmental variables
* `express`: Used as a main framework for the API service
* `express-validator`: Used to validate request data before being passed to controllers
* `jsonwebtoken`: Used to generate and verify auth tokens
* `multer`: Used to handle uploaded files
* `pg`: To be able to use PostgreSQL in production
* `sequelize`: ORM for SQL Database
* `socket.io`: Used in implementing real-time connection for notifications
* `sqlite3`: To be able to use SQLite3 in development

### Development Dependencies

* `nodemon`

## Technologies and Methodologies
The application follows the standards of **REST APIs** and uses `Bearer` Authentication with JWTs. all routes are designed to be meaningful and stateless. The API serves both the user version and the admin version of the website on separate routes.

The application also provides `websocket` connection through `socket.io` to provide real-time connection between server and clients.

## Code Ecosystem
This application uses MVC Architecture Pattern, where models are away from the views and there are controllers to control the application making use of both.

Files are organized into directories where each directory carries files of the same purpose. For example, the [`validators`](./validators/) directory carries all validation middlewares thoughout the application.

Models and Migrations are implemented through `sequelize-cli`. The [`migrations`](./migrations/) directory contains the full migration history in the application and the developers are able to upgrade/downgrade through `sequelize-cli`.

Authorization permissions have a separate [file](./permissions/auth.js) which can be used as a middleware to restrict the access of routes to authorized users.

_Parts of code with the labeled comment `@TODO` are scheduled to future commits_

```
routes
 |_ client
 |   |_ index.js
 |   |_ auth.js
 |   |_ .....
 |_ dashboard
 |   |_ index.js
 |   |_ auth.js
 |   |_ .....
controllers
 |_ client
 |   |_ auth.js
 |   |_ .....
 |_ dashboard
 |   |_ auth.js
 |   |_ .....
validators
 |_ client
 |   |_ auth.js
 |   |_ .....
 |_ dashboard
 |   |_ auth.js
 |   |_ .....
permissions
 |_ auth.js
 |_ .....
models
 |_ index.js
 |_ user.js
 |_ .....
migrations
 |_ 20230829163002-create-admin.js
 |_ .....
services
 |_ sms.js
 |_ ....
sockets
 |_ index.js
 |_ ....
config.js
index.js
.....
```

## Routing Method
Routing names follow **REST APIs** standards.
Collection-type endpoints allow pagination by adding `page` and `limit` properties to the query parameters.

* _Base Client URL_: `/api/`
* _Base Dashboard URL_: `/dashboard/api/`

### Example:
#### **GET** `/requests?sectionId=1`
Fetches all requests which belong to the section of `id` 1. `limit` is set to 10 and `page` is set to 1 be default.
```json
{
    "status": 200,
    "msgs": [],
    "body": {
        "count": 10,
        "page": 1,
        "requests": [
            ....
        ]
    }
}
```

## Local Deployment

1. Clone the repository
```shell
git clone https://github.com/git-push-masters/ay-khedma-backend.git
```

2. Install dependencies
```shell
npm install
```

3. Run the start script
```shell
npm start
```

## Testing

To run the automated tests, you need to have `Python` installed

1. Create a virtual environment (optional)
```shell
pip install virtualenv
virtualenv venv
```

2. Install requirements
```shell
pip install -r test-requirements.txt
```

3. Run test command
```shell
npm run test
```