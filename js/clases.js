class Cliente{

    constructor(nombre, telefono, correo, web){

        this.nombre = nombre;
        this.telefono = telefono;
        this.correo = correo;
        this.web= web;
    }
}

class Empleado{
    
    constructor(nombre, telefono, salario){
        
        this.nombre = nombre;
        this.telefono = telefono;
        this.salario = salario;
    }
}

class Proyecto{

    constructor(nombre, descripcion, areaTematica, cliente, lider){
        
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.areaTematica = areaTematica;
        this.cliente = cliente;
        this.lider = lider;
        this.empleadosAsignados = [];
    }

    asignarEmpleado(empleado){
        this.empleadosAsignados.push(empleado);
    }

    quitarEmpleado(empleado){
        let lista = [];
        for (let i = 0; i < this.empleadosAsignados.length; i++) {
            if(this.empleadosAsignados[i] != empleado){
                lista.push(this.empleadosAsignados[i]);
            }
        }
        this.empleadosAsignados = lista; 
    }
    
}

class Sistema{

    constructor(){
        this.listaClientes = [];
        this.listaEmpleados = [];
        this.listaProyectos = [];
    }

    //Getters
    obtenerClientes(){
        return this.listaClientes;
    }
    obtenerEmpleados(){
        return this.listaEmpleados;
    }
    obtenerProyectos(){
        return this.listaProyectos;
    }

    //Setters
    agregarCliente(cliente){
        this.listaClientes.push(cliente);
    }
    agregarEmpleado(empleado){
        this.listaEmpleados.push(empleado);
    }
    agregarProyecto(proyecto){
        this.listaProyectos.push(proyecto);
    }

    //Mostrar clientes ordenados por nombre
    mostrarClientesOrdenNombre(){
        return this.listaClientes.sort
    }
}