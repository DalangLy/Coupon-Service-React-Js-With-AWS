const headerRowMailTemplate = (
  data
) => `<tr style="border: 1px solid #dddddd;text-align: left;padding: 8px;">
          <td style="border: 1px solid #dddddd;text-align: left;padding: 8px; font-family: Roboto,Helvetica,Arial,sans-serif; font-size: 14px; background-color: gainsboro;"
           colspan="3">${data}</td>
      </tr>`;

export default headerRowMailTemplate;
