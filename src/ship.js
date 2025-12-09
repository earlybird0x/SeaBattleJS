class Ship {
  constructor(name, length, orientation) {
    this._name = name;
    this._length = Number(length);
    this._orientation = Number(orientation);

    this._hits = new Array(this._length).fill(false);
    this._startPosition = { x: 0, y: 0 };
  }

  get name() {
    return this._name;
  }

  get length() {
    return this._length;
  }

  get orientation() {
    return this._orientation;
  }

  get hits() {
    return this._hits;
  }

  get startPosition() {
    return this._startPosition;
  }

  get startX() {
    return this._startPosition.x;
  }

  get startY() {
    return this._startPosition.y;
  }

  set name(value) {
    this._name = value;
  }

  set length(value) {
    this._length = Number(value);
    this._hits = new Array(this._length).fill(false);
  }

  set orientation(value) {
    this._orientation = Number(value);
  }

  set hits(value) {
    this._hits = value;
  }

  set startPosition(pos) {
    this._startPosition = {
      x: Number(pos.x),
      y: Number(pos.y),
    };
  }

  set startX(value) {
    this._startPosition.x = Number(value);
  }

  set startY(value) {
    this._startPosition.y = Number(value);
  }

  hit(index) {
    const i = Number(index);
    if (i >= 0 && i < this._hits.length) {
      this._hits[i] = true;
    }
  }

  isSunk() {
    return this._hits.every((hit) => hit === true);
  }
}
