export class CloseTicketReportModel {
  constructor({
    id,
    code,
    couponName,
    price,
    owner,
    resolver,
    usedBy,
    createdAt,
  }) {
    this.id = id;
    this.code = code;
    this.couponName = couponName;
    this.price = price;
    this.owner = owner;
    this.resolver = resolver;
    this.usedBy = usedBy;
    this.createdAt = createdAt;
  }
}
