export class Player {
  private name: string;
  private color: string;
  private isMyTurn: boolean;
  private element: HTMLElement | null = null;
  private score: number = 0;

  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
    this.isMyTurn = false;
  }

  public getName(): string {
    return this.name;
  }

  public getColor(): string {
    return this.color;
  }

  public getIsMyTurn(): boolean {
    return this.isMyTurn;
  }

  public setIsMyTurn(isMyTurn: boolean): void {
    this.isMyTurn = isMyTurn;
    this.element?.classList.toggle('current-turn', isMyTurn);
    if (isMyTurn) {
      document.getElementsByTagName('body')[0].style.setProperty('--current-player-color', this.getColor());
    }
    else {
      document.getElementsByTagName('body')[0].style.removeProperty('--current-player-color');
    }
  }

  public getElement(): HTMLElement | null {
    return this.element;
  }

  public setElement(element: HTMLElement): void {
    this.element = element;
    this.element.getElementsByClassName('player-name')[0].addEventListener('input', this.nameChangeHandler.bind(this));
  }

  public getScore(): number {
    return this.score;
  }

  public incrementScore(score: number): void {
    this.setScore(this.getScore() + score);
  }

  public resetScore(): void {
    this.setScore(0);
  }

  private setScore(score: number): void {
    this.score = score;

    if (!this.element) return;

    this.element.getElementsByClassName('player-score')[0].textContent = this.score.toString();
  }

  private nameChangeHandler(event: Event): void {
    this.name = (event.target as HTMLInputElement).value;

    const nameParts = this.getName().trim().split(' ');
    const initials = nameParts.length > 1 
        ? `${nameParts[0].charAt(0).toUpperCase()}${nameParts[nameParts.length - 1].charAt(0).toUpperCase()}` 
        : nameParts[0].charAt(0).toUpperCase();
    
    if (!this.element) return;

    this.element.getElementsByClassName('player-initials')[0].textContent = initials;
  }
}