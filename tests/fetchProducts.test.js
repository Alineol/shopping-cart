require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it(' 1- Verifica se fetchProducts é uma função.', async () => {
    expect(typeof(fetchProducts)).toBe('function');
  })
  it('2- Verifica se quando função é chamada com o argumento "computador" fetch é chamado', async () => {
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalled();
  })
  it ('3- verifica se ao chamar a função com o argumento "computador", a função fetch utilizada o endpoint desejado', async () => {
    await fetchProducts('computador')
    expect(fetch)
    .toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  })
  it('4- Testa se o retorno da função com o argumento "computador" é igual computadorSeach', async () => {
    const result = await fetchProducts('computador')
    expect(result).toEqual(computadorSearch.results);
  })
  it('5- Se chamar a função sem argumento, retorna um erro com a mensagem "You must provide an url"', async () => {
   expect( await fetchProducts('')).toEqual(new Error('You must provide an url'));
  })
});
