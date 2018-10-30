# Express server boilerplate

## Init

This server will try to connect to a postgresql server with the configuration file you provided in `config/index.js`.
Rename `config/index.js.dist` to `config/index.js` and fill in your credentials and database name.

Run `npm i` to install the dependencies.

Run `npm run dev` to run the server. It will reload on each file modification.

## Controllers

First level controllers are imported at the server root. An example was provided :
```js
app.use('/hello', require('./controllers/hello'));
```
This will redirect request from the `/hello` endpoint to the `./controllers/hello` router.

## Services

Services are helpers and are made to dissociate controllers from logic. You can't require any service in a service file. Services are automatically added whenever you write any javascript file in the `./services` folder. To declare a new service, each file must begin with a header that indicates the name of the service : 
```js
/**
 * @service servicename
 */
```

When you'll require a service, it will then have the name `$servicename`.

You can require services in controllers by destructuring the service object. You can then easily edit the list of imported services : 
```js
const { $hello, $servicename, $service2 } = require.main.require('./services');
```

## Database

Database uses by default PostgreSQL. We will use here `knex` to connect to the database, make queries, and apply migration scripts. To create a migration script, move to the `database` folder and run `knex migrate:make <migration-script-name>`

Apply migration script, still in the same folder with `knex migrate:latest`

To use the `$db` services and make queries, this is the only service you can require in another service.
```js
const $db = require.main.require('./database');
```

## Requests Logging

You can keep track of received requests with the log middleware :
```
[22:46:21] 200 GET request received on /hello 7ms
```