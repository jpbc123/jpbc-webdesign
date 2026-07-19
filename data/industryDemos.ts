// Live industry demo sites shown in the "Websites by Industry" section on
// /work. These are OUR demo builds, not client projects — keep them out of
// the portfolio grid so the "every project is live client work" claim stays
// honest. Add a new industry here and the section picks it up automatically.

export type IndustryDemo = {
  slug: string;
  name: string;
  /** Live demo site URL — cards open this in a new tab */
  url: string;
  blurb: string;
};

export const industryDemos: IndustryDemo[] = [
  {
    slug: "dental",
    name: "Dental Clinics",
    url: "https://dental.jpbcwebdesigns.com",
    blurb: "Appointment-focused sites for kliniks — services, doctors, and WhatsApp booking front and centre.",
  },
  {
    slug: "fitness",
    name: "Gyms & Fitness",
    url: "https://fitness.jpbcwebdesigns.com",
    blurb: "High-energy sites for gyms and martial arts academies — schedule, classes, and free-trial funnel built in.",
  },
];
