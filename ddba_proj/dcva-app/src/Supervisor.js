// import { useState, useEffect } from "react";
import RequestList from "./RequestList";
import useFetch from "./useFetch";

const Supervisor = () => {
	const {
		infos,
		isPending,
		error,
	} = useFetch("http://localhost:8000/requests");

	return (
		<div className="home">
			{error && <div className="loading">{error}</div>}
			{infos && <RequestList info={infos} title="Requests" />}
			{isPending && <div className="loading">Loading Requests...</div>}
		
		</div>
	);
};

export default Supervisor;
