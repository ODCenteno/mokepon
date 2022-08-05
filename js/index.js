let mascotaJugador;
let mascotaEnemigo;
let ataqueJugador;
let ataqueEnemigo;
let triunfosJugador;
let perdidasJugador;
let resultadoCombate;
let vidasJugador = 3;
let vidasEnemigo = 3;


function iniciarJuego(){
    let seccionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    seccionSeleccionarAtaque.style.display = 'none'
    let seccionReiniciar = document.getElementById('reiniciar')
    seccionReiniciar.style.display = 'none'

    let botonMascotaJugador = document.getElementById("boton-mascota")
    let botonAgua = document.getElementById("boton-agua")
    let botonFuego = document.getElementById("boton-fuego")
    let botonTierra = document.getElementById("boton-tierra")
    let botonReiniciar = document.getElementById("boton-reiniciar")

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)

    botonAgua.addEventListener('click', ataqueAgua)
    botonFuego.addEventListener('click', ataqueFuego)
    botonTierra.addEventListener('click', ataqueTierra)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {
    let seccionSeleccionarMascota = document.getElementById('seleccionar-mascota')
    seccionSeleccionarMascota.style.display = 'none'
    let seccionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    seccionSeleccionarAtaque.style.display = 'flex'

    let inputHipodoge = document.getElementById("Hipodoge")
    let inputCapipepo = document.getElementById("Capipepo")
    let inputRatigueya = document.getElementById("Ratigueya")
    let spanMascotaJugador = document.getElementById('mascota-jugador')


    if (inputHipodoge.checked){
        mascotaJugador = "Hipodoge"
        spanMascotaJugador.innerHTML = mascotaJugador
    } else if (inputCapipepo.checked){
        mascotaJugador = "Hipodoge"
        spanMascotaJugador.innerHTML = mascotaJugador
    } else if (inputRatigueya.checked){
        mascotaJugador = "Hipodoge"
        spanMascotaJugador.innerHTML = mascotaJugador
    } else {
        console.log("Selecciona tu Mokepon para iniciar")
    }

    seleccionarEnemigo()

}

function seleccionarEnemigo(){
    let enemigoAleatorio = aleatorio(1,3)
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo')

    if (enemigoAleatorio == 1) {
        mascotaEnemigo = "Hipodoge"
        spanMascotaEnemigo.innerHTML = mascotaEnemigo
    } else if (enemigoAleatorio == 2) {
        mascotaEnemigo = "Capipepo"
        spanMascotaEnemigo.innerHTML = mascotaEnemigo
    } else if (enemigoAleatorio == 3) {
        mascotaEnemigo = "Ratigueya"
        spanMascotaEnemigo.innerHTML = mascotaEnemigo
    }
}

function obtenerAtaqueEnemigo() {
    let ataqueAleatorio = aleatorio(1,3)

    if (ataqueAleatorio == 1) {
        ataqueEnemigo = "Agua"
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = "Fuego"
    } else if (ataqueAleatorio == 3) {
        ataqueEnemigo = "Tierra"
    }
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function ataqueAgua() {
    let spanAtaqueSeleccionado = document.getElementById('ataque-seleccionado')
    spanAtaqueSeleccionado.innerHTML = "Agua"
    ataqueJugador = "Agua"
    obtenerAtaqueEnemigo()
    combate(ataqueJugador, ataqueEnemigo)
}

function ataqueFuego() {
    let spanAtaqueSeleccionado = document.getElementById('ataque-seleccionado')
    spanAtaqueSeleccionado.innerHTML = "Fuego"
    ataqueJugador = "Fuego"
    obtenerAtaqueEnemigo()
    combate(ataqueJugador, ataqueEnemigo)
}

function ataqueTierra() {
    let spanAtaqueSeleccionado = document.getElementById('ataque-seleccionado')
    spanAtaqueSeleccionado.innerHTML = "Tierra"
    ataqueJugador = "Tierra"
    obtenerAtaqueEnemigo()
    combate(ataqueJugador, ataqueEnemigo)
}

function combate(ataqueJugador, ataqueEnemigo){
    
    if (ataqueJugador == ataqueEnemigo){
        resultadoCombate = "¡Empate!"
    }   else if (ataqueJugador ==  "Agua" && ataqueEnemigo == "Fuego"){
        vidasEnemigo = vidasEnemigo - 1
        resultadoCombate = "¡Ganaste esta ronda!"
    } else if (ataqueJugador == "Tierra" && ataqueEnemigo ==  "Agua"){
        vidasEnemigo = vidasEnemigo - 1
        resultadoCombate = "¡Ganaste esta ronda!"
    } else if (ataqueJugador == "Fuego" && ataqueEnemigo == "Tierra"){
        vidasEnemigo = vidasEnemigo - 1
        resultadoCombate = "¡Ganaste esta ronda!"
    } else {
        vidasJugador--
        resultadoCombate = "¡Perdiste esta ronda!"
    }
    displayAttackMessage(resultadoCombate)
    let spanVidasJugador = document.getElementById('vidas-jugador')
    let spanVidasEnemigo = document.getElementById('vidas-enemigo')
    spanVidasJugador.innerHTML = vidasJugador
    spanVidasEnemigo.innerHTML = vidasEnemigo

    updateLife()
}

function displayAttackMessage(resultadoCombate) {
    let combatResult = document.getElementById('resultado-combate')
    let ataquesJugador = document.getElementById('ataques-jugador')
    let ataquesEnemigo = document.getElementById('ataques-enemigo')


    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    combatResult.innerHTML = resultadoCombate
    nuevoAtaqueJugador.innerHTML = ataqueJugador
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo

    // let crearParrafo = document.createElement('p')
    // crearParrafo.innerHTML = `Elegiste atacar con ${ataqueJugador}. El enemigo atacó con ${ataqueEnemigo}. ${resultadoCombate}`

    ataquesJugador.appendChild(nuevoAtaqueJugador)
    ataquesEnemigo.appendChild(nuevoAtaqueEnemigo)

}

function displayGameMsg(winner) {
    let seccionReiniciar = document.getElementById('reiniciar')
    seccionReiniciar.style.display = 'flex'

    let resultadoCombate = document.getElementById('resultado-combate')

    resultadoCombate.innerHTML = `${winner}`


    let botonAgua = document.getElementById("boton-agua")
    botonAgua.disabled = true
    let botonFuego = document.getElementById("boton-fuego")
    botonFuego.disabled = true
    let botonTierra = document.getElementById("boton-tierra")
    botonTierra.disabled = true

}

function updateLife() {
    if (vidasJugador == 0) {
        displayGameMsg("¡Perdiste este juego!")
    } else if (vidasEnemigo == 0) {
        displayGameMsg("¡Ganaste el juego!")
    }
}

function reiniciarJuego() {
    location.reload()
}

window.addEventListener("load", iniciarJuego)