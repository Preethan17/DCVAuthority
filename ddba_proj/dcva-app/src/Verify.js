import { useState,useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Web3 from "web3";
import Certification from "./contracts/Certification.json";

const Verify = () => {
	const [isPending, setIsPending] = useState(false);
	const [hash, setHash] = useState("");
	const [contract, setContract] = useState(null);
	const [account, setAccount] = useState("");
	const [iscertificate, setisCertificate] = useState(null);
	const [certificate,setCertificate]=useState(null);
	useEffect(() => {
	  const init = async () => {
		try {
		  // Create Web3 instance using Ganache provider
		  const ganacheProvider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
		  const web3Instance = new Web3(ganacheProvider);
  
		  // Get chain id of Ganache network
		  const chainId = await web3Instance.eth.getChainId();
		  console.log("Chain ID:", chainId);
  
		  // Get accounts from Ganache network
		  const accounts = await web3Instance.eth.getAccounts();
		  console.log("Accounts:", accounts);
		  setAccount(accounts[0]);
  
		  // Load contract
		  const networkId = await web3Instance.eth.net.getId();
		  const deployedNetwork = Certification.networks[networkId];
		  const certificationContract = new web3Instance.eth.Contract(
			Certification.abi,
			deployedNetwork && deployedNetwork.address,
		  );
		  setContract(certificationContract);
		} catch (error) {
		  console.log(error);
		}
	  };
	  init();
	}, []);
  
	

	const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsPending(true);
		try {
			const result = await contract.methods.checkCertificate(hash).call();
			
			
			
			if (result.organization=== "" || result.name === "" ||  result.marks === 0 || result.passingMarks === 0 || result.courseName === "" || result.dateOfCompletion === "" || result.issuerOrganization === "" || result.instructorName=== "" ) {
				alert("Certificate Not Valid");
				setisCertificate(false);
			} else {
				alert("Certificate Valid");
				setisCertificate(true);
				setCertificate(result);
			}
		  } catch (error) {
			console.log(error);
			console.log(error.message);
		  }finally {
			setIsPending(false);
		  }
		
	};
	
	return (
		<div className="create">
			<h2>Certificate</h2>
			<form onSubmit={handleSubmit}>
			
				<label>Certificate Hash:</label>
				<input
					type="text"
					required
					value={hash}
					onChange={(e) => setHash(e.target.value)}
				/>
				{!isPending && <button>Verify</button>}
				{isPending && <button disabled>Verifying...</button>}
			</form><br></br><br></br>
			{iscertificate && (
				<article className="blog-final">
					<h2> {certificate.name}</h2> 
					<div> Student Email : {certificate.email}</div>
					<div> Student Organisation : {certificate.organization}</div>
					<div> Scored Marks : {certificate.marks}</div>
					<div> Pass Marks : {certificate.passingMarks}</div>
					<div> Course Name : {certificate.courseName}</div>
					<div> Date of Completion : {certificate.dateOfCompletion}</div>
					{/* <div> Validity : {certificate.validity}</div> */}
					<div> Course provided by : {certificate.issuerOrganization}</div>
					<div> Instructor : {certificate.instructorName}</div>
					<div> Instructor ID : {certificate.instructorId}</div><br></br>
			
				</article>
			)}
		</div>
	);
};

export default Verify;