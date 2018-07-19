const Shop = require('./shop');
const Item = require('./item');

let shop;

beforeEach(() => {
  shop = new Shop();
});

test('Should lower sell in date and quality at the end of the day', () => {
  shop.items.push(new Item('an-item', 2, 2));

  shop.updateQuality();

  expect(shop.items[0]).toEqual({ name: 'an-item', sellIn: 1, quality: 1 });
});

test('The quality of an item should never be negative', () => {
  shop.items.push(new Item('an-item', 2, 0));

  shop.updateQuality();

  expect(shop.items[0]).toEqual({ name: 'an-item', sellIn: 1, quality: 0 });
});

test('Outdated products lose quality twice as fast', () => {
  shop.items.push(new Item('an-item', 0, 2));

  shop.updateQuality();

  expect(shop.items[0]).toEqual({ name: 'an-item', sellIn: -1, quality: 0 });
});

test('Even outdated items could not have negative quality', () => {
  shop.items.push(new Item('an-item', 0, 1));

  shop.updateQuality();

  expect(shop.items[0]).toEqual({ name: 'an-item', sellIn: -1, quality: 0 });
});
