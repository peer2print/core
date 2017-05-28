var assert = require('assert');
const from_address = "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1"

var loadContract = require("../functions/loadContract.js")

describe('loadContract', function() {
  describe('weird test', function() {
    it('should do stuff without throwing', function() {
		var ProductionRegistry = loadContract("ProductionRegistry")
		var Production = loadContract("Production")

		var prodCount;
		var prodReg

		ProductionRegistry.deployed().then(function(prodRegInstance) {
			prodReg = prodRegInstance
			return prodReg.getProductionsCount.call()
		}).then(function(result) {
			prodCount = result;
			var prod
			Production.deployed().then(function(prodIntance) {
				prod = prodIntance
			}).catch(function(e) {
				throw e
			}).then(function() {
				return prodReg.addProduction(prod.address, {from: from_address})
			}).catch(function (e) {
				throw e
			}).then(function(result) {
				return prodReg.getProductionsCount.call()
			}).then(function(result) {
				assert.equal(result - 1, prodCount, "Productions count should have increased")
			})
		}).catch(function (e) {
			throw e
		})
    });
  });
});
