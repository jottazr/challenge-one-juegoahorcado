var intento = 0
var endgame = false
var acertados = 0
var modoOscuro = false
var listaPalabras = ["perro", "gato", "arriba", "abajo", "natalia", "nuevo", "morder",
    "iglesia", "auto", "bicicleta", "computadora", "html", "css", "javascript", "programacion",
    "monitor", "teclado", "raton", "cpu", "microfono", "auriculares"];

function play(dir) {
    var audio = new Audio(dir);
    audio.play();
}

function teclado(btn, palabra) {
    if (window.endgame == false) {
        let encontrado = false;
        let letra = btn.textContent
        for (let i = 0; i < palabra.length; i++) {
            if (palabra[i].toUpperCase() == letra) {
                let correcta = document.querySelector("#letra" + i);
                correcta.textContent = palabra[i].toUpperCase();
                encontrado = true;
                window.acertados += 1
            }
        }
        if (encontrado == true) {
            btn.disabled = true;
            btn.classList.remove("tecla");
            btn.classList = "teclaUsadaCorrecta";
            play("audio/acertada.mp3")
        }
        else {
            btn.disabled = true;
            btn.classList.remove("tecla");
            btn.classList = "teclaUsadaIncorrecta";
            play("audio/error.mp3")
            drawGame();
        }

        if (window.acertados == palabra.length) {
            youWin();
        }
    }
    return;
}

function initGame() {
    let indice = Math.floor(Math.random() * window.listaPalabras.length);
    let palabra = window.listaPalabras[indice];

    drawGame()

    let correctas = document.querySelector(".correctas");
    for (let i = 0; i < palabra.length; i++) {
        const letra = document.createElement("div");
        letra.id = "letra" + i;
        letra.classList = "letraCorrecta";
        letra.textContent = "";
        correctas.append(letra);
    }

    let teclado_f1 = "qwertyuiop";
    let teclado_f2 = "asdfghjklñ";
    let teclado_f3 = "zxcvbnm";

    let f1 = document.querySelector(".fila1");
    for (let i = 0; i < teclado_f1.length; i++) {
        const tecla = document.createElement("button");
        tecla.classList = "tecla";
        tecla.textContent = teclado_f1[i].toUpperCase();
        tecla.id = teclado_f1[i].toString();
        tecla.addEventListener("click", function () { teclado(this, palabra); });
        f1.append(tecla);
    }

    let f2 = document.querySelector(".fila2");
    for (let i = 0; i < teclado_f2.length; i++) {
        const tecla = document.createElement("button");
        tecla.classList = "tecla";
        tecla.textContent = teclado_f2[i].toUpperCase();
        tecla.id = teclado_f2[i].toString();
        tecla.addEventListener("click", function () { teclado(this, palabra); });
        f2.append(tecla);
    }

    let f3 = document.querySelector(".fila3");
    for (let i = 0; i < teclado_f3.length; i++) {
        const tecla = document.createElement("button");
        tecla.classList = "tecla";
        tecla.textContent = teclado_f3[i].toUpperCase();
        tecla.id = teclado_f3[i].toString();
        tecla.addEventListener("click", function () { teclado(this, palabra); });
        f3.append(tecla);
    }
    return;
}

function removeChilds(nodo) {
    if (nodo.hasChildNodes) {
        while (nodo.childNodes.length >= 1) {
            nodo.removeChild(nodo.firstChild);
        }
    }
    return;
}

function newGame() {
    let pantalla = document.querySelector("canvas");
    let pincel = pantalla.getContext("2d");
    pincel.clearRect(0, 0, pantalla.width, pantalla.height);


    window.intento = 0;
    window.endgame = false;
    window.acertados = 0;

    let f1 = document.querySelector(".fila1");
    removeChilds(f1);
    let f2 = document.querySelector(".fila2");
    removeChilds(f2);
    let f3 = document.querySelector(".fila3");
    removeChilds(f3);
    let correctas = document.querySelector(".correctas");
    removeChilds(correctas);

    if (document.querySelector(".stateAnimation") != null) {
        let gameOver = document.querySelector(".stateAnimation");
        gameOver.classList.remove(".gameOver");
        gameOver.classList.remove(".youWin");
        gameOver.classList.remove(".stateAnimation");
        gameOver.classList = "state-nodisplay";
        removeChilds(gameOver);
    }

    initGame();
    return;
}

function gameOver() {
    if(document.querySelector(".state-nodisplay") != null){
        let gameOver = document.querySelector(".state-nodisplay");
        gameOver.classList.remove("state-nodisplay");

        const game = document.createElement("div");
        game.textContent = "FIN DEL JUEGO";/*palabra[i].toUpperCase()*/

        const over = document.createElement("div");
        over.textContent = "";/*palabra[i].toUpperCase()*/

        gameOver.append(game);
        gameOver.append(over);

        gameOver.classList.add("stateAnimation", "gameOver")

        window.endgame = true;
        play("audio/lose.mp3")
    }
    return;
}

