import { API, Auth } from 'aws-amplify';
import { getSaleCoupon } from 'graphql/queries';
import { createSaleCoupon } from 'graphql/mutations';
import GroupStatement from 'config/constants/GroupStatement';
import createSerialCouponRepository from './createSerialCouponRepository';
import { GenerateCouponStatus } from 'config/constants';

export default async function createSaleRepository(data, mailing) {
  const auth = await Auth.currentAuthenticatedUser();

  try {
    if (data.serialCoupons.length <= 0) {
      return;
    }

    const group =
      auth?.signInUserSession?.accessToken?.payload['cognito:groups'];
    let isApproved = '';
    let customerMail = data.customer?.email;
    if (group !== undefined || group.length > 0) {
      isApproved = group.includes(GroupStatement.GUESTS) ? null : auth.username;
    }

    let customerId = group.includes('Sales')
      ? data.customer?.id
      : auth.username;

    //
    const totalCoupons = data.serialCoupons.reduce(
      (pre, serial) => pre + serial.codes.length,
      0
    );

    const saleCoupon = {
      transaction: 'TS' + Date.parse(new Date()),
      price: data.price,
      quantity: data.quantity,
      discount: data.discount,
      total: data.total,
      totalCouponSerialCodeAmount: totalCoupons,
      totalCouponSerialCodeUsed: 0,
      saleCouponPackageId: data.packageId,
      saleCouponOwnerId: customerId,
      saleCouponCreatorId: auth.username,
      saleCouponApproverId: isApproved,
      status: group.includes('Sales')
        ? GenerateCouponStatus.APPROVED
        : GenerateCouponStatus.PENDING,
    };

    const response = await API.graphql({
      query: createSaleCoupon,
      variables: { input: saleCoupon },
    });

    const saleId = response.data.createSaleCoupon.id;
    const body = {
      saleId: saleId,
      customerId: customerId,
      customerMail: customerMail,
      price: data.price,
    };
    // generate serial
    if (group.includes('Sales')) {
      await createSerialCouponRepository(body, mailing, data.serialCoupons);
    }

    const item = await API.graphql({
      query: getSaleCoupon,
      variables: { id: saleId },
    });
    return item;
  } catch (e) {
    console.log(e);
  }
}
