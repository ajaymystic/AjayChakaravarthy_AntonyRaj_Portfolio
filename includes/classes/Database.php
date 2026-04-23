<?php
namespace Portfolio;

use PDO;
use PDOException;

class Database
{
    public function query(string $query, array $bindings = [])
    {
        $connection = $this->connect();
        $statement = $connection->prepare($query);

        foreach ($bindings as $key => $value) {
            $statement->bindValue(":$key", $value);
        }

        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $results;
    }

    public function connect()
    {
        // I'm pulling config from the central file so credentials only live in one place
        require_once __DIR__ . '/../config.php';
        $config   = getDbConfig();
        $dsn      = 'mysql:host=' . $config['host'] . ';dbname=' . $config['database'] . ';port=' . $config['port'] . ';charset=utf8mb4';
        return new PDO($dsn, $config['username'], $config['password'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]);
    }
}
