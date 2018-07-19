const Shop = require('./shop');
const Sulfuras = require('./sulfuras');

let shop;

beforeEach(() => {
  shop = new Shop();
});

test('Sulfuras never ages or decreases in quality', () => {
  shop.items.push(new Sulfuras());

  shop.updateQuality();

  expect(shop.items[0]).toEqual({ name: 'Sulfuras, Hand of Ragnaros', sellIn: 80, quality: 80 });
});
