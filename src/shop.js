class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      item.updateQuality();
    });
  }
}

module.exports = Shop;
