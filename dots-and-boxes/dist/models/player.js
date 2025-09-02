export class Player {
    constructor(name, color) {
        this.element = null;
        this.score = 0;
        this.name = name;
        this.color = color;
        this.isMyTurn = false;
    }
    getName() {
        return this.name;
    }
    getColor() {
        return this.color;
    }
    getIsMyTurn() {
        return this.isMyTurn;
    }
    setIsMyTurn(isMyTurn) {
        var _a;
        this.isMyTurn = isMyTurn;
        (_a = this.element) === null || _a === void 0 ? void 0 : _a.classList.toggle('current-turn', isMyTurn);
        if (isMyTurn) {
            document.getElementsByTagName('body')[0].style.setProperty('--current-player-color', this.getColor());
        }
        else {
            document.getElementsByTagName('body')[0].style.removeProperty('--current-player-color');
        }
    }
    getElement() {
        return this.element;
    }
    setElement(element) {
        this.element = element;
        this.element.getElementsByClassName('player-name')[0].addEventListener('input', this.nameChangeHandler.bind(this));
    }
    getScore() {
        return this.score;
    }
    incrementScore(score) {
        this.setScore(this.getScore() + score);
    }
    resetScore() {
        this.setScore(0);
    }
    setScore(score) {
        this.score = score;
        if (!this.element)
            return;
        this.element.getElementsByClassName('player-score')[0].textContent = this.score.toString();
    }
    nameChangeHandler(event) {
        this.name = event.target.value;
        const nameParts = this.getName().trim().split(' ');
        const initials = nameParts.length > 1
            ? `${nameParts[0].charAt(0).toUpperCase()}${nameParts[nameParts.length - 1].charAt(0).toUpperCase()}`
            : nameParts[0].charAt(0).toUpperCase();
        if (!this.element)
            return;
        this.element.getElementsByClassName('player-initials')[0].textContent = initials;
    }
}
//# sourceMappingURL=player.js.map