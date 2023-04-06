const certification = artifacts.require('../contracts/Certification.sol');

module.exports=function(deployer){
    deployer.deploy(certification);
}