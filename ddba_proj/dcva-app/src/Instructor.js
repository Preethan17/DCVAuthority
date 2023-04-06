import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { sha256 } from "js-sha256";
const Instructor = () => {
	
	const [sname, setSname] = useState("");
	const [email, setEmail] = useState("");
	const [org, setOrg] = useState("");
	const [marks, setMarks] = useState("");
	const [pass, setPass] = useState("");
	const [cname, setCname] = useState("");
	const [date, setDate] = useState("");
	const [corg, setCorg] = useState("");
	const [instructor, setInstructor] = useState("Barath");
	const [instructorid, setInsid] = useState("");
	const [isPending, setIsPending] = useState(false);
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = `${sname}${email}${org}${marks}${pass}${cname}${date}${corg}${instructor}${instructorid}`;
		const hash = sha256(data);
		const infos = {  sname,email, org, marks, pass, cname, date, corg, instructor,instructorid,hash };
		setIsPending(true);

		fetch("http://localhost:8000/requests", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(infos),
		}).then(() => {
			setIsPending(false);
			console.log(infos);
			console.log("Information sent");
			alert("Request Sent !!");
			setSname("");
			setOrg("");
			setEmail("");
			setMarks("");
			setPass("");
			setCname("");
			setDate("");
			setCorg("");
			setInstructor("Barath");
			setInsid("");


		});

	};

	return (
		<div className="create">
			<h2>Certificate</h2>
			<form onSubmit={handleSubmit}>

				<label>Student Name:</label>
				<input
					type="text"
					required
					value={sname}
					onChange={(e) => setSname(e.target.value)}
				/>
				<label>Student Email:</label>
				<input
					type="text"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label>Student Organisation:</label>
				<input
					type="text"
					required
					value={org}
					onChange={(e) => setOrg(e.target.value)}
				/>
				<label>Marks Obtained:</label>
				<input
					type="number"
					required
					value={marks}
					onChange={(e) => setMarks(e.target.value)}
				/>
				<label>Passing marks:</label>
				<input
					type="number"
					required
					value={pass}
					onChange={(e) => setPass(e.target.value)}
				/>
				<label>Certificate Name:</label>
				<input
					type="text"
					required
					value={cname}
					onChange={(e) => setCname(e.target.value)}
				/>
				
				<label>Date of Completion:</label>
				<input
					type="date"
					required
					value={date}
					onChange={(e) => setDate(e.target.value)}
				/>
				
				<label>Certification Organisation:</label>
				<input
					type="text"
					required
					value={corg}
					onChange={(e) => setCorg(e.target.value)}
				/>
				
				<label>Instructor:</label>
				<select
					value={instructor}
					onChange={(e) => setInstructor(e.target.value)}
				>
					<option value="Barath">Barath</option>
					<option value="Vijay">Vijay</option>
					<option value="Preethan">Preethan</option>
				</select>
				<label>Instructor ID:</label>
				<input
					type="text"
					required
					value={instructorid}
					onChange={(e) => setInsid(e.target.value)}
				/>
				{!isPending && <button>Send</button>}
				{isPending && <button disabled>Sending...</button>}
			</form>
		</div>
	);
};

export default Instructor;
