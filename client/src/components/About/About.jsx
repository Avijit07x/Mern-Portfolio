import { memo } from "react";

const About = ({ aboutRef }) => {
	return (
		<div ref={aboutRef} className="relative mt-10">
			<div className="flex h-[500px] w-full flex-col items-center gap-5 overflow-hidden lg:flex-row lg:px-16">
			
				<div className="w-1/2 mx-auto">
					Hi, I'm Avijit Dey, a passionate Frontend Developer with a strong
					background in building user-friendly, responsive, and visually
					appealing web applications. With a BTech in Computer Science and
					hands-on experience in modern web technologies like React, Next.js,
					Tailwind CSS, and the MERN stack, I strive to create seamless digital
					experiences that leave a lasting impact. I don’t just build websites—I
					craft digital experiences that are fast, dynamic, and tailored to user
					needs. Whether it's a sleek landing page, a full-fledged eCommerce
					platform, or a custom web application, I bring ideas to life with
					precision and creativity. While I work as a Frontend Developer, I also
					take on freelancing projects part-time, helping businesses and
					individuals turn their visions into reality. My goal is simple:
					delivering high-quality, performance-driven solutions that not only
					look great but function flawlessly. Let’s build something amazing
					together! If you’re looking for a dedicated developer who can bring
					fresh ideas to the table, let’s connect!
				</div>
			</div>
		</div>
	);
};

export default memo(About);
