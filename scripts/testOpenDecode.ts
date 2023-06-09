import {ethers, deployments} from "hardhat"
import {BigNumber as BN, Signer} from "ethers"
import {solidity} from "ethereum-waffle"
import chai from "chai"
import { ERC20 } from "../typechain-types/@openzeppelin/contracts/token/ERC20";
import { IERC721 } from "../typechain-types/@openzeppelin/contracts/token/ERC721";
import { OptionBuilderOpen } from "../typechain-types/contracts/OptionBuilderOpen";
import { parseUnits, formatUnits } from "ethers/lib/utils";

const hre = require("hardhat");

chai.use(solidity)
const {expect} = chai

async function main() {
  
  const {deploy, get, execute} = deployments

  const OptionType = {
    LONG_CALL: 0,
    LONG_PUT: 1,
    SHORT_CALL_BASE: 2,
    SHORT_CALL_QUOTE: 3,
    SHORT_PUT_QUOTE: 4
  }

  // const parameters: {
  //   strikeId: BN;
  //   positionId: BN;
  //   optionType: Number;
  //   amount: BN;
  //   setCollateralTo: BN;
  //   iterations: BN;
  //   minTotalCost: BN;
  //   maxTotalCost: BN;
  // }

  const HegicStrategy_CALL_100_ETH_1 = '0x09a4B65b3144733f1bFBa6aEaBEDFb027a38Fb60'
  const HegicStrategy_CALL_100_ETH_2 = '0x6418C3514923a6464A26A2ffA5f17bF1efC96a21'
  const HegicStrategy_PUT_100_ETH_2  = '0x2739A4C003080A5B3Ade22b92c3321EDa2Da3A9e'

  const ProtocolType = {
    lyra_eth: 0,
    lyra_btc: 1,
    hegic: 2
  }

  let optionBuilderOpen = (await hre.ethers.getContract("optionBuilderOpen")) as OptionBuilderOpen
  let usdc = (await hre.ethers.getContract("usdc")) as ERC20
  let wbtc = (await hre.ethers.getContract("wbtc")) as ERC20
  let hegicErc721 = (await hre.ethers.getContract("hegicErc721")) as IERC721



  const [ deployer ] = await hre.ethers.getSigners()

  console.log(formatUnits(await usdc.allowance(deployer.address, optionBuilderOpen.address), 6))

  await optionBuilderOpen.allApprove()

  // console.log(await optionBuilderOpen.decodeFromLyra("0x0000000000000000000000000000000000000000000000000000000000000103000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002386f26fc1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000183398af671f7689000000000000000000000000683ad8b899cd14d8e077c9a623e8b3fed65a8c09"))
  // let t =await optionBuilderOpen.encodeFromLyra(
  //   {    
  //       strikeId: 268,
  //       positionId: 0,
  //       iterations: 1,
  //       optionType: 0,
  //       amount: BN.from("10000000000000000"),
  //       setCollateralTo: 0,
  //       minTotalCost: 0,
  //       maxTotalCost: BN.from("2348814988167842937"),
  //       referrer: ethers.constants.AddressZero
  //   }
  // )

  // console.log(t)
 }

main()
  .then(() => {
	console.log("success")
	process.exit(0)
})
  .catch(e => {
	console.error(e)
	process.exit(1)
  })
