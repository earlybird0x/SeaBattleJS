class Board {
  constructor(size) {
    this._size = Number(size);
    this._grid = Array.from({ length: this._size }, () =>
      Array(this._size).fill(null)
    );
    this._ships = [];
  }

  renderToDOM(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";
    container.className = "board";
    container.style.gridTemplateColumns = `repeat(${this._size}, 30px)`;

    for (let i = 0; i < this._size; i++) {
      for (let j = 0; j < this._size; j++) {
        const cell = this._grid[i][j];
        const div = document.createElement("div");
        div.classList.add("cell");

        let symbol = "O";
        let classModifier = "cell-empty";

        if (cell === "hit") {
          symbol = "X";
          classModifier = "cell-hit";
        } else if (cell === "miss") {
          symbol = "*";
          classModifier = "cell-miss";
        } else if (cell instanceof Ship) {
          symbol = "S";
          classModifier = "cell-ship";
        }

        div.textContent = symbol;
        div.classList.add(classModifier);

        container.appendChild(div);
      }
    }
  }

  get size() {
    return this._size;
  }

  get grid() {
    return this._grid;
  }

  get ships() {
    return this._ships;
  }

  set size(value) {
    this._size = Number(value);
  }

  set grid(value) {
    this._grid = value;
  }

  set ships(value) {
    this._ships = value;
  }

  placeShip(ship, x, y) {
    x = Number(x);
    y = Number(y);

    if (x < 0 || y < 0 || x >= this._size || y >= this._size) {
      console.error("Ошибка: координаты за пределами поля");
      return false;
    }

    if (ship.orientation === 1) {
      if (x + ship.length > this._size) {
        console.error("Ошибка: корабль выходит за пределы поля (вертикально)");
        return false;
      }
    } else {
      if (y + ship.length > this._size) {
        console.error(
          "Ошибка: корабль выходит за пределы поля (горизонтально)"
        );
        return false;
      }
    }

    for (let i = 0; i < ship.length; i++) {
      const xi = ship.orientation === 1 ? x + i : x;
      const yi = ship.orientation === 1 ? y : y + i;

      if (this._grid[xi][yi] !== null) {
        console.error("Ошибка: клетки уже заняты другим кораблём");
        return false;
      }
    }

    for (let i = 0; i < ship.length; i++) {
      const xi = ship.orientation === 1 ? x + i : x;
      const yi = ship.orientation === 1 ? y : y + i;
      this._grid[xi][yi] = ship;
    }

    ship.startX = x;
    ship.startY = y;
    this._ships.push(ship);

    return true;
  }

  findAvailableCells() {
    const available = [];

    for (let i = 0; i < this._size; i++) {
      for (let j = 0; j < this._size; j++) {
        if (this._grid[i][j] === null) {
          available.push({ x: i, y: j });
        }
      }
    }

    return available;
  }

  receiveAttack(x, y) {
    x = Number(x);
    y = Number(y);

    if (x < 0 || y < 0 || x >= this._size || y >= this._size) {
      console.error("Ошибка: координаты за пределами поля");
      return false;
    }

    const cell = this._grid[x][y];

    if (cell === null) {
      this._grid[x][y] = "miss";
      return false;
    }

    if (cell === "hit" || cell === "miss") {
      return false;
    }

    if (cell instanceof Ship) {
      const ship = cell;

      const hitIndex =
        ship.orientation === 0 ? y - ship.startY : x - ship.startX;

      ship.hit(hitIndex);
      this._grid[x][y] = "hit";
      return true;
    }

    return false;
  }

  display() {
    for (let i = 0; i < this._size; i++) {
      let line = "";
      const styles = [];

      for (let j = 0; j < this._size; j++) {
        const cell = this._grid[i][j];

        let symbol = "O";
        let style = "color: deepskyblue";

        if (cell === "hit") {
          symbol = "X";
          style = "color: red; font-weight:bold";
        } else if (cell === "miss") {
          symbol = ".";
          style = "color: gray";
        } else if (cell instanceof Ship) {
          symbol = "S";
          style = "color: limegreen; font-weight:bold";
        }

        line += `%c${symbol} `;
        styles.push(style);
      }

      console.log(line, ...styles);
    }
  }
}
