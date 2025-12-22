import api from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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
	email: z.email("Invalid email"),
	message: z.string().min(5, "Message must be at least 5 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const sendMessage = async (data: ContactFormData) => {
	const res = await api.post("admin/email/send-email", data);
	return res.data;
};

const ContactForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ContactFormData>({
		resolver: zodResolver(contactFormSchema),
	});

	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const mutation = useMutation({
		mutationFn: sendMessage,
		retry: (failureCount, error: any) => {
			if (error?.status === 429) return false;
			return failureCount < 1;
		},

		onSuccess: () => {
			setSuccessMessage("Message sent successfully!");
			setErrorMessage("");
			reset();
		},
		onError: (error: any) => {
			setSuccessMessage("");
			const status = error?.response?.status;
			if (status === 429) {
				setErrorMessage(
					"Looks like you've reached the message limit. Try again later!",
				);
			} else {
				setErrorMessage("Something went wrong. Please try again.");
			}
		},
	});

	const onSubmit = (data: ContactFormData) => {
		mutation.mutate(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} noValidate>
			<div className="flex items-start gap-3 max-sm:flex-col">
				<div className="w-full space-y-3">
					<Label htmlFor="name">Name</Label>
					<Input
						type="text"
						id="name"
						{...register("name")}
						className="border border-white/10 focus:border-transparent focus:ring-2 focus:ring-offset-0 max-sm:text-sm"
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
						className="border border-white/10 focus:border-transparent focus:ring-2 focus:ring-offset-0 max-sm:text-sm"
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
					className="custom-scrollbar h-30 w-full resize-none overflow-y-auto border border-white/10 focus:border-transparent focus:ring-2 focus:ring-offset-0 max-sm:text-sm"
					placeholder="Let’s talk about your vision"
				/>
				{errors.message && (
					<p className="text-sm text-red-500">{errors.message.message}</p>
				)}
			</div>
			{errorMessage && (
				<p className="mt-3 text-center text-sm text-red-500">{errorMessage}</p>
			)}

			<Button
				type="submit"
				className="mt-4 w-full bg-blue-500 hover:bg-blue-500/90"
				disabled={mutation.isPending}
			>
				<>
					{mutation.isPending ? (
						<>
							<Loader className="animate-spin" />
							<span>Sending message</span>
						</>
					) : (
						<>
							<Send />
							<span>Send message</span>
						</>
					)}
				</>
			</Button>
			{successMessage && (
				<p className="mt-3 text-center text-sm text-green-500">
					{successMessage}
				</p>
			)}
		</form>
	);
};

export default ContactForm;
