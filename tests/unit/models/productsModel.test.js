const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/db/connection');
const productsModel = require('../../../src/models/productsModel');
const { allProducts, product } = require('./mocks/productsModel.mock');

describe('Testando a rota products da camada Model', function () {
  it('Listando todos os produtos', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([allProducts])
    // Act
    const data = await productsModel.getAll();
    // Assert
    expect(data).to.be.deep.equal(allProducts)
  })


  it('Listando um produto pelo id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[product]]);
    // Act
    const data = await productsModel.getById(1);
    // console.log(data)
    // console.log(product)
    // Assert
    expect(data).to.be.deep.equal(product)
  })


  afterEach(function () {
    sinon.restore();
  });
})
