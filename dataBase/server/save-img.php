<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $uploadDir = '../../img/'; // Папка для сохранения загруженных файлов
    $fileNames = array();

    foreach ($_FILES['file']['tmp_name'] as $key => $tmp_name) {
        $fileRandomName = basename(uniqid('', true) . '.png');
        $uploadedFile = $uploadDir . $fileRandomName;

        if (move_uploaded_file($_FILES['file']['tmp_name'][$key], $uploadedFile)) {
            $fileNames[] = $fileRandomName;
        }
    }

    if (!empty($fileNames)) {
        echo json_encode($fileNames);
    } else {
        echo "Произошла ошибка при сохранении файлов.";
    }
} else {
    echo "Неверный запрос.";
}
?>

