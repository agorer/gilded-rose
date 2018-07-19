const Shop = require('../shop');
const Conjured = require('./conjured');

let shop;

beforeEach(() => {
  shop = new Shop();
});

test('Degrade twice as fast as normal items', () => {
  shop.items.push(new Conjured(2, 4));

  shop.updateQuality();

  expect(shop.items[0]).toEqual({ name: 'Conjured', sellIn: 1, quality: 2 });
});

test('Degrade four times faster when outdated', () => {
  shop.items.push(new Conjured(0, 8));

  shop.updateQuality();

  expect(shop.items[0]).toEqual({ name: 'Conjured', sellIn: -1, quality: 4 });
});

test('Should not have negative quality', () => {
  shop.items.push(new Conjured(2, 1));

  shop.updateQuality();

  expect(shop.items[0]).toEqual({ name: 'Conjured', sellIn: 1, quality: 0 });
});
