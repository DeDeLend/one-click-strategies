import {HardhatRuntimeEnvironment} from "hardhat/types"

async function deployment(hre: HardhatRuntimeEnvironment): Promise<void> {
  const {deployments, getNamedAccounts, network} = hre
  const {deploy, save, getArtifact} = deployments
  const {deployer} = await getNamedAccounts()

  save("lyra_ethErc721", {
    address: "0xe485155ce647157624C5E2A41db45A9CC88098c3",
    abi: await getArtifact("contracts/BaseOptionBuilder.sol:IOptionToken").then((x) => x.abi),
  })

  save("lyra_btcErc721", {
    address: "0x0e97498F3d91756Ec7F2d244aC97F6Ea9f4eBbC3",
    abi: await getArtifact("contracts/BaseOptionBuilder.sol:IOptionToken").then((x) => x.abi),
  })

  save("hegicErc721", {
    address: "0x5Fe380D68fEe022d8acd42dc4D36FbfB249a76d5",
    abi: await getArtifact("contracts/BaseOptionBuilder.sol:IPositionsManager").then((x) => x.abi),
  })

  save("usdc", {
    address: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
    abi: await getArtifact("@openzeppelin/contracts/token/ERC20/ERC20.sol:ERC20").then((x) => x.abi),
  })

  save("wbtc", {
    address: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
    abi: await getArtifact("@openzeppelin/contracts/token/ERC20/ERC20.sol:ERC20").then((x) => x.abi),
  })

  save("weth", {
    address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    abi: await getArtifact("@openzeppelin/contracts/token/ERC20/ERC20.sol:ERC20").then((x) => x.abi),
  })
}

deployment.tags = ["test", "tokens", "arbitrum"]
export default deployment
