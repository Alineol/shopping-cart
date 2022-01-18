const getSavedCartItems = (local, item) => {
  if (local === 'cartItems') {
    const father = item;
    father.innerHTML = localStorage.getItem(local);
    }
  if(local === 'total') {
    item.innerText = localStorage.getItem(local);
  };
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
