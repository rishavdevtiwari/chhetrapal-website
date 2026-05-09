import Image from "next/image";
import Link from "next/link";
import { getHomepageCmsData } from "@/lib/wordpress";

export const dynamic = "force-dynamic";

export default async function AlumniPage() {
	const cmsData = await getHomepageCmsData();
	const alumni = cmsData?.alumni?.length ? cmsData.alumni : [];

	return (
		<div className="page-shell">
			<section className="bg-[#1a3a6b] text-white py-14 md:py-20">
				<div className="page-container">
					<p className="text-orange-200 uppercase tracking-[0.2em] text-xs">Alumni</p>
					<h1 className="text-4xl md:text-5xl font-extrabold mt-2">Our Alumni</h1>
					<p className="max-w-3xl text-white/80 mt-4 text-sm md:text-base">
						Stories, achievements, and profiles of former students who continue to represent the school with pride.
					</p>
				</div>
			</section>

			<div className="page-container page-section space-y-6">
				{alumni.length > 0 ? (
					<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
						{alumni.map((person) => (
							<article key={person.name} className="overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm">
								<div className="relative aspect-[4/3] bg-gray-100">
									<Image src={person.photoUrl || "/teacher-teaching-students.jpeg"} alt={person.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
								</div>
								<div className="p-5">
									<p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e8841a]">{person.year || "Alumni"}</p>
									<h2 className="mt-1 text-lg font-bold text-[#1a3a6b]">{person.name}</h2>
									<p className="mt-1 text-sm font-medium text-gray-600">{person.achievement}</p>
									<p className="mt-3 text-sm leading-relaxed text-gray-600">{person.bio}</p>
									<Link href={person.link || "/"} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#e8841a] hover:underline">
										Read More
									</Link>
								</div>
							</article>
						))}
					</div>
				) : (
					<div className="rounded-sm border border-gray-200 bg-white p-6 text-sm text-gray-600 shadow-sm">
						No alumni profiles have been published yet. Add alumni posts in the content manager to populate this page.
					</div>
				)}
			</div>
		</div>
	);
}