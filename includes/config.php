<?php
// I'm centralising DB credentials here so both the Database class and
// any standalone scripts can pull from one place — easy to update for live hosting
function getDbConfig() {
    return [
        'username' => 'root',      // change to live DB user before deploying
        'password' => '',          // change to live DB password before deploying
        'host'     => 'localhost',
        'database' => 'ajay_portfolio', // change to live DB name before deploying
        'port'     => 3306
    ];
}
