const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/db/connection');
const salesModel = require('../../../src/models/salesModel');
const { numberOne, resultQuery } = require('./mocks/saleModel.mock');
const ONE = 1;


describe('Testando a rota sale da camada Model', async function () {

  it('Cadastrando uma venda e regando o id da venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: ONE }])

    const getId = await salesModel.newIdSale();

    expect(getId).to.be.deep.equal(numberOne)
  })

    it('Testando o cadastro com sucesso dos produtos e quantidade ', async function () {
    sinon.stub(connection, 'execute').resolves([resultQuery])

      const registeredSucess = await salesModel.saleProducts();

    expect(registeredSucess).to.be.deep.equal(resultQuery)
    })

  afterEach(function () {
    sinon.restore();
  });
})
