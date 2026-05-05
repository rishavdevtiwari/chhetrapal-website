"use client";

import { FormEvent } from "react";

type AdmissionsApplicationFormProps = {
	downloadHref: string;
	downloadTitle: string;
};

export default function AdmissionsApplicationForm({ downloadHref, downloadTitle }: AdmissionsApplicationFormProps) {
	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const firstName = String(formData.get("firstName") || "");
		const lastName = String(formData.get("lastName") || "");
		const dob = String(formData.get("dob") || "");
		const grade = String(formData.get("grade") || "");
		const stream = String(formData.get("stream") || "");
		const previousSchool = String(formData.get("previousSchool") || "");
		const guardianName = String(formData.get("guardianName") || "");
		const guardianPhone = String(formData.get("guardianPhone") || "");
		const email = String(formData.get("email") || "");
		const address = String(formData.get("address") || "");
		const notes = String(formData.get("notes") || "");
		const subject = encodeURIComponent(`Admission enquiry: ${firstName} ${lastName}`);
		const body = encodeURIComponent(
			[
				`Student: ${firstName} ${lastName}`,
				`Date of Birth: ${dob}`,
				`Applying Grade: ${grade}`,
				`Stream: ${stream}`,
				`Previous School: ${previousSchool}`,
				`Guardian Name: ${guardianName}`,
				`Guardian Phone: ${guardianPhone}`,
				`Email: ${email}`,
				`Address: ${address}`,
				`Notes: ${notes}`,
			].join("\n")
		);
		window.location.href = `mailto:info@chhetrapalschool.edu.np?subject=${subject}&body=${body}`;
	}

	return (
		<form className="p-5 space-y-5" onSubmit={handleSubmit}>
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
				<div>
					<label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Student First Name</label>
					<input name="firstName" type="text" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" placeholder="First name" />
				</div>
				<div>
					<label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Student Last Name</label>
					<input name="lastName" type="text" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" placeholder="Last name" />
				</div>
				<div>
					<label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Date of Birth</label>
					<input name="dob" type="date" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" />
				</div>
			</div>

			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
				<div>
					<label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Applying Grade</label>
					<select name="grade" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm bg-white">
						<option>Select grade</option>
						<option>Class 1</option>
						<option>Class 5</option>
						<option>Class 8</option>
						<option>Class 10</option>
						<option>Class 11</option>
					</select>
				</div>
				<div>
					<label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Stream (for +2)</label>
					<select name="stream" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm bg-white">
						<option>Select stream</option>
						<option>Science</option>
						<option>Management</option>
						<option>N/A</option>
					</select>
				</div>
				<div>
					<label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Previous School</label>
					<input name="previousSchool" type="text" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" placeholder="Previous school name" />
				</div>
			</div>

			<div className="grid sm:grid-cols-2 gap-4">
				<div>
					<label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Guardian Name</label>
					<input name="guardianName" type="text" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" placeholder="Guardian full name" />
				</div>
				<div>
					<label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Guardian Phone</label>
					<input name="guardianPhone" type="tel" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" placeholder="+977-XXXXXXXXXX" />
				</div>
			</div>

			<div className="grid sm:grid-cols-2 gap-4">
				<div>
					<label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Email</label>
					<input name="email" type="email" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" placeholder="email@example.com" />
				</div>
				<div>
					<label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Address</label>
					<input name="address" type="text" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm" placeholder="Local address" />
				</div>
			</div>

			<div>
				<label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Additional Notes</label>
				<textarea name="notes" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm" placeholder="Any special remarks" />
			</div>

			<div className="flex flex-wrap items-center gap-3">
				<button type="submit" className="h-10 px-5 bg-[#e8841a] text-white rounded-sm font-semibold text-sm hover:bg-orange-600 transition-colors">
					Submit Application
				</button>
				<a href={downloadHref || "#"} className="h-10 px-5 border border-gray-300 text-[#1a3a6b] rounded-sm font-semibold text-sm hover:bg-blue-50 transition-colors inline-flex items-center gap-2">
					{downloadTitle}
				</a>
			</div>
		</form>
	);
}