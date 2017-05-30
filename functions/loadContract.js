var contract = require("truffle-contract")

var Web3 = require('web3')
var web3Provider = new Web3.providers.HttpProvider("http://localhost:8545")

const contracts = require("contracts");

module.exports = function (name)
{
	var ct = contract(contracts[name])
	ct.setProvider(web3Provider)
	return ct
}
