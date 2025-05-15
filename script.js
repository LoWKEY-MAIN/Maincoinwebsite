const contractAddress = "DEINE_CONTRACT_ADRESSE_HIER"; // Nach Deployment einfügen
const abi = [
  "function balanceOf(address) view returns (uint)",
  "function burn(uint256) public",
];

let provider;
let signer;
let contract;

async function connectWallet() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    const address = await signer.getAddress();
    document.getElementById("walletAddress").innerText = "Verbunden: " + address;
    contract = new ethers.Contract(contractAddress, abi, signer);
    getBalance();
  } else {
    alert("Bitte installiere MetaMask!");
  }
}

async function getBalance() {
  const address = await signer.getAddress();
  const balance = await contract.balanceOf(address);
  document.getElementById("tokenBalance").innerText = ethers.utils.formatUnits(balance, 18) + " MNC";
}

async function burnTokens() {
  const amount = document.getElementById("burnAmount").value;
  if (!amount) return alert("Bitte Menge eingeben");
  const tx = await contract.burn(ethers.utils.parseUnits(amount, 18));
  await tx.wait();
  alert("Erfolgreich geburnt!");
  getBalance();
}
