const Item = require('./item');

class Sulfuras extends Item {
  constructor() {
    super('Sulfuras, Hand of Ragnaros', 80, 80);
  }

  updateQuality() {
    // Nothing to be done in this case as Sulfuras does not modify its values
    // Use this line only to silent linter error
    this.quality = this.quality;
  }
}

module.exports = Sulfuras;
