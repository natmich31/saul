
var sesion=localStorage.getItem("nombre");

const checarSesion=()=>{
  if(sesion==null){
    window.location.href="index.html";
  }
  document.querySelector("#usuario").innerHTML=sesion;
}

const cerrarSesion=()=>{
    localStorage.clear();
    window.location.href="index.html";
}


const agregarAlumno= async()=>{
    var numControl=document.querySelector("#numControl").value;
    var nombre=document.querySelector("#nombre").value;
    var fechaNac=document.querySelector("#fechaNac").value;
    var grupo=document.querySelector("#grupo").value;
    var carrera=document.querySelector("#carrera").value;
    

    if(numControl.trim()==='' ||
    nombre.trim()==='' ||
    fechaNac.trim()==='' ||
    grupo.trim()==='' ||
    carrera.trim()==='' ){
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'FALTA LLENAR CAMPOS',
            footer: 'CRUD ALUMNOS'
          })  
        return;       
    }


    // INSERTAR A LA BASE DE DATOS
    const datos=new FormData();
    datos.append("numControl",numControl);
    datos.append("nombre",nombre);
    datos.append("fechaNac",fechaNac);
    datos.append("grupo",grupo);
    datos.append("carrera",carrera);
    

    var respuesta=await fetch("php/alumno/agregarAlumno.php",{
        method:'POST',
        body:datos
    });

    var resultado=await respuesta.json();

    if(resultado.success==true){
        Swal.fire({
            icon: 'success',
            title: 'EXITO!',
            text: resultado.mensaje,
            footer: 'CRUD ALUMNOS'
          }) 
          document.querySelector("#formAgregar").reset();
         
    }else{
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: resultado.mensaje,
            footer: 'CRUD ALUMNOS'
          }) 
    }
    document.querySelector("#agregarModal").click();
    cargarAlumnos();
}

const cargarAlumnos=async()=>{

    var respuesta=await fetch("php/alumno/cargarAlumnos.php",{});
    var registrosHTML=``;
    var resultado=await respuesta.json();

    //console.log(resultado);

    resultado.data.forEach(fila=>{
        registrosHTML+=`
        <tr>
        <td>${fila[1]}</td>
        <td>${fila[2]}</td>
        <td>${fila[3]}</td>
        <td>${fila[4]}</td>
        <td>${fila[5]}</td>
        <td><button class="btn btn-success "  data-bs-toggle="modal" data-bs-target="#editarModal" onclick="cargarAlumno(${fila[0]})"><i class="bi bi-pencil-square p-1"></i>Editar</button></td>
        <td><button class="btn btn-danger" onclick="eliminarAlumno(${fila[0]})"> <i class="bi bi-trash p-1"></i>Eliminar</button></td>
      </tr>
        `;
    });
    document.querySelector("#registros").innerHTML=registrosHTML;

}

const eliminarAlumno=(idalumno)=>{
    Swal.fire({
        title: '¿Estás seguro de eliminar este Alumno?',
        showDenyButton: true,
        confirmButtonText: 'SI',
        confirmButtonColor: '#198754',
        denyButtonText: 'NO',
      }).then(async(result) => {
        if (result.isConfirmed) {

            const datos=new FormData();
                datos.append("idalumno",idalumno);

            var respuesta=await fetch("php/alumno/eliminarAlumno.php",{
                method:'POST',
                body:datos
            });
        
            var resultado=await respuesta.json();
        
            if(resultado.success==true){
                Swal.fire({
                    icon: 'success',
                    title: 'EXITO!',
                    text: resultado.mensaje,
                    footer: 'CRUD ALUMNOS'
                  }) 
                 
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: resultado.mensaje,
                    footer: 'CRUD ALUMNOS'
                  }) 
            }
            cargarAlumnos();         
        } 
      })
}

const cargarAlumno=async(idalumno)=>{
    const datos=new FormData();
    datos.append("idalumno",idalumno);
    
    var respuesta=await fetch("php/alumno/cargarAlumno.php",{
        method:'POST',
        body:datos
    });
    
    var resultado=await respuesta.json();

    document.querySelector("#idalumno").value=resultado.idalumno;
    document.querySelector("#enumControl").value=resultado.numControl;
    document.querySelector("#enombre").value=resultado.nombre;
    document.querySelector("#efechaNac").value=resultado.fechaNac;
    document.querySelector("#egrupo").value=resultado.grupo;
    document.querySelector("#ecarrera").value=resultado.carrera;

}

const editarAlumno=async()=>{
    var idalumno=document.querySelector("#idalumno").value;
    var numControl=document.querySelector("#enumControl").value;
    var nombre=document.querySelector("#enombre").value;
    var fechaNac=document.querySelector("#efechaNac").value;
    var grupo=document.querySelector("#egrupo").value;
    var carrera=document.querySelector("#ecarrera").value;

    if(numControl.trim()==='' ||
    nombre.trim()==='' ||
    fechaNac.trim()==='' ||
    grupo.trim()==='' ||
    carrera.trim()==='' ){
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'FALTA LLENAR CAMPOS',
            footer: 'CRUD ALUMNOS'
          })  
        return;       
    }

     // MODIFICAR EN LA BASE DE DATOS
     const datos=new FormData();
     datos.append("idalumno",idalumno);
     datos.append("numControl",numControl);
     datos.append("nombre",nombre);
     datos.append("fechaNac",fechaNac);
     datos.append("grupo",grupo);
     datos.append("carrera",carrera);
     
 
     var respuesta=await fetch("php/alumno/editarAlumno.php",{
         method:'POST',
         body:datos
     });
 
     var resultado=await respuesta.json();
     document.querySelector("#editarModal").click();
     if(resultado.success==true){        
         Swal.fire({
             icon: 'success',
             title: 'EXITO!',
             text: resultado.mensaje,
             footer: 'CRUD ALUMNOS'
           }) 
           document.querySelector("#formEditar").reset();
          
     }else{
         Swal.fire({
             icon: 'error',
             title: 'ERROR',
             text: resultado.mensaje,
             footer: 'CRUD ALUMNOS'
           }) 
     }     
     cargarAlumnos();

}