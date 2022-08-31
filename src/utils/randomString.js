//
export default function randomString(value) {
  var firstPart = (Math.random() * 4665674) | 0;
  var secondPart = (Math.random() * 4665636) | 0;
  var date = new Date().toISOString();
  let now = date.split(':');
  now = now[0].replace('-', '');
  firstPart = (now + firstPart.toString(36)).slice(-4);
  secondPart = (now + secondPart.toString(36)).slice(-4);
  return (value + firstPart + secondPart).toUpperCase();
}
