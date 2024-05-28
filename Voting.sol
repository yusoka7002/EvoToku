// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract Voting {
    struct Candidate {
        uint256 id;
        string name;
        uint256 numberOfVotes;
    }

    Candidate[] public candidates;
    address public owner;
    mapping(address => bool) public voters;
    address[] public listOfVoters;

    // New mapping for checking if an address is an eligible voter
    mapping(address => bool) public eligibleVoters;
    // New array to keep track of all eligible voters for viewing purposes
    address[] public eligibleVoterList;

    uint256 public votingStart;
    uint256 public votingEnd;
    bool public electionStarted;

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not authorized to start an election!");
        _;
    }

    modifier electionOngoing() {
        require(electionStarted, "No election is currently ongoing.");
        _;
    }

    event EligibilityChanged(address indexed voter, bool isEligible);

    constructor() {
        owner = msg.sender;
    }

    function startElection(string[] memory _candidates, uint256 _votingDuration, address[] memory _eligibleVoters) public onlyOwner {
        require(!electionStarted, "Election is currently ongoing!");
        delete candidates;
        resetAllVoterStatus();
        
        // Resetting eligible voters for the new election
        for (uint256 i = 0; i < eligibleVoterList.length; i++) {
            eligibleVoters[eligibleVoterList[i]] = false;
        }
        delete eligibleVoterList;

        // Adding new eligible voters
        for (uint256 i = 0; i < _eligibleVoters.length; i++) {
            eligibleVoters[_eligibleVoters[i]] = true;
            eligibleVoterList.push(_eligibleVoters[i]);
        }

        for (uint256 i = 0; i < _candidates.length; i++) {
            candidates.push(Candidate({id: i, name: _candidates[i], numberOfVotes: 0}));
        }
        electionStarted = true;
        votingStart = block.timestamp;
        votingEnd = block.timestamp + (_votingDuration * 1 minutes);
    }

    function voterStatus(address _voter) public view electionOngoing returns (bool) {
        return voters[_voter];
    }

    function voteTo(uint256 _id) public electionOngoing {
        require(eligibleVoters[msg.sender], "You are not eligible to vote.");
        require(checkElectionPeriod(), "Election period has ended.");
        require(!voters[msg.sender], "You already voted. You can only vote once.");
        candidates[_id].numberOfVotes++;
        voters[msg.sender] = true;
        listOfVoters.push(msg.sender);
    }

    function retrieveVotes() public view returns (Candidate[] memory) {
        return candidates;
    }

    function electionTimer() public view returns (uint256) {
        if (!electionStarted) {
            return 0; // Return 0 or some safe value indicating no election is active
        }
        if (block.timestamp >= votingEnd) {
            return 0; // Election is over, return 0
        }
        return (votingEnd - block.timestamp); // Return the remaining time if election is ongoing
    }

    function checkElectionPeriod() public returns (bool) {
        if (electionTimer() > 0) {
            return true;
        }
        electionStarted = false;
        return false;
    }

    function resetAllVoterStatus() public onlyOwner {
        for (uint256 i = 0; i < listOfVoters.length; i++) {
            voters[listOfVoters[i]] = false;
        }
        delete listOfVoters;
    }

    // New function to retrieve the list of eligible voters
    function getEligibleVoters() public view returns (address[] memory) {
        return eligibleVoterList;
    }

    // Function to check if a specific voter is eligible
    function checkVoterEligibility(address _voter) public view returns (bool) {
        return eligibleVoters[_voter];
    }
}
