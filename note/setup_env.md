### setup env

```shell
npm audit fix --only=prod --force
/// 修复依赖，跳过更新
```


```shell
node -v
v16.20.0

npm -v
8.19.4

mkdir contract && cd contract
npm init -y 
npx truffle init

- Fetching solc version list from solc-bin. Attempt #1

Starting init...
================

> Copying project files to ...

Init successful, sweet!

npm install @openzeppelin/contracts

npm install --save-dev @nomiclabs/hardhat-ethers ethers


npm install --save-dev hardhat
npx hardhat 

✔ What do you want to do? · Create an empty hardhat.config.js
Config file created

```


```shell
vi hardhat.config

module.exports = {
  solidity: "0.8.19",
};
```


complie contract
```shell
npx hardhat complie
```

deploy contracts
hardhat 内置了测试网络，在本地测试时可以使用以下命令启动本地测试网（测试结束之后停止测试网的同时，会清除所有的数据，因此下一次启动需再次进行部署）
```shell
npx hardhat node

Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/
......
eth_chainId
eth_blockNumber
net_version
eth_getBlockByNumber
eth_getBalance
.....
```
deploy script
```javascripts
// scripts/deploy.js
async function main () {
  // We get the contract to deploy
  const Box = await ethers.getContractFactory('Box');
  console.log('Deploying Box...');
  const box = await Box.deploy();
  await box.deployed();
  console.log('Box deployed to:', box.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

```shell
vi hardhat.config

require('@nomiclabs/hardhat-ethers');
module.exports = {
  solidity: "0.8.19",
};
```

```shell
npx hardhat run --network localhost scripts/deploy.js

Deploying Box...
Box deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```
与此同时在hardhat node 终端显示
```shell
....
eth_sendTransaction
  Contract deployment: Box
  Contract address:    0x5fbdb2315678afecb367f032d93f642f64180aa3
  Transaction:         0x3e3572f3a2298d3cd1719fad8d5f0aeb5776763fab1249293595b167e683140e
  From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
  Value:               0 ETH
  Gas used:            431908 of 431908
  Block #1:            0x8df5af6a0f10e789ddf5f7cf9eead6992d749a97bac1c7c8e6c90c306b49f764
 .... 
```

在控制台对刚部署的合约进行交互
```shell
npx hardhat console --network localhost
Welcome to Node.js v16.20.0.
Type ".help" for more information.
> const Box = ethers.getContractFactory('Box');
> const box = Box.attach(' contract_address ')
> await box.contract_function(arg_1,arg_2)

> await box.store(15);
{
  hash: '0xea28be374dd3eb484c0fe9c63d6ff20a25e538d9ca5c4dc83cf50d9732c512cc',
  type: 2,
  accessList: [],
  blockHash: '0x7f0d05ab14511dd813de592a4fff3aeb9b7e08dc6d69b6475f6ae6da8158940f',
  blockNumber: 2,
  transactionIndex: 0,
  confirmations: 1,
  from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  gasPrice: BigNumber { value: "768774330" },
  maxPriorityFeePerGas: BigNumber { value: "0" },
  maxFeePerGas: BigNumber { value: "972980011" },
  gasLimit: BigNumber { value: "53057" },
  to: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  value: BigNumber { value: "0" },
  nonce: 1,
  data: '0x6057361d000000000000000000000000000000000000000000000000000000000000002a',
  r: '0xb8c33bc07632274491162ac0078d09974767421bf045febb3702fa4d8ef38134',
  s: '0x34088c2a261ef36357e615c4c68b2e7dee8a389c84b1a55761d58dc14f0dd225',
  v: 0,
  creates: null,
  chainId: 31337,
  wait: [Function (anonymous)]
}
```

此时控制台的日志
```shell
...
eth_sendTransaction
  Contract call:       Box#store
  Transaction:         0xea28be374dd3eb484c0fe9c63d6ff20a25e538d9ca5c4dc83cf50d9732c512cc
  From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
  To:                  0x5fbdb2315678afecb367f032d93f642f64180aa3
  Value:               0 ETH
  Gas used:            53057 of 53057
  Block #2:            0x7f0d05ab14511dd813de592a4fff3aeb9b7e08dc6d69b6475f6ae6da8158940f
...
```

### testing
```shell
npm install --save-dev chai
```

```shell
npx hardhat test
```
单纯使用hardhat test 进行测试，存在一部分的缺陷，即：
- 验证合约是否因错误而恢复
- 是否触发正确的事件
- 衡量账户的余额变化
可以进一步使用 openzepplin/test-helpers 进行更加完备的测试

```shell
npm install --save-dev @openzeppelin/test-helpers
```

