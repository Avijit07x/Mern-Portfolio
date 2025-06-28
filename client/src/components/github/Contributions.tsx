import { useEffect, useState } from "react";
import GithubGraph from "./GithubGraph";

const Contributions: React.FC = () => {
	const [contributions, setContributions] = useState([]);

	useEffect(() => {
		fetch("https://github-contributions-api.jogruber.de/v4/avijit07x?y=last")
			.then((res) => res.json())
			.then((data) => setContributions(data.contributions))
			.catch(console.error);
	}, []);

	return (
		<div>
			<h2 className="my-5 w-full text-center text-2xl font-semibold lg:text-3xl">
				GitHub Contributions
			</h2>

			<div className="w-full max-lg:overflow-x-scroll">
				<GithubGraph contributions={contributions} />
			</div>
		</div>
	);
};

export default Contributions;
