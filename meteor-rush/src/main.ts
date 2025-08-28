import { Asteroid } from "./models/asteroid.js";
import { Rocket } from "./models/rocket.js";
import { GameState, IState } from "./models/state.js";
import { gameHighScoreUpdateHandler, gameScoreUpdateHandler, gameStateUIHandler } from "./ui/ui-state.js";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const gameState: IState = new GameState();
const keyState: Record<string, boolean> = {};

// Add handlers for state changes
gameState.addListener('state', gameStateUIHandler);
gameState.addListener('score', gameScoreUpdateHandler);
gameState.addListener('highScore', gameHighScoreUpdateHandler);

resetGame();

window.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        if (gameState.state === 'stopped') {
            startGame();
        }
        else if (gameState.state === 'paused') {
            startGame();
        }
        else if (gameState.state === 'running') {
            pauseGame();
        }
    }

    if (event.code === "ArrowLeft" || event.code === "ArrowRight") {
        keyState[event.code] = true;
        // playerMoveLeft();
    } 
    // else if (event.code === "ArrowRight") {
    //     playerMoveRight();
    // }
});

window.addEventListener("keyup", (event) => {
    if (event.code === "ArrowLeft" || event.code === "ArrowRight") {
        keyState[event.code] = false;
    } 
})

function gameLoop(dx: DOMHighResTimeStamp) {
    if (!isGameRunning() || !gameState.player)
        return;

    // Clear screen before drawing
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Update score
    // updateScore();
    gameState.updateScore();

    // Asteroids
    spawnAsteroid();
    drawAsteroids(gameState.asteroids);

    if (keyState["ArrowLeft"]) {
        // move player left
        playerMoveLeft();
    }
    if (keyState["ArrowRight"]) {
        // move player right
        playerMoveRight();
    }

    // Player
    gameState.player.draw(ctx);

    // Draw the next frame
    requestAnimationFrame(gameLoop);
}

function playerMoveRight() {
    if (!isGameRunning())
        return;
    gameState.player?.moveRight();
}

function playerMoveLeft() {
    if (!isGameRunning())
        return;
    gameState.player?.moveLeft();
}

function resetGame() {
    gameState.setState('state', 'stopped');
    gameState.setState('highScore', Math.max(gameState.highScore || 0, gameState.score || 0));
    // gameState.highScore = Math.max(gameState.highScore || 0, gameState.score || 0);
    // gameState.score = 0;
    gameState.setState('score', 0);
    // gameState.level = 1;
    gameState.setState('level', 1);
    // gameState.player = new Rocket(canvasWidth / 2, canvasHeight - 10, canvasWidth);
    gameState.setState('player', new Rocket(canvasWidth / 2, canvasHeight - 10, canvasWidth));
    // gameState.asteroids = [];
    gameState.setState('asteroids', []);
}

function drawAsteroids(asteroids?: Asteroid[]) {
    if (!asteroids) return;
    asteroids.forEach(asteroid => {
        asteroid.moveDown();
        asteroid.draw(ctx);
        if (detectCollisions(asteroid)) {
            stopGame();
        }

        if (asteroid.isOutOfBounds()) {
            // Remove asteroid from array
            const index = asteroids.indexOf(asteroid);
            if (index > -1) {
                asteroids.splice(index, 1);
            }
        }
    });
}

function spawnAsteroid() {
    if (!isGameRunning()) return;

    if (!gameState.asteroids || gameState.asteroids.length === 0) {
        // gameState.asteroids = [];
        gameState.setState('asteroids', []);
    }

    const requiredCount = getRequiredAsteroidCount();
    if (gameState.asteroids?.length! >= requiredCount) return;

    const size = Math.random() * 30 + 20; // Random size between 20 and 50
    const positionX = Math.random() * (canvasWidth - size);
    const positionY = -size; // Start above the canvas
    const speed = getAsteroidSpeed();
    const asteroid = new Asteroid(size, positionX, positionY, canvasHeight, speed);
    gameState.asteroids?.push(asteroid);
}

