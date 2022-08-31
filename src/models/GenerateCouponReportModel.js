export class GenerateCouponReportModel {
  constructor({
    transaction,
    customer,
    customerId,
    packageId,
    couponPackage,
    price,
    discount,
    total,
    amount,
    remaining,
    issueDate,
  }) {
    this.transaction = transaction;
    this.customerId = customerId;
    this.customer = customer;
    this.packageId = packageId;
    this.couponPackage = couponPackage;
    this.price = price;
    this.discount = discount;
    this.total = total;
    this.amount = amount;
    this.remaining = remaining;
    this.issueDate = issueDate;
  }
}
