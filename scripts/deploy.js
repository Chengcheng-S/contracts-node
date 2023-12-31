// scripts/deploy.js
async function main () {
    // We get the contract to deploy
    const Box = await ethers.getContractFactory('Box');
    console.log('Deploying Box...');
    const box = await Box.deploy();
    
    console.log('Box deployed to:', box.deployTransaction);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });

