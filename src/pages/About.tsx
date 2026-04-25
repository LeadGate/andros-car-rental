import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import Section from "@/components/Section";
import { InfoBox, WarningBox } from "@/components/InfoBox";

const About = () => {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Andros Car Rental",
    "url": "https://andros-car-rental.com/about",
    "description": "About andros-car-rental.com — independent car rental comparison guide for Andros island, Cyclades, Greece. Methodology, sources, and consumer protection.",
    "publisher": {
      "@type": "Organization",
      "name": "Andros Car Rental",
      "url": "https://andros-car-rental.com"
    }
  };

  return (
    <Layout>
      <SEOHead
        title="About Andros Car Rental — Methodology and Sources"
        description="An independent comparison guide for car rental on Andros — driving notes, ELSTAT and Andros Routes data, KOK 2025 references, and the consumer protection routes."
        canonical="https://andros-car-rental.com/about"
        jsonLd={[articleSchema]}
      />

      <Breadcrumbs items={[{ label: "About" }]} />

      <Section>
        <h1 className="text-3xl md:text-4xl font-bold mb-6">About andros-car-rental.com</h1>

        <h2 className="text-2xl font-bold mt-8 mb-3">Who We Are</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          andros-car-rental.com is an independent comparison guide for car rental on Andros, in the Cyclades of the South Aegean. We are not a rental agency. The site does not own a fleet, and the editorial team works remotely while earning affiliate commissions only when readers book through partner links.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          The editorial perspective comes from multi-season driving on Andros, including the EO Andros provincial road between Gavrio Port, Batsi, and Chora, plus steep inland routes toward Vourkoti, Apikia, and the Petalo–Kouvara–Profitis Ilias massif. A borrowed Suzuki Jimny was used on the dirt descent to Achla beach, which makes traction, ground clearance, and insurance wording practical rather than theoretical.
        </p>
        <InfoBox><p>💡 <strong>Tip:</strong> Andros routes reward small, simple cars on paved coastal sections and 4WD models on rough tracks; a Fiat Panda, Hyundai i10, Toyota Aygo, or Suzuki Ignis is usually easier to park in Batsi and Chora than a larger SUV.</p></InfoBox>

        <h2 className="text-2xl font-bold mt-8 mb-3">How We Research</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          We combine first-hand driving notes with source-checked data so that every recommendation has a named basis, a date, or a measurable outcome. The editorial process uses ELSTAT arrivals data, Andros Routes trail maps, Ministry fuel bulletins for the Cyclades, Hellenic Police KOK updates, and verified reviews from 2023–2025.
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700 leading-relaxed space-y-2">
          <li><a href="https://www.statistics.gr/" className="text-primary underline hover:text-accent" rel="noopener" target="_blank">ELSTAT</a> arrival statistics help estimate peak demand at Gavrio Port and the pricing pressure that usually follows ferries from Rafina port.</li>
          <li><a href="https://www.androsroutes.gr/" className="text-primary underline hover:text-accent" rel="noopener" target="_blank">Andros Routes</a> maps and on-island road notes are used to assess turn severity, surface quality, and exposure on roads near Stavropeda crossroads, Menites, and Kochylou.</li>
          <li>Hellenic Police guidance and the Greek Government Gazette are checked for legal changes, including Law 4850/2021 Article 25 §3 in Government Gazette A 208 (5 Nov 2021), plus the KOK September 2025 enforcement notes that affect tourists.</li>
          <li>Rental terms are checked for CDW, SCDW, FDW, excess/deductible, franchise, zero excess, full coverage, preauthorisation, and Third-Party Liability so the comparison pages reflect real liability rather than marketing language.</li>
          <li>TripAdvisor and similar review platforms are read for recurring patterns, such as port handovers, late arrivals, or fuel policy disputes, rather than isolated praise or one-off complaints.</li>
        </ul>
        <WarningBox><p>⚠️ <strong>Warning:</strong> A "full coverage" label on Andros does not always mean zero excess, because some agencies still place a preauthorisation on the card and exclude glass, tyres, or underbody damage unless FDW or SCDW is explicitly named in the voucher.</p></WarningBox>

        <h2 className="text-2xl font-bold mt-8 mb-3">What We Cover</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          We focus on car hire decisions that are specific to Andros, not generic travel advice. The core topics are grouped around pickup, vehicle choice, driving, parking, and island logistics.
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700 leading-relaxed space-y-2">
          <li>Pickup logistics at <a href="/gavrio-port-pickup-guide" className="text-primary underline hover:text-accent">Gavrio Port</a>, including ferry timing from Rafina port and handover points near the quay.</li>
          <li><a href="/choosing-the-right-car" className="text-primary underline hover:text-accent">Choosing the right car for Andros roads</a>, including comparisons between Fiat Panda, Renault Clio, Peugeot 208, Hyundai i10, Toyota Aygo, VW Polo, Skoda Octavia, Hyundai Accent, Dacia Sandero Stepway, Suzuki Vitara, Dacia Duster 4WD, Audi Q3 4WD, Ford Kuga 4WD, VW Cross Touran, Citroën Grand Picasso, and Citroën C4.</li>
          <li>Driving rules and KOK September 2025 implications for visitors, especially on narrow roads near Aprovato, Aidonia, Mesathouri, and Sineti.</li>
          <li>Day-trip planning for beaches such as Chrissi Ammos, Agios Petros, Fellos, Kypri, Tis Grias to Pidima, Vitali, Zorkos, Ateni, Achla, Vori, and Lefka, with attention to gradients and road surfaces.</li>
          <li>Parking advice for Chora, Batsi, Gavrio, and Korthi, where summer demand is affected by ferry arrivals and evening restaurant traffic.</li>
          <li>The <a href="/andros-car-rental-faq" className="text-primary underline hover:text-accent">10-question Andros rental FAQ</a>, which addresses insurance, deposit rules, driver age, road access, and agency selection.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-3">Affiliate Disclosure</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          We earn a commission only when a booking is completed through a partner widget, and the booking price is not increased by that commission. The site does not accept paid placement from local Andros agencies, and no agency can buy a positive review in exchange for direct payment.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          The recommendation order is based on review patterns, vehicle availability, and route suitability, not on sponsored positioning. If a Google ad or another paid result appears above an organic listing, we label that distinction in plain language so readers can separate paid visibility from editorial selection.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Consumer Protection on Andros</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Greek rental customers on Andros have formal complaint routes when an agency fails to deliver the service promised on the voucher. The <a href="https://www.synigoros-katanaloti.gr/" className="text-primary underline hover:text-accent" rel="noopener" target="_blank">Greek Consumer Ombudsman</a> (Synigoros tou Katanaloti) handles consumer complaints free of charge, and the <a href="https://www.hcg.gr/en/" className="text-primary underline hover:text-accent" rel="noopener" target="_blank">Hellenic Coast Guard</a> can help with ferry-linked issues at the Gavrio Port Authority on +30 22820 71213.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          For a road traffic incident, the Hellenic Police emergency number is 100, and the pan-European emergency number is 112. Law 4850/2021 Article 25 §3 in Government Gazette A 208 (5 Nov 2021) is the useful legal reference for IDP compliance, while KOK September 2025 notes matter if a rental agency questions licensing at pickup.
        </p>
        <WarningBox><p>⚠️ <strong>Warning:</strong> A driver who arrives at Gavrio Port without the correct licence documents can be refused the car even after preauthorisation is taken, because Third-Party Liability is not the same as permission to drive under Greek law.</p></WarningBox>

        <h2 className="text-2xl font-bold mt-8 mb-3">Contact</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          We can be reached by email at <strong>info@andros-car-rental.com</strong> for questions about methodology, corrections, or partnership issues. A real human reads every email, and the team aims to reply within 48 hours on weekdays. We do not operate a phone line, so urgent booking issues such as a flight delay, port change, or vehicle problem must be handled directly with the rental agency or booking platform shown on the confirmation voucher.
        </p>
      </Section>
    </Layout>
  );
};

export default About;
