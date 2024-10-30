
const containerGrid = document.querySelector(".container");
const button = document.querySelector('button');

const initialGridSize = 16;
function initialGrid() {
    createGrid(initialGridSize);
}


function clearGrid() {
    containerGrid.textContent = '';
}

function createGrid(size) {
    clearGrid();

    const numberOfSquares = size * size;


    for (let i = 0; i < numberOfSquares; i++) {

        const gridSquare = document.createElement('div');

        gridSquare.classList.add('grid-square');
        gridSquare.style.width = `calc(100% / ${size})`;
        gridSquare.style.height = `calc(100% / ${size})`;

        gridSquare.style.opacity = 1;

        gridSquare.addEventListener('mouseenter', () => {
            const newColor = getRandomColor();
            gridSquare.style.backgroundColor = newColor;

            let currentOpacity = parseFloat(gridSquare.style.opacity);
            if (currentOpacity > 0) {
                gridSquare.style.opacity = (currentOpacity - 0.1).toFixed(1);
            }
        });
        containerGrid.appendChild(gridSquare);
    }
}

button.addEventListener('click', () => {
    let size = parseInt(prompt("Enter Grid Size"));

    if (!isNaN(size) && size > 0 && size <= 100) {
        createGrid(size);
    } else {
        alert("Please enter a valid number between 1 = 100");
    }
})

const reset = document.querySelector('.reset');

reset.addEventListener('click', () => {
    initialGrid();
})

initialGrid();

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}
