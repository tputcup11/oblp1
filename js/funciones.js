window.addEventListener('load',inicio);
//Inicializar objeto sistema
var sistema = new Sistema()
var qrcode = new QRCode(document.getElementById("qrcode"), {
    width : 100,
    height : 100
});

function inicio(){

    //Esperar click en botones
    document.getElementById("btnRegistrarCliente").addEventListener('click', registrarCliente);
    document.getElementById("btnRegistrarEmpleado").addEventListener('click', registrarEmpleado);
    document.getElementById("btnRegistrarProyecto").addEventListener('click', registrarProyecto);
    document.getElementById("btnAsignarProyecto").addEventListener('click', asignarEmpleadoProyecto);
    document.getElementById("btnEliminarProyecto").addEventListener('click', eliminarEmpleadoProyecto);
    document.getElementById("min_checkbox").addEventListener('change', consultaPersonas);
    document.getElementById("max_checkbox").addEventListener('change', consultaPersonas);
    document.getElementById("btnConsultarDescripcion").addEventListener('click', consultarDescripcion);
    document.getElementById("btnGenerarQR").addEventListener('click', generarQR);
    document.getElementById("proyectoAsignacionProyecto").addEventListener('change', listarEmpleadosSinProyecto);
    document.getElementById("proyectoEliminarProyecto").addEventListener('change', listarEmpleadosConProyecto);

}

function registrarCliente(){
    if(document.getElementById("formCliente").reportValidity()){
        let nombre = document.getElementById("nombreCliente").value;
        let telefono = document.getElementById("telefonoCliente").value;
        let correo = document.getElementById("correoCliente").value;
        let web = document.getElementById("webCliente").value;

        let cliente = new Cliente(nombre, telefono, correo, web);
        sistema.agregarCliente(cliente);
        actualizarHTML();
        document.getElementById("formCliente").reset()
    }
}

function registrarEmpleado(){
    if(document.getElementById("formEmpleado").reportValidity()){
    let nombre = document.getElementById("nombreEmpleado").value;
    let telefono = document.getElementById("telefonoEmpleado").value;
    let salario = document.getElementById("salarioEmpleado").value;

    let empleado = new Empleado(nombre, telefono, salario);
    
    sistema.agregarEmpleado(empleado);
    actualizarHTML();
    document.getElementById("formEmpleado").reset()
    }
}

function registrarProyecto(){
    let nombre = document.getElementById("nombreRegistroProyecto").value;
    let descripcion = document.getElementById("descripcionRegistroProyecto").value;
    let areaTematica = document.getElementById("areaRegistroProyecto").value;
    let cliente = document.getElementById("clienteRegistroProyecto").value;
    let lider = document.getElementById("liderRegistroProyecto").value;

    let proyecto = new Proyecto(nombre, descripcion, areaTematica, cliente, lider);

    sistema.agregarProyecto(proyecto);
    document.getElementById("formProyecto").reset();
    actualizarHTML();
}

function asignarEmpleadoProyecto(){
    nombreProyecto = document.getElementById("proyectoAsignacionProyecto").value;
    nombreEmpleado = document.getElementById("empleadoAsignacionProyecto").value;
    
    for (proyecto of sistema.obtenerProyectos()){
        if (proyecto.nombre == nombreProyecto){
            proyecto.asignarEmpleado(nombreEmpleado); 
        }
    }
    actualizarHTML();
}

function eliminarEmpleadoProyecto(){
    nombreProyecto = document.getElementById("proyectoEliminarProyecto").value;
    nombreEmpleado = document.getElementById("empleadoEliminarProyecto").value;
    
    for (proyecto of sistema.obtenerProyectos()){
        if (proyecto.nombre == nombreProyecto){
            proyecto.quitarEmpleado(nombreEmpleado);
        }
    }
    actualizarHTML();
}

