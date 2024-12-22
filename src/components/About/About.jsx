import { memo } from "react";

const About = ({ aboutRef }) => {
	console.log("about");
	return (
		<div ref={aboutRef} className="relative mt-10">
			<div className="flex w-full flex-col items-center gap-5 overflow-hidden lg:flex-row lg:px-16">
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel harum facilis consectetur, eum provident eos itaque, praesentium laborum nihil, consequuntur exercitationem voluptate deleniti saepe suscipit cupiditate optio perferendis nobis? Molestiae incidunt est ea facilis ipsum assumenda quos modi, quo atque mollitia soluta! Necessitatibus suscipit sunt dolor magnam earum amet quisquam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae, ratione quos? Iure dignissimos quasi sed a ipsam dolor at doloremque sapiente, id cumque, voluptatibus repellat explicabo aperiam! Eius quo sed, quos quae quaerat tenetur laudantium, perferendis earum iusto beatae nesciunt? Quas eaque exercitationem blanditiis praesentium dolores cupiditate! Accusantium magni dignissimos animi ex voluptatibus mollitia expedita? Eligendi exercitationem nam, aliquid veniam dolorum iste nostrum neque deleniti ipsum quibusdam facere corrupti animi officiis cumque, perspiciatis quisquam ratione quia quasi assumenda, inventore explicabo laborum. Dolor, eum saepe ullam qui assumenda ab debitis quis sint recusandae, velit, praesentium eos. Repudiandae temporibus adipisci voluptates maxime?
			</div>
		</div>
	);
};

export default memo(About);
