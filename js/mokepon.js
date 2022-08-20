const contenedorTarjetas = document.getElementById('cards-container')
const seccionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const seccionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById("btn-seleccionar-mascota")
const contenedorAtaques = document.getElementById("contenedor-ataques")

const mapaSection = document.getElementById("mapa-juego")
const mapaCanvas = document.getElementById("mapa-canvas")

const botonReiniciar = document.getElementById("boton-reiniciar")

const seccionSeleccionarMascota = document.getElementById('seleccionar-mascota')

const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanAtaqueSeleccionado = document.getElementById('ataque-seleccionado')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const combatResult = document.getElementById('resultado-combate')
const ataquesEjecutados = document.getElementById('ataques-jugador')
const mostrarResultadoCombateHTML = document.getElementById('resultado-secuencia-combate')
const ataquesEnemigoHTML = document.getElementById('ataques-enemigo')

const seccionAtaques = document.getElementById('seccion-ataques')

let jugadorId = null;
let mascotas = [];
let mascotaJugador;
let nombreMascotaSeleccionada;
let lienzo = mapaCanvas.getContext("2d")
let imagenMascota;
let ataquesMascota;
let coleccionAtaques = [];
let mokeponesSalvajes = [];
let nuevoEnemigo = null;
let ataqueEnemigo = [];
let arregloAtaqueEnemigo = [];
let ataquesMokeponEnemigo;
let shuffled;
let triunfosJugador = 0;
let triunfosEnemigo = 0;
let resultadoCombate;
let vidasJugador = 0;
let vidasEnemigo = 0;
let botonAgua;
let botonFuego;
let botonTierra;
let botones = {}
let secuenciaAtaqueJugador = [];
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let intervalo;
let mapBackground = new Image();
mapBackground.src = './assets/mokemap.webp';
let alturaDeseada;
let anchoMapa;
const anchoMaximoMapa = 500;


console.log(window.innerWidth)
if (window.innerWidth < 550){
    anchoMapa = window.innerWidth - 40
} else {
    anchoMapa = anchoMaximoMapa - 20
}

alturaDeseada = anchoMapa * 600/800

mapaCanvas.width = anchoMapa
mapaCanvas.height = alturaDeseada

