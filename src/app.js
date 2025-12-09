function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class App {
  constructor(boardSize, maxShipLength, maxShipsCount) {
    this._boardSize = Number(boardSize);
    this._maxShipLength = Number(maxShipLength);
    this._maxShipsCount = Number(maxShipsCount);

    this._firstPlayer = null;
    this._secondPlayer = null;
  }

  get boardSize() {
    return this._boardSize;
  }

  get maxShipLength() {
    return this._maxShipLength;
  }

  get maxShipsCount() {
    return this._maxShipsCount;
  }

  get firstPlayer() {
    return this._firstPlayer;
  }

  get secondPlayer() {
    return this._secondPlayer;
  }

  set boardSize(value) {
    this._boardSize = Number(value);
  }

  set maxShipLength(value) {
    this._maxShipLength = Number(value);
  }

  set maxShipsCount(value) {
    this._maxShipsCount = Number(value);
  }

  set firstPlayer(player) {
    this._firstPlayer = player;
  }

  set secondPlayer(player) {
    this._secondPlayer = player;
  }

  async run() {
    const input1 = window.prompt(
      'Введите параметры первого игрока (например: "Max 1 3 0,0 0"):',
      "Max 1 3 0,0 0"
    );

    if (!input1) {
      console.log("[SeaBattle] Ввод первого игрока отменён");
      return;
    }

    const [name1, shipCount1Str, shipLen1Str, startPos1Str, orient1Str] =
      input1.split(" ");

    const shipLen1 = Number(shipLen1Str);
    const orientation1 = Number(orient1Str);
    const [sx1, sy1] = startPos1Str.split(",").map(Number);

    this._firstPlayer = new HumanPlayer(name1, this._boardSize);
    this._firstPlayer.placeShips(`${name1}_Ship1`, shipLen1, orientation1, {
      x: sx1,
      y: sy1,
    });

    const input2 = window.prompt(
      'Введите параметры второго игрока (например: "Alex 1 2 3,1 1"):',
      "Alex 1 2 3,1 1"
    );

    if (!input2) {
      console.log("[SeaBattle] Ввод второго игрока отменён");
      return;
    }

    const [name2, shipCount2Str, shipLen2Str, startPos2Str, orient2Str] =
      input2.split(" ");

    const shipLen2 = Number(shipLen2Str);
    const [sx2, sy2] = startPos2Str.split(",").map(Number);

    this._secondPlayer = new HumanPlayer(name2, this._boardSize);

    const orientationForBoard2 = 0;

    this._secondPlayer.placeShips(
      `${name2}_Ship1`,
      shipLen2,
      orientationForBoard2,
      { x: sx2, y: sy2 }
    );

    const p1 = this._firstPlayer;
    const p2 = this._secondPlayer;

    const allShipsSunk = (player) =>
      player.board.ships.length > 0 &&
      player.board.ships.every((ship) => ship.isSunk());

    console.log(
      "%c[BOARD]%c Доска игрока " + p1.name + " (до боя)",
      "color: cyan; font-weight:bold;",
      "color: white;"
    );
    p1.board.display();

    console.log(
      "%c[BOARD]%c Доска игрока " + p2.name + " (до боя)",
      "color: cyan; font-weight:bold;",
      "color: white;"
    );
    p2.board.display();

    let currentPlayer = p1;
    let opponent = p2;

    while (true) {
      await sleep(1000);

      const turn = await currentPlayer.takeTurn(opponent);
      if (!turn) {
        console.log("[SeaBattle] Игра остановлена");
        return;
      }

      const { x, y } = turn;

      console.log(
        `%c[TURN]%c\n${currentPlayer.name} (${x},${y})`,
        "color: red; font-weight:bold;",
        "color: white;"
      );

      opponent.board.receiveAttack(x, y);

      console.log(
        "%c[BOARD]%c Доска игрока " + opponent.name + " после хода",
        "color: cyan; font-weight:bold;",
        "color: white;"
      );
      opponent.board.display();

      if (allShipsSunk(opponent)) {
        console.log(
          `%c[OUTPUT]%c "${currentPlayer.name}"`,
          "color: cyan; font-weight:bold;",
          "color: white;"
        );
        break;
      }

      [currentPlayer, opponent] = [opponent, currentPlayer];
    }
  }
}
