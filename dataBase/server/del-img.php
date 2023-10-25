<?php
$docName = $_POST['fileName'];
$id = $_POST['id'];

$filePath = "../storage/" . $docName . ".json";

$totalMass = [];

$currentData = file_get_contents($filePath);

if ($currentData != "") {
    $totalMass = json_decode($currentData);

    for ($i = 0; $i < count($totalMass); $i++) {
        if ($totalMass[$i]->id == $id) {
            $imgName = "../../img/" . $totalMass[$i]->img;

            if (file_exists($imgName)) {
                if (unlink($imgName)) {
                    echo 'Картинка успешно удалена.';
                } else {
                    echo 'Не удалось удалить картинку.';
                }
            } else {
                echo 'Картинка не существует.';
            }
        }
    }
} else {
    echo ("Такого объекта не существует.");
}


