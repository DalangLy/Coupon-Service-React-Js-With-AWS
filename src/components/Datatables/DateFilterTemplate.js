const { Calendar } = require('primereact/calendar');

const DateFilterTemplate = (options) => {
  return (
    <Calendar
      value={options.value}
      onChange={(e) => options.filterCallback(e.value, options.index)}
      dateFormat='mm/dd/yy'
      placeholder='mm/dd/yyyy'
      mask='99/99/9999'
    />
  );
};

export default DateFilterTemplate;
