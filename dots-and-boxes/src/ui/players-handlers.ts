import { Player } from "../models/player.js";

const playersContainer = document.getElementById('players-container');

function addPlayerToUI(player: Player) {
    if (playersContainer === null)
        throw new Error("Players container not found");

    playersContainer.appendChild(player.getElement()!);
}

function createPlayerElement(player: Player): HTMLElement {
    const playerElement = document.createElement('div');
    playerElement.classList.add('player');

    playerElement.setAttribute('data-player-name', player.getName());
    playerElement.setAttribute('data-player-color', player.getColor());

    const colorElement = document.createElement('div');
    colorElement.classList.add('player-icon');
    colorElement.style.backgroundColor = player.getColor();

    const nameParts = player.getName().split(' ');
    const initials = nameParts.length > 1 
        ? `${nameParts[0].charAt(0).toUpperCase()}${nameParts[nameParts.length - 1].charAt(0).toUpperCase()}` 
        : nameParts[0].charAt(0).toUpperCase();
    
    const initialsElement = document.createElement('span');
    initialsElement.classList.add('player-initials');
    initialsElement.textContent = initials;
    colorElement.appendChild(initialsElement);
    playerElement.appendChild(colorElement);

    const nameElement = document.createElement('input');
    nameElement.type = 'text';
    nameElement.classList.add('player-name');
    nameElement.value = player.getName();
    playerElement.appendChild(nameElement);

    const scoreElement = document.createElement('span');
    scoreElement.classList.add('player-score');
    scoreElement.textContent = String(player.getScore());
    playerElement.appendChild(scoreElement);

    return playerElement;
}


export {createPlayerElement, addPlayerToUI};