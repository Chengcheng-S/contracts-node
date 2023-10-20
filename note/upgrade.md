### upgrade
对于无法升级的合约需要进行以下操作：
- 重新部署新版本的合约
- 手动进行合约状态迁移
- 更新原先合约的地址

### openzepplin  upgrade plugins
使用`OpenZeppelin`升级插件中的 `deployProxy` 部署新合约时，合约实例都可以升级。默认情况下，只有`最初部署合约的地址`才有权升级合约。

`deployProxy` 会创建以下的交易：
- Deploy the implementation contract
- Deploy the ProxyAdmin contract
- Deploy the proxy contract and run any initializer function.

```shell
npm install --save-dev @openzeppelin/hardhat-upgrades
```
