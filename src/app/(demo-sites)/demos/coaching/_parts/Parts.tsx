"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { DemoResult, formatEnquiry } from "@/components/shared/DemoResult";
import { type Errors, hasErrors, validate } from "@/lib/validate";

export const courses = [
  { id: "jee2", name: "JEE Main + Advanced", group: "Class 11–12", exam: "JEE", dur: "2 years", mode: "Offline", time: "Mon–Sat, 7:00–11:00", fee: "₹1,65,000 / yr" },
  { id: "neet2", name: "NEET Integrated", group: "Class 11–12", exam: "NEET", dur: "2 years", mode: "Offline", time: "Mon–Sat, 12:00–16:00", fee: "₹1,55,000 / yr" },
  { id: "jeed", name: "JEE Dropper Batch", group: "Droppers", exam: "JEE", dur: "1 year", mode: "Hybrid", time: "Mon–Sat, 8:00–13:00", fee: "₹1,45,000" },
  { id: "neetd", name: "NEET Repeater Batch", group: "Droppers", exam: "NEET", dur: "1 year", mode: "Offline", time: "Mon–Sat, 14:00–19:00", fee: "₹1,40,000" },
  { id: "found", name: "Foundation (Olympiad + boards)", group: "Class 9–10", exam: "Foundation", dur: "1 year", mode: "Offline", time: "Mon–Fri, 16:30–19:00", fee: "₹75,000 / yr" },
  { id: "online", name: "JEE Live Online", group: "Class 11–12", exam: "JEE", dur: "1 year", mode: "Online", time: "Evenings + weekend tests", fee: "₹48,000" },
];
const groups = ["All", "Class 9–10", "Class 11–12", "Droppers"];

