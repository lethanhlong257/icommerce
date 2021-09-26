import {filterProductCtrl, getAllProduct, searchProductCtrl, sortProductCtrl}
  from '../../src/controller/product'
import {db} from '../../src/services/core-services'

import * as httpMock from 'node-mocks-http'

db.Product.findAll = jest.fn()
db.Activity.create = jest.fn()

let req, res, next
beforeEach(() => {
  req = httpMock.createRequest()
  res = httpMock.createResponse()
  next = null
})

describe("Product controller.getAllProduct", () => {
  beforeEach(() => {
    getAllProduct(req, res, next)
  })

  it("should have a getAllProduct function", () => {
    expect(typeof getAllProduct).toBe("function")
  })

  it("should have call DB to get all products", () => {
    expect(db.Product.findAll).toBeCalled()
  })

  it("should have return status code", () => {
    expect(res.statusCode).toBe(200)
  })
})

describe("Product controller.filterProductCtrl", () => {
  it("should have a filterProductCtrl function", () => {
    expect(typeof filterProductCtrl).toBe("function")
  })

  it("should have return status code", () => {
    expect(res.statusCode).toBe(200)
  })
})

describe("Product controller.searchProductCtrl", () => {

  it("should have a searchProductCtrl function", () => {
    expect(typeof searchProductCtrl).toBe("function")
  })

  it("should have return status code", () => {
    expect(res.statusCode).toBe(200)
  })
})

describe("Product controller.sortProductCtrl", () => {
  it("should have a sortProductCtrl function", () => {
    expect(typeof sortProductCtrl).toBe("function")
  })
  it("should have return status code", () => {
    expect(res.statusCode).toBe(200)
  })
})
