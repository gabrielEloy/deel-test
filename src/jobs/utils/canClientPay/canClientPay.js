function canClientPay(client, job) {
  return client.balance >= job.price;
}


module.exports = canClientPay;