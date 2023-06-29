<?php
require_once '../config.php';
header("Content-Type: text/html;charset=utf-8");

$valido['success']=array('success'=>false, 
'mensaje'=>"",
'idalumno'=>"",
'numControl'=>"",
'nombre'=>"",
'fechaNac'=>"",
'grupo'=>"",
'carrera'=>"");

if($_POST){
    $id=$_POST['idalumno'];
    $sql="SELECT * FROM alumno WHERE idalumno=$id";
    $resultado=$cx->query($sql);
    $row=$resultado->fetch_array();
    $valido['success']=true;
    $valido['mensaje']="SE ENCONTRO REGISTRO";
    $valido['idalumno']=$row[0];
    $valido['numControl']=$row[1];
    $valido['nombre']=$row[2];
    $valido['fechaNac']=$row[3];
    $valido['grupo']=$row[4];
    $valido['carrera']=$row[5];
}else{
    $valido['success']=false;
    $valido['mensaje']="ERROR AL CARGAR ALUMNO";
}
$cx->close();
echo json_encode($valido);

?>