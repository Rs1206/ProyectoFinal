const usuario = JSON.parse(
    localStorage.getItem("usuarioActivo")
);

if(!usuario){
    window.location.href = "HTML/micuenta.html";
}

document.getElementById("nombre").textContent =
usuario.nombre;

document.getElementById("correo").textContent =
usuario.correo;


// CAMBIAR NOMBRE

document.getElementById("editarNombre")
.addEventListener("click", ()=>{

    const nuevoNombre = prompt(
        "Ingrese el nuevo nombre"
    );

    if(!nuevoNombre) return;

    let usuarios = JSON.parse(
        localStorage.getItem("usuarios")
    );

    const indice = usuarios.findIndex(
        u => u.correo === usuario.correo
    );

    usuarios[indice].nombre = nuevoNombre;

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

    usuario.nombre = nuevoNombre;

    localStorage.setItem(
        "usuarioActivo",
        JSON.stringify(usuario)
    );

    location.reload();

});


// CAMBIAR CONTRASEÑA

document.getElementById("cambiarContraseña")
.addEventListener("click", ()=>{

    const nuevaContraseña = prompt(
        "Ingrese la nueva contraseña"
    );

    if(!nuevaContraseña) return;

    let usuarios = JSON.parse(
        localStorage.getItem("usuarios")
    );

    const indice = usuarios.findIndex(
        u => u.correo === usuario.correo
    );

    usuarios[indice].contraseña =
    nuevaContraseña;

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

    alert(
        "Contraseña actualizada correctamente"
    );

});


// CERRAR SESIÓN

document.getElementById("cerrarSesion")
.addEventListener("click", ()=>{

    localStorage.removeItem(
        "usuarioActivo"
    );
    window.location.href ="index.html";

});