// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Certification {
// structure to store certificate details
struct Certificate {
    string name;
    string email;
    string organization;
    uint marks;
    uint passingMarks;
    string courseName;
    string dateOfCompletion;
    string issuerOrganization;
    string instructorId;
    string instructorName;
    
}
    
// mapping to store instructor details
mapping(string => string) public instructors;

// mapping to store authorized addresses
mapping(address => bool) public authorizedAddresses;

// mapping to store certificates
mapping(string => Certificate) public certificates;

// function to add instructor to the mapping
function addInstructor(string memory _id, string memory _name) public {
    instructors[_id] = _name;
}

// function to add authorized addresses
function addAuthorizedAddress(address _address) public {
    authorizedAddresses[_address] = true;
}
constructor() {
        // initialize instructors mapping with dummy data
        addInstructor("20BKT0019", "Barath");
        addInstructor("20BKT0004", "Vijay");
        addInstructor("20BKT0008", "Preethan");
        
        // initialize authorizedAddresses mapping with first 3 ganache accounts
         addAuthorizedAddress(msg.sender);
        addAuthorizedAddress(0xa0cd7a4628a516a7381C81E9A6d1d51b41E96bD5);
        addAuthorizedAddress(0x2725Def9e111b1512Cb86147d6e290F0445de809);
        addAuthorizedAddress(0x750153B3490938f612dC47e4Cf6f41E9a76259D6);
    }
// function to verify certificate and add it to the blockchain
function verifyCertificate(string memory _name, 
                            string memory _email,
                           string memory _organization,
                           uint _marks, 
                           uint _passingMarks, 
                           string memory _courseName, 
                           string memory _dateOfCom, 
                           string memory _issuerOrganization, 
                           string memory  _instructorId,
                           string memory instructorName,
                           string memory certificateHash) public {
    
    // check if the instructor is authorized
    if(!authorizedAddresses[msg.sender]){
       revert("Unauthorized Instructor");}
    
    // check if the instructor id is valid
    if(keccak256(abi.encodePacked(instructors[_instructorId])) != keccak256(abi.encodePacked(instructorName)))
{   revert("Invalid Instructor");}

    
    // check if the marks obtained is greater than or equal to passing marks
    if(_marks <  _passingMarks)
{     revert("Marks obtained is less than passing marks");}
    
    // create a new certificate
    Certificate memory certificate = Certificate({
        name: _name,
        email : _email,
        organization: _organization,
        marks: _marks,
        passingMarks: _passingMarks,
        courseName: _courseName,
        dateOfCompletion: _dateOfCom,
        issuerOrganization: _issuerOrganization,
        instructorId: _instructorId,
        instructorName: instructors[_instructorId]
    });
    
    // add the certificate to the blockchain
    certificates[certificateHash] = certificate;
}

function checkCertificate(string memory hash) public view returns(Certificate memory){
   return certificates[hash];
   }
}