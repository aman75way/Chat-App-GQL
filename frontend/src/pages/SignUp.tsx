import { Link } from "react-router-dom";
import GenderCheckbox from "../components/GenderCheckbox";
import { useState } from "react";
import useSignup from "../hooks/useSignup";
import toast from "react-hot-toast";

const SignUp = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		email: "",
		password: "",
		confirmPassword: "",
		gender: "",
	});
	const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender: "MALE" | "FEMALE") => {
		setInputs({ ...inputs, gender });
	};

	const handleSubmitForm = (e: React.FormEvent) => {
		e.preventDefault();
		if (inputs.password !== inputs.confirmPassword) {
			return toast.error("Kindly check the passwords!");
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { confirmPassword, ...signupData } = inputs;

		console.log(signupData); // Logs the data without confirmPassword

		signup(signupData); // Pass the data without confirmPassword
	};


	return (
		<div className="flex flex-col items-center justify-center min-w-96 mx-auto">
			<div className="w-full p-6 rounded-lg shadow-md border border-slate-500 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
				<h1 className="text-3xl font-semibold text-center text-gray-300">
					Sign Up <span className="text-blue-500">75-Way CHATs</span>
				</h1>

				<form onSubmit={handleSubmitForm}>
					<div>
						<label className="label p-2">
							<span className="text-base label-text">Full Name</span>
						</label>
						<input
							type="text"
							placeholder="John Doe"
							className="w-full input input-bordered h-10"
							value={inputs.fullName}
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
						/>
					</div>

					<div>
						<label className="label p-2">
							<span className="text-base label-text">Email</span>
						</label>
						<input
							type="email"
							placeholder="johndoe@example.com"
							className="w-full input input-bordered h-10"
							value={inputs.email}
							onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
						/>
					</div>

					<div>
						<label className="label">
							<span className="text-base label-text">Password</span>
						</label>
						<input
							type="password"
							placeholder="Enter Password"
							className="w-full input input-bordered h-10"
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
					</div>

					<div>
						<label className="label">
							<span className="text-base label-text">Confirm Password</span>
						</label>
						<input
							type="password"
							placeholder="Confirm Password"
							className="w-full input input-bordered h-10"
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
						/>
					</div>

					<GenderCheckbox selectedGender={inputs.gender} onCheckboxChange={handleCheckboxChange} />

					<Link
						to={"/login"}
						className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white"
					>
						Already have an account?
					</Link>

					<div>
						<button className="btn btn-block btn-sm mt-2 border border-slate-700" disabled={loading}>
							{loading ? "Loading..." : "Sign Up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
