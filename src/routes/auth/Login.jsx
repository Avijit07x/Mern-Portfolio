import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Login = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const handleFormSubmit = async (e) => {
		e.preventDefault();

		console.log(object);
	};

	return (
		<div className="flex h-dvh w-full select-none flex-col items-center justify-center p-10 bg-white">
			<div className="mx-auto flex w-full flex-col gap-4 rounded-lg bg-white p-5 text-center shadow-lg lg:w-1/4">
				<h1 className="text-2xl font-bold">Admin Login</h1>
				<form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
					<Input
						className="rounded-lg p-2 outline-none"
						type="text"
						name="userID"
						placeholder="User ID"
						autoComplete="username"
						required
					/>
					<div className="relative w-full">
						<Input
							className="w-full rounded-lg p-2 outline-none"
							type={showPassword ? "text" : "password"}
							name="password"
							placeholder="Password"
							autoComplete="current-password"
							required
						/>
						<div
							className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? (
								<Eye className="size-5 text-gray-400" />
							) : (
								<EyeOff className="size-5 text-gray-400" />
							)}
						</div>
					</div>
					<Button
						className="flex h-10 items-center justify-center rounded-lg bg-blue-500 text-white hover:bg-blue-500 hover:opacity-90"
						type="submit"
						disabled={isLoading}
					>
						{isLoading ? "Loading..." : "Login"}
					</Button>
				</form>
				<div className="rounded-lg bg-red-400 p-3 text-sm font-semibold text-white">
					<p>
						This is a secured page. <br />
						Leave this page if you are not the administrator.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
