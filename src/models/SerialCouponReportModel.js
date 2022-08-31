export class SerialCouponReportModel {
  constructor({ id, code, name, expiredStarted, expiredEnd, issueDate }) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.expiredStarted = expiredStarted;
    this.expiredEnd = expiredEnd;
    this.issueDate = issueDate;
  }
}
