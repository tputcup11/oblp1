window.addEventListener('load',inicio);
//Inicializar objeto sistema
var sistema = new Sistema()

function inicio(){

    //Esperar click en botones
    document.getElementById("btnRegistrarCliente").addEventListener('click', registrarCliente);
    document.getElementById("btnRegistrarEmpleado").addEventListener('click', registrarEmpleado);
    document.getElementById("btnRegistrarProyecto").addEventListener('click', registrarProyecto);
    document.getElementById("btnAsignarProyecto").addEventListener('click', asignarEmpleadoProyecto);
    document.getElementById("btnEliminarProyecto").addEventListener('click', eliminarEmpleadoProyecto);
    //TO-DO No se bien como poner el radius button 
    document.getElementById("btnConsultarDescripcion").addEventListener('click', consultarDescripcion);
    document.getElementById("btnGenerarQR").addEventListener('click', generarQR);
}

function registrarCliente(){
    let nombre = document.getElementById("nombreCliente").value;
    let telefono = document.getElementById("telefonoCliente").value;
    let correo = document.getElementById("correoCliente").value;
    let web = document.getElementById("webCliente").value;

    let cliente = new Cliente(nombre, telefono, correo, web);
    sistema.agregarCliente(cliente);
    actualizarHTML();
    document.getElementById("formCliente").reset()
}

function registrarEmpleado(){
    let nombre = document.getElementById("nombreEmpleado").value;
    let telefono = document.getElementById("telefonoEmpleado").value;
    let salario = document.getElementById("salarioEmpleado").value;

    let empleado = new Empleado(nombre, telefono, salario);
    
    sistema.agregarEmpleado(empleado);
    actualizarHTML();
    document.getElementById("formEmpleado").reset()
}

function registrarProyecto(){
    let nombre = document.getElementById("nombreRegistroProyecto").value;
    let descripcion = document.getElementById("descripcionRegistroProyecto").value;
    let areaTematica = document.getElementById("areaRegistroProyecto").value;
    let cliente = document.getElementById("clienteRegistroProyecto").value;
    let lider = document.getElementById("liderRegistroProyecto").value;

    let proyecto = new Proyecto(nombre, descripcion, areaTematica, cliente, lider);

    sistema.agregarProyecto(proyecto);
    actualizarHTML();
}

function asignarEmpleadoProyecto(){
    //TO-DO Usando el nombre del empleado, buscar en la lista de empleados el objeto del mismo y agregarlo a la lista de empleados asignados del proyecto seleccionado
    nombreProyecto = document.getElementById("proyectoAsignacionProyecto").value;
    nombreEmpleado = document.getElementById("empleadoAsignacionProyecto").value;
    
    for (empl of sistema.obtenerEmpleados()){
        if (empl.nombre = nombreEmpleado){
            let empleado = empleado;
        }
    }

    for (proyecto of sistema.obtenerProyectos()){
        if (proyecto.nombre = nombreProyecto){
            proyecto.asignarEmpleado(empleado); 
        }
    }
}

function eliminarEmpleadoProyecto(){
    //TO-DO Buscar el objeto del empleado asignado en la lista 
}

function consultarDescripcion(){

}

function generarQR(){

}

function actualizarHTML(){
    //Se cargan todos las listas y elementos necesarios
    let listaClientes = sistema.obtenerClientes();
    let listaEmpleados = sistema.obtenerEmpleados();
    let listaProyectos = sistema.obtenerProyectos();
    let li_clientes = document.getElementById("liClientes");
    let comb_clientes = document.getElementById("clienteRegistroProyecto");
    let comb_clientes2 = document.getElementById("SeleccionEmpresa");
    let comb_empleado = document.getElementById("liderRegistroProyecto");
    let tabla_empleados = document.getElementById("tablaEmpleados");
    //Limpio los elementos antes de actualizarlos
    li_clientes.innerHTML="";
    comb_clientes.innerHTML="";
    comb_clientes2.innerHTML="";
    comb_empleado.innerHTML="";
    tabla_empleados.innerHTML="";
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
    
    for (elemento of listaEmpleados){
        
        let nodoComb = document.createElement("option");
		let nodoTextoComb = document.createTextNode(elemento.nombre);
        nodoComb.appendChild(nodoTextoComb);
        comb_empleado.appendChild(nodoComb);

        let fila = document.createElement("tr");
        let celda1 = document.createElement("td");
        let celda2 = document.createElement("td");

        let textocelda1 = document.createTextNode(elemento.nombre);
        let textocelda2 = document.createTextNode(elemento.salario);

        celda1.appendChild(textocelda1);
        celda2.appendChild(textocelda2);

        fila.appendChild(celda1);
        fila.appendChild(celda2);
        tabla_empleados.appendChild(fila);
    }

}