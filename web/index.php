<?php

require_once(dirname(__DIR__) . '/config/application.php');

$klein = new \Klein\Klein();

Twig_Autoloader::register();

$loader = new Twig_Loader_Filesystem('../src/templates');
$twig = new Twig_Environment($loader, array());

$template_vars = array('APP_ENV' => APP_ENV);

$klein->respond(function ($request, $response, $service) use ($klein) {
// Handle exceptions => flash the message and redirect to the referrer
  $klein->onError(function ($klein) {
    $klein->response()->code(400);
    $klein->response()->send();
  });
});

if (APP_ENV == 'development') {

  $klein->respond('GET', '/', function ($request) {

    global $twig, $template_vars;

    $template = $twig->loadTemplate('_index.twig');
    return $template->render($template_vars);

  });

} else {

  $klein->respond('GET', '/', function ($request, $response, $service) {

    $service->render('pages/_index.html');

  });

}

$klein->dispatch();