function drawGame() {
    let pantalla = document.querySelector("canvas");
    let pincel = pantalla.getContext("2d");

    pincel.beginPath();
    if (window.intento == 0) {
        // BASE
        pincel.moveTo(355, 350);
        pincel.lineTo(0, 350);
    }
    if (window.intento == 1) {
        // COL
        pincel.moveTo(105, 0);
        pincel.lineTo(105, 350);
        pincel.moveTo(135, 350);
        pincel.lineTo(105, 320);
        pincel.moveTo(75, 350);
        pincel.lineTo(105, 320);
    }
    if (window.intento == 2) {
        // VIGA
        pincel.moveTo(155, 0);
        pincel.lineTo(105, 50);
        pincel.moveTo(257, 3);
        pincel.lineTo(103, 3);
    }

    if (window.intento == 3) {
        // CUERDA
        pincel.moveTo(255, 80);
        pincel.lineTo(255, 0);
    }

    if (window.intento == 4) {
        // CABEZA
        pincel.moveTo(255, 50);
        pincel.arc(255, 110, 30, -Math.PI / 2, Math.PI * 3 / 2, true);
    }
    if (window.intento == 5) {
        // TORSO
        pincel.moveTo(255, 225);
        pincel.lineTo(255, 140);
    }

    if (window.intento == 6) {
        // BR_I
        pincel.moveTo(275, 200);
        pincel.lineTo(255, 150);
    }

    if (window.intento == 7) {
        // BR_D
        pincel.moveTo(235, 200);
        pincel.lineTo(255, 150);
    }

    if (window.intento == 8) {
        // PI_I
        pincel.moveTo(275, 270);
        pincel.lineTo(255, 225);
    }

    if (window.intento == 9) {
        // PI_D
        pincel.moveTo(235, 270);
        pincel.lineTo(255, 225);
        gameOver();
    }

    pincel.lineWidth = 6;
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    if (window.modoOscuro == false) {
        pincel.strokeStyle = rs.getPropertyValue('--color5');
    }
    else {
        pincel.strokeStyle = rs.getPropertyValue('--color1');
    }
    pincel.stroke();
    window.intento += 1;
    return;

}

function youWin() {
    if(document.querySelector(".state-nodisplay") != null){
        const youWin = document.querySelector(".state-nodisplay");
        youWin.classList.remove("state-nodisplay");

        const you = document.createElement("div");
        you.textContent = "GANASTE!";/*palabra[i].toUpperCase()*/

        const win = document.createElement("div");
        win.textContent = "";/*palabra[i].toUpperCase()*/

        youWin.append(you);
        youWin.append(win);

        youWin.classList.add("stateAnimation", "youWin");
        window.endgame = true;
        play("audio/win.mp3")
    }
    return;
}

document.addEventListener('keydown', (event) => {
    let name = event.key;
    if (document.getElementById(name.toLowerCase()) != null) {
        document.getElementById(name.toLowerCase()).click()
    }
}, false);

const newgame = document.querySelector('#new');
const des = document.querySelector('#des');
newgame.addEventListener('click', function () { newGame(); });
des.addEventListener('click', function () {
    const menu = document.querySelector('#menu');
    const juego = document.querySelector('#juego');
    menu.classList.remove("no-display");
    menu.classList.add("menu");
    juego.classList.remove("juego");
    juego.classList.add("no-display");
});

const start = document.querySelector('#start');
const add = document.querySelector('#add');
start.addEventListener('click', function () {
    const menu = document.querySelector('#menu');
    const juego = document.querySelector('#juego');
    menu.classList.remove("menu");
    menu.classList.add("no-display");
    juego.classList.remove("no-display");
    juego.classList.add("juego");

    newGame();
});

add.addEventListener('click', function () {
    const menu = document.querySelector('#menu');
    const addWord = document.querySelector('#addWord');
    menu.classList.remove("menu");
    menu.classList.add("no-display");
    addWord.classList.remove("no-display");
    addWord.classList.add("addWord");
});

const save = document.querySelector('#save');
const cancel = document.querySelector('#cancel');
save.addEventListener('click', function () {
    let textarea = document.querySelector("#texto");
    const texto = textarea.value.toUpperCase();
    let error = false
    if (texto != "" && texto.length <= 8) {
        for (var i = 0; i < texto.length; i++) {
            if (((texto[i] < 'A') || (texto[i] > 'Z')) && (texto[i] != ' ')) {
                error = true
            }
        }
        if (error == false) {
            window.listaPalabras.push(texto)
            textarea.value = ""
            const addWord = document.querySelector('#addWord');
            const juego = document.querySelector('#juego');
            addWord.classList.remove("addWord");
            addWord.classList.add("no-display");
            juego.classList.remove("no-display");
            juego.classList.add("juego");
            newGame();
        }
        else {
            const dialogo = document.querySelector('#dialog');
            dialogo.show()
            dialogo.addEventListener('click', () => dialogo.close());
        }
    }
    else {
        const dialogo = document.querySelector('#dialog2');
        dialogo.show()
        dialogo.addEventListener('click', () => dialogo.close());
    }

});

cancel.addEventListener('click', function () {
    let textarea = document.querySelector("#texto");
    textarea.value = ""
    const addWord = document.querySelector('#addWord');
    const menu = document.querySelector('#menu');
    addWord.classList.remove("addWord");
    addWord.classList.add("no-display");
    menu.classList.remove("no-display");
    menu.classList.add("menu");

});
