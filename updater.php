$jsonString = file_get_contents('spawnblock.json');
$data = json_decode($jsonString, true);
$data[0]['spawn'] = "true";
