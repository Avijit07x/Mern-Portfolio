import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: LoginFormData) => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await dispatch(login(data)).unwrap();
			if (res.success) {
				navigate("/");
				toast.success("Login successful!");
			} else {
				toast.error("Login failed!");
				setIsLoading(false);
			}
		} catch (err: any) {
			console.log("Error:", err);
			setError(err?.message || "Login failed!");
		}
	};

	return (
		<div className="flex h-svh items-center justify-center bg-[#1f1f22]">
			<Card className="w-full border-none bg-[#232327] text-white shadow-lg max-sm:flex max-sm:h-full max-sm:w-full max-sm:justify-center max-sm:rounded-none max-sm:shadow-none sm:max-w-sm">
				<CardHeader>
					<CardTitle className="text-center text-xl font-bold max-sm:text-2xl">
						Admin Login
					</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div className="space-y-3">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								{...register("email")}
								placeholder="Email"
								className="border-[#2b2b30] py-5 text-white selection:bg-amber-700"
							/>
							{errors.email && (
								<p className="text-sm text-red-500">{errors.email.message}</p>
							)}
						</div>

						<div className="space-y-3">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								{...register("password")}
								placeholder="Password"
								className="border-[#2b2b30] py-5 text-white selection:bg-amber-700"
							/>
							{errors.password && (
								<p className="text-sm text-red-500">
									{errors.password.message}
								</p>
							)}
						</div>

						{error && (
							<p className="text-center text-sm text-red-500">{error}</p>
						)}

						<Button
							type="submit"
							className="w-full bg-blue-500/60 py-5 hover:bg-blue-500/90 disabled:bg-blue-300"
							disabled={isLoading}
						>
							{isLoading ? (
								<div className="flex items-center justify-center gap-2">
									<Loader className="animate-spin" />
									<span>Logging in</span>
								</div>
							) : (
								"Login"
							)}
						</Button>
					</form>
					<div className="mt-3 rounded-lg bg-[#ff2056]/60 p-3 text-center text-sm font-semibold text-white">
						<p>
							This is a secured page. <br />
							Leave this page if you are not the <br /> administrator.
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default Login;
