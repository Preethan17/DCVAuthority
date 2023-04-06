import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useEffect, useState } from "react";
import Web3 from "web3";
import Certification from "./contracts/Certification.json";
import emailjs from '@emailjs/browser';

const Request = () => {
	const [count, setCount] = useState(0);
	const [contract, setContract] = useState(null);
	const [account, setAccount] = useState("");
  
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
    const sendEmail = () => {
		emailjs.send('service_qgq61tb', 'template_z1orep4', infos, 'uwOuA16ijWTJ8ycWN')
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
    }, (error) => {
      console.error('FAILED...', error);
    });
		
	  };
	const verifyCerti = async () => {
	  try {
		const gasLimit = 3000000;
		console.log("Hello");
		await contract.methods.verifyCertificate(infos.sname,infos.email, infos.org, infos.marks, infos.pass, infos.cname, infos.date, infos.corg, infos.instructorid, infos.instructor, infos.hash).send({ from: account, gas: gasLimit});
		
		sendEmail();
		handleDelete();
		alert("Verified !! ")
		console.log("Success");
	  } catch (error) {
		console.log(error);
		console.log(error.message);
		if (error.message.includes('revert')) {
			const errorMsg = error.message.substring(
			  error.message.lastIndexOf('revert') + 7 // add 7 to exclude the "revert" keyword
			);
			alert(errorMsg);}
		handleDelete();
	  }
	};
	const { id } = useParams();
	const {
		infos,
		isPending,
		error,
	} = useFetch("http://localhost:8000/requests/" + id);
	const history = useHistory();
	const handleDelete = () => {
		fetch("http://localhost:8000/requests/" + infos.id, {
			method: "DELETE",
		}).then(() => {
			 history.push("/");
		});
	};
	return (
		<div className="blog-details">
			{isPending && <div className="loading">Loading request...</div>}
			{error && <div className="loading">{error}</div>}
			{infos && (
				<article className="blog-final">
					<h2> {infos.sname}</h2> <br></br>
					<div> Student Email : {infos.email}</div>
					<div> Student Organisation : {infos.org}</div>
					<div> Scored Marks : {infos.marks}</div>
					<div> Pass Marks : {infos.pass}</div>
					<div> Course Name : {infos.cname}</div>
					<div> Date of Completion : {infos.date}</div>
					<div> Course provided by : {infos.corg}</div>
					<div> Instructor : {infos.instructor}</div>
					<div> Instructor ID : {infos.instructorid}</div><br></br>
					<button className="verify" onClick={verifyCerti}>Verify</button> <br></br><br></br>
					<button onClick={handleDelete}>Deny</button>
				</article>
			)}

		</div>
	);
};

export default Request;
