const sales = [
  {
    "saleId": 1,
    "date": "2023-05-07T05:43:03.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-05-07T05:43:03.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-05-07T05:43:03.000Z",
    "productId": 3,
    "quantity": 15
  }
];

const salesId = {
  "productId": 3,
  "quantity": 15
};

const newSales = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const newSalesMock = [
  {
    "saleId": 1,
    "date": "2023-05-07T05:43:03.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-05-07T05:43:03.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-05-07T05:43:03.000Z",
    "productId": 3,
    "quantity": 15
  },
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

module.exports = {
  sales,
  salesId,
  newSales,
  newSalesMock,
};