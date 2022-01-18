const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  it(' 1- Verifica se ao chamar a função com o argumento "<ol><li>Item</li></ol>" o metodo localStorage.setItem é chamado', async () => {
    saveCartItems('<ol><li>Item</li></ol>');
     expect(localStorage.setItem).toHaveBeenCalled();
   })
   it(' 2- Verifica se ao chamar a função com o argumento "<ol><li>Item</li></ol>" o metodo localStorage.setItem é chamado com dois parâmetros, "cartItems" e o argumento de saveCaritems', async () => {
    saveCartItems('<ol><li>Item</li></ol>');
     expect(localStorage.setItem).toHaveBeenLastCalledWith('cartItems','<ol><li>Item</li></ol>' );
   })
});
