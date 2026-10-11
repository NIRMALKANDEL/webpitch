import { BookOpen, ClipboardCheck, MessagesSquare, UserCheck } from "lucide-react";
import Image from "next/image";
import { DemoDisclaimer } from "@/components/shared/DemoShell";
import { FAQ } from "@/components/site/FAQ";
import { unsplash } from "@/lib/media";
import { Admission, Courses, Testimonials } from "./_parts/Parts";

const batches = [
  ["JEE 2028 — Morning", "15 June", "Mon–Sat", "07:00–11:00", "Filling fast"],
  ["NEET 2028 — Afternoon", "15 June", "Mon–Sat", "12:00–16:00", "Seats open"],
  ["JEE Dropper — Phoenix", "1 July", "Mon–Sat", "08:00–13:00", "Seats open"],
  ["Foundation Class 9", "5 April", "Mon–Fri", "16:30–19:00", "Waitlist"],
];
const faculty = [
  ["Dr. Vikram Rathore", "Physics", "18 yrs", "PhD, IIT Bombay"],
  ["Neha Joshi", "Chemistry", "12 yrs", "M.Sc, Delhi University"],
  ["Arvind Menon", "Mathematics", "15 yrs", "B.Tech, IIT Madras"],
  ["Dr. Sana Qureshi", "Biology", "10 yrs", "MBBS, AIIMS"],
  ["Rahul Verma", "Physics", "7 yrs", "M.Sc, BHU"],
  ["Pooja Iyer", "Mathematics", "9 yrs", "M.Sc, IISc"],
];
const toppers = [["Aditya K.", "AIR 142", "JEE Adv."], ["Meghna S.", "AIR 311", "NEET"], ["Harsh P.", "99.94%ile", "JEE Main"], ["Zoya A.", "AIR 508", "NEET"]];
const faq = [
  { q: "What are the fees, and can we pay in instalments?", a: "Fees are listed with each course. Annual fees can be paid in three instalments at no extra cost." },
  { q: "Do you offer scholarships?", a: "Yes. The Apex Scholarship Test, held every Sunday, offers up to 90% fee waivers based on score." },
  { q: "Is there hostel accommodation?", a: "We have tie-ups with three supervised hostels within 1 km of the campus, with separate facilities for girls and boys." },
  { q: "What is the refund policy?", a: "Full refund within 15 days of joining, minus registration. After that, refunds are pro-rated for the remaining term." },
];

