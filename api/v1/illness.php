<?php
// Tasks
$app->get('/illness', function() { 
    global $db;
    $rows = $db->select2("illness","*",array());
    echoResponse(200, $rows);

});

?>