const saveCartItems = (fatherNode) => {
  localStorage.setItem('cartItems', fatherNode);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
