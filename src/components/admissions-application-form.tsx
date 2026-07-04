"use client";

import { FormEvent, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { admissionsInquirySchema } from "@/lib/validation";

type AdmissionsApplicationFormProps = {
  downloadHref: string;
  downloadTitle: string;
};

export default function AdmissionsApplicationForm({ downloadHref, downloadTitle }: AdmissionsApplicationFormProps) {
  const { language, t } = useLanguage();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);
  const isNe = language === "ne";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    
    const data = {
      firstName: String(formData.get("firstName") || ""),
      lastName: String(formData.get("lastName") || ""),
      dob: String(formData.get("dob") || ""),
      grade: String(formData.get("grade") || ""),
      stream: String(formData.get("stream") || ""),
      previousSchool: String(formData.get("previousSchool") || ""),
      guardianName: String(formData.get("guardianName") || ""),
      guardianPhone: String(formData.get("guardianPhone") || ""),
      email: String(formData.get("email") || ""),
      address: String(formData.get("address") || ""),
      notes: String(formData.get("notes") || ""),
    };

    // Client-side validation via Zod Schema
    const result = admissionsInquirySchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      setStatusMessage(null);
      return;
    }

    setErrors({});
    const validData = result.data;
    setIsSubmitting(true);
    setStatusMessage(null);

    const triggerMailtoFallback = (infoText: string) => {
      setStatusMessage({
        type: "info",
        text: infoText,
      });
      const subject = encodeURIComponent(`Admission enquiry: ${validData.firstName} ${validData.lastName}`);
      const body = encodeURIComponent(
        [
          `Student: ${validData.firstName} ${validData.lastName}`,
          `Date of Birth: ${validData.dob}`,
          `Applying Grade: ${validData.grade}`,
          `Stream: ${validData.stream || "N/A"}`,
          `Previous School: ${validData.previousSchool || "None"}`,
          `Guardian Name: ${validData.guardianName}`,
          `Guardian Phone: ${validData.guardianPhone}`,
          `Email: ${validData.email}`,
          `Address: ${validData.address}`,
          `Notes: ${validData.notes || "None"}`,
        ].join("\n")
      );
      window.location.href = `mailto:info@chhetrapalschool.edu.np?subject=${subject}&body=${body}`;
    };

    try {
      const apiOrigin = process.env.NEXT_PUBLIC_WORDPRESS_ORIGIN || "http://localhost:9400";
      const response = await fetch(`${apiOrigin}/wp-json/chhetrapal/v1/submit-admission`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validData),
      });

      if (response.ok) {
        const resData = await response.json();
        if (resData.success) {
          setStatusMessage({
            type: "success",
            text: isNe
              ? "तपाईंको आवेदन सफलतापूर्वक दर्ता भएको छ!"
              : "Your application has been registered successfully!",
          });
          formElement.reset();
        } else {
          throw new Error(resData.message || "Failed to submit");
        }
      } else {
        throw new Error("HTTP error " + response.status);
      }
    } catch (err) {
      console.warn("REST API submission failed, falling back to mailto:", err);
      triggerMailtoFallback(
        isNe
          ? "सर्भरसँग जडान हुन सकेन। इमेल मार्फत आवेदन पठाउनको लागि आवेदन फारम खुल्दैछ..."
          : "Could not connect to server. Opening mail client for direct email submission..."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="p-5 space-y-5" onSubmit={handleSubmit}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
            {isNe ? "विद्यार्थीको पहिलो नाम" : "Student First Name"} *
          </label>
          <input
            name="firstName"
            type="text"
            className={`w-full h-10 px-3 border rounded-sm text-sm ${errors.firstName ? 'border-red-500 bg-red-50/20' : 'border-gray-300'}`}
            placeholder={isNe ? "पहिलो नाम" : "First name"}
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
            {isNe ? "विद्यार्थीको अन्तिम नाम" : "Student Last Name"} *
          </label>
          <input
            name="lastName"
            type="text"
            className={`w-full h-10 px-3 border rounded-sm text-sm ${errors.lastName ? 'border-red-500 bg-red-50/20' : 'border-gray-300'}`}
            placeholder={isNe ? "थर" : "Last name"}
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
            {isNe ? "जन्म मिति" : "Date of Birth"} *
          </label>
          <input
            name="dob"
            type="date"
            className={`w-full h-10 px-3 border rounded-sm text-sm ${errors.dob ? 'border-red-500 bg-red-50/20' : 'border-gray-300'}`}
          />
          {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
            {isNe ? "भर्ना हुन चाहेको कक्षा" : "Applying Grade"} *
          </label>
          <select
            name="grade"
            className={`w-full h-10 px-3 border rounded-sm text-sm bg-white ${errors.grade ? 'border-red-500 bg-red-50/20' : 'border-gray-300'}`}
          >
            <option value="">{isNe ? "कक्षा छान्नुहोस्" : "Select grade"}</option>
            <option value="Class 1">Class 1</option>
            <option value="Class 2">Class 2</option>
            <option value="Class 3">Class 3</option>
            <option value="Class 4">Class 4</option>
            <option value="Class 5">Class 5</option>
            <option value="Class 6">Class 6</option>
            <option value="Class 7">Class 7</option>
            <option value="Class 8">Class 8</option>
            <option value="Class 9">Class 9</option>
            <option value="Class 10">Class 10</option>
            <option value="Class 11">Class 11</option>
            <option value="Class 12">Class 12</option>
          </select>
          {errors.grade && <p className="text-red-500 text-xs mt-1">{errors.grade}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
            {isNe ? "संकाय (+२ को लागि)" : "Stream (for +2)"}
          </label>
          <select name="stream" className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm bg-white">
            <option value="">{isNe ? "संकाय छान्नुहोस्" : "Select stream"}</option>
            <option value="Science">Science</option>
            <option value="Management">Management</option>
            <option value="N/A">N/A</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
            {isNe ? "अघिल्लो विद्यालय" : "Previous School"}
          </label>
          <input
            name="previousSchool"
            type="text"
            className="w-full h-10 px-3 border border-gray-300 rounded-sm text-sm"
            placeholder={isNe ? "अघिल्लो विद्यालयको नाम" : "Previous school name"}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
            {isNe ? "अभिभावकको नाम" : "Guardian Name"} *
          </label>
          <input
            name="guardianName"
            type="text"
            className={`w-full h-10 px-3 border rounded-sm text-sm ${errors.guardianName ? 'border-red-500 bg-red-50/20' : 'border-gray-300'}`}
            placeholder={isNe ? "अभिभावकको पूरा नाम" : "Guardian full name"}
          />
          {errors.guardianName && <p className="text-red-500 text-xs mt-1">{errors.guardianName}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
            {isNe ? "अभिभावकको फोन नम्बर" : "Guardian Phone"} *
          </label>
          <input
            name="guardianPhone"
            type="tel"
            className={`w-full h-10 px-3 border rounded-sm text-sm ${errors.guardianPhone ? 'border-red-500 bg-red-50/20' : 'border-gray-300'}`}
            placeholder={isNe ? "सम्पर्क फोन नम्बर" : "+977-XXXXXXXXXX"}
          />
          {errors.guardianPhone && <p className="text-red-500 text-xs mt-1">{errors.guardianPhone}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
            {isNe ? "इमेल ठेगाना" : "Email"} *
          </label>
          <input
            name="email"
            type="email"
            className={`w-full h-10 px-3 border rounded-sm text-sm ${errors.email ? 'border-red-500 bg-red-50/20' : 'border-gray-300'}`}
            placeholder="email@example.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
            {isNe ? "स्थायी ठेगाना" : "Address"} *
          </label>
          <input
            name="address"
            type="text"
            className={`w-full h-10 px-3 border rounded-sm text-sm ${errors.address ? 'border-red-500 bg-red-50/20' : 'border-gray-300'}`}
            placeholder={isNe ? "स्थानीय ठेगाना" : "Local address"}
          />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
          {isNe ? "अतिरिक्त विवरण/सन्देश" : "Additional Notes"}
        </label>
        <textarea
          name="notes"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm"
          placeholder={isNe ? "थप केहि उल्लेख गर्नुपर्ने भए..." : "Any special remarks"}
        />
      </div>

      {statusMessage && (
        <div
          className={`p-3.5 text-sm rounded-sm ${
            statusMessage.type === "success"
              ? "bg-green-50 border border-green-200 text-green-800"
              : statusMessage.type === "info"
              ? "bg-blue-50 border border-blue-200 text-blue-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-10 px-5 bg-[#e8841a] text-white rounded-sm font-semibold text-sm hover:bg-orange-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? (isNe ? "बुझाउँदै..." : "Submitting...")
            : (isNe ? "आवेदन बुझाउनुहोस्" : "Submit Application")}
        </button>
        <a href={downloadHref || "#"} className="h-10 px-5 border border-gray-300 text-[#1a3a6b] rounded-sm font-semibold text-sm hover:bg-blue-50 transition-colors inline-flex items-center gap-2">
          {downloadTitle}
        </a>
      </div>
    </form>
  );
}