<?php
$name = $_GET['name'];

// 读取数据库
$con      = mysql_connect("localhost", "root", "");
if (!$con) {
    die('Could not connect: ' . mysql_error());
} else {
	mysql_select_db("number", $con);
    mysql_query("set names 'utf8'");
    $result = mysql_query("SELECT * FROM reservate WHERE reservate_name = '" . $name ."' ");
    $arr = array();
    while ($row = mysql_fetch_array($result)) {
    	$num = $row['reservate_num'];
    	array_push($arr, array("num"=>$num));
    }
    echo json_encode($arr);
}
mysql_close($con);
?>

