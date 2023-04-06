import { Link } from "react-router-dom";

const RequestList = (props) => {
	const infos = props.info;
	const title = props.title;

	return (
		<div className="blog-list">
			<h2 className="blog-list-class">{title}</h2>
			{infos.map((info) => (
				<div className="blog-preview" key={info.id}>
					<Link to={`/request/${info.id}`}>
						
						<p style={{fontSize:'40px'}}>{info.sname}</p>
						<p style={{fontSize:'15px'}}>{info.org}</p> <br></br>
						<p>{info.cname}</p>
						<p>{info.instructor} ({info.instructorid})</p>
					</Link>
				</div>
			))}
		</div>
	);
};

export default RequestList;
