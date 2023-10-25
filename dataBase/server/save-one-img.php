<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $uploadDir = '../../img/'; // Папка для сохранения загруженных файлов
    $fileRandomName = basename(uniqid('', true) . '.png');
    $uploadedFile = $uploadDir . $fileRandomName;

    if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadedFile)) {
        echo ($fileRandomName);
    } else {
        echo "Произошла ошибка при сохранении файла.";
    }
} else {
    echo "Неверный запрос.";
}
