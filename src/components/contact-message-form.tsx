"use client";

import { FormEvent } from "react";

type ContactMessageFormProps = {
	email: string;
};

export default function ContactMessageForm({ email }: ContactMessageFormProps) {
	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const firstName = String(formData.get("firstName") || "");
		const lastName = String(formData.get("lastName") || "");
		const emailValue = String(formData.get("email") || "");
		const phoneValue = String(formData.get("phone") || "");
		const subjectValue = String(formData.get("subject") || "General Enquiry");
		const messageValue = String(formData.get("message") || "");
		const subject = encodeURIComponent(`Website enquiry: ${subjectValue}`);
		const body = encodeURIComponent(
			[
				`Name: ${firstName} ${lastName}`,
				`Email: ${emailValue}`,
				`Phone: ${phoneValue}`,
				`Subject: ${subjectValue}`,
				`Message: ${messageValue}`,
			].join("\n")
		);
		window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
	}

	return (
		<form className="p-5 space-y-4" onSubmit={handleSubmit}>
			<div className="grid sm:grid-cols-2 gap-4">
				<div>
					<label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">First Name</label>
					<input name="firstName" type="text" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" placeholder="First name" />
				</div>
				<div>
					<label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Last Name</label>
					<input name="lastName" type="text" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" placeholder="Last name" />
				</div>
			</div>
			<div className="grid sm:grid-cols-2 gap-4">
				<div>
					<label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Email</label>
					<input name="email" type="email" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" placeholder="example@email.com" />
				</div>
				<div>
					<label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Phone</label>
					<input name="phone" type="tel" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" placeholder="+977-XXXXXXXXXX" />
				</div>
			</div>
			<div>
				<label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Subject</label>
				<select name="subject" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm bg-white">
					<option>Select subject</option>
					<option>General Enquiry</option>
					<option>Admission</option>
					<option>Academics</option>
					<option>Other</option>
				</select>
			</div>
			<div>
				<label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Message</label>
				<textarea name="message" className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm" rows={6} placeholder="Write your message" />
			</div>
			<button type="submit" className="h-10 px-5 bg-[#e8841a] text-white rounded-sm font-semibold text-sm hover:bg-orange-600 transition-colors">
				Send Message
			</button>
		</form>
	);
}