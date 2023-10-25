<?php
if (isset($_POST['json'])) {
    $jsonData = $_POST['json'];
    $docName = $_POST['docName'];

    $filePath = "../storage/" . $docName . ".json";

    $totalMass = [];

    $currentData = file_get_contents($filePath);

    if ($currentData != ""){
        $object = json_decode($jsonData);
        $totalMass = json_decode($currentData);
        array_push($totalMass, $object);
        $jsonResult = json_encode($totalMass, JSON_PRETTY_PRINT);
        file_put_contents($filePath, $jsonResult);
    } else {
        $object = json_decode($jsonData); 
        array_push($totalMass, $object);
        $jsonResult = json_encode($totalMass, JSON_PRETTY_PRINT);
        file_put_contents($filePath, $jsonResult);
    }
    echo "Данные успешно записаны на сервер.";
} else {
    echo "Данные не были переданы на сервер.";
}