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
let ataquesMascota;
let coleccionAtaques = [];
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
    secuenciaDeAtaque()
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

    seleccionarEnemigo()
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

    spanMascotaEnemigo.innerHTML = mascotas[enemigoAleatorio].name
    ataquesMokeponEnemigo = mascotas[enemigoAleatorio].ataques
    console.log(ataquesMokeponEnemigo)
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

function reiniciarJuego() {
    location.reload()
}

window.addEventListener("load", iniciarJuego)