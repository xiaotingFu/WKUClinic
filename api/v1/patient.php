<?php



$app->get('/patient', function() { 
    global $db;
    $rows = $db->select("identity iden, patient p",
        "p.pid, p.name, iden.identity, p.birthday, p.gender, p.status",
        "p.identity = iden.id");

    echoResponse(200, $rows);

});

$app->post('/patient', function() use ($app) { 
    $data = json_decode($app->request->getBody());
    $mandatory = array();
    global $db;
    $rows = $db->insert("patient", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "patient added successfully.";
    echoResponse(200, $rows);
});

$app->put('/patient/:pid', function($id) use ($app) { 
    $data = json_decode($app->request->getBody());
    $condition = array('PID'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("patient", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "news updated successfully.";
    echoResponse(200, $rows);
});

//get the duration of each task

$app->delete('/patient/:pid', function($id) { 
    global $db;
    $rows = $db->delete("patient", array('PID'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "news removed successfully.";
    echoResponse(200, $rows);
});

?>