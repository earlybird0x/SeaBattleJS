class Player {
  constructor(name, boardSize) {
    this._name = name;
    this._boardSize = Number(boardSize);
    this._board = new Board(this._boardSize);
  }

  get name() {
    return this._name;
  }

  get boardSize() {
    return this._boardSize;
  }

  get board() {
    return this._board;
  }

  set name(value) {
    this._name = value;
  }

  set boardSize(value) {
    this._boardSize = Number(value);
    this._board = new Board(this._boardSize);
  }

  set board(value) {
    this._board = value;
  }

  placeShips(shipName, length, isVertical, startPosition) {
    const ship = new Ship(shipName, length, isVertical);
    return this._board.placeShip(ship, startPosition.x, startPosition.y);
  }

  async takeTurn(opponent) {
    const input = window.prompt(
      `Ход игрока ${this._name}. Введите координаты выстрела (x y):`,
      "0 0"
    );

    if (!input) {
      console.log("[SeaBattle] Ход отменён");
      return null;
    }

    const [xStr, yStr] = input.split(" ");
    const x = Number(xStr);
    const y = Number(yStr);

    return { x, y, opponent };
  }
}
