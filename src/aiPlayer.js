class AIPlayer extends Player {
  constructor(name, boardSize) {
    super(name, boardSize);
  }

  placeShips(shipName, length, isVertical, startPosition) {
    const randomOrientation = Math.random() < 0.5 ? 0 : 1;
    const randomX = Math.floor(Math.random() * this.boardSize);
    const randomY = Math.floor(Math.random() * this.boardSize);

    return super.placeShips(
      shipName || "AIShip",
      length || 3,
      isVertical ?? randomOrientation,
      startPosition || { x: randomX, y: randomY }
    );
  }

  async takeTurn(opponent) {
    const x = Math.floor(Math.random() * this.boardSize);
    const y = Math.floor(Math.random() * this.boardSize);

    return { x, y, opponent };
  }
}
