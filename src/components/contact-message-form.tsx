"use client";

import { FormEvent, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

type ContactMessageFormProps = {
	email: string;
};

export default function ContactMessageForm({ email }: ContactMessageFormProps) {
	const { language } = useLanguage();
	const isNe = language === "ne";
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsSubmitting(true);
		setStatusMessage(null);

		const formElement = event.currentTarget;
		const formData = new FormData(formElement);
		const firstName = String(formData.get("firstName") || "").trim();
		const lastName = String(formData.get("lastName") || "").trim();
		const emailValue = String(formData.get("email") || "").trim();
		const phoneValue = String(formData.get("phone") || "").trim();
		const subjectValue = String(formData.get("subject") || "General Enquiry").trim();
		const messageValue = String(formData.get("message") || "").trim();

		if (!firstName || !lastName || !emailValue || !messageValue) {
			setStatusMessage({
				type: "error",
				text: isNe ? "कृपया सबै आवश्यक विवरणहरू भर्नुहोस्।" : "Please fill in all required fields.",
			});
			setIsSubmitting(false);
			return;
		}

		const triggerMailtoFallback = (noticeText: string) => {
			setStatusMessage({
				type: "success",
				text: noticeText,
			});
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
		};

		try {
			const apiOrigin = process.env.NEXT_PUBLIC_WORDPRESS_ORIGIN || "http://localhost:9400";
			const response = await fetch(`${apiOrigin}/wp-json/chhetrapal/v1/submit-contact`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					firstName,
					lastName,
					email: emailValue,
					phone: phoneValue,
					subject: subjectValue,
					message: messageValue,
				}),
			});

			if (response.ok) {
				const resData = await response.json();
				if (resData.success) {
					setStatusMessage({
						type: "success",
						text: isNe
							? "तपाईंको सन्देश सफलतापूर्वक पठाइएको छ र CMS मा दर्ता भएको छ!"
							: "Your message has been submitted and registered in the CMS successfully!",
					});
					formElement.reset();
				} else {
					throw new Error(resData.message || "Failed to submit");
				}
			} else {
				throw new Error("HTTP error " + response.status);
			}
		} catch (err) {
			console.warn("REST API contact submission failed, falling back to mailto:", err);
			triggerMailtoFallback(
				isNe
					? "सर्भरसँग जडान हुन सकेन। इमेल पठाउनको लागि फारम खुल्दैछ..."
					: "Could not connect to server. Opening mail client for direct email submission..."
			);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<form className="p-5 space-y-4" onSubmit={handleSubmit}>
			{statusMessage && (
				<div
					className={`p-4 rounded-sm text-sm font-semibold border ${
						statusMessage.type === "success"
							? "bg-green-50 text-green-800 border-green-200"
							: "bg-red-50 text-red-800 border-red-200"
					}`}
				>
					{statusMessage.text}
				</div>
			)}
			<div className="grid sm:grid-cols-2 gap-4">
				<div>
					<label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">
						{isNe ? "पहिलो नाम" : "First Name"} *
					</label>
					<input name="firstName" type="text" required className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" placeholder={isNe ? "पहिलो नाम" : "First name"} />
				</div>
				<div>
					<label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">
						{isNe ? "थर" : "Last Name"} *
					</label>
					<input name="lastName" type="text" required className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" placeholder={isNe ? "थर" : "Last name"} />
				</div>
			</div>
			<div className="grid sm:grid-cols-2 gap-4">
				<div>
					<label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">
						{isNe ? "इमेल" : "Email"} *
					</label>
					<input name="email" type="email" required className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" placeholder="example@email.com" />
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
					{isNe ? "विषय" : "Subject"} *
				</label>
				<select name="subject" required className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm bg-white">
					<option value="General Enquiry">{isNe ? "सामान्य सोधपुछ" : "General Enquiry"}</option>
					<option value="Admission">{isNe ? "भर्ना" : "Admission"}</option>
					<option value="Academics">{isNe ? "शैक्षिक" : "Academics"}</option>
					<option value="Other">{isNe ? "अन्य" : "Other"}</option>
				</select>
			</div>
			<div>
				<label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">
					{isNe ? "सन्देश" : "Message"} *
				</label>
				<textarea name="message" required className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm" rows={6} placeholder={isNe ? "तपाईंको सन्देश लेख्नुहोस्" : "Write your message"} />
			</div>
			<button
				type="submit"
				disabled={isSubmitting}
				className={`h-10 px-5 bg-[#e8841a] text-white rounded-sm font-semibold text-sm hover:bg-orange-600 transition-colors ${
					isSubmitting ? "opacity-55 cursor-not-allowed" : ""
				}`}
			>
				{isSubmitting ? (isNe ? "पठाउँदै..." : "Sending...") : (isNe ? "सन्देश पठाउनुहोस्" : "Send Message")}
			</button>
		</form>
	);
}