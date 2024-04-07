const connectWalletMsg = document.querySelector('#connectWalletMessage');
const connectWalletBtn = document.querySelector('#connectWallet');
const votingStation = document.querySelector('#votingStation');
const timerTime = document.querySelector('#time');
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
const candidate = document.querySelector('#candidate');
const eligibleVoterAddress = document.querySelector('#eligibleVoterAddress');

// configuring ethers
const contractAddress = '0x7D56AdB2975Ba30B202E6A2503f64200e5a404c2';
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
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
let signer;
  
const provider = new ethers.providers.Web3Provider(window.ethereum, 11155111);
provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
        signer = provider.getSigner(accounts[0])
        contract = new ethers.Contract(contractAddress, contractABI, signer)
    });
});

// functions
const getAllCandidates = async function() {
    if(document.getElementById("candidateBoard")){
        document.getElementById("candidateBoard").remove();
    }

    let board = document.createElement("table");
    board.id="candidateBoard";
    mainBoard.appendChild(board);

    let tableHeader = document.createElement("tr");
    tableHeader.innerHTML = `<th>ID No.</th>
                             <th>Candidate</th>`;
    board.appendChild(tableHeader);
    
    let candidates = await contract.retrieveVotes();
    for (let i = 0; i < candidates.length; i++){
        let candidate = document.createElement("tr");
        candidate.innerHTML = `<td>${parseInt(candidates[i][0])}</td>
                               <td>${candidates[i][1]}</td>`;
        board.appendChild(candidate);                       
    }
}

const getResult = async function() {
    result.style.display = "flex";
    
    if (document.getElementById("resultBoard")){
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
    for (let i = 0; i < candidates.length; i++){
        let candidate = document.createElement("tr");
        candidate.innerHTML = `<td>${parseInt(candidates[i][0])}</td>
                               <td>${candidates[i][1]}</td>
                               <td>${parseInt(candidates[i][2])}</td>`;
        resultBoard.appendChild(candidate);                       
    }
}

const refreshPage = function() {
    setInterval(async() => {
        let time = await contract.electionTimer();
        if(time>0){
            timerMessage.innerHTML = `<span id="time">${time}</span> seconds left.`;
            voteForm.style.display = `flex`;
            showResultContainer.style.display = `none`;
        } else {
            timerMessage.textContent = "Either there's no election yet or it's already over!";
            voteForm.style.display = `none`;
            showResultContainer.style.display = `block`;
        }
    }, 1000);

    setInterval(async() => {
        getAllCandidates();
    }, 10000);
}

const sendVote = async function() {
  if (!vote.value) {
      alert('Enter a candidate number!');
      return; // Stop the function if no candidate number is entered
  }
  
  try {
      await contract.voteTo(vote.value);
      const candidateName = await contract.candidates(vote.value); // Assuming this retrieves the candidate details
      document.getElementById('votedCandidateName').textContent = candidateName.name; // Adjust based on actual data structure

      // Hide main app UI
      document.getElementById('votingStation').style.display = 'none';

      // Show the outro page
      document.getElementById('outroPage').style.display = 'flex';
  } catch (error) {
      console.error('Vote submission failed:', error);
      alert('You are not eligible to vote.');
  }
};

const startElection = async function() {
  const _candidates = candidates.value.split(",").map(s => s.trim());
  const _votingDuration = electionDuration.value;
  const _eligibleVotersInput = document.getElementById('eligibleVoters').value;
  const _eligibleVoters = _eligibleVotersInput.split(",").map(address => address.trim());

  if (!_candidates.length || !_votingDuration || !_eligibleVoters.length) {
      alert('Please fill in all fields correctly.');
      return;
  }

  try {
      await contract.startElection(_candidates, _votingDuration, _eligibleVoters);
      alert('Election started successfully.');

      // Reset the form fields
      candidates.value = "";
      electionDuration.value = "";
      document.getElementById('eligibleVoters').value = "";

      // Additional UI updates as necessary
  } catch (error) {
      console.error('Failed to start the election:', error);
      alert('Failed to start the election.');
  }
}


const getAccount = async function() {
    const ethAccounts = await provider.send("eth_requestAccounts", []).then(()=>{
        provider.listAccounts().then((accounts) => {
            signer = provider.getSigner(accounts[0]);
            contract = new ethers.Contract(contractAddress, contractABI, signer)
        });
    });

    connectWalletBtn.textContent = signer._address.slice(0,10) + "...";
    connectWalletMsg.textContent = "You are currently connected...";
    connectWalletBtn.disabled = true;

    let owner = await contract.owner();
    if (owner == signer._address){
      admin.style.display = "flex";
      let time = await contract.electionTimer();
      if (time==0){
          contract.checkElectionPeriod();
      }
  }
    votingStation.style.display = "flex";
    
    refreshPage();
    getAllCandidates();
};

document.addEventListener('DOMContentLoaded', function() {
  const startAppButton = document.querySelector('#startApp');
  document.getElementById('connectMetamask').style.display = 'none';
  startAppButton.addEventListener('click', function() {
      document.getElementById('introPage').style.display = 'none';
      document.getElementById('connectMetamask').style.display = 'flex';
      // Call getAccount to initiate wallet connection
      getAccount();
  });
});




// add event listeners
connectWalletBtn.addEventListener('click', getAccount);
showResult.addEventListener('click', getResult);
voteBtn.addEventListener('click', sendVote);
startAnElection.addEventListener('click', startElection);