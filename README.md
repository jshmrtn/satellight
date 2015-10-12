# Satellight
[![Build Status](https://travis-ci.org/jshmrtn/satellight.svg)](https://travis-ci.org/jshmrtn/satellight) (PHP)

[![Dependency Status](https://www.versioneye.com/user/projects/561b7c2ea193340f32001204/badge.svg?style=flat)](https://www.versioneye.com/user/projects/561b7c2ea193340f32001204) (Bower)

[![Dependency Status](https://www.versioneye.com/user/projects/561b7c2fa193340f2f001417/badge.svg?style=flat)](https://www.versioneye.com/user/projects/561b7c2fa193340f2f001417) (Rubygems)

[![Dependency Status](https://www.versioneye.com/user/projects/561b7c2fa193340f28001303/badge.svg?style=flat)](https://www.versioneye.com/user/projects/561b7c2fa193340f28001303) (Composer)

[![Dependency Status](https://www.versioneye.com/user/projects/561b7c30a193340f3200120e/badge.svg?style=flat)](https://www.versioneye.com/user/projects/561b7c30a193340f3200120e) (NPM)

This framework includes easy setup, building and deployment for simple, non database reliant projects.

## Roadmap
* Documentation for Assets / Building
* Documentation for Deployment.

## Requirements

* PHP >= 5.4
* Ruby >= 1.9
* Node >= 0.10.2
* NPM >= 2.1.5

## Installation

1. Clone the git repo - `git clone git@github.com:jshmrtn/satellight.git`
2. Run `composer install`
3. Run `npm install`
4. Run `bower install`
5. Run `gulp`
6. Copy `.env.example` to `.env` and update environment variables:
  * `APP_ENV` - Set to environment (`development`, `staging`, `production`)
  * `APP_URL` - URL to application home (example.com)
  * `APP_NAME` - The application name - this will be used as a identifier for i.e. handling deployments (example-site)
  * `APP_REPO` - The applications git repo (git@github.com/jshmrtn/satellight)
  * `*_URL` - URL to application home (example.com)
  * `*_HOST` - The host used to connect via ssh when deploying (server.example.com)
  * `*_USER` - The user used to connect via ssh when deploying (www-data)
  * `*_PORT` - The port used to connect via ssh when deploying (22)
  * `*_PATH` - The absolute path to your applications to level folder (/home/johndoe/sites/example-site)
7. Set your site vhost document root to `/path/to/site/web/` (`/path/to/site/current/web/` if using deploys)
8. Enjoy!

## Assets / Building

TBA

## Routing

Routing is handled completely in the index.php file (web/index.php).
There you get to set respond parameters as well as the corresponding templates you would like to route to.
The index template is set up as an example.

Note: Requests will be handled differently while you are in a development environment. We do this, so there is no need to rebuild the html files from the twig files all along every modification.

## Deployment

TBA

## Contributing

Contributions are welcome from everyone. We will add [contributing guidelines](CONTRIBUTING.md) as soon as possible.

## Credits

This project relies on various tools / frameworks:
* Router: Klein.php - https://github.com/chriso/klein.php
* ENV Variables: PHPDotenv - https://github.com/vlucas/phpdotenv
* Templating: Twig - https://github.com/twigphp/Twig
* Deployment: Capistrano - https://github.com/capistrano/capistrano
