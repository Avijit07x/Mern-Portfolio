import { Link } from "react-router";

const NotFound = () => {
	return (
		<div className="flex h-svh w-full flex-col items-center justify-center uppercase tracking-wider text-white lg:text-xl">
			<h1> page does not exist</h1>

			<Link to="/" className="mt-5 underline">
				go back
			</Link>
		</div>
	);
};

export default NotFound;
