const imageUrl = "/static/images/your_image.jpg"; // Update this with your image path
let pieces = [];

// Initialize the game
function initGame() {
    pieces = createPuzzlePieces(3, 3); // 3x3 grid
    shuffleArray(pieces);
    renderPuzzle();
}

// Create puzzle pieces
function createPuzzlePieces(rows, cols) {
    const pieceWidth = 100; // Adjust to match your piece size
    const pieceHeight = 100; // Adjust to match your piece size
    const pieces = [];
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            pieces.push({
                id: `piece-${i}-${j}`,
                position: { x: j, y: i },
                style: `background-image: url(${imageUrl}); background-position: -${j * pieceWidth}px -${i * pieceHeight}px;`
            });
        }
    }
    return pieces;
}

// Shuffle pieces
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Render puzzle pieces
function renderPuzzle() {
    const puzzleContainer = document.getElementById('puzzle-container');
    puzzleContainer.innerHTML = ''; // Clear existing pieces

    pieces.forEach(piece => {
        const div = document.createElement('div');
        div.className = 'puzzle-piece';
        div.setAttribute('draggable', true);
        div.setAttribute('id', piece.id);
        div.setAttribute('style', piece.style);
        div.addEventListener('dragstart', dragStart);
        div.addEventListener('dragover', dragOver);
        div.addEventListener('drop', drop);
        puzzleContainer.appendChild(div);
    });
}

// Drag and drop functionality
let draggedPiece = null;

function dragStart(event) {
    draggedPiece = event.target;
}

function dragOver(event) {
    event.preventDefault(); // Allow drop
}

function drop(event) {
    event.preventDefault();
    const target = event.target;

    // Swap pieces
    if (target.classList.contains('puzzle-piece') && target !== draggedPiece) {
        const draggedIndex = pieces.findIndex(piece => piece.id === draggedPiece.id);
        const targetIndex = pieces.findIndex(piece => piece.id === target.id);

        // Swap pieces in the array
        [pieces[draggedIndex], pieces[targetIndex]] = [pieces[targetIndex], pieces[draggedIndex]];

        // Re-render the puzzle
        renderPuzzle();

        // Check if the puzzle is complete
        if (isPuzzleComplete()) {
            clearInterval(timerInterval); // Stop the timer
            showDialog("Congratulations! You've completed the puzzle.", true);
        }
    }
}

// Check if puzzle is complete
function isPuzzleComplete() {
    for (let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];
        const expectedX = i % 3;
        const expectedY = Math.floor(i / 3);
        if (piece.position.x !== expectedX || piece.position.y !== expectedY) {
            return false;
        }
    }
    return true;
}
