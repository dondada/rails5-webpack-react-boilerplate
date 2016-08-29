# Rails 5 + Webpack + React Boilerplate

This project serves as a boilerplate for any application project you may wish to start with Rails 5 for back-end processing, Webpack for asset compilation, and React as your front-end framework.

## Technology Stack

This project is a multi-stack application utilizing Ruby on Rails 5 and React as the primary interface controllers.

### Application back-end

This project uses Ruby on Rails 5 running in application mode to house data, route authentication requests, and serve as the API back-end. In addition to the Ruby on Rails codebase Postgres is required for local and production operation.

### Application front-end

This project is a [React](https://facebook.github.io/react/) powered single-page application and utilizes [Webpack](https://webpack.github.io/) to handle JavaScript and CSS asset management. [NPM](https://www.npmjs.com/) is used to manage packages for the front-end and developer tools. It is recommended that Node be managed using [NVM](https://github.com/creationix/nvm) for easy version management between projects.

## Setup and Configuration

### Rails back-end

First, make sure you have Postgres running on your local machine. If you do not have Postgres installed, you can install it using one of these methods:

1. [Postgres.app](http://postgresapp.com/)
1. [Postgres distributed binary](https://www.postgresql.org/download/)
1. Install via [Homebrew](http://brew.sh/): `brew install postgresql`

By default the development database is configured to use the local user's Postgres user without a password for simplicity. If you do not have your Postgres installation configured this way, you will need to specify database credentials in the `.env` file (or `.rbenv-vars` file if you are running [rbenv](https://github.com/rbenv/rbenv)):

```
# .env
DB_USERNAME=username
DB_PASSWORD=password
```

Once PostgreSQL is installed, run the following to install and initialize the Ruby on Rails application:

```shell
$> bundle install
```

You should also change the namespace for the Rails application to match the desired name for your application:

* Main application module name in [`config/application.rb`](https://github.com/digital-telepathy/rails5-webpack-react-boilerplate/blob/master/config/application.rb#L9)
* Development database name in [`config/database.yml`](https://github.com/digital-telepathy/rails5-webpack-react-boilerplate/blob/master/config/database.yml#L15)
* Test database name in [`config/database.yml`](https://github.com/digital-telepathy/rails5-webpack-react-boilerplate/blob/master/config/database.yml#L24)
* Production database name in [`config/database.yml`](https://github.com/digital-telepathy/rails5-webpack-react-boilerplate/blob/master/config/database.yml#L28)
* ActiveJob queue name prefix in [`config/environments/production.rb`](https://github.com/digital-telepathy/rails5-webpack-react-boilerplate/blob/master/config/environments/production.rb#L57)
* Session store name in [`config/initializers/session_store.rb`](https://github.com/digital-telepathy/rails5-webpack-react-boilerplate/blob/master/config/initializers/session_store.rb#L3)

### Webpack/React front-end

First, ensure that you are running the proper version of Node (6.5.0):

```shell
$> node -v
```

Once you've verified you are running a recent version of Node, install all package dependencies:

```shell
$> npm install
```

## Running

Since we are using Ruby on Rails and Webpack, running your development environment has been simplified using a single command to start both the Rails server and the Webpack Dev Server:

```shell
$> npm start
```

## Testing

To quickly run all tests for Ruby on Rails and JavaScript run:

```shell
$> npm test
```

This will run all RSpec and all Jest tests for the application - useful for CI testing.

### Ruby on Rails

RSpec 3.4 is utilized as the testing framework. Guard is also available for test monitoring. To execute all tests manually, run:

```shell
$> bundle exec rspec
```

It is usually recommended that you run your tests in the background while developing so you can catch errors before they become bigger problems. Use [Guard](https://github.com/guard/guard) to monitor your files for modifications and automatically run the appropriate tests for you:

```shell
$> guard
```

### JavaScript

[Jest](https://facebook.github.io/jest/) is used for JavaScript testing. At its core it uses [Jasmine](http://jasmine.github.io/) for assertion testing. The syntax here is very similar to RSpec, so it shouldn't be too much of a mind shift for how to write tests. You can quickly test all your JavaScript files by running:

```shell
$> npm run test:js
```

While developing it is usually recommended to test your files in the background. To do this, simply run:

```shell
$> npm run test:js:watch
```
