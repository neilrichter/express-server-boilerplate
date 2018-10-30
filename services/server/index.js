/**
 * @service server
 */

const
  chalk = require('chalk'),
  moment = require('moment'),
	{ exec } = require('child_process'),
	{ db } = require.main.require('./config'),
  $db = require.main.require('./database');

const errors = {
  'ECONNREFUSED': cb => {
    console.log(chalk.red('Start the Postgresql server'));
  }, 
  '3D000': cb => {
    console.log(chalk.red(`Database "${db.database}" does not exist, creating it...`));
    const creation = exec(`createdb ${db.database}`);
    creation.on('close', (code, signal) => {
      cb();
    })
  },
  '42P01': cb => {
    console.log(chalk.red('knex_migrations table does not exist, creating it...'));
    const migration = exec('knex --knexfile ./database/knexfile.js migrate:latest;', (err, stdout, stdin) => console.log(chalk.cyan(stdout)));
    migration.on('close', (code, signal) => {
      cb();
    })
  }
}

/**
 * Recursive callback to check after the action if app is runnable
 */
const callback = () => {
  $db
    .select('*')
    .from('knex_migrations')
    .then(results => console.log(chalk.magenta(`[${moment().format('HH:mm:ss')}] Server started`)))
    .catch(async err => {
      errors[err.code](callback);
    });
}

class Server {
  /**
   * Checks that the database is running correctly to make the app run
   */
  checkDatabase() {
    callback();
  }
}

module.exports = new Server();