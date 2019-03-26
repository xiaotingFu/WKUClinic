<?php
// Tasks
$app->get('/prescription', function() { 
    global $db;
   $rows = $db->select("prescription p, medicine m, diagnosis d",
        "p.pscid, m.name,d.sid,p.customusage, p.quantity",
        "p.did = d.did AND p.mid = m.mid");

    echoResponse(200, $rows);

});

$app->post('/prescription', function() use ($app) { 
    $data = json_decode($app->request->getBody());
    $mandatory = array();
    global $db;
    $rows = $db->insert("prescription", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "News added successfully.";
    echoResponse(200, $rows);
});

$app->put('/prescription/:id', function($id) use ($app) { 
    $data = json_decode($app->request->getBody());
    $condition = array('ID'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("prescription", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "news updated successfully.";
    echoResponse(200, $rows);
});

//get the duration of each task
$app->delete('/prescription/:id', function($id) { 
    global $db;
    $rows = $db->delete("prescription", array('ID'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "news removed successfully.";
    echoResponse(200, $rows);
});
?>