function getRequiredAsteroidCount(): number {
    const baseCount = 3;
    const maxCount = 10;
    const levelMultiplier = 1.6;
    return Math.min(maxCount, baseCount + (gameState.level! - 1) * levelMultiplier);
}

function getAsteroidSpeed(): number {
    const baseSpeed = Math.random() * 2 + 1; // Random speed between 1 and 3;
    const maxSpeed = 6;
    const speedIncrement = 0.8;
    return Math.min(maxSpeed, baseSpeed + (gameState.level! - 1) * speedIncrement);
}

function detectCollisions(asteroid: Asteroid): boolean {
    if (!isGameRunning() || !gameState.player || !asteroid) return false;

    const playerVerts = gameState.player.getTriangleVertices();
    const asteroidPos = asteroid.getPosition();
    const asteroidSize = asteroid.getSize();

    // Circle-triangle collision detection
    // Check distance from circle center to each triangle edge
    const d1 = distPointToEdge(asteroidPos.x, asteroidPos.y, playerVerts.x1, playerVerts.y1, playerVerts.x2, playerVerts.y2);
    const d2 = distPointToEdge(asteroidPos.x, asteroidPos.y, playerVerts.x2, playerVerts.y2, playerVerts.x3, playerVerts.y3);
    const d3 = distPointToEdge(asteroidPos.x, asteroidPos.y, playerVerts.x3, playerVerts.y3, playerVerts.x1, playerVerts.y1);

    if (d1 <= asteroidSize || d2 <= asteroidSize || d3 <= asteroidSize) {
        return true;
    }

    return false;
}

/**
 * Compute the shortest distance from a point P(px, py) to a line segment AB.
 * A and B are the endpoints of the segment: A(x1, y1), B(x2, y2).
 *
 * Algorithm:
 * 1) Form the direction vector AB = (dx, dy).
 * 2) Project P onto the infinite line AB to get parameter t.
 * 3) Clamp t to [0, 1] so the closest point lies on the segment (not outside it).
 * 4) Measure Euclidean distance from P to that closest point.
 *
 * Returns the distance in the same units as the input (pixels).
 */
function distPointToEdge(px: number, py: number, x1: number, y1: number, x2: number, y2: number): number {
    // Direction vector of segment AB
    const dx = x2 - x1;
    const dy = y2 - y1;

    // Degenerate case: segment reduces to a single point A
    if (dx === 0 && dy === 0) {
        return Math.hypot(px - x1, py - y1);
    }

    // t is the projection of AP onto AB normalized by |AB|^2
    // t < 0 => closest to A; 0 <= t <= 1 => within segment; t > 1 => closest to B
    const t = Math.max(
        0, 
        Math.min(
            1, 
            ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy)
        )
    );

    // Coordinates of the closest point on the segment
    const closestX = x1 + t * dx;
    const closestY = y1 + t * dy;

    // Euclidean distance from P to the closest point
    return Math.hypot(px - closestX, py - closestY);
}

function updateScore() {
    if (!isGameRunning()) return;

    const now = performance.now();
    const startTime = gameState.startTime || now;

    const elapsedSeconds = (now - startTime) / 1000;
    const deltaScore = Math.ceil(elapsedSeconds / 10); // 1 point every 10 seconds

    console.log({elapsedSeconds, deltaScore});
    
    const newScore = (gameState.score || 0) + deltaScore;
    gameState.setState('score', newScore);
}

function isGameRunning(): boolean {
    return gameState.state === 'running';
}

function startGame() {
    if (gameState.state === 'stopped') {
        resetGame();
    }

    gameState.setState('state', 'running');
    gameState.setState('startTime', performance.now());
    requestAnimationFrame(gameLoop);
}

function pauseGame() {
    if (gameState.state === 'running') {
        gameState.setState('state', 'paused');
    }
}

function stopGame() {
    if (gameState.state !== 'stopped') {
        gameState.setState('state', 'stopped');
    }
    gameState.setState('startTime', undefined);
    // resetGame();
}

export {isGameRunning, startGame, pauseGame, stopGame};