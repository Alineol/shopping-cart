const getSavedCartItems = (fatherNode) => {
  if (!fatherNode.firstChild) {
    const father = fatherNode;
    father.innerHTML = localStorage.getItem('cartItems');
    // const childrensCart = document.querySelectorAll('.cart__item');
    // childrensCart.forEach((kid) => kid.addEventListener('click', ChildEvent));
    }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
