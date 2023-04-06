import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Navbar = () => {
	const location = useLocation();

	const { pathname } = location;
	const splitLocation = pathname.split("/");

	return (
		<nav className="navbar">
			<h3>DCVAuthority</h3>
			<div className="links"></div>
			<Link
				className={splitLocation[1] === "" ? "active-navbar" : ""}
				to="/"
			>
				Supervisor 
			</Link>
			<Link
				to="/instructor"
				className={splitLocation[1] === "instructor" ? "active-navbar" : ""}
			>
				Instructor
			</Link>
			<Link
				to="/verify"
				className={splitLocation[1] === "verify" ? "active-navbar" : ""}
			>
				Verify
			</Link>
		</nav>
	);
};

export default Navbar;
