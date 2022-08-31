const rowMailTemplate = (
  isRowspan = false,
  rowspan = 0
) => `<tr style="border: 1px solid #dddddd;text-align: left;padding: 3px;">
          <td style="border: 1px solid #dddddd;text-align: center;padding: 3px; font-family: Roboto,Helvetica,Arial,sans-serif; font-size: 14px;">CODE</td>
          <td style="border: 1px solid #dddddd;text-align: center;padding: 3px; font-family: Roboto,Helvetica,Arial,sans-serif; font-size: 14px;">EXPIRED</td>
          ${
            isRowspan
              ? `<td style="border: 1px solid #dddddd;text-align: inherit; vertical-align: top; padding: 3px; font-family: Roboto,Helvetica,Arial,sans-serif; font-size: 14px;" rowspan="${rowspan}"><pre>DESCRIPTION</pre></td>`
              : ''
          }
          
      </tr>`;

export default rowMailTemplate;
