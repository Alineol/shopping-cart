const carOl = document.querySelector('.cart__items');
const cartSection = document.querySelector('.cart');
const clearCart = document.querySelector('.empty-cart');
const itemsCont = document.querySelector('.items');
const divPrice = document.querySelector('.total-price');
const searchButton = document.querySelector('.search-button');
// calcula valor total: 
const CalculatePrice = () => {
 const products = document.querySelectorAll('.div_price');
 let total = 0;
 products.forEach((product) => {
   const priceString = product.innerText.substring(3);
   const priceNumber = parseFloat(priceString);
     total += priceNumber;
 });
 divPrice.innerText = `Total: ${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
};
// função que REMOVE itens do carrinho
function cartItemClickListener(event) {
  const father = event.target.parentElement
  carOl.removeChild(father);
  CalculatePrice();
  saveCartItems('cartItems', carOl.innerHTML);
  saveCartItems('total', document.querySelector('.total-price').innerText);
  // localStorageCart();
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}
function createCartItemElement({ sku, name, salePrice, image }) {
  const div = document.createElement('div');
  const button = document.createElement('button');
  const divPrice = document.createElement('div');
  const cartImage = document.createElement('img')
  const divName = document.createElement('div');
  divName.className = 'div-name'
  button.className = 'cart_button';
  div.className = 'cart__item';
  divPrice.className = 'div_price';
  cartImage.className = 'cart_image';
  button.innerText = 'x';
  divPrice.innerText = `R$:${salePrice}`;
  divName.innerText = name;
  cartImage.src = image;
  button.addEventListener('click', cartItemClickListener);
  // div.addEventListener('click', cartItemClickListener);
  divName.appendChild(divPrice);
  div.appendChild(button);
  div.appendChild(cartImage);
  div.appendChild(divName);
  return div;
}
// adicinar texto  CARREGANDO 
const putLoadSpace = () => {
  const loadTag = document.createElement('p');
    loadTag.innerText = 'carregando...';
    loadTag.className = 'loading';
    itemsCont.appendChild(loadTag);
  };
  const removeLoad = () => {
    const load = document.querySelector('.loading');
    itemsCont.removeChild(load);
  };
// função com AÇÃO do botão de cada PRODUTO| ADICIONA produto no carrinho 
const addEventButtonItem = (async (event) => {
  const itemSection = event.target.parentElement;
  const id = (itemSection.firstChild).innerText;
  const productSelected = await (fetchItem(id));
  carOl.appendChild(createCartItemElement(productSelected));
  CalculatePrice();
  saveCartItems('cartItems', carOl.innerHTML);
  saveCartItems('total', document.querySelector('.total-price').innerText);
});
// função que adiciona itens no container de class .items e adiciona escutador no botão de cada produto. 
const forEachProduct = (async (search) => {
  putLoadSpace();
  const products = await fetchProducts(search);
  await removeLoad();
  products.map((product) => {
    const { id: sku, title: name, thumbnail: image } = product;
    const object = {
      sku,
      name,
      image,
    };
    itemsCont.appendChild(createProductItemElement(object));
    return undefined;
  });
  const buttons = document.querySelectorAll('button.item__add');
  buttons.forEach((button) => button.addEventListener('click', addEventButtonItem));
});
// função do botão ESVAZIAR carrinho
const eraseCart = () => {
const productsInCart = document.querySelectorAll('.cart__item');
productsInCart.forEach((filho) => {
  carOl.removeChild(filho);
});
  CalculatePrice();
  saveCartItems('cartItems', carOl.innerHTML);
  saveCartItems('total', document.querySelector('.total-price').innerText);
};
clearCart.addEventListener('click', eraseCart);
const searchEvent = () => {
const searchInput = document.querySelector('#input-search').value;
const productInItems = document.querySelectorAll('.item');
productInItems.forEach((item) => item.remove());
forEachProduct(searchInput);
};
searchButton.addEventListener('click', searchEvent);
window.onload = () => { 
  forEachProduct('computador');
  getSavedCartItems('cartItems', carOl);
  getSavedCartItems('total', document.querySelector('.total-price'));
  const childrensCart = document.querySelectorAll('.cart__item');
  childrensCart.forEach((kid) => kid.addEventListener('click', cartItemClickListener));
};