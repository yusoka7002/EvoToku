const connectWalletBtn = document.querySelector('#connectWalletBtn');
const walletAddressContainer = document.querySelector('#walletAddressContainer');
const walletAddressElement = document.querySelector('#walletAddress');
const walletHeader = document.querySelector('#walletHeader'); // New header element
const votingStation = document.querySelector('#votingStation');
const timerMessage = document.querySelector('#timerMessage');
const mainBoard = document.querySelector('#mainBoard');
const voteForm = document.querySelector('#voteForm');
const vote = document.querySelector('#vote');
const voteBtn = document.querySelector('#sendVote');
const showResultContainer = document.querySelector('#showResultContainer');
const showResult = document.querySelector('#showResult');
const result = document.querySelector('#result');
const admin = document.querySelector('#admin');
const candidates = document.querySelector('#candidates');
const electionDuration = document.querySelector('#electionDuration');
const startAnElection = document.querySelector('#startAnElection');
const eligibleVoters = document.querySelector('#eligibleVoters');
const outroMessage = document.querySelector('#outroPage');
const privateKeyInput = document.querySelector('#privateKey');

const contractAddress = '0x10a5Cbb7F4D92BaF73e6C17099F1d1FDCD1e96A1';
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "voter",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isEligible",
        "type": "bool"
      }
    ],
    "name": "EligibilityChanged",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "candidates",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "numberOfVotes",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "checkElectionPeriod",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_voter",
        "type": "address"
      }
    ],
    "name": "checkVoterEligibility",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "electionStarted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "electionTimer",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "eligibleVoterList",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "eligibleVoters",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getEligibleVoters",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "listOfVoters",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "resetAllVoterStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveVotes",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "numberOfVotes",
            "type": "uint256"
          }
        ],
        "internalType": "struct Voting.Candidate[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "_candidates",
        "type": "string[]"
      },
      {
        "internalType": "uint256",
        "name": "_votingDuration",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "_eligibleVoters",
        "type": "address[]"
      }
    ],
    "name": "startElection",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "voteTo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_voter",
        "type": "address"
      }
    ],
    "name": "voterStatus",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "voters",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "votingEnd",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "votingStart",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

let contract;
let wallet;
let provider;

const connectWallet = async () => {
    const privateKey = privateKeyInput.value.trim();
    if (!privateKey) {
        alert('Please enter a valid private key.');
        return;
    }

    provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/5ec87777b5284787be325f17b6ef39fc');
    wallet = new ethers.Wallet(privateKey, provider);
    contract = new ethers.Contract(contractAddress, contractABI, wallet);

    walletAddressElement.textContent = `You are connected to wallet address: ${wallet.address}`;
    walletHeader.style.display = 'flex'; // Show wallet header
    walletAddressContainer.style.display = 'none'; // Hide wallet address container if used
    introPage.style.display = 'none';

    connectWalletBtn.textContent = wallet.address.slice(0, 10) + "...";
    connectWalletBtn.disabled = true;
    connectWalletBtn.style.display = 'none';

    let time = await contract.electionTimer();
    let owner = await contract.owner();

    if (time > 0) {
        timerMessage.innerHTML = `<span id="time">${time}</span> seconds left.`;
        voteForm.style.display = `flex`;
        mainBoard.style.display = `flex`;
        showResultContainer.style.display = `none`;
    } else {
        timerMessage.textContent = "Either there's no election yet or it's already over!";
        voteForm.style.display = `none`;
        mainBoard.style.display = `none`;
        showResultContainer.style.display = `block`;
    }

    if (time == 0) {
        await contract.checkElectionPeriod();
    }

    if (owner == wallet.address) {
        admin.style.display = "flex";
        console.log("Owner recognized:", owner);
    } else {
        console.log("Owner not recognized. Logged in as:", wallet.address);
    }

    votingStation.style.display = "flex";
    refreshPage();
    getAllCandidates();
};

const getAllCandidates = async function() {
    if (document.getElementById("candidateBoard")) {
        document.getElementById("candidateBoard").remove();
    }

    let board = document.createElement("table");
    board.id = "candidateBoard";
    mainBoard.appendChild(board);

    let tableHeader = document.createElement("tr");
    tableHeader.innerHTML = `<th>ID No.</th>
                             <th>Candidate</th>`;
    board.appendChild(tableHeader);

    let candidates = await contract.retrieveVotes();
    for (let i = 0; i < candidates.length; i++) {
        let candidate = document.createElement("tr");
        candidate.innerHTML = `<td>${parseInt(candidates[i][0])}</td>
                               <td>${candidates[i][1]}</td>`;
        board.appendChild(candidate);
    }
};

