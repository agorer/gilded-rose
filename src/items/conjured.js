const Item = require('./item');

class Conjured extends Item {
  constructor(sellIn, quality) {
    super('Conjured', sellIn, quality);
  }

  updateQuality() {
    this.sellIn -= 1;
    this.quality -= 2;

    if (this.sellIn < 0) this.quality -= 2;
    if (this.quality < 0) this.quality = 0;
  }
}

module.exports = Conjured;