class Mokepon {
    constructor(name, id, life, img, imgFight, x = 20, y = 30) {
        this.name = name,
        this.id = id,
        this.life = life,
        this.img = img,
        this.ataques = [],
        this.x = x,
        this.y = y,
        this.width = 80,
        this.height = 80,
        this.mapaCanvasImg = new Image(),
        this.mapaCanvasImg.src = imgFight,
        this.speedX = 0,
        this.speedY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaCanvasImg,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
}

let hipodoge = new Mokepon(
    "Hipodoge",
    "Hipodoge",
    5,
    './assets/mokepons_mokepon_hipodoge_attack.webp',
    './assets/hipodoge.webp'
)
let capipepo = new Mokepon(
    "Capipepo",
    "Capipepo",
    5,
    './assets/mokepons_mokepon_capipepo_attack.webp',
    './assets/capipepo.webp'
)
let ratigueya = new Mokepon(
    "Ratigueya",
    "Ratigueya",
    5,
    './assets/mokepons_mokepon_ratigueya_attack.webp',
    './assets/ratigueya.webp'
)


const HIPODOGE_ATAQUES = [
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
]

const CAPIPEPO_ATAQUES = [
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
]

const RATIGUEYA_ATAQUES = [
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)

capipepo.ataques.push(...CAPIPEPO_ATAQUES)

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

// hipodogeSalvaje.ataques.push(...HIPODOGE_ATAQUES)

// capipepoSalvaje.ataques.push(...CAPIPEPO_ATAQUES)

// ratigueyaSalvaje.ataques.push(...RATIGUEYA_ATAQUES)

mascotas.push(hipodoge, capipepo, ratigueya)
console.log(mascotas)

// mokeponesSalvajes.push(hipodogeSalvaje, capipepoSalvaje, ratigueyaSalvaje)

botonMascotaJugador.disabled = true

function iniciarJuego(){
    seccionSeleccionarAtaque.style.display = 'none'
    seccionReiniciar.style.display = 'none'
    mapaSection.style.display = 'none'

    unirseAlJuego()

    mascotas.forEach((mascota) => {
        let opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mascota.name}>
        <label class="tarjeta-de-mokepon" for=${mascota.name}>
        <p>${mascota.name}</p>
        <img src=${mascota.img} alt=${mascota.name}>
        </label>
        `

        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodoge = document.getElementById("Hipodoge")
        inputCapipepo = document.getElementById("Capipepo")
        inputRatigueya = document.getElementById("Ratigueya")
    
    })

    inputHipodoge.addEventListener("click", playAbled)
    inputCapipepo.addEventListener("click", playAbled)
    inputRatigueya.addEventListener("click", playAbled)

    function playAbled() {
        if ((inputHipodoge.checked) ||  (inputCapipepo.checked) || (inputRatigueya.checked)) {
            console.log("true")
            botonMascotaJugador.disabled = false
        }
    }

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)
}

function unirseAlJuego() {
    fetch("http://127.0.0.1:8080/unirse")
        .then(function (res) {
            console.log(res)
            res.ok ? res.text().then((respuesta) => {
                console.log(respuesta);
                jugadorId = respuesta;
            }) : console.log("No regresa una respuesta") ;
        })
}

function seleccionarMascotaJugador() {
    seccionSeleccionarMascota.style.display = 'none'
    mapaSection.style.display = 'flex'
    // seccionSeleccionarAtaque.style.display = 'flex'

    iniciarMapa()

    if (inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = mascotas[0]
        nombreMascotaSeleccionada = inputHipodoge.id
        imagenMascota = mascotaJugador.img
    } else if (inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = mascotas[1]
        nombreMascotaSeleccionada = inputCapipepo.id
        imagenMascota = mascotaJugador.img
    } else if (inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = mascotas[2]
        nombreMascotaSeleccionada = inputRatigueya.id
        imagenMascota = mascotaJugador.img
    } else {
        console.log("Selecciona tu Mokepon para iniciar")
    }
    console.log(mascotaJugador)

    seleccionarMokepon(nombreMascotaSeleccionada)

    seleccionarEnemigo()
    pintarCanvas()
    extraerAtaques(nombreMascotaSeleccionada)
    secuenciaDeAtaque()
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://127.0.0.1:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function iniciarMapa() {
    mapaCanvas.width = anchoMapa
    mapaCanvas.height = alturaDeseada

    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown', keyPressed)
    window.addEventListener('keyup', detenerMovimiento)
}

function pintarCanvas() {
    mascotaJugador.x = mascotaJugador.x + mascotaJugador.speedX
    mascotaJugador.y = mascotaJugador.y + mascotaJugador.speedY
    
    lienzo.clearRect(0, 0, mapaCanvas.width, mapaCanvas.height)
    
    lienzo.drawImage(
        mapBackground,
        0,
        0,
        mapaCanvas.width,
        mapaCanvas.height
    )

    mascotaJugador.pintarMokepon()

    enviarPosicion(mascotaJugador.x, mascotaJugador.y)

    // nuevoEnemigo.pintarMokepon()
    if ( mascotaJugador.speedX !== 0 || mascotaJugador.speedY !== 0) {
        checkForColision(nuevoEnemigo)
    }
}

function enviarPosicion(coordenadax, coordenaday) {
    fetch(`http://127.0.0.1:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        header: {
            "Content-type": "application/jason"
        },
        body: JSON.stringify({
            x: coordenadax,
            y: coordenaday,
        })
    })
        .then(function (res) {
            res.ok ? res.jason()
                .then(function ({ enemigos}) {
                    console.log(enemigos);
                    enemigos.forEach(function(enemigo){
                        let enemigoRemoto = null;
                        const nombreMascotaEnemigo = enemigo.mokepon.nombre || "" ;
                        if (nombreMascotaEnemigo === "Hipodoge") {
                            nuevoEnemigo = new Mokepon(
                                "Hipodoge",
                                "Hipodoge",
                                5,
                                './assets/mokepons_mokepon_hipodoge_attack.webp',
                                './assets/hipodoge.webp'
                            )
                        } else if (nombreMascotaEnemigo === "Capipepo") {
                            nuevoEnemigo = new Mokepon(
                                "Capipepo",
                                "Capipepo",
                                5,
                                './assets/mokepons_mokepon_capipepo_attack.webp',
                                './assets/capipepo.webp'
                            )
                        } else if (nombreMascotaEnemigo === "Ratigueya") {
                            nuevoEnemigo = new Mokepon(
                                "Ratigueya",
                                "Ratigueya",
                                5,
                                './assets/mokepons_mokepon_ratigueya_attack.webp',
                                './assets/ratigueya.webp'
                            )
                        }
                        enemigoRemoto.pintarMokepon()
                    })
                }): "No se recibieron enemigos desde el servidor";
        })
}


