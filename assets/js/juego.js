/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck         = [];
const tipos      = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0;
let puntosComputadora = 0

// Referencias del html
const btnNuevo = document.querySelector('#btnNuevo');
const btnDetener = document.querySelector('#btnDetener');
const btnPedir = document.querySelector('#btnPedir');
const puntosHTML = document.querySelectorAll('smal');
const divCartasJugador = document.querySelector('#jugador-cartas')
const divCartasComputadora = document.querySelector('#computadora-cartas')


// Esta función crea un nuevo deck
const crearDeck = () => {

    for( let i = 2; i <= 10; i++ ) {
        for( let tipo of tipos ) {
            deck.push( i + tipo);
        }
    }

    for( let tipo of tipos ) {
        for( let esp of especiales ) {
            deck.push( esp + tipo);
        }
    }
    deck = _.shuffle( deck );
    console.log( deck );
    return deck;
}
crearDeck();

// Esta funcion me permite tomar una carta

const pedirCarta = () => {

    if(deck.length == 0){
        throw 'No hay cartas en el deck'
    }

    const carta = deck.pop()

    return carta
}

pedirCarta()

const valorCarta = ( carta ) => {

    const valor = carta.substring(0, carta.length - 1)
    let puntos = 0

    if( isNaN(valor )) {
        puntos = (valor === 'A') ? 11 : 10
    } else {
        puntos = valor * 1
    }
    return puntos
}

//  turno de la computadora

const turnoComputadora = (puntos) => {

    do {
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta)
        puntosHTML[1].innerText = puntosComputadora

        const imgCarta = document.createElement('img')
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta')
        divCartasComputadora.append(imgCarta)

        if( puntos > 21) {
            break;
        }

    } while( (puntosComputadora < puntos) && (puntos <= 21));

    setTimeout(()=> {
        if(puntosComputadora === puntos) {
            alert('EMPATE')
        }else if(puntos > 21) {
            alert('computadora gana')
        } else if(puntosComputadora > 21) {
            alert('jugador gana')
        } else {
            alert('Computadora Gana')
        }

    }, 10)



    


}

//EVENTOS

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta()
    puntosJugador = puntosJugador + valorCarta(carta)
    puntosHTML[0].innerText = puntosJugador

    const imgCarta = document.createElement('img')
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta')
    divCartasJugador.append(imgCarta)

    if(puntosJugador > 21){
        console.warn('Perdiste gonorrea')
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador)
    } else if(puntosJugador === 21){
        console.log('ganaste mi papa de papases')
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador)
    }

  
})

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora( puntosJugador )
})


btnNuevo.addEventListener('click', ()=> {

    deck = []
    deck = crearDeck()

    puntosJugador = 0
    puntosComputadora = 0

    puntosHTML[0].innerHTML = 0
    puntosHTML[1].innerHTML = 0

    divCartasComputadora.innerHTML = ''
    divCartasJugador.innerHTML = ''

    btnPedir.disabled = false
    btnDetener.disabled = false
})





