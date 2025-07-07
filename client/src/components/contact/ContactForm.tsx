import api from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Send } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const contactFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email("Invalid email"),
	message: z.string().min(5, "Message must be at least 5 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const ContactForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ContactFormData>({
		resolver: zodResolver(contactFormSchema),
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const onSubmit = async (data: ContactFormData) => {
		try {
			setIsLoading(true);
			await api.post("admin/email/send-email", data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} noValidate>
			<div className="flex items-center gap-3 max-sm:flex-col">
				<div className="w-full space-y-3">
					<Label htmlFor="name">Name</Label>
					<Input
						type="text"
						id="name"
						{...register("name")}
						className="border border-white/[0.1] focus:border-transparent focus:ring-2 focus:ring-offset-0 max-sm:text-sm"
						placeholder="Your name"
					/>
					{errors.name && (
						<p className="text-sm text-red-500">{errors.name.message}</p>
					)}
				</div>
				<div className="w-full space-y-3">
					<Label htmlFor="email">Email</Label>
					<Input
						type="email"
						id="email"
						{...register("email")}
						className="border border-white/[0.1] focus:border-transparent focus:ring-2 focus:ring-offset-0 max-sm:text-sm"
						placeholder="email@example.com"
					/>
					{errors.email && (
						<p className="text-sm text-red-500">{errors.email.message}</p>
					)}
				</div>
			</div>

			<div className="mt-3 w-full space-y-3">
				<Label htmlFor="message">Message</Label>
				<Textarea
					id="message"
					{...register("message")}
					className="min-h-30 border border-white/[0.1] focus:border-transparent focus:ring-2 focus:ring-offset-0 max-sm:text-sm"
					placeholder="Let’s talk about your vision"
				/>
				{errors.message && (
					<p className="text-sm text-red-500">{errors.message.message}</p>
				)}
			</div>

			<Button
				type="submit"
				className="mt-4 w-full bg-blue-500 hover:bg-blue-500/90"
			>
				<>
					{isLoading ? (
						<>
							<span>
								<Loader className="animate-spin" />
							</span>
							<span>Sending message</span>
						</>
					) : (
						<>
							<span>
								<Send />
							</span>
							<span>Send message</span>
						</>
					)}
				</>
			</Button>
		</form>
	);
};

export default ContactForm;
