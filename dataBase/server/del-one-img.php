<?php
$docName = $_POST['fileName'];
$imgName = $_POST['imgName'];

$filePath = "../storage/" . $docName . ".json";

$currentData = file_get_contents($filePath);

if ($currentData != "") {
    $imgName = "../../img/" . $imgName;
    if (file_exists($imgName)) {
        unlink($imgName);
    } else {
        echo 'Картинка не существует.';
    }
} else {
    echo ("Такого объекта не существует.");
}


