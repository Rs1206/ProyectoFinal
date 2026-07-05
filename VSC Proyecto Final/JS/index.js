const botonesContacto = document.querySelectorAll(".btnContacto");
const modalContacto = document.getElementById("modalContacto");
const cerrar = document.getElementById("cerrarModal");


botonesContacto.forEach(boton => {
    boton.addEventListener("click", (e) => {
        e.preventDefault();
        modalContacto.style.display = "flex";
    });
});

if(cerrar){

    cerrar.addEventListener("click", ()=>{

        modalContacto.style.display = "none";

    });

}

window.addEventListener("click",(e)=>{

    if(e.target === modalContacto){

        modalContacto.style.display = "none";

    }

});

const buscador = document.getElementById("buscador");

if(buscador){

    buscador.addEventListener("keyup", () => {

        const texto = buscador.value.toLowerCase();

        document.querySelectorAll(".card").forEach(producto => {

            const nombre =
            producto
            .querySelector("h3")
            .textContent
            .toLowerCase();

            producto.style.display =
            nombre.includes(texto)
            ? ""
            : "none";

        });

    });

}
const usuarioActivo = JSON.parse(
localStorage.getItem("usuarioActivo")
);

const cuentaNav =
document.getElementById("cuentaNav");

if(cuentaNav && usuarioActivo){

    cuentaNav.textContent =
    usuarioActivo.nombre;

    cuentaNav.href =
    "HTML/micuenta.html";

}

let carrito = [];

const botones =
document.querySelectorAll(".card button");

const lista =
document.getElementById("lista");

const totalHTML =
document.getElementById("total");

const comprar =
document.getElementById("comprar");

const contador =
document.getElementById("contadorCarrito");

const mensaje =
document.createElement("div");

mensaje.classList.add("mensaje");

const carritoFloat =
document.querySelector(".carrito-float");

if(carritoFloat){

    document.body.appendChild(mensaje);

}
botones.forEach((boton)=>{

    boton.addEventListener("click",()=>{

        const card =
        boton.parentElement;

        const nombre =
        card.querySelector("h3")
        .innerText;

        const precio = Number(

            card
            .querySelector(".price")
            .innerText
            .replace("$","")
            .replace(/\./g,"")

        );

        const existe =
        carrito.find(

            item =>
            item.nombre === nombre

        );

        if(existe){

            existe.cantidad++;

        }
        else{

            carrito.push({

                nombre,
                precio,
                cantidad:1

            });

        }

        actualizar();

    });

});
function actualizar(){

    if(!lista || !totalHTML)
    return;

    lista.innerHTML = "";

    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach(item=>{

        total +=
        item.precio *
        item.cantidad;

        cantidadTotal +=
        item.cantidad;

        lista.innerHTML += `

        <div class="item">

            <div>
                ${item.cantidad} × ${item.nombre}
            </div>

            <div>
                $${(
                item.precio *
                item.cantidad
                ).toLocaleString()}
            </div>

        </div>

        `;

    });

    totalHTML.innerText =
    "$" +
    total.toLocaleString();

    if(contador){

        contador.innerText =
        cantidadTotal;

    }

}
const modalCarrito =
document.getElementById(
"modalCarrito"
);

const abrirCarrito =
document.getElementById(
"abrirCarrito"
);

const cerrarCarrito =
document.getElementById(
"cerrarCarrito"
);

if(abrirCarrito){

    abrirCarrito.addEventListener(
    "click",
    ()=>{

        modalCarrito.style.display =
        "flex";

    }
    );

}

if(cerrarCarrito){

    cerrarCarrito.addEventListener(
    "click",
    ()=>{

        modalCarrito.style.display =
        "none";

    }
    );

}

window.addEventListener(
"click",
(e)=>{

    if(
    e.target === modalCarrito
    ){

        modalCarrito.style.display =
        "none";

    }

});
// ==========================
// FACTURA
// ==========================

let metodoSeleccionado = "";

const metodosPago =
document.querySelectorAll(".metodo-pago");

const modalFactura =
document.getElementById("modalFactura");

const contenidoFactura =
document.getElementById("contenidoFactura");

const cerrarFactura =
document.getElementById("cerrarFactura");

metodosPago.forEach((boton)=>{

    boton.addEventListener("click",()=>{

        metodosPago.forEach((b)=>{
            b.classList.remove("activo");
        });

        boton.classList.add("activo");

        metodoSeleccionado =
        boton.textContent;

    });

});