export function Courses() {
  const [g, setG] = useState("All");
  const list = g === "All" ? courses : courses.filter((c) => c.group === g);
  return (
    <>
      <div role="group" aria-label="Filter courses" className="flex flex-wrap border-2 border-[#1C1917]">
        {groups.map((x) => (
          <button key={x} type="button" aria-pressed={g === x} onClick={() => setG(x)} className={`min-h-12 flex-1 border-r-2 border-[#1C1917] px-4 font-dd text-sm font-bold last:border-r-0 ${g === x ? "bg-[#1C1917] text-white" : "hover:bg-[#D97706]/15"}`}>{x}</button>
        ))}
      </div>
      <motion.ul layout className="mt-8 grid gap-0 border-t-2 border-l-2 border-[#1C1917] md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((c) => (
            <motion.li layout key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col border-r-2 border-b-2 border-[#1C1917] p-6">
              <div className="flex items-start justify-between gap-3">
                <span className="bg-[#D97706] px-2 py-0.5 font-dd text-xs font-bold">{c.exam}</span>
                <span className="text-xs text-[#1C1917]/60">{c.mode}</span>
              </div>
              <h3 className="mt-4 font-dd text-2xl leading-tight font-bold">{c.name}</h3>
              <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div><dt className="text-[#1C1917]/55">For</dt><dd>{c.group}</dd></div>
                <div><dt className="text-[#1C1917]/55">Duration</dt><dd>{c.dur}</dd></div>
                <div className="col-span-2"><dt className="text-[#1C1917]/55">Timings</dt><dd>{c.time}</dd></div>
              </dl>
              <p className="mt-5 font-dd text-xl font-bold">{c.fee}</p>
              <a href={`#admission`} onClick={() => window.dispatchEvent(new CustomEvent("apex:course", { detail: c.name }))} className="mt-4 inline-flex min-h-11 items-center justify-center bg-[#1C1917] font-dd text-sm font-bold text-white hover:bg-[#D97706] hover:text-[#1C1917]">Enquire about this course</a>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}

const quotes = [
  { q: "The weekly test analysis showed me exactly which chapters were costing me marks. My rank jumped in four months.", by: "Rohit, JEE 2026 (sample)" },
  { q: "Teachers answered doubts on WhatsApp late at night before my exam. As a parent, the monthly reports were reassuring.", by: "Mrs. Sharma, parent (sample)" },
  { q: "I joined as a dropper with low confidence. The small batch size made all the difference.", by: "Ayesha, NEET 2026 (sample)" },
];
export function Testimonials() {
  const [i, setI] = useState(0);
  return (
    <div className="border-2 border-[#1C1917] p-6 md:p-12">
      <AnimatePresence mode="wait">
        <motion.blockquote key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="min-h-40 font-dd text-2xl leading-snug font-medium md:text-4xl">
          &ldquo;{quotes[i].q}&rdquo;
          <footer className="mt-6 font-db text-base font-normal text-[#1C1917]/60">— {quotes[i].by}</footer>
        </motion.blockquote>
      </AnimatePresence>
      <div className="mt-6 flex gap-2">
        <button type="button" onClick={() => setI((i + quotes.length - 1) % quotes.length)} className="grid size-11 place-items-center border-2 border-[#1C1917] hover:bg-[#D97706]" aria-label="Previous testimonial"><ChevronLeft className="size-5" /></button>
        <button type="button" onClick={() => setI((i + 1) % quotes.length)} className="grid size-11 place-items-center border-2 border-[#1C1917] hover:bg-[#D97706]" aria-label="Next testimonial"><ChevronRight className="size-5" /></button>
        <p className="ml-auto self-center text-sm" aria-live="polite">{i + 1} / {quotes.length}</p>
      </div>
    </div>
  );
}

type F = "student" | "parent" | "phone" | "email" | "cls" | "course";
export function Admission() {
  const [v, setV] = useState({ student: "", parent: "", phone: "", email: "", cls: "", course: "", mode: "Offline", city: "", slot: "" });
  const [errors, setErrors] = useState<Errors<F>>({});
  const [done, setDone] = useState<string | null>(null);
  useEffect(() => {
    const on = (e: Event) => setV((s) => ({ ...s, course: (e as CustomEvent<string>).detail }));
    window.addEventListener("apex:course", on);
    return () => window.removeEventListener("apex:course", on);
  }, []);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(v, {
      student: [{ kind: "required" }], parent: [{ kind: "required" }],
      phone: [{ kind: "required" }, { kind: "phone" }], email: [{ kind: "email" }],
      cls: [{ kind: "required", message: "Choose the current class." }], course: [{ kind: "required", message: "Choose a course." }],
    });
    setErrors(errs);
    if (hasErrors(errs)) return;
    setDone(formatEnquiry("Admission enquiry — Apex Academy", { Student: v.student, Parent: v.parent, Phone: v.phone, Email: v.email, Class: v.cls, Course: v.course, Mode: v.mode, City: v.city, "Counselling slot": v.slot }));
  };
  if (done) return <DemoResult brand="Apex Academy" industryName="Coaching" demoSlug="coaching" industrySlug="coaching" preview={done} onReset={() => setDone(null)} className="border-[#1C1917] bg-white text-[#1C1917]" />;
  const inp = "min-h-12 w-full border-2 border-[#1C1917] bg-white px-4 text-base";
  const a = (k: F) => ({ id: `ap-${k}`, "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `ap-${k}-e` : undefined, className: `${inp} ${errors[k] ? "border-[#b42318]" : ""}` });
  const er = (k: F) => (errors[k] ? <p id={`ap-${k}-e`} className="mt-1 text-sm font-semibold text-[#b42318]">{errors[k]}</p> : null);
  const L = (k: string, t: string) => <label htmlFor={`ap-${k}`} className="mb-1 block font-dd text-sm font-bold">{t}</label>;
  return (
    <form onSubmit={submit} noValidate className="grid gap-5 md:grid-cols-2">
      <div>{L("student", "Student name")}<input {...a("student")} value={v.student} onChange={(e) => setV({ ...v, student: e.target.value })} />{er("student")}</div>
      <div>{L("parent", "Parent / guardian")}<input {...a("parent")} value={v.parent} onChange={(e) => setV({ ...v, parent: e.target.value })} />{er("parent")}</div>
      <div>{L("phone", "Phone")}<input {...a("phone")} type="tel" autoComplete="tel" value={v.phone} onChange={(e) => setV({ ...v, phone: e.target.value })} />{er("phone")}</div>
      <div>{L("email", "Email (optional)")}<input {...a("email")} type="email" autoComplete="email" value={v.email} onChange={(e) => setV({ ...v, email: e.target.value })} />{er("email")}</div>
      <div>{L("cls", "Current class")}<select {...a("cls")} value={v.cls} onChange={(e) => setV({ ...v, cls: e.target.value })}><option value="">Choose…</option>{["Class 8", "Class 9", "Class 10", "Class 11", "Class 12", "12th passed"].map((o) => <option key={o}>{o}</option>)}</select>{er("cls")}</div>
      <div>{L("course", "Course")}<select {...a("course")} value={v.course} onChange={(e) => setV({ ...v, course: e.target.value })}><option value="">Choose…</option>{courses.map((c) => <option key={c.id}>{c.name}</option>)}</select>{er("course")}</div>
      <div>{L("mode", "Mode")}<select id="ap-mode" className={inp} value={v.mode} onChange={(e) => setV({ ...v, mode: e.target.value })}><option>Offline</option><option>Online</option><option>Hybrid</option></select></div>
      <div>{L("slot", "Counselling slot")}<select id="ap-slot" className={inp} value={v.slot} onChange={(e) => setV({ ...v, slot: e.target.value })}><option value="">Any time</option><option>Weekday morning</option><option>Weekday evening</option><option>Sunday</option></select></div>
      <button type="submit" className="min-h-13 bg-[#D97706] px-8 font-dd font-bold md:col-span-2 md:justify-self-start">Send admission enquiry</button>
    </form>
  );
}
