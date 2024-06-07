const canClientPay = require('./canClientPay');

describe('canClientPay', () => {
  it('should return true if client balance is greater than job price', () => {
    const client = { balance: 1000 };
    const job = { price: 500 };
    expect(canClientPay(client, job)).toBe(true);
  });

  it('should return true if client balance is equal to job price', () => {
    const client = { balance: 500 };
    const job = { price: 500 };
    expect(canClientPay(client, job)).toBe(true);
  });

  it('should return false if client balance is less than job price', () => {
    const client = { balance: 300 };
    const job = { price: 500 };
    expect(canClientPay(client, job)).toBe(false);
  });

  it('should return false if client balance is smaller than job price', () => {
    const client = { balance: 0 };
    const job = { price: 500 };
    expect(canClientPay(client, job)).toBe(false);
  });
});
