import {ethers, deployments} from "hardhat"
import {BigNumber as BN, Signer} from "ethers"
import {solidity} from "ethereum-waffle"
import chai from "chai"
import { ERC20 } from "../typechain-types/@openzeppelin/contracts/token/ERC20";
import { IERC721 } from "../typechain-types/@openzeppelin/contracts/token/ERC721";
import { OptionBuilderClose } from "../typechain-types/contracts/OptionBuilderClose";
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

  let optionBuilderClose = (await hre.ethers.getContract("optionBuilderClose")) as OptionBuilderClose
  let usdc = (await hre.ethers.getContract("usdc")) as ERC20
  let wbtc = (await hre.ethers.getContract("wbtc")) as ERC20
  let hegicErc721 = (await hre.ethers.getContract("hegicErc721")) as IERC721
  let lyra_ethErc721 = (await hre.ethers.getContract("lyra_ethErc721")) as IERC721
  let lyra_btcErc721 = (await hre.ethers.getContract("lyra_btcErc721")) as IERC721

  await hegicErc721.approve(optionBuilderClose.address, 5818)
  await lyra_ethErc721.approve(optionBuilderClose.address, 9340)
  await lyra_btcErc721.approve(optionBuilderClose.address, 1352)

  const [ deployer ] = await hre.ethers.getSigners()

  await optionBuilderClose.allApprove()
  await usdc.connect(deployer).approve(optionBuilderClose.address, ethers.constants.MaxUint256)
  // await wbtc.connect(deployer).approve(optionBuilderClose.address, ethers.constants.MaxUint256)


  let arrProtocols = [
    ProtocolType.lyra_eth,
    // ProtocolType.hegic,
    ProtocolType.lyra_btc
  ]

  let arrParametrs = [
    await optionBuilderClose.encodeFromLyra(
      deployer.address,
      {    
          strikeId: 261,
          positionId: 9340,
          iterations: 1,
          optionType: OptionType.LONG_CALL,
          amount: BN.from("1000000000000000000"),
          setCollateralTo: BN.from("0"),
          minTotalCost: BN.from("0"),
          maxTotalCost: BN.from("115792089237316195423570985008687907853269984665640564039457584007913129639935"),
          referrer: ethers.constants.AddressZero
      },
      0,
    ),
    // await optionBuilderClose.encodeFromHegic(
    //   deployer.address,
    //   5818
    // ),
    await optionBuilderClose.encodeFromLyra(
      deployer.address,
      {    
          strikeId: 168,
          positionId: 1352,
          iterations: 1,
          optionType: OptionType.SHORT_CALL_BASE,
          amount: BN.from("10000000000000000"),
          setCollateralTo: BN.from("0"),
          minTotalCost: BN.from("0"),
          maxTotalCost: BN.from("115792089237316195423570985008687907853269984665640564039457584007913129639935"),
          referrer: ethers.constants.AddressZero
      },
      parseUnits("5", 6),
    ),
  ]

  await optionBuilderClose.consolidationOfTransactions(arrProtocols,arrParametrs,0)
  // console.log(tx)
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
