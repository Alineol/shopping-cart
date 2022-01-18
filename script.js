const carOl = document.querySelector('.cart__items');
const cartSection = document.querySelector('.cart');
const eraseButton = document.querySelector('.empty-cart');
const itemsCont = document.querySelector('.items');
// adicionar valor TOTAL do carrinho 
const div = cartSection.appendChild((document.createElement('div')));
div.className = 'total-price';
div.innerText = 'Total:';
// calcula valor total: 
const CalculatePrice = (callback) => {
 const products = carOl.childNodes;
 let total = 0;
 products.forEach((product) => {
   const startIndex = (product.innerText.indexOf('$') + 1);
   const priceString = product.innerText.substring(startIndex);
   const priceNumber = parseFloat(priceString);
   if (Number.isNaN(priceNumber) === false) {
     total = callback(total, priceNumber);
   }
 });
 div.innerText = total;
};
// calback da função calculate price
const changeTotal = (a, b) => {
   result = a + b;
   return result;
};
// função que SALVA itens no carrinho 
// const localStorageCart = () => {
// localStorage.setItem('carItems', carOl.innerHTML);
// };
// função que REMOVE itens do carrinho
function cartItemClickListener(event) {
  carOl.removeChild(event.target);
  CalculatePrice(changeTotal);
  saveCartItems(carOl.innerHTML);
  // localStorageCart();
}
// // função que RECUPERA itens do carrinho
// const getLocalStorage = () => {
//   if (!carOl.firstChild) {
//   carOl.innerHTML = localStorage.getItem('carItems');
//   const childrensCart = document.querySelectorAll('.cart__item');
//   childrensCart.forEach((kid) => kid.addEventListener('click', cartItemClickListener));
//   }
// };
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

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  const button = document.createElement('button');
  button.className = 'cart_button';
  button.innerText = 'remover';
  button.addEventListener('click', cartItemClickListener);
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  // li.appendChild(button);
  return li;
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
  const button = event.target;
  const pai = button.parentElement;
  const id = (pai.firstChild).innerText;
  const item = await (fetchItem(id));
  carOl.appendChild(createCartItemElement(item));
  CalculatePrice(changeTotal);
  saveCartItems(carOl.innerHTML);
  // localStorageCart();
});
// função que adiciona itens no container de class .items e adiciona escutador no botão de cada produto. 
const forEachProduct = (async () => {
  putLoadSpace();
  const objPrdcts = await fetchProducts('computador');
  await removeLoad();
  objPrdcts.map((product) => {
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
const filhos = document.querySelectorAll('.cart__item');
filhos.forEach((filho) => {
  carOl.removeChild(filho);
});
  CalculatePrice(changeTotal);
  saveCartItems(carOl.innerHTML);
};
eraseButton.addEventListener('click', eraseCart);
window.onload = () => { 
  forEachProduct();
  getSavedCartItems(carOl);
  const childrensCart = document.querySelectorAll('.cart__item');
    childrensCart.forEach((kid) => kid.addEventListener('click', cartItemClickListener));
  // getLocalStorage();
};