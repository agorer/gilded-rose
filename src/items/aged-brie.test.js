const Shop = require('../shop');
const AgedBrie = require('./aged-brie');

let shop;

beforeEach(() => {
  shop = new Shop();
});

test('Aged brie increases in quality the older it gets', () => {
  shop.items.push(new AgedBrie(2, 2));

  shop.updateQuality();

  expect(shop.items[0]).toEqual({ name: 'Aged Brie', sellIn: 1, quality: 3 });
});

test('Aged brie quality is never more than 50', () => {
  shop.items.push(new AgedBrie(2, 50));

  shop.updateQuality();

  expect(shop.items[0]).toEqual({ name: 'Aged Brie', sellIn: 1, quality: 50 });
});
