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
            for ($j = 0; $j < count($totalMass[$i]->img); $j++) {
                $imgName = "../../img/" . $totalMass[$i]->img[$j];
                if (file_exists($imgName)) {
                    unlink($imgName);
                } else {
                    echo 'Картинка не существует.';
                }
            }
        }
    }
} else {
    echo ("Такого объекта не существует.");
}


