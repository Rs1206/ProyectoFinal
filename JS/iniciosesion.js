//declarando variables
let CajaInicioRegistro=document.querySelector(".CajaInicioRegistro")
let FormularioInicio=document.querySelector(".FormularioInicio")
let FormularioRegistro=document.querySelector(".FormularioRegistro")
let CajaTraseraInicio=document.querySelector(".CajaTraseraInicio")
let CajaTraseraRegistro=document.querySelector(".CajaTraseraRegistro")


function AnchoPagina(){
    if(window.innerWidth>850){
        CajaTraseraInicio.style.display = "block";
        CajaTraseraRegistro.style.display = "block";
    }
    else{
        CajaTraseraRegistro.style.display = "block";
        CajaTraseraRegistro.style.opacity = "1";
        CajaTraseraInicio.style.display = "none"
        FormularioInicio.style.display = "block"
        FormularioRegistro.style.display = "none"
        CajaInicioRegistro.style.left = "0px"
    }
}
function InicioSesion(){
    if(window.innerWidth>850){
        FormularioRegistro.style.display = "none";
        CajaInicioRegistro.style.left = "10px";
        FormularioInicio.style.display ="block";
        CajaTraseraRegistro.style.opacity ="1";
        CajaTraseraInicio.style.opacity ="0";
    }
    else{
        FormularioRegistro.style.display = "none";
        CajaInicioRegistro.style.left = "0px";
        FormularioInicio.style.display ="block";
        CajaTraseraRegistro.style.display ="block";
        CajaTraseraInicio.style.display ="none";
    }
}
function Registro(){
    if(window.innerWidth>850){
        FormularioRegistro.style.display = "block";
        CajaInicioRegistro.style.left = "410px";
        FormularioInicio.style.display ="none";
        CajaTraseraRegistro.style.opacity ="0";
        CajaTraseraInicio.style.opacity ="1";
    }
    else{
        FormularioRegistro.style.display = "block";
        CajaInicioRegistro.style.left = "0px";
        FormularioInicio.style.display ="none";
        CajaTraseraRegistro.style.display ="none";
        CajaTraseraInicio.style.display ="block";
        CajaTraseraInicio.style.opacity ="1";
    }
    
}
document.getElementById("botonRegistrarse").addEventListener("click", Registro)
document.getElementById("botonInicioSesion").addEventListener("click", InicioSesion)
window.addEventListener("resize", AnchoPagina)
AnchoPagina()

FormularioRegistro.addEventListener("submit", function(e){
    e.preventDefault();

    const nombre = document.getElementById("nombreRegistro").value;
    const correo = document.getElementById("correoRegistro").value;
    const contraseña = document.getElementById("contraseñaRegistro").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = usuarios.some(u => u.correo === correo);

    if (existe) {
        alert("Este usuario ya existe");
        return;
    }

    usuarios.push({
        nombre,
        correo,
        contraseña
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuario registrado correctamente");

    FormularioRegistro.reset();
});

FormularioInicio.addEventListener("submit", function(e){
    e.preventDefault();

    const correo = document.getElementById("correoInicio").value;
    const contraseña = document.getElementById("contraseñaInicio").value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.find(
        u => u.correo === correo && u.contraseña === contraseña
    );

    if (usuario) {

    localStorage.setItem(
        "usuarioActivo",
        JSON.stringify(usuario)
    );

    alert("Bienvenido " + usuario.nombre);

    window.location.href = "../index.html";

    } else {
    // verificar si el correo existe
    const existeCorreo = usuarios.some(u => u.correo === correo);

    if (existeCorreo) {
        alert("Contraseña incorrecta");
    } else {
        alert("El usuario no está registrado");
    }
    }

    FormularioInicio.reset();
});

document.getElementById("recuperarContraseña").addEventListener("click", function(e){
    e.preventDefault();

    const correo = prompt("Ingresa tu correo:");

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const indice = usuarios.findIndex(u => u.correo === correo);

    if(indice !== -1){

        const nuevaContraseña = prompt("Ingresa tu nueva contraseña:");

        if(nuevaContraseña){

            usuarios[indice].contraseña = nuevaContraseña;

            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            alert("Contraseña actualizada correctamente.");
        }

    }else{
        alert("No existe una cuenta registrada con ese correo.");
    }
});