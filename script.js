//const { fetchProducts } = require("./helpers/fetchProducts");

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

const local = document.querySelector('.items');
const itens = async ()=> {
  const produtos = await fetchProducts('computador');
  produtos.results.map((product) => {
    const itemNovo = createProductItemElement({
      sku: product.id,
      name: product.title,
      image: product.thumbnail,
    });
    return local.appendChild(itemNovo);
  });
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
// PAREI AQUI
const productItemClickListener = async (event) => {
  const secaoItem = event.target.parentNode;
  const itemId = getSkuFromProductItem(secaoItem);
  const { id , title , price } = await fetchItem (itemId);
  const itemCarrinho = createCartItemElement({
    sku: id,
    name: title,
    salePrice: price,
  });
  secaoItem.appendChild(itemCarrinho);
}

window.onload = () => { 
  itens();
  createCartItemElement(event);
};