function listarEmpleadosSinProyecto(){
    let proyecto = document.getElementById("proyectoAsignacionProyecto").value;
    let empleados = sistema.obtenerEmpleados()
    let comb_emplSinProyecto = document.getElementById("empleadoAsignacionProyecto");
    comb_emplSinProyecto.innerHTML="";

    for (proy of sistema.obtenerProyectos()){
        if(proy.nombre == proyecto){

            for (emp of empleados){

                if(!(proy.empleadosAsignados.includes(emp.nombre)) && proy.lider != emp.nombre){
                    
                    let nodoComb = document.createElement("option");
		            let nodoTextoComb = document.createTextNode(emp.nombre);
                    nodoComb.appendChild(nodoTextoComb);
                    comb_emplSinProyecto.appendChild(nodoComb); 
                }
            }
        }
    } 
}

function listarEmpleadosConProyecto(){
    let proyecto = document.getElementById("proyectoEliminarProyecto").value;

    let empleados = sistema.obtenerEmpleados();

    let comb_emplConProyecto = document.getElementById("empleadoEliminarProyecto");

    comb_emplConProyecto.innerHTML ="";

    for(proy of sistema.obtenerProyectos()){
        if (proy.nombre == proyecto){

            for (empl of empleados){

                if( (empl.nombre != proy.lider) && proy.empleadosAsignados.includes(empl.nombre)){

                    let nodoComb = document.createElement("option");
                    let nodoTextoComb = document.createTextNode(empl.nombre);
                    nodoComb.appendChild(nodoTextoComb);
                    comb_emplConProyecto.appendChild(nodoComb); 
                }
            }
        }
    }
}

function consultaPersonas(){
    let checkbox = document.getElementById("min_checkbox");
    let li_maxMin = document.getElementById("olMaximoMinimo");
    let listaProyectos = sistema.obtenerProyectos();
    let p_cantidadPersonas = document.getElementById("pCantidadPersonas");
    li_maxMin.innerHTML = "";
    if(checkbox.checked){
        //BUSCAR MINIMO Y PEGAR EN PARRAFO
        let contadorEmpleados = 0;
        for (proy of listaProyectos){

            //1st loop
            if (contadorEmpleados == 0){
                contadorEmpleados = proy.empleadosAsignados.length + 1;
            }

            if ( (proy.empleadosAsignados.length + 1)  < contadorEmpleados){
                li_maxMin.innerHTML = "";
                contadorEmpleados = proy.empleadosAsignados.length + 1;
                let nodoLI = document.createElement("LI");
                nodoLI.innerHTML = "Proyecto: "+ proy.nombre +" Lider: "+proy.lider;
                li_maxMin.appendChild(nodoLI);
            }else if ( (proy.empleadosAsignados.length + 1) == contadorEmpleados ){
                let nodoLI = document.createElement("LI");
                nodoLI.innerHTML = "Proyecto: "+ proy.nombre +" Lider: "+proy.lider;
                li_maxMin.appendChild(nodoLI);
            }
        }
        p_cantidadPersonas.innerHTML = "Cantidad Personas: "+contadorEmpleados;
    }else{
        //BUSCAR MAXIMO Y PEGAR EN PARRAFO
        li_maxMin.innerHTML = "";
        let contadorEmpleados = 0;
        for (proy of listaProyectos){

            //1st loop
            if (contadorEmpleados == 0){
                contadorEmpleados = proy.empleadosAsignados.length + 1;
            }

            if ( (proy.empleadosAsignados.length + 1) > contadorEmpleados){
                li_maxMin.innerHTML = "";
                contadorEmpleados = proy.empleadosAsignados.length + 1;
                let nodoLI = document.createElement("LI");
                nodoLI.innerHTML = "Proyecto: "+ proy.nombre +" Lider: "+proy.lider;
                li_maxMin.appendChild(nodoLI);
            }else if ( (proy.empleadosAsignados.length + 1) == contadorEmpleados ){
                let nodoLI = document.createElement("LI");
                nodoLI.innerHTML = "Proyecto: "+ proy.nombre +" Lider: "+proy.lider;
                li_maxMin.appendChild(nodoLI);
            }
        }
        p_cantidadPersonas.innerHTML = "Cantidad Personas: "+contadorEmpleados;

    }


}

