<?php
if (isset($_POST['json'])) {

    $jsonData = $_POST['json'];
    $docName = $_POST['docName'];

    $filePath = "../storage/" . $docName . ".json";

    $totalMass = [];

    $currentData = file_get_contents($filePath);
    $object = json_decode($jsonData);

    if ($currentData != "") {
        $totalMass = json_decode($currentData);

        for ($i = 0; $i < count($totalMass); $i++) {

            if ($totalMass[$i]->id == $object->id) {
                if ($object->title) {
                    $totalMass[$i]->title = $object->title;
                }
                if ($object->img) {
                    $totalMass[$i]->img = $object->img;
                }
                if ($object->text) {
                    $totalMass[$i]->text = $object->text;
                }
            }
        }
        $jsonResult = json_encode($totalMass, JSON_PRETTY_PRINT);
        file_put_contents($filePath, $jsonResult);
        echo "Данные успешно изменены на сервере.";
    } else {
        echo ("Такого объекта не существует.");
    }
} else {
    echo "Данные не были переданы на сервер.";
}
