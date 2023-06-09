import {HardhatRuntimeEnvironment} from "hardhat/types"
import { ethers } from "hardhat"

async function deployment(hre: HardhatRuntimeEnvironment): Promise<void> {
  const {deployments, getNamedAccounts, network} = hre
  const { deploy, getArtifact, get } = deployments
  const {deployer} = await getNamedAccounts()

  const lyra_ethErc721 = await get("lyra_ethErc721")
  const lyra_btcErc721 = await get("lyra_btcErc721")
  const hegicErc721 = await get("hegicErc721")
  const usdc = await get("usdc")

  await deploy("optionBuilderOpen", {
    contract: "OptionBuilderOpen",
    from: deployer,
    log: true,
    args: [
      "0x919E5e0C096002cb8a21397D724C4e3EbE77bC15",// lyra_eth (optionMarket)
      "0xe044919cf58dFb066FC9DE7c69C7db19f336B20c",// lyra_btc (optionMarket)
      "0xec096ea6eB9aa5ea689b0CF00882366E92377371",// operationalTreasury
      lyra_ethErc721.address,// lyra_ethErc721
      lyra_btcErc721.address,// lyra_btcErc721
      hegicErc721.address,// hegicErc721
      usdc.address,// usdc
    ],
  })

  await deploy("optionBuilderClose", {
    contract: "OptionBuilderClose",
    from: deployer,
    log: true,
    args: [
      "0x919E5e0C096002cb8a21397D724C4e3EbE77bC15",// lyra_eth (optionMarket)
      "0xe044919cf58dFb066FC9DE7c69C7db19f336B20c",// lyra_btc (optionMarket)
      "0xec096ea6eB9aa5ea689b0CF00882366E92377371",// operationalTreasury
      lyra_ethErc721.address,// lyra_ethErc721
      lyra_btcErc721.address,// lyra_btcErc721
      hegicErc721.address,// hegicErc721
      usdc.address,// usdc
    ],
  })
}

deployment.tags = ["stop_order"]
deployment.dependencies = ["tokens"]

export default deployment
