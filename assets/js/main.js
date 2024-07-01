const morpion = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
];
const gameContainer = document.querySelector('#morpion')
let lap = 0
let gameover = false
let isCpuMode = false

function displayGrid() {
    gameContainer.innerHTML = ""
    morpion.forEach((row, i) => {
        const rowContainer = document.createElement('div')
        rowContainer.classList.add('row')
        row.forEach((cell, j) => {
            const cellContainer = document.createElement('div')
            cellContainer.classList.add('cell')
            rowContainer.appendChild(cellContainer)
            switch (cell) {
                case "X":
                    cellContainer.innerHTML = "X"
                    break;
                case "O":
                    cellContainer.innerHTML = "O"
                    break;

            }
            cellContainer.addEventListener('click', () => {
                play(i, j)
            })
        })
        gameContainer.appendChild(rowContainer)
    })
}

function play(row, col) {
    if (!gameover) {
        if (lap % 2 == 0) {
            morpion[row][col] = "X"
            lap++
            checkVictory()
            console.log(gameover);
            if (isCpuMode) {
                playCpu()
            }
            
        } else {
            morpion[row][col] = "O"
            lap++
            checkVictory()

        }
    }


    displayGrid()
}

function checkVictory() {
    for (let i = 0; i < morpion.length; i++) {
        if (morpion[i][0] != "" && morpion[i][0] == morpion[i][1] && morpion[i][1] == morpion[i][2]) {
            if (morpion[i][0] == "X") {
                console.log("Le joueur X a gagner");
            } else {
                console.log('le joueur O a gagner');
            }
            gameover = true
            return
        }
        if (morpion[0][i] != "" && morpion[0][i] == morpion[1][i] && morpion[1][i] == morpion[2][i]) {
            if (morpion[0][i] == "X") {
                console.log("Le joueur X a gagner");
            } else {
                console.log('le joueur O a gagner');
            }
            gameover = true
            return
        }

    }
    if (
        morpion[0][0] != "" && morpion[0][0] == morpion[1][1] && morpion[1][1] == morpion[2][2] ||
        morpion[2][0] != "" && morpion[2][0] == morpion[1][1] && morpion[1][1] == morpion[0][2]
    ) {
        if (morpion[1][1] == "X") {
            console.log("Le joueur X a gagner");
        } else {
            console.log('le joueur O a gagner');
        }
        gameover = true
        return
    }
    if (lap >= 9) {
        gameover = true

    }
}

function switchCpuMode() {
    isCpuMode = !isCpuMode
}

function playCpu() {
    if (!gameover) {
        let randomRow = randomize(0, morpion.length - 1)
        let randomCell = randomize(0, morpion[0].length - 1)
        while (morpion[randomRow][randomCell] != "") {
            randomRow = randomize(0, morpion.length - 1)
            randomCell = randomize(0, morpion[0].length - 1)
        }
        morpion[randomRow][randomCell] = "O"
        lap++
    }
}

function randomize(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

displayGrid()
