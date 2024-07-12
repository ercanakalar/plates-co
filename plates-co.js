const data = [
  {
    product: 'Red Plate',
    code: 'R01',
    price: 32.95,
  },
  {
    product: 'Green Plate',
    code: 'G01',
    price: 24.95,
  },
  {
    product: 'Blue Plate',
    code: 'B01',
    price: 7.95,
  },
];

const deliveryRules = {
  under50: 4.95,
  under90: 2.95,
  over90: 0,
};

class PlatesCo {
  constructor(data, deliveryRules, offers) {
    this.dataMap = new Map();
    this.order = [];
    this.deliveryRules = deliveryRules;
    this.offers = offers;
    this.createMap(data);
  }

  createMap(data) {
    data.forEach((obj) => {
      this.dataMap.set(obj.code, obj.price);
    });
  }

  add(productCode) {
    if (this.dataMap.has(productCode)) {
      this.order.push(productCode);
    } else {
      throw new Error('Product code not found in the products');
    }
  }

  total() {
    let total = 0;
    let productCounts = {};

    this.order.forEach((productCode) => {
      total += this.dataMap.get(productCode);
      productCounts[productCode] = (productCounts[productCode] || 0) + 1;
    });

    if (this.offers) {
      for (const offer of this.offers) {
        total -= offer.apply(productCounts, this.dataMap);
      }
    }

    let deliveryCharge = 0;
    if (total < 50) {
      deliveryCharge = this.deliveryRules.under50;
    } else if (total < 90) {
      deliveryCharge = this.deliveryRules.under90;
    }

    total += deliveryCharge;

    return parseFloat(total.toFixed(2));
  }
}

class Offer {
  constructor(type, details) {
    this.type = type;
    this.details = details;
  }

  apply(productCounts, dataMap) {
    let discount = 0;

    if (this.type === 'BOGO50' && productCounts[this.details.productCode]) {
      const count = productCounts[this.details.productCode];
      discount =
        Math.floor(count / 2) * (dataMap.get(this.details.productCode) / 2);
      console.log(discount, 'discount');
    }

    return discount;
  }
}

const offers = [new Offer('BOGO50', { productCode: 'R01' })];

const basket1 = new PlatesCo(data, deliveryRules, offers);
basket1.add('B01');
basket1.add('G01');
console.log(basket1.total());

const basket2 = new PlatesCo(data, deliveryRules, offers);
basket2.add('R01');
basket2.add('R01');
console.log(basket2.total());

const basket3 = new PlatesCo(data, deliveryRules, []);
basket3.add('R01');
basket3.add('G01');
console.log(basket3.total());

const basket4 = new PlatesCo(data, deliveryRules, offers);
basket4.add('B01');
basket4.add('B01');
basket4.add('R01');
basket4.add('R01');
basket4.add('R01');
console.log(basket4.total());
