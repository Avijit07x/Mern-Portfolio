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

type ContactFormProps = {
	onSuccess?: () => void;
};

const ContactForm: React.FC<ContactFormProps> = ({ onSuccess }) => {
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
			if (onSuccess) onSuccess();
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
		<form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
			<div className="grid grid-cols-1 border border-white/10 bg-white/2">
				<div className="grid grid-cols-1 sm:grid-cols-2">
					<div className="group relative border-b border-white/10 sm:border-r sm:border-b-0">
						<div className="flex h-full flex-col p-3 pt-2.5">
							<Label
								htmlFor="name"
								className="mb-1 text-[8px] font-bold tracking-[0.2em] text-white/30 uppercase transition-colors group-focus-within:text-white/60"
							>
								01 // NAME
							</Label>
							<Input
								type="text"
								id="name"
								{...register("name")}
								className="h-6 border-none bg-transparent p-0 text-sm shadow-none placeholder:text-white/5 focus-visible:ring-0"
								placeholder="..."
							/>
						</div>
						{errors.name && (
							<p className="absolute right-3 bottom-1 text-[9px] font-medium tracking-tighter text-red-500/80 uppercase">
								{errors.name.message}
							</p>
						)}
					</div>

					<div className="group relative border-t border-white/10 sm:border-t-0">
						<div className="flex h-full flex-col p-3 pt-2.5">
							<Label
								htmlFor="email"
								className="mb-1 text-[8px] font-bold tracking-[0.2em] text-white/30 uppercase transition-colors group-focus-within:text-white/60"
							>
								02 // EMAIL
							</Label>
							<Input
								type="email"
								id="email"
								{...register("email")}
								className="h-6 border-none bg-transparent p-0 text-sm shadow-none placeholder:text-white/5 focus-visible:ring-0"
								placeholder="..."
							/>
						</div>
						{errors.email && (
							<p className="absolute right-3 bottom-1 text-[9px] font-medium tracking-tighter text-red-500/80 uppercase">
								{errors.email.message}
							</p>
						)}
					</div>
				</div>

				<div className="group relative border-t border-white/10">
					<div className="flex flex-col p-3 pt-2.5">
						<Label
							htmlFor="message"
							className="mb-1.5 text-[8px] font-bold tracking-[0.2em] text-white/30 uppercase transition-colors group-focus-within:text-white/60"
						>
							03 // MESSAGE
						</Label>
						<Textarea
							id="message"
							{...register("message")}
							className="custom-scrollbar min-h-24 w-full resize-none border-none bg-transparent p-0 text-sm shadow-none placeholder:text-white/5 focus-visible:ring-0"
							placeholder="..."
						/>
					</div>
					{errors.message && (
						<p className="absolute right-4 bottom-2 text-[9px] font-medium tracking-tighter text-red-500/80 uppercase">
							{errors.message.message}
						</p>
					)}
				</div>

				<div className="border-t border-white/10">
					<Button
						type="submit"
						className="group flex h-14 w-full items-center justify-between rounded-none bg-white px-6 text-[10px] font-bold tracking-[0.3em] text-black uppercase transition-all hover:bg-white/90 disabled:opacity-50"
						disabled={mutation.isPending}
					>
						{mutation.isPending ? (
							<div className="flex items-center gap-3">
								<Loader className="size-3 animate-spin" />
								<span>PROCESSING...</span>
							</div>
						) : (
							<>
								<span>SUBMIT INQUIRY</span>
								<div className="flex items-center gap-2 overflow-hidden">
									<Send className="size-3 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
								</div>
							</>
						)}
					</Button>
				</div>
			</div>

			<div className="mt-4 min-h-4 text-center">
				{errorMessage && (
					<p className="text-[10px] font-medium tracking-widest text-red-500 uppercase">
						{errorMessage}
					</p>
				)}
				{successMessage && (
					<p className="text-[10px] font-medium tracking-widest text-emerald-500 uppercase">
						{successMessage}
					</p>
				)}
			</div>
		</form>
	);
};

export default ContactForm;
