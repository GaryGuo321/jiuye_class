<?php
// 获取数据库
$con  = mysql_connect("localhost", "root", "");
if (!$con) {
    die('Could not connect: ' . mysql_error());
} else {
    // 为数据库更新内容
    $name = $_GET['name'];
    $number = $_GET['number'];

    mysql_select_db("number", $con);
    // sql更新内容
    $sql = "UPDATE reservate SET reservate_num='" . $number . "' WHERE reservate_name = '" . $name ."'";
    mysql_query("set names 'utf8'");
    // 判断成功或者失败
    $result = mysql_query($sql, $con);
    if (!$result) {
        die('Error:' . mysql_error());
    } else {
        echo "success";
    }
}
mysql_close($con);
?>