class HumanPlayer extends Player {
  constructor(name, boardSize) {
    super(name, boardSize);
  }

  placeShips(shipName, length, isVertical, startPosition) {
    if (
      shipName !== undefined &&
      length !== undefined &&
      isVertical !== undefined &&
      startPosition !== undefined
    ) {
      return super.placeShips(shipName, length, isVertical, startPosition);
    }

    const nameInput =
      window.prompt(`Игрок ${this.name}. Введите имя корабля:`, "Ship") ||
      "Ship";

    const lengthInput =
      Number(
        window.prompt(`Игрок ${this.name}. Введите длину корабля:`, "3")
      ) || 3;

    const orientationInput =
      Number(
        window.prompt(
          `Игрок ${this.name}. Введите расположение (0 — горизонтально, 1 — вертикально):`,
          "0"
        )
      ) || 0;

    const positionInput =
      window.prompt(
        `Игрок ${this.name}. Введите начальные координаты (x,y):`,
        "0,0"
      ) || "0,0";

    const [xStr, yStr] = positionInput.split(",");
    const x = Number(xStr);
    const y = Number(yStr);

    return super.placeShips(nameInput, lengthInput, orientationInput, { x, y });
  }

  async takeTurn(opponent) {
    return super.takeTurn(opponent);
  }
}
