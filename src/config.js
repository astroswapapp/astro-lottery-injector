const config = {
  testnet: {
    url: "https://testnet.velas.com/rpc/",
    chainId: 111,
    contracts: {
      lottery: "0x9Adb942B4Efc5Fc7377Bcc0f62365E9C5901C9ce",
    },
    injection: "100000000000000000000000", // 100,000 ETHER
  },
  mainnet: {
    url: "https://evmexplorer.velas.com/rpc",
    chainId: 106,
    contracts: {
      lottery: "0xb530F16BDDd284B4c8f04BCC5b4fa073829Ee050",
    },
    injection: "100000000000000000000000", // 100,000 ETHER
  },
};

module.exports = config;
