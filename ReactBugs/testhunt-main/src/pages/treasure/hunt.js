import huntContractAbi from './huntContractAbi';

export default async (moralis, amount) => {
    // At top, just after Moralis.serverURL
    const HUNT_CONTRACT_ADDRESS = "0x0F98f816680F9395a582AeaF95Bf6Df59F8EcAAc";

    // Somewhere in init - I wonder if this was the issue we had before, that we needed to enable web3?
    window.web3 = await moralis.Web3.enable();
    window.huntContract = new web3.eth.Contract(huntContractAbi, HUNT_CONTRACT_ADDRESS);

    // On press of the HUNT button (can we disable this button if the user isn't logged in?)
    const receipt = await huntContract.methods.getTreasure().send({value: amount * 10000, from: ethereum.selectedAddress});
    return receipt.events.Transfer.returnValues.tokenId;
}
