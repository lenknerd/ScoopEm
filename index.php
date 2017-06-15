<?php
	// Will be for PHP session (log-in) not implemented fully yet
	session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="ScoopEm Task Updater">
	<meta name="author" content="David Lenkner">
	<link rel="icon" href="img/dl-favicon-trsl-32x32.png">

	<title>Scoop 'Em</title>

	<!-- Bootstrap core CSS -->
	<link href="css/bootstrap.min.css" rel="stylesheet">

	<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
	<link href="css/ie10-viewport-bug-workaround.css" rel="stylesheet">

	<!-- My styles (David Lenker's) custom to my home page site -->
	<link href="css/scoopem.css" rel="stylesheet">

</head>

<body>

	<!-- Begin page content -->
	<div class="container" id="main">
	</div>


	<!-- Bootstrap and jQuery JavaScript -->
	<script src="js/jquery-3.2.1.min.js"></script>
	<script src="js/bootstrap.min.js"></script>

	<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
	<script src="js/ie10-viewport-bug-workaround.js"></script>

	<!-- Marionette with Underscore templating -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/backbone.marionette/2.4.1/backbone.marionette.min.js"></script>

	<!-- Router and main app for my site -->
	<script src="js/app.js"></script>
	<script src="js/router.js"></script>

	<!-- Views the site -->
	<script src="js/views/logIn.js"></script>

</body></html>
