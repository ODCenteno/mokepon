const contenedorTarjetas = document.getElementById('cards-container')
const seccionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const seccionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById("btn-seleccionar-mascota")
const contenedorAtaques = document.getElementById("contenedor-ataques")

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

let mascotas = [];
let mascotaJugador;
let ataquesJugador;
let ataqueEnemigo = [];
let ataquesMokeponEnemigo;
let triunfosJugador = 0;
let triunfosEnemigo = 0
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

class Mokepon {
    constructor(name, id, life, img) {
        this.name = name,
        this.id = id,
        this.life = life
        this.img = img
        this.ataques = []
    }
}

let hipodoge = new Mokepon(
    "Hipodoge",
    "Hipodoge",
    5,
    './assets/mokepons_mokepon_hipodoge_attack.webp'
)
let capipepo = new Mokepon(
    "Capipepo",
    "Capipepo",
    5,
    './assets/mokepons_mokepon_capipepo_attack.webp'
)
let ratigueya = new Mokepon(
    "Ratigueya",
    "Ratigueya",
    5,
    './assets/mokepons_mokepon_ratigueya_attack.webp'
)

hipodoge.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
)

capipepo.ataques.push(
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    
)

ratigueya.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
)

mascotas.push(hipodoge, capipepo, ratigueya)
console.log(mascotas)

botonMascotaJugador.disabled = true

function iniciarJuego(){
    seccionSeleccionarAtaque.style.display = 'none'
    seccionReiniciar.style.display = 'none'
    
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

function seleccionarMascotaJugador() {
    seccionSeleccionarMascota.style.display = 'none'
    seccionSeleccionarAtaque.style.display = 'flex'

    if (inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
        console.log("Selecciona tu Mokepon para iniciar")
    }
    extraerAtaques(mascotaJugador)
    seleccionarEnemigo()
}

function extraerAtaques(mascotaJugador) {
    for (let mascota of mascotas) {
        if (mascota.name === mascotaJugador) {
            ataquesJugador = mascota.ataques
        }
    }
    console.log(ataquesJugador)
    insertarAtaquesHTML(ataquesJugador)
}

function insertarAtaquesHTML(ataquesJugador) {
    ataquesJugador.forEach((ataque) => {

        let attackTemplateHTML = `<button id="${ataque.id}" class="btn-ataque BAtaque">${ataque.nombre}</button>`

        contenedorAtaques.innerHTML += attackTemplateHTML
    })
    botonAgua = document.getElementById("boton-agua")
    botonFuego = document.getElementById("boton-fuego")
    botonTierra = document.getElementById("boton-tierra")

    botones = document.querySelectorAll(".BAtaque")
    
    // botonAgua.addEventListener('click', ataqueAgua)
    // botonFuego.addEventListener('click', ataqueFuego)
    // botonTierra.addEventListener('click', ataqueTierra)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function secuenciaDeAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                secuenciaAtaqueJugador.push("🔥")
                console.log(secuenciaAtaqueJugador)
                boton.style.backgroundColor = '#112f58'
            } else if (e.target.textContent === "💧") {
                secuenciaAtaqueJugador.push("💧")
                console.log(secuenciaAtaqueJugador)
                boton.style.backgroundColor = '#112f58'
            } else {
                secuenciaAtaqueJugador.push("🌱")
                console.log(secuenciaAtaqueJugador)
                boton.style.backgroundColor = '#112f58'
            } 
            spanAtaqueSeleccionado.innerHTML = e.target.textContent
            obtenerAtaqueEnemigo()
        })
    })
}

function seleccionarEnemigo(){
    let enemigoAleatorio = aleatorio(0, mascotas.length -1)
    spanMascotaEnemigo.innerHTML = mascotas[enemigoAleatorio].name
    ataquesMokeponEnemigo = mascotas[enemigoAleatorio].ataques
    secuenciaDeAtaque()
}

