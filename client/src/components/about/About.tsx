const About = ({ aboutRef }: { aboutRef: any }) => {
	return (
		<div ref={aboutRef} className="relative mt-10">
			<div className="flex h-[500px] w-full flex-col items-center gap-5 overflow-hidden">
				<div className="w-1/2 text-center">
					<div className="text-3xl font-semibold">
						<h2 className="w-full text-center text-2xl font-semibold lg:text-3xl">
							<span className="text-primary"> </span>Languages &amp; Tools
							<span className="text-primary"></span>
						</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
