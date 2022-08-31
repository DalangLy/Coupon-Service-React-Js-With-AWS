import { API } from 'aws-amplify';
import {
  updateSaleCoupon,
  // updateSerialCoupon,
} from 'graphql/mutations';
import { createCouponApplied, updateCouponSerialCode } from 'graphql/mutations';

export default async function closeTicketRepository(data) {
  try {
    // sale
    const deletedAt = new Date().toISOString();
    const bodyApplyCoupon = {
      issueDate: deletedAt,
      couponAppliedApplierId: data?.customer?.id,
      couponAppliedCouponId: data.couponId,
      couponAppliedResolverId: data?.resolver?.id,
      couponAppliedSerialCouponId: data.serialCouponId,
      note: data.description,
    };

    // // update add delete date
    await API.graphql({
      query: updateCouponSerialCode,
      variables: {
        input: {
          id: data.serialCouponId,
          deletedAt: deletedAt,
        },
      },
    });

    const used = data.generateCoupon.totalCouponSerialCodeUsed + 1;
    await API.graphql({
      query: updateSaleCoupon,
      variables: {
        input: {
          id: data.generateCoupon.id,
          totalCouponSerialCodeUsed: used,
        },
      },
    });

    await API.graphql({
      query: createCouponApplied,
      variables: {
        input: bodyApplyCoupon,
      },
    });

    const message = `
    <img src="https://www.atech-it.com/wp-content/uploads/2020/04/cropped-ATC-logo-final-with-tagline.png" style="width : 30%; margin-bottom:3rem; margin-left: 10%" />
    <h4>Dear Value Customer,</h4>
    <p>You have used coupon code <b>${data.code}</b>.</p>
    <div style="width:60%; margin-top:20px">
      <table style="width:100%">
        <thead>
          <th style="border: 1px solid #dddddd;text-align: left;padding: 8px; width:20%">Issue Date</th>
          <th style="border: 1px solid #dddddd;text-align: left;padding: 8px; width:35%">Resolver</th>
          <th style="border: 1px solid #dddddd;text-align: left;padding: 8px; width:45%">Description </th>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #dddddd;text-align: left;padding: 8px; width:20%">${
              deletedAt.split('T')[0]
            }</td>
            <td style="border: 1px solid #dddddd;text-align: left;padding: 8px; width:35%"> ${
              data.resolver?.firstName + ' ' + data.resolver.lastName
            }</td>
            <td style="border: 1px solid #dddddd;text-align: left;padding: 8px; width:45%"> ${
              data.description
            } </td>
          </tr>
        </tbody>
      </table>

    </div>

    <p style="margin-top:20px">Thanks for choose us to be your partner!</p>
      `;

    const myInit = {
      body: {
        toAddresses: [data.customer?.email],

        replyToAddresses: [data?.mailTemplate?.sourceMail],
        source: data?.mailTemplate?.sourceMail,
        content: message,
        title: data.mailTemplate?.closeTicketMailTemplate?.title,
      }, // replace this with attributes you need
    };

    API.post('sendMail', '/sendMail', myInit);
  } catch (e) {
    throw e;
  }
}
