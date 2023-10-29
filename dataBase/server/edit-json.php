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

    $delMass = $object->filesToDel;


    if ($currentData != "") {
        $totalMass = json_decode($currentData);


        for ($i = 0; $i < count($totalMass); $i++) {
            if ($totalMass[$i]->id == $object->id) {
                $result = array_diff($totalMass[$i]->img, $delMass);
                $object->img = array_merge($object->img, $result);

                foreach ($schema as $key => $value) {
                    if ($totalMass[$i]->$key != $object->$key && $object->$key!= null) {
                        $totalMass[$i]->$key = $object->$key;
                    }
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
