function aleatorio(min, max) {
    pc = Math.floor(Math.random() * (max - min + 1) + min)
    return pc
}

function seleccion(arma){
    if (arma == 1) {
        jugada = "Piedra 🥌"
    } else if (arma == 2){
        jugada = "Papel 🧻"
    } else if (arma == 3){
        jugada = "Tijeras ✂️"
    } else {
        jugada = "Debes elegir un número: 1, 2 o 3"
    }
    return jugada
}

let jugador = 0
let pc = 0
let triunfos = 0
let perdidas = 0

while (triunfos < 3 && perdidas < 3) {
    pc = aleatorio(1, 3)
    jugador = prompt("Inicia el encuentro de piedra vs. Papel vs. Tijeras. Selecciona tu arma escribiendo un número: [1] Piedra 🥌 [2] Papel 🧻 [3] Tijeras ✂️")

    alert("Elegiste " + seleccion(jugador) + " VS. PC que eligió " + seleccion(pc))

    // COMBATE
    if (jugador == pc){
        alert("Empate")
    }   else if (jugador == 1 && pc == 3){
        alert("¡Ganaste 1 punto en este encuento!")
        triunfos++
    } else if (jugador == 2 && pc == 1){
        alert("¡Ganaste 1 punto en este encuento!")
        triunfos++
    } else if (jugador == 3 && pc == 2){
        alert("¡Ganaste 1 punto en este encuento!")
        triunfos++
    } else {
        alert("¡Perdiste 1 punto este encuentro!")
        perdidas++
    }

    alert("El marcador al momento ---> tu: " + triunfos + " ||  Máquina: " + perdidas)
    
    if (triunfos == 3){
        alert("¡Ganaste el juego!")
    } else if (perdidas == 3) {
        alert("¡Perdiste el juego!")
    }
}




