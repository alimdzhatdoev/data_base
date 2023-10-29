<?php
if (isset($_POST['schemaData'])) {

    $schemaData = $_POST['schemaData'];

    $data = json_decode($schemaData);

    foreach ($data as $key => $value) {
        $fileName = "../storage/{$key}.json";

        if (!file_exists($fileName)) {
            $jsonData = json_encode([], JSON_PRETTY_PRINT);
            file_put_contents($fileName, $jsonData);
        } 
    }
}