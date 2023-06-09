import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy"
import "hardhat-deploy-ethers"
import "@keep-network/hardhat-local-networks-config"
import "@nomiclabs/hardhat-etherscan";
import dotenv from "dotenv"

dotenv.config()

const config: HardhatUserConfig = {
  localNetworksConfitg: "~/.hardhat/config.json",
  defaultNetwork: "hardhat",
  solidity: "0.8.9",
  namedAccounts: {
    deployer: {
      default: 0
    }
  },
  etherscan: {
    apiKey: process.env.ARBITRUM_API_KEY,
  },
};

export default config;
