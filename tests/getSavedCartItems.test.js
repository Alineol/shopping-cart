const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');
const { fetchItem } = require('../helpers/fetchItem');
const saveCartItems = require('../helpers/saveCartItems');
localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  it('1- Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado;', () => {
    const param1 = '<ol><li>Item</li></ol>'
    const param2 =  'lala'
    getSavedCartItems(param1, param2);
    expect(localStorage.getItem).toHaveBeenCalled();
  })
  it('2- Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o "cartItems" como parâmetro.', () => {
    const param1 = '<ol><li>Item</li></ol>'
    const param2 =  'lala'
    getSavedCartItems(param1, param2);
    expect(localStorage.getItem).toHaveBeenLastCalledWith('cartItems')
  })
});