if(cerrarFactura){

    cerrarFactura.addEventListener("click",()=>{

        modalFactura.style.display="none";

    });

}

// ==========================
// COMPRAR
// ==========================

if(comprar){

    comprar.addEventListener("click",()=>{

        if(carrito.length === 0){

            mensaje.innerHTML =
            "🛒 Tu carrito está vacío";

            mensaje.classList.add("mostrar");

            return;
        }

        if(metodoSeleccionado === ""){

            mensaje.innerHTML =
            "⚠️ Selecciona un método de pago";

            mensaje.classList.add("mostrar");

            return;
        }

        let filas = "";
        let total = 0;

        carrito.forEach(item=>{

            const subtotal =
            item.precio * item.cantidad;

            total += subtotal;

            filas += `
            <tr>
                <td>${item.nombre}</td>
                <td>${item.cantidad}</td>
                <td>$${subtotal.toLocaleString()}</td>
            </tr>
            `;

        });

        contenidoFactura.innerHTML = `

        <p><strong>Fecha:</strong>
        ${new Date().toLocaleString()}
        </p>

        <p><strong>Método de pago:</strong>
        ${metodoSeleccionado}
        </p>

        <table class="factura-tabla">

            <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
            </tr>

            ${filas}

        </table>

        <div class="total-factura">

            Total:
            $${total.toLocaleString()}

        </div>

        `;

        if(modalFactura){

            modalFactura.style.display =
            "flex";

        }

    });

}

function abrirModal(tipo){

    const titulo=document.getElementById("titulo");
    const texto=document.getElementById("texto");

    if(tipo=="envios"){

        titulo.innerHTML="Políticas de Envíos";

        texto.innerHTML=
        `• Realizamos envíos a todo Colombia.<br><br>

        • El tiempo estimado de entrega es de 2 a 5 días hábiles.<br><br>

        • Los pedidos comienzan a prepararse una vez confirmado el pago.<br><br>

        • El cliente recibirá un número de guía para rastrear el envío.<br><br>

        • Los costos de envío se calculan antes de finalizar la compra.`;
    }

    else if(tipo=="cambios"){

        titulo.innerHTML="Políticas de Cambios";

        texto.innerHTML=
        `• Los cambios pueden solicitarse dentro de los primeros 15 días después de recibir el producto.<br><br>

        • El artículo debe estar sin usar y en perfecto estado.<br><br>

        • Debe conservar sus etiquetas y empaque original.<br><br>

        • Los gastos de envío por cambio dependerán del motivo de la solicitud.`;
    }
        
    else if(tipo=="contacto"){

        titulo.innerHTML="Contáctanos";

        texto.innerHTML=`
        Bogota, Cundinamarca<br><br>

        +57 300 123 4567<br><br>

        insanos@gmail.com<br><br>

        Horario de atención:<br>
        Lunes a Sábado<br>
        9:00 a.m. - 6:00 p.m.
        `;
    }

    else if(tipo=="preguntas"){

        titulo.innerHTML="Preguntas Frecuentes";

        texto.innerHTML=`
        <strong>¿Las camisetas son nuevas?</strong><br>
        Sí, todos nuestros productos son nuevos.<br><br>

        <strong>¿Cuánto tarda el envío?</strong><br>
        Entre 2 y 5 días hábiles.<br><br>

        <strong>¿Puedo cambiar una camiseta?</strong><br>
        Sí, dentro del plazo establecido en nuestras políticas de cambios.
        `;
    }

    else{

        titulo.innerHTML="Políticas de Devoluciones";

        texto.innerHTML=
        `• Se aceptan devoluciones únicamente por productos defectuosos o errores en el pedido.<br><br>

        • La solicitud debe realizarse dentro de los primeros 5 días posteriores a la entrega.<br><br>

        • Una vez aprobado el caso, el reembolso se realizará por el mismo medio de pago.<br><br>

        • El proceso de devolución puede tardar entre 5 y 10 días hábiles.`;
    }

    document.getElementById("modalPoliticas").style.display="flex";
}

function cerrarModal(){

    document.getElementById("modalPoliticas").style.display="none";
}

window.onclick=function(e){

    const modal=document.getElementById("modalPoliticas");

    if(e.target==modal){

        cerrarModal();
    }
}
