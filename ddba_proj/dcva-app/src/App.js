import logo from "./logo.svg";
//import "./App.css";
import Verify from './Verify'
import Navbar from "./Navbar";
import Supervisor from "./Supervisor";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Instructor from "./Instructor";
import Request from "./Request";
import NotFound from "./NotFound";

function App() {
	return (
		<Router>
			<div className="App">
				<Navbar />
				<div className="content">
					<Switch>
						<Route exact path="/">
							<Supervisor />
						</Route>
						<Route path="/instructor">
							<Instructor />
						</Route>
						<Route path="/request/:id">
							<Request />
						</Route>
						<Route path="/verify">
							<Verify />
						</Route>
						<Route path="*">
							<NotFound/>
						</Route>
					</Switch>
				</div>
			</div>
		</Router>
	);
}

export default App;
