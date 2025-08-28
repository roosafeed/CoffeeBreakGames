// Game data - easily extensible
const games = [
    {
        id: 'meteor-rush',
        title: 'Meteor Rush',
        genre: 'Arcade • Action',
        description: 'Navigate through space and avoid meteors in this fast-paced arcade game. Use arrow keys to survive as long as possible!',
        icon: '🚀',
        theme: 'meteor-rush',
        url: './meteor-rush/index.html', // Update with your actual game path
        available: true
    },
];

// Generate stars
function createStars() {
    const starsContainer = document.getElementById('stars');
    const numStars = 100;
    
    for (let i = 0; i < numStars; i++) {
        const size = Math.random() * 5 + 1; // Random size between 1 and 6px
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

// Render games
function renderGames() {
    const gamesGrid = document.getElementById('gamesGrid');
    
    games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = `game-card ${game.theme} ${!game.available ? 'coming-soon' : ''}`;
        
        gameCard.innerHTML = `
            <div class="game-icon">${game.icon}</div>
            <h3 class="game-title">${game.title}</h3>
            <div class="game-genre">${game.genre}</div>
            <p class="game-description">${game.description}</p>
            <button class="play-button" ${game.available ? `onclick="playGame('${game.url}')"` : 'disabled'}>
                ${game.available ? 'Play Now' : 'Coming Soon'}
            </button>
        `;
        
        gamesGrid.appendChild(gameCard);
    });
}

// Play game function
function playGame(url) {
    window.location.href = url;
}

// Add new game function (for easy extension)
function addGame(gameData) {
    games.push(gameData);
    renderGames();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    renderGames();
});