function consultarDescripcion(){
    let secuencia = document.getElementById("secuenciaConsultaDescripcion").value
    secuencia = secuencia.toUpperCase();
    let listaProyectos = sistema.obtenerProyectos();
    let li_consultaDescripcion = document.getElementById("listaConsultaDescripcion");
    li_consultaDescripcion.innerHTML = ""
    for (proy of listaProyectos){

        let descripcion = proy.descripcion;
        descripcion = descripcion.toUpperCase();
        let i = 0;
        let j = 0;
        let salir = false;
        while ( i < secuencia.length && salir == false){

            if(secuencia.charAt(i) != "*"){

                if (descripcion.includes(secuencia.charAt(i))){

                    j = descripcion.indexOf(secuencia.charAt(i));
                    while ( (j < descripcion.length) && (i < secuencia.length) && (salir == false)){
                        
                        if(secuencia.charAt(i) != "*"){
                            if(descripcion.charAt(j) != secuencia.charAt(i)){
                                salir = true;
                            }
                        }
                        i++;
                        j++;
                    }
                    if(!salir){
                        let nodoLi = document.createElement("li");
                        let textonodoLi = document.createTextNode(proy.nombre+" - "+proy.descripcion)
                        nodoLi.appendChild(textonodoLi);
                        li_consultaDescripcion.appendChild(nodoLi);
                        salir = true;
                    }      
                }else{
                    salir = true;
                }
            }
            i++;
        }
    }
    document.getElementById("formSecuencia").reset();
}

function generarQR(){
    let listaClientes = sistema.obtenerClientes();
    let cliente = document.getElementById("SeleccionEmpresa").value;
    let contenido = "";
    for(elemento of listaClientes){
        if (elemento.nombre == cliente){
            contenido = "Nombre:"+elemento.nombre+"; Teléfono:"+elemento.telefono+"; Correo:"+elemento.correo+"; Web:"+elemento.web;
        }
    }
    if (contenido != ""){
        document.getElementById("qrcode").innerHTML = "";
        qrcode = new QRCode(document.getElementById("qrcode"), {
            text : contenido,
            width : 100,
            height : 100
        });
    }else{
        alert("No hay empresa seleccionada");
    }
}

