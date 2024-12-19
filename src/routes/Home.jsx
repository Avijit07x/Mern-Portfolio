import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

const Home = () => {
	return (
		<div className="mx-auto h-full max-w-screen-2xl text-white">
			<div className="relative z-50 flex h-screen w-full overflow-hidden bg-[#01031a00] 3xl:h-[700px]">
				<Navbar />
				<Hero />
				<AnimatedGridPattern
					numSquares={30}
					maxOpacity={0.1}
					duration={3}
					repeatDelay={0.5}
					className={cn(
						"[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
						"inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
					)}
				/>
			</div>
			<div>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore expedita
				in aliquid saepe reiciendis doloremque nihil consequuntur labore
				voluptatibus tempore! Corrupti eum porro minima quisquam non molestiae
				vel, ad magnam! Lorem ipsum, dolor sit amet consectetur adipisicing
				elit. Commodi, minima amet! Optio officiis nulla aperiam alias repellat
				maxime, quae repudiandae dignissimos? Quia dolorem harum quos
				perspiciatis. Libero optio porro repudiandae. Eos illum dolore tempore
				minus iusto illo perferendis esse, animi porro fuga, non, consequatur
				odit accusantium officia nobis pariatur repellendus laborum dicta
				aperiam quisquam nulla numquam recusandae incidunt doloribus! Molestiae
				recusandae rerum ea dolorem inventore commodi veritatis qui eligendi
				laboriosam aperiam soluta, molestias minus saepe provident eum,
				voluptatem sint dignissimos, aspernatur animi porro exercitationem eos
				deleniti a natus! Fugit aliquid neque quam dolores maiores repellendus
				nesciunt veritatis hic laudantium enim. Voluptatibus magnam quae, facere
				at nisi iusto debitis exercitationem quo et minus sapiente consequatur
				maiores enim nostrum magni eos odit quam accusantium tenetur. Fuga illo
				et similique laborum, perspiciatis tenetur eaque voluptatibus est error
				blanditiis officia libero quibusdam consectetur minima ducimus eum, nam
				maiores! Ex reprehenderit ipsum at, sed culpa aspernatur, tempora
				veritatis quaerat accusamus laborum vitae nemo incidunt possimus quasi
				alias distinctio. Impedit exercitationem esse nesciunt quia hic sunt
				quaerat? Laborum, numquam dignissimos! Eos incidunt debitis quam, ut
				repellendus quaerat eius quos. Tenetur, sit ea quaerat placeat alias
				impedit. Tempore consectetur possimus ut ullam tempora, earum aliquid!
				Pariatur dolorem ipsam illum minima ea quasi optio odio vero eveniet
				error aspernatur, omnis similique. Ab neque quia pariatur distinctio
				tenetur placeat assumenda, qui suscipit provident quisquam labore ex
				expedita vero? Quae quaerat perspiciatis sit libero vel dolores rem aut
				cum atque sunt aliquam inventore laudantium, harum repudiandae expedita
				fuga et? Ad, illo? Reiciendis id dicta, voluptas autem quas rem, tenetur
				architecto alias quos possimus itaque? Corrupti at dolores maiores,
				pariatur aliquam quisquam unde id maxime obcaecati odit nulla cumque
				repudiandae quibusdam ea. Adipisci eligendi quibusdam, officiis
				voluptatum velit harum itaque recusandae necessitatibus enim, magnam
				illum, consequuntur assumenda! Modi, asperiores fugiat? Dolore
				provident, facere tenetur quae nihil aliquid quo pariatur vitae nesciunt
				est. Eligendi in obcaecati quia iste consequatur quis, tempore sunt
				nisi, aut, minima facere labore nemo natus laboriosam voluptas et
				cupiditate provident at. Nesciunt impedit quibusdam sunt deleniti magni
				voluptates iusto repellendus odio maiores fuga odit modi at ipsam quod
				nulla voluptate non nemo saepe in, eveniet soluta. Soluta sed, ex
				pariatur accusamus nemo eveniet saepe ab ipsam autem illum perferendis
				sequi voluptatum officiis earum, unde, corporis dignissimos aperiam quis
				dolorem temporibus dolor ipsum accusantium odio suscipit. Iure, quasi
				quo veritatis est voluptatibus excepturi, cumque dolorem, saepe tenetur
				hic aliquid.
			</div>
		</div>
	);
};

export default Home;
