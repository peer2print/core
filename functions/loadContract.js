var contract = require("truffle-contract")

var Web3 = require('web3')
var web3Provider = new Web3.providers.HttpProvider("http://localhost:8545")


const contracts = require("contracts");

module.exports = function (name)
{
	console.log(contracts)
	console.log(contracts[name+".json"])
	var ct = contract(contracts[name+".json"])
	ct.setProvider(web3Provider)
	return ct
}