function moverMascotaRight() {
    mascotaJugador.speedX = 5
}

function moverMascotaleft() {
    mascotaJugador.speedX = -5
}

function moverMascotaUp(){
    mascotaJugador.speedY = -5
}

function moverMascotaDown(){
    mascotaJugador.speedY = 5
}

function detenerMovimiento() {
    mascotaJugador.speedX = 0
    mascotaJugador.speedY = 0
}

function keyPressed(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverMascotaUp()
            break;
        case 'ArrowDown':
            moverMascotaDown()
            break;
        case 'ArrowLeft':
            moverMascotaleft()
            break;
        case 'ArrowRight':
            moverMascotaRight()
            break;
        default:
            break;
    }
}

function extraerAtaques(mokeponPeleador) {
    for (let mascota of mascotas) {
        if (mascota.name === mokeponPeleador) {
            ataquesMascota = mascota.ataques
        }
    }
    console.log(ataquesMascota)
    insertarAtaquesHTML(ataquesMascota)
}

function insertarAtaquesHTML(ataquesMascota) {
    ataquesMascota.forEach((ataque) => {

        let attackTemplateHTML = `<button id="${ataque.id}" class="btn-ataque BAtaque">${ataque.nombre}</button>`

        contenedorAtaques.innerHTML += attackTemplateHTML
    })
    botonAgua = document.getElementById("boton-agua")
    botonFuego = document.getElementById("boton-fuego")
    botonTierra = document.getElementById("boton-tierra")

    botones = document.querySelectorAll(".BAtaque")

    botonReiniciar.addEventListener('click', reiniciarJuego)

    // seleccionarEnemigo()
}

function secuenciaDeAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                secuenciaAtaqueJugador.push("🔥")
                console.log(secuenciaAtaqueJugador)
                boton.style.backgroundColor = '#112f58'
                boton.disabled = true
            } else if (e.target.textContent === "💧") {
                secuenciaAtaqueJugador.push("💧")
                console.log(secuenciaAtaqueJugador)
                boton.style.backgroundColor = '#112f58'
                boton.disabled = true
            } else {
                secuenciaAtaqueJugador.push("🌱")
                console.log(secuenciaAtaqueJugador)
                boton.style.backgroundColor = '#112f58'
                boton.disabled = true
            } 
            spanAtaqueSeleccionado.innerHTML = e.target.textContent

            iniciarPelea()
        })
    })
    
}


function seleccionarEnemigo(){
    let enemigoAleatorio = aleatorio(0, mascotas.length -1)

    nuevoEnemigo = mokeponesSalvajes[enemigoAleatorio]
    console.log(`El enemigo a vencer es ${nuevoEnemigo.name}`)

    nuevoEnemigo.x = aleatorio(40, mapaCanvas.width - nuevoEnemigo.width)
    nuevoEnemigo.y = aleatorio(60, mapaCanvas.height - nuevoEnemigo.height)

    spanMascotaEnemigo.innerHTML = nuevoEnemigo.name
    ataquesMokeponEnemigo = nuevoEnemigo.ataques
    
    secuenciaDeAtaqueEnemigo(ataquesMokeponEnemigo)
    console.log(arregloAtaqueEnemigo)
}

