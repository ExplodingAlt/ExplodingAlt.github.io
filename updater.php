$jsonString = file_get_contents('jsonFile.json');
$data = json_decode($jsonString, true);
$data[0]['spawnblock'] = "true";
