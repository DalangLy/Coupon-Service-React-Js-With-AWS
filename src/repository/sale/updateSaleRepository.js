import { API, Auth } from 'aws-amplify';
import { GenerateCouponStatus } from 'config/constants';
import { updateSaleCoupon } from 'graphql/mutations';
import getCurrentUserGroup from 'repository/group/getCurrentUserGroup';
import { generateSerialCoupon } from 'utils';
import createSerialCouponRepository from './createSerialCouponRepository';
import findSaleRepository from './findSaleRepository';

export default async function updateSaleRepository(data, mailTemplate) {
  try {
    const auth = await Auth.currentAuthenticatedUser();
    const groups = await getCurrentUserGroup();
    const serials = generateSerialCoupon(data?.package);

    if (groups.includes('Sales')) {
      const saleCoupon = {
        id: data.id,
        saleCouponApproverId: auth.username,
        status: GenerateCouponStatus.APPROVED,
      };

      await API.graphql({
        query: updateSaleCoupon,
        variables: { input: saleCoupon },
      });

      const body = {
        saleId: data.id,
        customerId: data?.owner?.id,
        customerMail: data?.owner?.email,
        price: 0,
      };
      // generate serial
      await createSerialCouponRepository(body, mailTemplate, serials);
      const sale = await findSaleRepository(data?.id);
      return sale;
    }
  } catch (e) {
    console.log(e);
    console.log('someting error');
  }
}
