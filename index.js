const contracts_location = "../contracts"

var Web3 = require('web3')
var Produce = require(contracts_location+"/build/contracts/ProductionRegistry.json")
var contract = require("truffle-contract")
var web3Provider = new Web3.providers.HttpProvider("http://localhost:8545")

var MyContract = contract(Produce)
MyContract.setProvider(web3Provider)

MyContract.deployed().then(function(instance) {
	console.log(instance)
}).catch(function (e) {
	console.log(e)
})

MyContract.deployed().then(function(instance) {
	return instance.getProductionsCount({from: "0x1337"}) // <-- matches the doStuff() function within MyContract.sol.
}).then(function(result) {
	// We just made a transaction, and it's been mined!
	// We're given transaction hash, logs (events) and receipt for further processing.
	console.log(result.tx, result.logs, result.receipt);
}).catch(function (e) {
	console.log(e)
})
