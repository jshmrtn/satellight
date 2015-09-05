<?php

require_once(dirname(__DIR__) . '/vendor/autoload.php');

/**
 * Variables
 */

$root_dir = dirname(__DIR__);
$webroot_dir = $root_dir . '/web';

/**
 * Use Dotenv to set required environment variables and load .env file in root
 */

if (file_exists($root_dir . '/.env')) {
  Dotenv::load($root_dir);
}
Dotenv::required(array('APP_ENV', 'APP_URL'));

/**
 * Set up our global environment constant and load its config first
 * Default: development
 */

define('APP_ENV', getenv('APP_ENV') ? getenv('APP_ENV') : 'development');
$env_config = dirname(__FILE__) . '/environments/' . APP_ENV . '.php';
if (file_exists($env_config)) {
  require_once $env_config;
}
