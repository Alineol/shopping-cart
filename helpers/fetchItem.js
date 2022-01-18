const fetchItem = async (idSelected) => {
  if (!idSelected) {
    return new Error('You must provide an id');
  }
  const url = `https://api.mercadolibre.com/items/${idSelected}`;
  const response = await fetch(url);
  const data = await response.json();
  const { id: sku, title: name, price: salePrice, thumbnail: image } = data;
  const result = { sku, name, salePrice, image };
  return result;
};
if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
// function createCartItemElement({ sku, name, salePrice })
// id: sku, title: name, thumbnail: image