function actualizarHTML(){
    //Se cargan todas las listas y elementos necesarios
    let listaClientes = sistema.obtenerClientes();
    let listaEmpleados = sistema.obtenerEmpleados();
    let listaProyectos = sistema.obtenerProyectos();

    let li_clientes = document.getElementById("liClientes");
    let comb_clientes = document.getElementById("clienteRegistroProyecto");
    let comb_clientes2 = document.getElementById("SeleccionEmpresa");
    let comb_empleado = document.getElementById("liderRegistroProyecto");
    let tabla_empleados = document.getElementById("tablaEmpleados");
    let comb_proyectos = document.getElementById("proyectoAsignacionProyecto");
    let comb_proyectos2 = document.getElementById("proyectoEliminarProyecto");

    //Limpio los elementos antes de actualizarlos
    li_clientes.innerHTML="";
    comb_clientes.innerHTML="";
    comb_clientes2.innerHTML="";
    comb_empleado.innerHTML="";
    tabla_empleados.innerHTML="";
    comb_proyectos.innerHTML="";
    comb_proyectos2.innerHTML="";

    
    //Cargar Info Clientes
    for (elemento of listaClientes){

        let nodoLI = document.createElement("LI");
        nodoLI.innerHTML = elemento.nombre+" - "+"<a href='http://"+elemento.web+"' target='_blank'>"+elemento.web+"</a>";
        li_clientes.appendChild(nodoLI);
    }
    
	for (elemento of listaClientes){

        let nodoComb = document.createElement("option");
		let nodoTextoComb = document.createTextNode(elemento.nombre);
        nodoComb.appendChild(nodoTextoComb);
        comb_clientes.appendChild(nodoComb);
    }

    for (elemento of listaClientes){

        let nodoComb = document.createElement("option");
		let nodoTextoComb = document.createTextNode(elemento.nombre);
        nodoComb.appendChild(nodoTextoComb);
        comb_clientes2.appendChild(nodoComb);

    }

    //Cargar Info Empleados
        //Header Tabla
    let theaderfila = document.createElement("tr");
    let theadercelda1 = document.createElement("td");
    let theadercelda2 = document.createElement("td");
    let theadercelda3 = document.createElement("td");
    let theadercelda4 = document.createElement("td");
    let theaderTexto1 = document.createTextNode("Nombre");
    let theaderTexto2 = document.createTextNode("Salario");
    let theaderTexto3 = document.createTextNode("Cantidad");
    let theaderTexto4 = document.createTextNode("Estado");
    theadercelda1.appendChild(theaderTexto1);
    theadercelda2.appendChild(theaderTexto2);
    theadercelda3.appendChild(theaderTexto3);
    theadercelda4.appendChild(theaderTexto4);
    theaderfila.appendChild(theadercelda1);
    theaderfila.appendChild(theadercelda2);
    theaderfila.appendChild(theadercelda3);
    theaderfila.appendChild(theadercelda4);
    tabla_empleados.appendChild(theaderfila);

        //Filas Tabla
    for (elemento of listaEmpleados){

        let contadorProyectos = 0;
        let nodoComb = document.createElement("option");
		let nodoTextoComb = document.createTextNode(elemento.nombre);
        nodoComb.appendChild(nodoTextoComb);
        comb_empleado.appendChild(nodoComb);

        for(proy of sistema.obtenerProyectos()){
    
            if(proy.empleadosAsignados.includes(elemento.nombre) || proy.lider === elemento.nombre){
                contadorProyectos ++;
            }
        }

        let fila = document.createElement("tr"); //Fila
        let celda1 = document.createElement("td"); //Celda Nombre
        celda1.setAttribute("class", "td-nombre");
        let celda2 = document.createElement("td"); //Celda Salario
        let celda3 = document.createElement("td"); //Celda Cantidad
        let celda4 = document.createElement("td"); //Celda Imagen
        if(contadorProyectos <= 3){
            celda4.innerHTML = "<img src='img/semaforoverde.png' class='semaforo'>";
        }else if(contadorProyectos == 4 || contadorProyectos == 5){
            celda4.innerHTML = "<img src='img/semaforoamarillo.png' class='semaforo'>";
        }else{
            celda4.innerHTML = "<img src='img/semafororojo.png' class='semaforo'>";
        }
        let textocelda1 = document.createTextNode(elemento.nombre);
        let textocelda2 = document.createTextNode(elemento.salario);
        let textocelda3 = document.createTextNode(contadorProyectos);
        celda1.appendChild(textocelda1);
        celda2.appendChild(textocelda2);
        celda3.appendChild(textocelda3);
        fila.appendChild(celda1);
        fila.appendChild(celda2);
        fila.appendChild(celda3);
        fila.appendChild(celda4);
        tabla_empleados.appendChild(fila);

    }

    //Cargar Info Proyectos
    for (elemento of listaProyectos){
        let nodoComb = document.createElement("option");
		let nodoTextoComb = document.createTextNode(elemento.nombre);
        nodoComb.appendChild(nodoTextoComb);
        comb_proyectos.appendChild(nodoComb);
    }
    for (elemento of listaProyectos){
        let nodoComb = document.createElement("option");
		let nodoTextoComb = document.createTextNode(elemento.nombre);
        nodoComb.appendChild(nodoTextoComb);
        comb_proyectos2.appendChild(nodoComb);
    }
//Encontrar área temática más frecuente.
    let cont = [0,0,0,0,0];
    let areasfrecuentes = document.getElementById("tematicasFrecuentes");
    for (elemento of listaProyectos){
        if(elemento.areaTematica == "1 - Big Data"){
            cont[1] = cont[1]+1;
        }
        if(elemento.areaTematica == "2 - Machine learning"){
            cont[2] = cont[2]+1;
        }
        if (elemento.areaTematica == "3 - IoT"){
            cont[3] = cont[3]+1;
        }
        if (elemento.areaTematica == "4 - Data Analysis"){
            cont[4] = cont[4]+1;
        }
        if (elemento.areaTematica == "5 - Otros"){
            cont[5] = cont[5]+1;
        }
    }

    if(cont[1] == cont[2] == cont[3] == cont[4] == cont[5]){
        areasfrecuentes.innerHTML = "1 - Big Data : "+contOrd[1]+" 2 - Machine learning: "+contOrd[2]+"3 - IoT: "+contOrd[3]+"4 - Data Analysis: "+contOrd[4]+"5 - Otros: "
    }
 
    listarEmpleadosSinProyecto();
    listarEmpleadosConProyecto();
    consultaPersonas();
}