const getResult = async function() {
    result.style.display = "flex";

    if (document.getElementById("resultBoard")) {
        document.getElementById("resultBoard").remove();
    }

    let resultBoard = document.createElement("table");
    resultBoard.id = "resultBoard";
    result.appendChild(resultBoard);

    let tableHeader = document.createElement("tr");
    tableHeader.innerHTML = `<th>ID No.</th>
                             <th>Candidate</th>
                             <th>Number of votes</th>`;
    resultBoard.appendChild(tableHeader);

    let candidates = await contract.retrieveVotes();
    for (let i = 0; i < candidates.length; i++) {
        let candidate = document.createElement("tr");
        candidate.innerHTML = `<td>${parseInt(candidates[i][0])}</td>
                               <td>${candidates[i][1]}</td>
                               <td>${parseInt(candidates[i][2])}</td>`;
        resultBoard.appendChild(candidate);
    }
};

const refreshPage = function() {
    setInterval(async () => {
        let time = await contract.electionTimer();
        if (time > 0) {
            timerMessage.innerHTML = `<span id="time">${time}</span> seconds left.`;
            voteForm.style.display = `flex`;
            showResultContainer.style.display = `none`;
        } else {
            timerMessage.textContent = "Either there's no election yet or it's already over!";
            voteForm.style.display = `none`;
            mainBoard.style.display = `none`;
            showResultContainer.style.display = `block`;
        }
    }, 1000);

    setInterval(async () => {
        getAllCandidates();
    }, 10000);
};

const sendVote = async function() {
    if (!vote.value) {
        alert('Enter a valid candidate number!');
        return;
    }

    try {
        const voterAddress = wallet.address;
        const isEligible = await contract.eligibleVoters(voterAddress);
        if (!isEligible) {
            alert('You are not eligible to vote.');
            return;
        }
        alert('You ARE eligible to vote.');
        await contract.voteTo(vote.value);
        const candidateName = await contract.candidates(vote.value);
        document.getElementById('votedCandidateName').textContent = candidateName.name;
        alert('Thank you for voting!');

        votingStation.style.display = 'none';
        outroMessage.style.display = 'flex';
    } catch (error) {
        if (error.message.includes('already voted')) {
            alert('You have already voted!');
        } else {
            console.error('Vote submission failed:', error);
            alert('There was a problem submitting your vote.');
        }
    }
};

const startElection = async function() {
    const _candidates = candidates.value.split(",").map(s => s.trim());
    const _votingDuration = electionDuration.value;
    const _eligibleVotersInput = eligibleVoters.value;
    const _eligibleVoters = _eligibleVotersInput.split(",").map(address => address.trim());

    if (!_candidates.length || !_votingDuration || !_eligibleVoters.length) {
        alert('Please fill in all fields correctly.');
        return;
    }

    try {
        const tx = await contract.startElection(_candidates, _votingDuration, _eligibleVoters);
        console.log("Transaction submitted:", tx);
        await tx.wait();
        console.log("Transaction mined:", tx);

        alert('Election started successfully.');

        candidates.value = "";
        electionDuration.value = "";
        eligibleVoters.value = "";

        const electionStarted = await contract.electionStarted();
        console.log("Election Started:", electionStarted);

        if (electionStarted) {
            alert('Election is now active.');
        } else {
            alert('There was an issue starting the election. Please try again.');
        }
    } catch (error) {
        console.error('Failed to start the election:', error);
        alert('Failed to start the election.');
    }
};

connectWalletBtn.addEventListener('click', connectWallet);
showResult.addEventListener('click', getResult);
voteBtn.addEventListener('click', sendVote);
startAnElection.addEventListener('click', startElection);

document.addEventListener('DOMContentLoaded', function() {
  // Code to ensure the intro page is shown after the document is fully loaded
  const introPage = document.querySelector('#introPage');
  if (introPage) {
      introPage.style.display = 'flex'; // Ensure the intro page is displayed
  }
});
