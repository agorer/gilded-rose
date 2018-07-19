class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    function updateQualityNormal(item) {
      item.sellIn -= 1;
      item.quality -= 1;

      if (item.sellIn < 0) item.quality -= 1;
      if (item.quality < 0) item.quality = 0;
    }

    function updateQualityBackstagePasses(item) {
      item.sellIn -= 1;

      item.quality += 1;
      if (item.sellIn < 10) item.quality += 1;
      if (item.sellIn < 5) item.quality += 1;

      if (item.quality > 50) item.quality = 50;
      if (item.sellIn === -1) item.quality = 0;
    }

    function updateQualityAgedBrie(item) {
      item.sellIn -= 1;
      if (item.quality < 50) item.quality += 1;
    }

    this.items.forEach((item) => {
      if (item.name === 'Aged Brie') {
        updateQualityAgedBrie(item);
      } else if (item.name === 'Sulfuras, Hand of Ragnaros') {
        // Nothing to be done in this case as Sulfuras does not modify its values
      } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
        updateQualityBackstagePasses(item);
      } else {
        updateQualityNormal(item);
      }
    });
  }
}

module.exports = Shop;
