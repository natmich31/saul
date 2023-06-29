<?php
require_once '../config.php';

$valido['success']=array('success'=>false, 'mensaje'=>"");

if($_POST){
    $numControl=$_POST['numControl'];
    $nombre=$_POST['nombre'];
    $fechaNac=$_POST['fechaNac'];
    $grupo=$_POST['grupo'];
    $carrera=$_POST['carrera'];
    
    $sqlInsertar="INSERT INTO alumno VALUES(null,'$numControl','$nombre','$fechaNac','$grupo','$carrera')";
    if($cx->query($sqlInsertar)===true){
        $valido['success']=true;
        $valido['mensaje']="SE GUARDO CORRECTAMENTE";
    }else{
        $valido['success']=false;
        $valido['mensaje']="ERROR: NO SE GUARDO";
    }

}else{
    $valido['success']=false;
    $valido['mensaje']="NO SE GUARDO";
}
echo json_encode($valido);



?>