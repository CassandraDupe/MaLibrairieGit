// un livre
export default class Livre {
  constructor(id, titre, qtestock, prix) {
    this._titre = titre;
    this._qtestock = qtestock;
    this._prix = prix;
    this._id = id;
  }

  get titre() {
    return this._titre;
  }

  get qtestock() {
    return this._qtestock;
  }

  get prix() {
    return this._prix;
  }

  get id() {
    return this._id;
  }

  toShow() {
    return `${this._titre}, ${this._qtestock} en stock, ${this._prix}€`;
  }

  addOneBook() {
    this._qtestock = this._qtestock + 1;
  }

  deleteOneBook() {
    this._qtestock = this._qtestock - 1;
  }
}
