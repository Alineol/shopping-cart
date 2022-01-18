const saveCartItems = (local, fatherNode) => {
  localStorage.setItem(local, fatherNode);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
