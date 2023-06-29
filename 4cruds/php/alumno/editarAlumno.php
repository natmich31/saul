<?php
require_once '../config.php';

$valido['success']=array('success'=>false, 'mensaje'=>"");

if($_POST){
    $id=$_POST['idalumno'];
    $numControl=$_POST['numControl'];
    $nombre=$_POST['nombre'];
    $fechaNac=$_POST['fechaNac'];
    $grupo=$_POST['grupo'];
    $carrera=$_POST['carrera'];
    
    $sqlEditar="UPDATE alumno SET 
                numControl='$numControl',
                nombre='$nombre',
                fechaNac='$fechaNac',
                grupo='$grupo',
                carrera='$carrera'
                WHERE idalumno=$id";
    if($cx->query($sqlEditar)===true){
        $valido['success']=true;
        $valido['mensaje']="SE ACTUALIZO CORRECTAMENTE";
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