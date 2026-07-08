"use client";

import { FormEvent } from "react";
import { useLanguage } from "@/context/LanguageContext";

type ContactMessageFormProps = {
	email: string;
};

export default function ContactMessageForm({ email }: ContactMessageFormProps) {
	const { language } = useLanguage();
	const isNe = language === "ne";

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
					<label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">
						{isNe ? "पहिलो नाम" : "First Name"}
					</label>
					<input name="firstName" type="text" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" placeholder={isNe ? "पहिलो नाम" : "First name"} />
				</div>
				<div>
					<label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">
						{isNe ? "थर" : "Last Name"}
					</label>
					<input name="lastName" type="text" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" placeholder={isNe ? "थर" : "Last name"} />
				</div>
			</div>
			<div className="grid sm:grid-cols-2 gap-4">
				<div>
					<label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">
						{isNe ? "इमेल" : "Email"}
					</label>
					<input name="email" type="email" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" placeholder="example@email.com" />
				</div>
				<div>
					<label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">
						{isNe ? "फोन नम्बर" : "Phone"}
					</label>
					<input name="phone" type="tel" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" placeholder="+977-XXXXXXXXXX" />
				</div>
			</div>
			<div>
				<label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">
					{isNe ? "विषय" : "Subject"}
				</label>
				<select name="subject" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm bg-white">
					<option>{isNe ? "विषय छनौट गर्नुहोस्" : "Select subject"}</option>
					<option value="General Enquiry">{isNe ? "सामान्य सोधपुछ" : "General Enquiry"}</option>
					<option value="Admission">{isNe ? "भर्ना" : "Admission"}</option>
					<option value="Academics">{isNe ? "शैक्षिक" : "Academics"}</option>
					<option value="Other">{isNe ? "अन्य" : "Other"}</option>
				</select>
			</div>
			<div>
				<label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">
					{isNe ? "सन्देश" : "Message"}
				</label>
				<textarea name="message" className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm" rows={6} placeholder={isNe ? "तपाईंको सन्देश लेख्नुहोस्" : "Write your message"} />
			</div>
			<button type="submit" className="h-10 px-5 bg-[#e8841a] text-white rounded-sm font-semibold text-sm hover:bg-orange-600 transition-colors">
				{isNe ? "सन्देश पठाउनुहोस्" : "Send Message"}
			</button>
		</form>
	);
}