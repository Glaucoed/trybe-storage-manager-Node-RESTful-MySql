const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/db/connection');
const productsModel = require('../../../src/models/productsModel');
const { allProducts, product, newProduct, removeSucess } = require('./mocks/productsModel.mock');

const FOUR = 4;

describe('Testando a rota products da camada Model', function () {
  it('Listando todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts])
    
    const data = await productsModel.getAll();
    
    expect(data).to.be.deep.equal(allProducts)
  })


  it('Listando um produto pelo id', async function () {
    
    sinon.stub(connection, 'execute').resolves([[product]]);
    
    const data = await productsModel.getById(1);

    expect(data).to.be.deep.equal(product)
  })

  it('Cadastrando um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: FOUR }]);

    const idNewProduct = await productsModel.registerProduct(newProduct)

    expect(idNewProduct).to.equal(FOUR);
  })

  it('Validando o update do nome de um produto', async function () {
    sinon.stub(connection, 'execute').resolves(product);

    const data = await productsModel.updateProduct(1, 'Martelo de Thor');
    
    expect(data).to.be.deep.equal(product);
  })
  
  it('Validando o se é possivel remover um produto pelo id', async function () {
    sinon.stub(connection, 'execute').resolves(removeSucess)

    const data = await productsModel.removeProduct(1);

    expect(data).to.be.deep.equal(removeSucess)
  })

  // it('', async function () {
    
  // })


  afterEach(function () {
    sinon.restore();
  });
})
