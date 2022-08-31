const generateCouponMailBodyTemplate = (rows, template, logo) => {
  let body = `
          <div style="width: 100%; height: 100%;">
            <div style=" width: 40%; margin: 0 auto;">
                <div style="width: 80%; margin: 0 auto; padding: 20px;">
                    <img src="${logo}" style="width: 100%; text-align: center;" alt="" />
                </div>

                <h3 style="text-align: center; font-family: Roboto,Helvetica,Arial,sans-serif">${template.header1}</h3>
                <p style="text-align: center; font-family: Roboto,Helvetica,Arial,sans-serif;font-size: 14px;">
                    ${template.header2}
                </p>
                <p style="text-align: center; font-family: Roboto,Helvetica,Arial,sans-serif; font-size: 14px;">
                    ${template.header3}
                </p>
            </div>

            <div style=" width: 50%; margin: 0 auto; margin-top: 50px;">
                <table style="width: 100%;  border-collapse: collapse;">
                    <thead>
                        <tr style="border: 1px solid #dddddd;text-align: left;padding: 8px;">
                            <th style="width: 25%; border: 1px solid #dddddd;text-align: left;padding: 8px; font-family: Roboto,Helvetica,Arial,sans-serif; font-size: 14px;"> Code</th>
                            <th style="width: 25%; border: 1px solid #dddddd;text-align: left;padding: 8px; font-family: Roboto,Helvetica,Arial,sans-serif; font-size: 14px;">Expired Date</th>
                            <th style="width: 50%; border: 1px solid #dddddd;text-align: left;padding: 8px; font-family: Roboto,Helvetica,Arial,sans-serif; font-size: 14px;">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>

                <h4 style="text-align: center; font-family: Roboto,Helvetica,Arial,sans-serif; margin-top: 25px;">${template.footer}</h4>
            </div>
          `;

  return body;
};

export default generateCouponMailBodyTemplate;
