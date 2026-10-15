import type { Metadata } from "next";
import Link from "next/link";
import { finePrint } from "@/data/pricing";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms for website design and development work: scope, quotes, payments, timelines, revisions, refunds and ownership.",
};

/*
 * Replace the [bracketed] placeholders below with your real business details before publishing.
 */
export default function TermsPage() {
  const link = "font-medium text-ink underline underline-offset-2";
  return (
    <article className="container-x max-w-3xl py-12 sm:py-20">
      <h1 className="font-display text-5xl leading-[1] font-semibold tracking-tight">Terms &amp; Conditions</h1>
      <p className="mt-3 text-sm text-ink-3">Last updated 14 October 2026</p>
      <div className="mt-10 space-y-8 text-lg leading-relaxed text-ink-2 [&_h2]:mb-2 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink [&_li]:mt-1.5 [&_ul]:list-disc [&_ul]:pl-6">
        <section>
          <h2>1. About these terms</h2>
          <p>
            These terms apply to website design and development services provided by {site.ownerName} ([Registered business name, if
            any]), [Business address] (&ldquo;I&rdquo;, &ldquo;me&rdquo;), to you, the client. By accepting a quote or paying an advance,
            you agree to these terms. If a written quote or agreement for your project says something different, that document takes
            priority for your project.
          </p>
        </section>
        <section>
          <h2>2. Service scope</h2>
          <p>
            Each project covers only what is listed in your written quote: the package, number of pages, features, add-ons and number of
            revision rounds. Anything not listed there, including content writing, photography, logo design or new features requested
            after work starts, is outside the scope and will be quoted separately before I do it.
          </p>
        </section>
        <section>
          <h2>3. Prices and quotations</h2>
          <ul>
            <li>
              Pricing is customised for each project. The final price depends on your requirements and is confirmed in a written
              quote.
            </li>
            <li>Custom web applications are quoted individually based on project requirements.</li>
            <li>A quote is valid for [30] days from the date it is sent, unless it says otherwise.</li>
            <li>
              Your quote states the currency and amount you will pay.{" "}
              {finePrint.taxNote}
            </li>
          </ul>
        </section>
        <section>
          <h2>4. Payment</h2>
          <ul>
            <li>Payment terms: {finePrint.terms} Work begins once the advance is received.</li>
            <li>
              Paying from India: {finePrint.paymentIndia} {finePrint.paymentInternational}
            </li>
            <li>
              The website goes live, and files and access are handed over, once the full amount is paid. Invoices are due within [7] days
              of being sent.
            </li>
            <li>Any bank, transfer or currency-conversion charges on your side are paid by you.</li>
          </ul>
        </section>
        <section>
          <h2>5. Timelines</h2>
          <p>
            Delivery times shown on this website are typical estimates. Your quote gives the expected timeline for your project, which
            starts once I have received both the advance and the content I need from you (text, photos, logo and business details).
            Delays in sending content, feedback or approvals will move the delivery date. If a project is on hold waiting for you for more
            than [30] days, I may schedule it after other work already booked.
          </p>
        </section>
        <section>
          <h2>6. Revisions</h2>
          <p>
            Each package includes the number of revision rounds stated in your quote. A revision round is one consolidated list of changes
            to the agreed design or content. Changes beyond the included rounds, or changes that alter the agreed scope (such as new
            pages or features), are charged separately at a price agreed with you first.
          </p>
        </section>
        <section>
          <h2>7. Cancellation and refunds</h2>
          <ul>
            <li>If you cancel before any work has started, the advance is refunded in full, less any third-party costs already paid on your behalf.</li>
            <li>
              Once work has started, the advance is non-refundable, as it covers the time already spent. If you cancel after more work has
              been completed than the advance covers, the completed work is billed at a fair proportion of the quoted price.
            </li>
            <li>Payments for domains, hosting and other third-party services cannot be refunded by me once purchased.</li>
            <li>Refunds, where due, are made by the original payment method within [14] days.</li>
          </ul>
        </section>
        <section>
          <h2>8. Ownership</h2>
          <p>
            Once the project is paid in full, you own the final website design and the content you provided. Domains and hosting are
            registered in your name. Third-party items (such as fonts, stock photos, plugins or libraries) remain under their own licences.
            I may show the finished website in my portfolio unless you ask me not to in writing.
          </p>
        </section>
        <section>
          <h2>9. Your content</h2>
          <p>
            You are responsible for making sure the text, images, logos and other material you provide are accurate and that you have the
            right to use them. You are also responsible for the legal requirements of your business, such as your own website policies.
          </p>
        </section>
        <section>
          <h2>10. Third-party services and extra charges</h2>
          <p>
            {finePrint.domainHosting} {finePrint.extraCharges} Third-party services (such as hosting providers, payment gateways, form
            and email services) are governed by their own terms, and I am not responsible for their outages, fee changes or policy
            changes.
          </p>
        </section>
        <section>
          <h2>11. Maintenance and support</h2>
          <p>
            After launch, I will fix bugs in the work I delivered that are reported within [15] days, at no extra cost. Ongoing updates,
            backups and content edits are not included in the build price; they are available through an optional monthly care plan (see{" "}
            <Link className={link} href="/pricing#care">care plans</Link>) or as separately quoted one-off work.
          </p>
        </section>
        <section>
          <h2>12. Limitation of liability</h2>
          <p>
            I build every website with care, but I do not guarantee particular search rankings, traffic, sales or uninterrupted
            availability. To the extent permitted by law, my total liability for any project is limited to the amount you paid for that
            project, and I am not liable for indirect losses such as lost profits or business interruption.
          </p>
        </section>
        <section>
          <h2>13. Privacy</h2>
          <p>
            Details you share with me are used only to provide the services. See the{" "}
            <Link className={link} href="/privacy">Privacy</Link> page for what this website collects and how it is handled.
          </p>
        </section>
        <section>
          <h2>14. Changes to these terms</h2>
          <p>
            I may update these terms from time to time. The version in force when you accept your quote applies to your project.
          </p>
        </section>
        <section>
          <h2>15. Applicable law</h2>
          <p>
            These terms are governed by the laws of India. Any dispute will first be discussed in good faith, and if it cannot be resolved,
            it will be subject to the jurisdiction of the courts at [City, State].
          </p>
        </section>
        <section>
          <h2>16. Contact</h2>
          <p>
            Questions about these terms? Email <a className={link} href={`mailto:${site.email}`}>{site.email}</a> or message me on
            WhatsApp at {site.phoneDisplay}. Postal address: [Business address].
          </p>
        </section>
      </div>
    </article>
  );
}
