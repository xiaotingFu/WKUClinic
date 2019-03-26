<?php
// Only get post 
$app->get('/medicine', function() { 
    global $db;
    $rows = $db->select2("medicine","*",array());
    echoResponse(200, $rows);

});

?>