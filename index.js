const from_address = "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1"

var loadContract = require("./functions/loadContract.js")

var ProductionRegistry = loadContract("ProductionRegistry")
var Production = loadContract("Production")

var prodReg

ProductionRegistry.deployed().then(function(prodRegInstance) {
	prodReg = prodRegInstance
	return prodReg.getProductionsCount.call()
}).then(function(result) {
	console.log("Number of productions in registry: "+Number(result))
	var prod
	Production.deployed().then(function(prodIntance) {
		prod = prodIntance
	}).catch(function(e) {
		console.log("Failed to abstract the Production contract\n"+e)
	}).then(function() {
		return prodReg.addProduction(prod.address, {from: from_address})
	}).catch(function (e) {
		console.log("Failed to add the production to the registry\n"+e)
	}).then(function(result) {
		console.log("Production:\n"+result)
		return prodReg.getProductionsCount.call()
	}).then(function(result) {
		console.log("Number of productions in registry after adding: "+Number(result))
	})
}).catch(function (e) {
	console.log("Failed to abstract the ProductionRegistry contract\n"+e)
})