function secuenciaDeAtaqueEnemigo(ataquesMokeponEnemigo) {

    shuffled = ataquesMokeponEnemigo
        .map(value => ({value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value)

    shuffled.forEach((ataque) => {
          arregloAtaqueEnemigo.push(ataque.nombre)
    })
}

function iniciarPelea() {
    if (secuenciaAtaqueJugador.length === 5) {
        combate()
    }
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function combate(){
    
    for (let index = 0; index < secuenciaAtaqueJugador.length; index++) {

        if (secuenciaAtaqueJugador[index] === arregloAtaqueEnemigo[index]){
            resultadoCombate = "¡Empate!"
        }   else if (secuenciaAtaqueJugador[index] ==  "💧" && arregloAtaqueEnemigo[index] == "🔥"){
            triunfosJugador = triunfosJugador + 1
            resultadoCombate = "¡Ganaste esta ronda!"
        } else if (secuenciaAtaqueJugador[index] == "🌱" && arregloAtaqueEnemigo[index] ==  "💧"){
            triunfosJugador = triunfosJugador + 1
            resultadoCombate = "¡Ganaste esta ronda!"
        } else if (secuenciaAtaqueJugador[index] == "🔥" && arregloAtaqueEnemigo[index] == "🌱"){
            triunfosJugador = triunfosJugador + 1
            resultadoCombate = "¡Ganaste esta ronda!"
        } else {
            ++triunfosEnemigo
            console.log(triunfosEnemigo)
            resultadoCombate = "¡Perdiste esta ronda!"
        }
        spanVidasJugador.innerHTML = triunfosJugador
        spanVidasEnemigo.innerHTML = triunfosEnemigo

        displayAttackSecuence(secuenciaAtaqueJugador[index], resultadoCombate, arregloAtaqueEnemigo[index])
        // updateLife(triunfosJugador, triunfosEnemigo)
    }

    if (triunfosJugador === triunfosEnemigo) {
        displayWinnerMessage('¡Ambos Mokepones son fenomenales, Empate!')
    } else if (triunfosJugador > triunfosEnemigo) {
        displayWinnerMessage('¡Ganaste el juego!')
    }   else {
        displayWinnerMessage('¡Perdiste el juego!')
    }
}

function displayAttackSecuence(ataquesJugador, resultadoCombate, ataqueEnemigoIndex) {
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')
    let mostrarResultadoCombate = document.createElement('p')

    nuevoAtaqueJugador.innerHTML = ataquesJugador
    mostrarResultadoCombate.innerHTML = resultadoCombate
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigoIndex

    ataquesEjecutados.appendChild(nuevoAtaqueJugador)
    mostrarResultadoCombateHTML.appendChild(mostrarResultadoCombate)
    ataquesEnemigoHTML.appendChild(nuevoAtaqueEnemigo)
}

function displayWinnerMessage(winner) {
    seccionReiniciar.style.display = 'flex'
    seccionAtaques.style.display = "none"

    combatResult.style.color = "olivedrab"
    combatResult.innerHTML = `${winner}`
}

function checkForColision(enemigo) {
    const arribaEnemigo = nuevoEnemigo.y;
    const abajoEnemigo = nuevoEnemigo.y + nuevoEnemigo.height;
    const derechaEnemigo = nuevoEnemigo.x + nuevoEnemigo.width;
    const izquierdaEnemigo = nuevoEnemigo.x;

    const arribaMascota = mascotaJugador.y;
    const abajoMascota = mascotaJugador.y + mascotaJugador.height;
    const derechaMascota = mascotaJugador.x + mascotaJugador.width;
    const izquierdaMascota = mascotaJugador.x;

    if (abajoMascota < arribaEnemigo || 
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)
    seccionSeleccionarAtaque.style.display = 'flex'
    mapaSection.style.display = 'none'
    console.log(`Hay una colisión con ${nuevoEnemigo.name}`)
}

function reiniciarJuego() {
    location.reload()
}

window.addEventListener("load", iniciarJuego)