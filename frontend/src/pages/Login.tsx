import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Login = () => {
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});

	const { loading, login } = useLogin();

	const handleSubmitForm = (e: React.FormEvent) => {
		e.preventDefault();
		login(inputs.email, inputs.password);
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md border border-slate-500 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-white'>
					Login
					<span className='text-blue-500'> 75-Way CHATs</span>
				</h1>

				<form onSubmit={handleSubmitForm}>
					<div>
						<label className='label p-2 '>
							<span className='text-base label-text'>Email</span>
						</label>
						<input
							type='email'
							placeholder='Enter email'
							className='w-full input input-bordered h-10'
							value={inputs.email}
							onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
					</div>
					<Link
						to='/signup'
						className='text-sm  hover:underline text-white hover:text-blue-600 mt-2 inline-block'
					>
						{"Don't"} have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2' disabled={loading}>
							{loading ? "Loading..." : "Login"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default Login;
