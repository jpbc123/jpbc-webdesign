import type { Post } from "./types";
import { Callout, Table, To, AskUs } from "./parts";
import { price } from "@/lib/market";

export const post: Post = {
  slug: "how-much-does-a-website-cost-in-malaysia",
  title: "How Much Does a Website Cost in Malaysia? An Honest 2026 Breakdown",
  description:
    "Real price ranges for small business websites in Malaysia: DIY builders, freelancers, agencies and monthly plans, plus the yearly costs nobody quotes upfront.",
  date: "2026-10-24",
  readMinutes: 8,
  tag: "Pricing",
  targetQueries: [
    "how much does a website cost in malaysia",
    "website cost malaysia small business",
    "web design price malaysia",
    "harga buat website",
  ],
  faqs: [
    {
      q: "What is a fair price for a small business website in Malaysia?",
      a: "For a 5-page business site, freelancers commonly quote around RM1,500 to RM6,000 and agencies RM8,000 and up. Monthly plans that bundle the build, domain, hosting and edits run from roughly RM150 to RM300 a month. The fair price depends on what is included after launch, not just the build.",
    },
    {
      q: "How much does it cost to keep a website running each year?",
      a: "Budget for the domain (usually under RM150 a year), hosting (from about RM100 to RM600 a year for a small site), and someone to make changes. Paid maintenance plans in Malaysia are often RM100 to RM800 a month.",
    },
    {
      q: "Is a website builder like Wix cheaper than hiring someone?",
      a: "Upfront, yes. Over three years the subscription often costs as much as a simple custom site, and you still do all the design, writing and updates yourself.",
    },
  ],
  Body: ({ market }) => {
    const monthly = price(market, market.pricing.monthly);
    const setup = price(market, market.pricing.setup);
    const lumpSum = price(market, market.pricing.lumpSum);
    const care = price(market, market.pricing.lumpSumCare);
    const extraPage = price(market, market.pricing.addons.extraPage);
    const threeYearsMonthly = price(market, market.pricing.monthly * 36);
    const threeYearsLump = price(market, market.pricing.lumpSum + market.pricing.lumpSumCare * 36);

    return (
      <>
        <p>
          <strong>Short answer:</strong> a small business website in Malaysia costs anywhere from about RM50 a month
          (if you build it yourself) to RM25,000 or more (if an agency builds it). Most kedai, klinik and service
          businesses end up somewhere between RM2,000 and RM8,000 for the build, plus a few hundred ringgit a year to
          keep it online. The quote matters less than what you&apos;re still paying for three years later.
        </p>
        <p>
          We build websites for a living, so yes, we have an opinion. Our own prices are at the bottom of this page,
          clearly marked. Everything above them is meant to help you judge <em>any</em> quote, including ours.
        </p>

        <h2>The four ways to get a website, and what each really costs</h2>

        <Table>
          <thead>
            <tr>
              <th>Option</th>
              <th>Typical upfront</th>
              <th>Typical ongoing</th>
              <th>Who does the work</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>DIY builder (Wix, Squarespace, etc.)</td>
              <td>RM0</td>
              <td>About RM50–RM300/month</td>
              <td>You</td>
            </tr>
            <tr>
              <td>Freelancer</td>
              <td>About RM1,500–RM6,000</td>
              <td>Hosting + per-change fees</td>
              <td>One person, availability varies</td>
            </tr>
            <tr>
              <td>Agency</td>
              <td>About RM8,000–RM25,000+</td>
              <td>Maintenance retainers, often RM300–RM800/month</td>
              <td>A team, with an account manager</td>
            </tr>
            <tr>
              <td>Monthly website plan</td>
              <td>Often RM0</td>
              <td>About RM150–RM300/month, everything bundled</td>
              <td>The provider, including edits</td>
            </tr>
          </tbody>
        </Table>

        <p>
          These are ballpark ranges you&apos;ll commonly see quoted in Malaysia in 2026, not fixed rates. Online
          stores, booking systems and anything with logins push every row up, often well past RM15,000 at agencies.
        </p>

        <h3>1. Do it yourself with a website builder</h3>
        <p>
          The cheapest way to start. You pick a template, drag in your photos and pay a monthly subscription. It
          works if you enjoy this kind of thing and have the time. The catch is that the subscription never ends, and
          the hours you spend designing, writing and fixing layouts on mobile are hours you&apos;re not running your
          business. Many builder sites also load slowly on phones, which matters for Google (more on that in{" "}
          <To href="/blog/why-is-my-website-slow">why your website is slow</To>).
        </p>

        <h3>2. Hire a freelancer</h3>
        <p>
          A good freelancer can give you a lovely site at a fair price. The risk is what happens after launch. Ask
          every freelancer three questions before you pay: who registers the domain (it should be in{" "}
          <em>your</em> name), who pays for hosting and renews it, and what a small change costs six months from now.
          Plenty of business owners have a website they can&apos;t update because the freelancer moved on.
        </p>

        <h3>3. Hire an agency</h3>
        <p>
          Agencies make sense when you need strategy, branding, copywriting and a big site all at once. For a
          five-page site for a tuition centre or a renovation contractor, you&apos;re mostly paying for the
          agency&apos;s overheads: the office, the account manager and the sales process. That&apos;s where the
          famous RM10,000 quotes come from.
        </p>

        <h3>4. A monthly website plan</h3>
        <p>
          A newer model: little or nothing upfront, then a fixed monthly fee that covers the build, domain, hosting,
          security certificate and changes. You trade a bigger upfront cheque for a longer commitment. The thing to
          check is the contract. What&apos;s the minimum term, what happens when you cancel, and do you keep your
          domain?
        </p>

        <Callout title="Before you sign anything">
          Make sure the domain is registered in your name or your business&apos;s name. Whoever owns the domain owns
          your address on the internet. If a provider won&apos;t put it in your name, walk away.
        </Callout>

        <h2>The costs nobody puts on the quote</h2>
        <p>A build quote is a one-off number. A website is a running cost. Here&apos;s what keeps coming every year:</p>
        <ul>
          <li>
            <strong>Domain name.</strong> Usually under RM150 a year for a .com, .my or .com.my. Not sure which to
            pick? See <To href="/blog/com-my-vs-my-vs-com-domain">.com.my vs .my vs .com</To>.
          </li>
          <li>
            <strong>Hosting.</strong> From about RM100 to RM600 a year for a small business site. Cheap shared hosting
            is often why sites are slow.
          </li>
          <li>
            <strong>SSL certificate</strong> (the padlock). Often free these days, but some hosts still charge for it.
          </li>
          <li>
            <strong>Changes.</strong> New prices, new photos, a Raya promo banner. Some providers charge per change,
            some by the hour, some include it.
          </li>
          <li>
            <strong>Plugin and theme updates.</strong> WordPress sites need regular updates to stay secure, which is
            why WordPress maintenance retainers exist.
          </li>
        </ul>

        <h2>How to compare quotes properly: the three-year test</h2>
        <p>
          Don&apos;t compare build prices. Add up what you&apos;ll pay over three years, including hosting, domain
          and every change you&apos;re likely to need, then compare that. A RM2,500 site that charges RM80 per change
          and RM400 a year for hosting can end up costing more than a RM6,000 site with edits included.
        </p>
        <p>Three more questions worth asking every provider:</p>
        <ol>
          <li>How fast will it load on a phone? Ask them to show you a PageSpeed score for a site they&apos;ve built.</li>
          <li>Who will I talk to when something needs changing, and how quickly do they reply?</li>
          <li>If I leave, what do I take with me: the domain, the content, the code?</li>
        </ol>

        <h2>What we charge, so you can compare</h2>
        <p>
          JPBC has two plans, and we publish both on our <To href="/pricing">pricing page</To>:
        </p>
        <ul>
          <li>
            <strong>Monthly: {setup} down, {monthly}/month.</strong> A custom, hand-coded 5-page website with domain,
            hosting, SSL and unlimited content edits included. There&apos;s a {market.pricing.minimumMonths}-month
            minimum term, then you can cancel anytime. Over three years that&apos;s {threeYearsMonthly}, all in.
          </li>
          <li>
            <strong>Lump sum: from {lumpSum}, then {care}/month</strong> for hosting and care. You own the site code
            outright. Over three years that&apos;s about {threeYearsLump}, with changes billed per request.
          </li>
        </ul>
        <p>
          Extra pages are {extraPage} each. Online stores and booking systems are quoted separately, because they
          vary too much to price blind.
        </p>

        <AskUs market={market} message="Hi JPBC! I read your website cost article and have a question about a quote.">
          Got a quote from someone else and not sure if it&apos;s fair? Send it over and we&apos;ll tell you honestly
          what we think, even if you don&apos;t hire us.
        </AskUs>
      </>
    );
  },
};
