<?php
if (isset($_POST['id'])) {
    $id = $_POST['id'];
    $docName = $_POST['docName'];

    $filePath = "../storage/" . $docName . ".json";

    $totalMass = [];

    $currentData = file_get_contents($filePath);

    if ($currentData != ""){
        $totalMass = json_decode($currentData);

        for ($i = 0; $i < count($totalMass); $i++){
            if ($totalMass[$i]->id == $id) {
                array_splice($totalMass, $i, 1);
            }
        }
        $jsonResult = json_encode($totalMass, JSON_PRETTY_PRINT);
        file_put_contents($filePath, $jsonResult);
        echo "Данные успешно удалены с сервера.";
    } else {
        echo("Такого объекта не существует.");
    }
} else {
    echo "Данные не были переданы на сервер.";
}
