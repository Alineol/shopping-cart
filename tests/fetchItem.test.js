require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');
const result = {
  sku: item.id,
  name: item.title,
  salePrice: item.price
}

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it(' 1- Verifica se fetcItem é uma função.', async () => {
    expect(typeof(fetchItem)).toBe('function');
  })
  it('2- Verifica se quando função é chamada com o argumento "MLB1615760527" fetch é chamado', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled();
  })
  it ('3- verifica se ao chamar a função com o argumento "MLB1615760527", a função fetch utiliza o endpoint desejado', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch)
    .toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527')
  })
  it('4- Testa se o retorno da função com o argumento "MLB1615760527" é igual computadorSeach(id, title e price)', async () => {
    const result2 = await fetchItem('MLB1615760527')
    expect(result2).toEqual(result);
  })
  it('5- Se chamar a função sem argumento, retorna um erro com a mensagem "You must provide an id"', async () => {
    expect( await fetchItem()).toEqual(new Error('You must provide an id'));
   })
});
