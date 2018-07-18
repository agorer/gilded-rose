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

test('Aged brie increases in quality the older it gets', () => {
  shop.items.push(new Item('Aged Brie', 2, 2));

  shop.updateQuality();

  expect(shop.items[0]).toEqual({ name: 'Aged Brie', sellIn: 1, quality: 3 });
});

test('Aged brie quality is never more than 50', () => {
  shop.items.push(new Item('Aged Brie', 2, 50));

  shop.updateQuality();

  expect(shop.items[0]).toEqual({ name: 'Aged Brie', sellIn: 1, quality: 50 });
});

test('Sulfuras never ages or decreases in quality', () => {
  shop.items.push(new Item('Sulfuras, Hand of Ragnaros', 2, 80));

  shop.updateQuality();

  expect(shop.items[0]).toEqual({ name: 'Sulfuras, Hand of Ragnaros', sellIn: 2, quality: 80 });
});

test('Backstage passes quality increases by 1 if there are more than 10 days left', () => {
  shop.items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 20, 10));
  shop.items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 11, 10));

  shop.updateQuality();

  expect(shop.items[0]).toEqual({ name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 19, quality: 11 });
  expect(shop.items[1]).toEqual({ name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 10, quality: 11 });
});

test('Backstage passes quality could not be more than 50', () => {
  shop.items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 20, 50));

  shop.updateQuality();

  expect(shop.items[0]).toEqual({ name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 19, quality: 50 });
});

test('Backstage passes quality increases by 2 if there are between 10 and 6 days left', () => {
  shop.items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10));
  shop.items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 9, 10));
  shop.items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 6, 10));

  shop.updateQuality();

  expect(shop.items[0]).toEqual({ name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 9, quality: 12 });
  expect(shop.items[1]).toEqual({ name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 8, quality: 12 });
  expect(shop.items[2]).toEqual({ name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 5, quality: 12 });
});

test('Backstage passes quality increases by 3 if there are less than 6 days left', () => {
  shop.items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10));
  shop.items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 3, 10));
  shop.items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 1, 10));

  shop.updateQuality();

  expect(shop.items[0]).toEqual({ name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 4, quality: 13 });
  expect(shop.items[1]).toEqual({ name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 2, quality: 13 });
  expect(shop.items[2]).toEqual({ name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 0, quality: 13 });
});

test('Backstate passes quality drop to 0 the day after the concert', () => {
  shop.items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10));

  shop.updateQuality();

  expect(shop.items[0]).toEqual({ name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: -1, quality: 0 });
});
