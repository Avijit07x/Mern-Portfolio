import GitHubCalendar from "react-github-calendar";

const Contributions: React.FC = () => {


	return (
		<div>
			<h2 className="mt-5 w-full text-center text-2xl font-semibold lg:text-3xl">
				GitHub Contributions
			</h2>

			<div className="mt-5 flex w-full items-center justify-center px-4">
				<GitHubCalendar
					username="avijit07x"
					blockSize={10}
					theme={{
						light: ["#050817", "#2e3355", "#6d73aa", "#a2a8d8", "#b2b9ff"],
						dark: ["#050817", "#2e3355", "#6d73aa", "#a2a8d8", "#b2b9ff"],
					}}
				/>
			</div>
		</div>
	);
};

export default Contributions;
