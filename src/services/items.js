const axios = require('axios');
const config = require('../config');
const author = {
  name: 'Joaquín',
  lastname: 'Alonso'
};

const getCurrencySymbolFromId = id => {
  const symbols = {
    ARS: '$',
    BOB: 'BS',
    BRL: 'R$',
    CLF: 'UF',
    CLP: '$',
    COP: '$',
    CRC: '¢',
    CUC: 'CUC',
    CUP: '$',
    DOP: '$',
    EUR: '€',
    GTQ: 'Q',
    HNL: 'L',
    MXN: '$',
    NIO: 'C$',
    PAB: 'B/.',
    PEN: 'S/',
    PYG: '₲',
    USD: 'U$S',
    UYU: '$',
    VEF: 'Bs.',
    VES: 'Bs.'
  };

  return symbols[id.toUpperCase()];
};

const formatItem = item => {
  const priceParts = (item.price.toFixed(2) + '').split('.');
  const stateName = item.address ? item.address.state_name : item.seller_address.state.name;
  return {
    id: item.id,
    title: item.title,
    price: {
      currency: getCurrencySymbolFromId(item.currency_id),
      amount: parseInt(priceParts[0]),
      decimals: parseInt(priceParts[1] || 0)
    },
    picture: item.thumbnail,
    condition: item.condition,
    state_name: stateName,
    free_shipping: item.shipping.free_shipping
  };
};

const formatItemExtra = item => {
  const picture = item.pictures.length ? item.pictures[0].url : item.thumbnail;
  return {
    picture: picture,
    sold_quantity: item.sold_quantity
  };
};

const formatItems = items => {
  return items.map(formatItem);
};

const formatCategories = resFilters => {
  const categoryFilter = resFilters.find(resFilter => {
    return resFilter.id === 'category';
  });

  if (categoryFilter && categoryFilter.values && categoryFilter.values.length) {
    return getCategoriesPathFromCategory(categoryFilter.values[0]);
  }

  return [];
};

const getCategoriesPathFromCategory = category => {
  if (category && category.path_from_root && category.path_from_root.length) {
    return category.path_from_root.map(category => category.name);
  }
  return [];
};

const formatItemsResponse = data => {
  return {
    author,
    categories: formatCategories(data.filters),
    items: formatItems(data.results)
  };
};

const formatItemResponse = (item, description, category = []) => {
  const { state_name, ...stateLessItem } = {
    ...formatItem(item),
    ...formatItemExtra(item),
    description: description.plain_text
  };
  return {
    author,
    categories: getCategoriesPathFromCategory(category),
    item: stateLessItem
  };
};

const getItems = async q => {
  try {
    const query = encodeURIComponent(q);
    const res = await axios.get(`${config.meliApi}sites/MLA/search?q=${query}`);
    return formatItemsResponse(res.data);
  } catch (error) {
    throw error;
  }
};

const getItem = async id => {
  try {
    const itemId = encodeURIComponent(id);
    const itemRes = await axios.get(`${config.meliApi}items/${itemId}`);
    const itemDescriptionRes = await axios.get(`${config.meliApi}items/${itemId}/description`);
    const categoryRes = await axios.get(`${config.meliApi}categories/${itemRes.data.category_id}`);
    return formatItemResponse(itemRes.data, itemDescriptionRes.data, categoryRes.data);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getItems,
  getItem
};
