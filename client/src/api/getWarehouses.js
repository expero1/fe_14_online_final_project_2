const { NPwarehousesEP } = require('./constants');
const { default: fetchApi } = require('./fetchApi');

const getWarehouses = (cityref) =>
  fetchApi(`${NPwarehousesEP}?cityref=${cityref}`);

export default getWarehouses;
