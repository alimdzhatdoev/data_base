<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $uploadDir = '../../img/'; // Папка для сохранения загруженных файлов
    $uploadedFile = $uploadDir . basename($_FILES['file']['name']);

    if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadedFile)) {
        echo (basename($_FILES['file']['name']));
    } else {
        echo "Произошла ошибка при сохранении файла.";
    }
} else {
    echo "Неверный запрос.";
}
