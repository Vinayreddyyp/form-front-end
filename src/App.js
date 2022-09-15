import "./App.css";

import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from "./validations/validation";

import Input from "./shared/Input";

const App = () => {
	return (
		<form className="container">
			<div className="form-elements">
				<Input
					type="text"
					validator={[VALIDATOR_REQUIRE()]}
					name="email"
					label="Email"
					id="email"
				/>

				<Input
					type="text"
					validator={[VALIDATOR_MINLENGTH(5)]}
					name="password"
					label="Password"
					id="password"
				/>
			</div>
		</form>
	);
};

export default App;