function obtenerAtaqueEnemigo() {
    let ataqueAleatorio = aleatorio(0, mascotas.length -1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push("💧")
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push("🔥")
    } else {
        ataqueEnemigo.push("🌱")
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if (secuenciaAtaqueJugador.length === 5) {
        combate()
    }
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// function ataqueAgua() {
//     spanAtaqueSeleccionado.innerHTML = "Agua"
//     ataqueJugador = "Agua"
//     obtenerAtaqueEnemigo()
//     combate(ataqueJugador, ataqueEnemigo)
// }

// function ataqueFuego() {
//     spanAtaqueSeleccionado.innerHTML = "Fuego"
//     ataqueJugador = "Fuego"
//     obtenerAtaqueEnemigo()
//     combate(ataqueJugador, ataqueEnemigo)
// }

// function ataqueTierra() {
//     spanAtaqueSeleccionado.innerHTML = "Tierra"
//     ataqueJugador = "Tierra"
//     obtenerAtaqueEnemigo()
//     combate(ataqueJugador, ataqueEnemigo)
// }

function combate(ataquesJugador, ataquesEnemigo){
    
    for (let index = 0; index < secuenciaAtaqueJugador.length; index++) {

        if (secuenciaAtaqueJugador[index] === ataqueEnemigo[index]){
            resultadoCombate = "¡Empate!"
        }   else if (secuenciaAtaqueJugador[index] ==  "💧" && ataqueEnemigo[index] == "🔥"){
            triunfosJugador = triunfosJugador + 1
            resultadoCombate = "¡Ganaste esta ronda!"
        } else if (secuenciaAtaqueJugador[index] == "🌱" && ataqueEnemigo[index] ==  "💧"){
            triunfosJugador = triunfosJugador + 1
            resultadoCombate = "¡Ganaste esta ronda!"
        } else if (secuenciaAtaqueJugador[index] == "🔥" && ataqueEnemigo[index] == "🌱"){
            triunfosJugador = triunfosJugador + 1
            resultadoCombate = "¡Ganaste esta ronda!"
        } else {
            ++triunfosEnemigo
            console.log(triunfosEnemigo)
            resultadoCombate = "¡Perdiste esta ronda!"
        }
        spanVidasJugador.innerHTML = triunfosJugador
        spanVidasEnemigo.innerHTML = triunfosEnemigo

        displayAttackSecuence(secuenciaAtaqueJugador[index], resultadoCombate, ataqueEnemigo[index])
        updateLife(triunfosJugador, triunfosEnemigo)
    }

    if (triunfosJugador === triunfosEnemigo) {
        displayWinnerMessage('¡Ambos Mokepones son fenomenales, Empate!')
    } else if (triunfosJugador > triunfosEnemigo) {
        displayWinnerMessage('¡Ganaste el juego!')
    }   else {
        displayWinnerMessage('¡Perdiste el juego!')
    }

}

function displayAttackSecuence(ataquesJugador, resultadoCombate, ataqueEnemigo) {
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')
    let mostrarResultadoCombate = document.createElement('p')

    nuevoAtaqueJugador.innerHTML = ataquesJugador
    mostrarResultadoCombate.innerHTML = resultadoCombate
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo

    ataquesEjecutados.appendChild(nuevoAtaqueJugador)
    mostrarResultadoCombateHTML.appendChild(mostrarResultadoCombate)
    ataquesEnemigoHTML.appendChild(nuevoAtaqueEnemigo)
}

function displayWinnerMessage(resultadoCombate) {

    combatResult.innerHTML = resultadoCombate

    // let crearParrafo = document.createElement('p')
    // crearParrafo.innerHTML = `Elegiste atacar con ${ataqueJugador}. El enemigo atacó con ${ataqueEnemigo}. ${resultadoCombate}`
}

function displayGameMsg(winner) {
    seccionReiniciar.style.display = 'flex'
    seccionAtaques.style.display = "none"

    combatResult.style.color = "olivedrab"
    combatResult.innerHTML = `${winner}`
 
    botonAgua.disabled = true
    botonFuego.disabled = true
    botonTierra.disabled = true
}

function updateLife(vidasJugador) {
    if (vidasJugador == 0) {
        displayGameMsg("¡Perdiste el juego!")
    } else if (vidasEnemigo == 0) {
        displayGameMsg("¡Ganaste el juego!")
    }
}

function reiniciarJuego() {
    location.reload()
}

window.addEventListener("load", iniciarJuego)