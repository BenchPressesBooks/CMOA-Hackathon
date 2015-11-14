<?php
	// Modify these settings to connect to the database properly
	$dbhost = 'localhost';
	$dbuser = 'ffapps4u_cmoa';
	$dbpass = 'Hack2015!';
	$dbname = 'ffapps4u_cmoa';

	$conn = mysql_connect($dbhost, $dbuser, $dbpass) or die ('<span class="phperror">Error connecting to MySQL</span>');
	mysql_select_db($dbname) or die('<span class="phperror">Error connecting to database.</span>');
?>