export default function CoachingDemo() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b-2 border-[#1C1917] bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <a href="#top" className="flex items-center gap-2 font-dd text-xl font-extrabold"><span className="grid size-8 place-items-center bg-[#D97706]">A</span> Apex Academy</a>
          <nav aria-label="Institute" className="hidden gap-6 font-dd text-sm font-bold md:flex">
            {[["#courses", "Courses"], ["#batches", "Batches"], ["#faculty", "Faculty"], ["#results", "Results"], ["#faq", "FAQ"]].map(([h, l]) => <a key={h} href={h} className="hover:text-[#D97706]">{l}</a>)}
          </nav>
          <a href="#admission" className="inline-flex min-h-11 items-center bg-[#1C1917] px-4 font-dd text-sm font-bold text-white">Admissions open</a>
        </div>
      </header>
      <main id="top">
        <section className="mx-auto grid max-w-7xl border-x-2 border-b-2 border-[#1C1917] md:grid-cols-[1.3fr_1fr]" aria-labelledby="ap-h">
          <div className="p-6 md:p-12">
            <p className="inline-block bg-[#D97706] px-3 py-1 font-dd text-sm font-bold">New batches from 15 June (sample date)</p>
            <h1 id="ap-h" className="mt-6 font-dd text-6xl leading-[0.92] font-extrabold tracking-tight md:text-8xl">Crack JEE &amp; NEET with a plan.</h1>
            <p className="mt-6 max-w-lg text-lg text-[#1C1917]/75">Small batches of 40, weekly tests with chapter-wise analysis, and faculty who answer every doubt. Kota, and online across India.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#admission" className="inline-flex min-h-13 items-center bg-[#D97706] px-7 font-dd font-bold">Book a free demo class</a>
              <a href="#courses" className="inline-flex min-h-13 items-center border-2 border-[#1C1917] px-7 font-dd font-bold">View courses</a>
            </div>
          </div>
          <div className="relative min-h-72 border-t-2 border-[#1C1917] md:border-t-0 md:border-l-2">
            <Image src={unsplash("1509062522246-3755977927d7")} alt="Students in a classroom" fill priority sizes="(min-width:768px) 40vw, 100vw" className="object-cover grayscale" />
            <div className="absolute inset-0 bg-[#D97706] mix-blend-multiply" />
          </div>
        </section>

        <section id="courses" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 md:px-8" aria-labelledby="co-h">
          <h2 id="co-h" className="mb-8 font-dd text-4xl font-extrabold md:text-6xl">Courses</h2>
          <Courses />
        </section>

        <section id="batches" className="scroll-mt-20 bg-[#1C1917] py-20 text-white" aria-labelledby="ba-h">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <h2 id="ba-h" className="mb-8 font-dd text-4xl font-extrabold md:text-6xl">Upcoming batches</h2>
            <table className="hidden w-full text-left md:table">
              <thead><tr className="border-b-2 border-white/30 font-dd text-sm">{["Batch", "Starts", "Days", "Timing", "Status"].map((h) => <th key={h} scope="col" className="py-3">{h}</th>)}</tr></thead>
              <tbody>{batches.map((b) => <tr key={b[0]} className="border-b border-white/15">{b.map((c, i) => <td key={i} className={`py-4 ${i === 4 ? "font-bold text-[#D97706]" : ""}`}>{c}</td>)}</tr>)}</tbody>
            </table>
            <ul className="grid gap-3 md:hidden">{batches.map((b) => <li key={b[0]} className="border border-white/25 p-4"><p className="font-dd font-bold">{b[0]}</p><p className="text-sm text-white/70">{b[1]} · {b[2]} · {b[3]}</p><p className="mt-1 text-sm font-bold text-[#D97706]">{b[4]}</p></li>)}</ul>
          </div>
        </section>

        <section id="faculty" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 md:px-8" aria-labelledby="fa-h">
          <h2 id="fa-h" className="mb-8 font-dd text-4xl font-extrabold md:text-6xl">Faculty</h2>
          <ul className="grid border-t-2 border-l-2 border-[#1C1917] sm:grid-cols-2 lg:grid-cols-3">
            {faculty.map(([n, s, y, q]) => (
              <li key={n} className="border-r-2 border-b-2 border-[#1C1917] p-6">
                <p className="text-sm font-bold text-[#D97706]">{s}</p>
                <p className="mt-2 font-dd text-2xl font-bold">{n}</p>
                <p className="mt-1 text-[#1C1917]/65">{q} · teaching for {y}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="results" className="scroll-mt-20 border-y-2 border-[#1C1917] bg-[#fef3c7] py-20" aria-labelledby="re-h">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <h2 id="re-h" className="font-dd text-4xl font-extrabold md:text-6xl">Results</h2>
            <p className="mt-2 text-sm font-semibold">Sample results for demo purposes. These students are fictional.</p>
            <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {toppers.map(([n, r, e]) => (
                <li key={n} className="border-2 border-[#1C1917] bg-white p-5">
                  <p className="font-dd text-3xl font-extrabold text-[#15803D]">{r}</p>
                  <p className="mt-2 font-bold">{n}</p>
                  <p className="text-sm text-[#1C1917]/60">{e} 2026</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 md:px-8" aria-labelledby="wy-h">
          <h2 id="wy-h" className="mb-8 font-dd text-4xl font-extrabold md:text-6xl">Why Apex</h2>
          <ul className="grid gap-6 md:grid-cols-4">
            {[[BookOpen, "Printed study material", "Chapter-wise modules and 10,000+ practice questions."], [ClipboardCheck, "Weekly test series", "With rank, percentile and chapter-wise analysis."], [MessagesSquare, "Doubt sessions daily", "One-on-one, in person or on WhatsApp."], [UserCheck, "Parent updates", "Attendance and test reports every month."]].map(([I, t, d]) => {
              const Icon = I as typeof BookOpen;
              return <li key={t as string}><Icon className="size-8 text-[#D97706]" aria-hidden /><p className="mt-4 font-dd text-xl font-bold">{t as string}</p><p className="mt-1 text-[#1C1917]/70">{d as string}</p></li>;
            })}
          </ul>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8" aria-labelledby="te-h">
          <h2 id="te-h" className="mb-8 font-dd text-4xl font-extrabold md:text-6xl">Students &amp; parents</h2>
          <Testimonials />
        </section>

        <section id="admission" className="scroll-mt-20 bg-[#D97706] py-20" aria-labelledby="ad-h">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-[1fr_1.6fr] md:px-8">
            <div>
              <h2 id="ad-h" className="font-dd text-4xl font-extrabold md:text-6xl">Admission enquiry</h2>
              <ol className="mt-8 space-y-4">
                {["Send this enquiry", "Free counselling session", "Apex Scholarship Test", "Enrol and join your batch"].map((s, i) => (
                  <li key={s} className="flex items-center gap-4 font-dd text-lg font-bold"><span className="grid size-10 shrink-0 place-items-center bg-[#1C1917] text-white">{i + 1}</span>{s}</li>
                ))}
              </ol>
            </div>
            <div className="bg-white p-6 md:p-8"><Admission /></div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-4xl scroll-mt-20 px-4 py-20 md:px-8" aria-labelledby="fq-h">
          <h2 id="fq-h" className="mb-8 font-dd text-4xl font-extrabold">Questions parents ask</h2>
          <FAQ items={faq} />
        </section>
      </main>
      <footer className="border-t-2 border-[#1C1917] px-4 pt-10 pb-32 md:px-8 md:pb-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 md:flex-row">
          <p className="font-dd font-extrabold">Apex Academy · Talwandi, Kota (fictional)</p>
          <DemoDisclaimer slug="coaching" className="max-w-lg text-[#1C1917]/60" />
        </div>
      </footer>
    </>
  );
}
