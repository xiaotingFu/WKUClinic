<?php
// Tasks
// $app->get('/diagnosis', function() { 
//     global $db;
//     $rows = $db->select("diagnosis","*",array());
//     echoResponse(200, $rows);

// });


$app->get('/diagnosis', function()  use ($app) { 
    global $db;
    $rows = $db->select(
        "diagnosis d, patient p, illness ill",
        "d.did, ill.iname, p.name, d.time, d.description, d.temperature, d.systolicBP, d.diastolicBP, d.heartrate, d.advice",
        "(d.pid = p.pid) AND (d.sid = ill.sid)");
    echoResponse(200, $rows);

});


$app->post('/diagnosis', function() use ($app) { 
    $data = json_decode($app->request->getBody());
    $mandatory = array();
    global $db;
    $rows = $db->insert("diagnosis", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "News added successfully.";
    echoResponse(200, $rows);
});

$app->put('/diagnosis/:id', function($id) use ($app) { 
    $data = json_decode($app->request->getBody());
    $condition = array('ID'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("diagnosis", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "news updated successfully.";
    echoResponse(200, $rows);
});

//get the duration of each task

$app->delete('/diagnosis/:id', function($id) { 
    global $db;
    $rows = $db->delete("diagnosis", array('ID'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "news removed successfully.";
    echoResponse(200, $rows);
});
?>