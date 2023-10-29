<?php
if (isset($_POST['json'])) {

    $schemaData = $_POST['schemaData'];
    $jsonData = $_POST['json'];
    $docName = $_POST['docName'];

    $filePath = "../storage/" . $docName . ".json";


    $totalMass = [];

    $currentData = file_get_contents($filePath);
    $object = json_decode($jsonData);
    $schema = json_decode($schemaData);


    if ($currentData != "") {
        $totalMass = json_decode($currentData);
        $newMass = [];

        for ($i = 0; $i < count($totalMass); $i++) {
            if ($totalMass[$i]->id == $object->id) {
                $totalMass[$i]->img = array_diff($totalMass[$i]->img, $object->img);

                foreach ($totalMass[$i]->img as $img) {
                    array_push($newMass, $img);
                }

                $totalMass[$i]->img = $newMass;
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
