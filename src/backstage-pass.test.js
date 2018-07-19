const Shop = require('./shop');
const BackstagePass = require('./backstage-pass');

let shop;

beforeEach(() => {
  shop = new Shop();
});

test('Backstage passes quality increases by 1 if there are more than 10 days left', () => {
  shop.items.push(new BackstagePass(20, 10));
  shop.items.push(new BackstagePass(11, 10));

  shop.updateQuality();

  expect(shop.items[0]).toEqual({ name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 19, quality: 11 });
  expect(shop.items[1]).toEqual({ name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 10, quality: 11 });
});

test('Backstage passes quality could not be more than 50', () => {
  shop.items.push(new BackstagePass(20, 50));

  shop.updateQuality();

  expect(shop.items[0]).toEqual({ name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 19, quality: 50 });
});

test('Backstage passes quality increases by 2 if there are between 10 and 6 days left', () => {
  shop.items.push(new BackstagePass(10, 10));
  shop.items.push(new BackstagePass(9, 10));
  shop.items.push(new BackstagePass(6, 10));

  shop.updateQuality();

  expect(shop.items[0]).toEqual({ name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 9, quality: 12 });
  expect(shop.items[1]).toEqual({ name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 8, quality: 12 });
  expect(shop.items[2]).toEqual({ name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 5, quality: 12 });
});

test('Backstage passes quality increases by 3 if there are less than 6 days left', () => {
  shop.items.push(new BackstagePass(5, 10));
  shop.items.push(new BackstagePass(3, 10));
  shop.items.push(new BackstagePass(1, 10));

  shop.updateQuality();

  expect(shop.items[0]).toEqual({ name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 4, quality: 13 });
  expect(shop.items[1]).toEqual({ name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 2, quality: 13 });
  expect(shop.items[2]).toEqual({ name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: 0, quality: 13 });
});

test('Backstate passes quality drop to 0 the day after the concert', () => {
  shop.items.push(new BackstagePass(0, 10));

  shop.updateQuality();

  expect(shop.items[0]).toEqual({ name: 'Backstage passes to a TAFKAL80ETC concert', sellIn: -1, quality: 0 });
});
