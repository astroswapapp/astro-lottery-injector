require("dotenv").config();

const express = require("express");
const cron = require("node-cron");
const { providers, Contract, BigNumber, Wallet } = require("ethers");

const LotteryConfig = require("./config");
const LotteryAbi = require("../abi/AstroSwapLottery.json");

const app = express();

const handleLottery = async (network) => {
  const networkInfo = LotteryConfig[network];
  const provider = new providers.StaticJsonRpcProvider(
    networkInfo.url,
    networkInfo.chainId
  );
  const LotteryAddress = networkInfo.contracts.lottery;
  console.log("handleLottery", network, LotteryAddress, "==at==", Date.now());
  if (LotteryAddress === "") {
    return;
  }

  const wallet = new Wallet(process.env.PRIVATE_KEY, provider);
  const lotteryContract = new Contract(
    LotteryAddress,
    LotteryAbi,
    provider
  ).connect(wallet);

  try {
    const currentRoundId = await lotteryContract.viewCurrentLotteryId();
    if (!currentRoundId.isZero()) {
      // inject
      const amount = networkInfo.injection;

      const txObject = await lotteryContract.injectFunds(
        currentRoundId,
        amount
      );
      await provider.waitForTransaction(txObject.hash);

      console.log(`Injected: ${amount}`);
    }
  } catch (error) {
    console.error("====error===", error);
  }
};

const startService = async () => {
  handleLottery("mainnet");
  cron.schedule("0 0 0 * * *", () => {
    console.log("==cron==", Date.now());
    // run every day

    handleLottery("mainnet");
    // handleLottery("testnet");
  });

  app.listen(4100, () => {
    console.log("====started===");
  });
};

startService();
