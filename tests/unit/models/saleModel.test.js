const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/db/connection');
const salesModel = require('../../../src/models/salesModel');
const { numberOne, resultQuery, allSales, allSalesGetById } = require('./mocks/saleModel.mock');


describe('Testando a rota sale da camada Model', async function () {

  it('Cadastrando uma venda e regando o id da venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: numberOne }])

    const getId = await salesModel.newIdSale();

    expect(getId).to.be.deep.equal(numberOne)
  })

  it('Testando o cadastro com sucesso dos produtos e quantidade ', async function () {
    sinon.stub(connection, 'execute').resolves([resultQuery])

    const registeredSucess = await salesModel.registerSale();

    expect(registeredSucess).to.be.deep.equal(resultQuery)
  })

  it('Validado que  será possível listar todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([allSales]);

    const data = await salesModel.getAll();

    expect(data).to.be.deep.equal(allSales)
  })

    it('Validado que  será possível listar todas as vendas de com um id especifico', async function () {
    sinon.stub(connection, 'execute').resolves([allSalesGetById]);

      const data = await salesModel.getById(numberOne);

    expect(data).to.be.deep.equal(allSalesGetById)
  })

  afterEach(function () {
    sinon.restore();
  });
})
