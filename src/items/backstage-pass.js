const Item = require('./item');

class BackstagePass extends Item {
  constructor(sellIn, quality) {
    super('Backstage passes to a TAFKAL80ETC concert', sellIn, quality);
  }

  updateQuality() {
    this.sellIn -= 1;

    this.quality += 1;
    if (this.sellIn < 10) this.quality += 1;
    if (this.sellIn < 5) this.quality += 1;

    if (this.quality > 50) this.quality = 50;
    if (this.sellIn === -1) this.quality = 0;
  }
}

module.exports = BackstagePass;
