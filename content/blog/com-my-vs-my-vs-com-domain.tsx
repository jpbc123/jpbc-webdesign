import type { Post } from "./types";
import { Callout, Table, To, Source, AskUs } from "./parts";

export const post: Post = {
  slug: "com-my-vs-my-vs-com-domain",
  title: ".com.my vs .my vs .com: Which Domain Should a Malaysian Business Choose?",
  description:
    "Who can register each domain, what you need, what it costs and what Google makes of it, so you can pick the right web address for your Malaysian business.",
  date: "2026-10-24",
  readMinutes: 6,
  tag: "Domains",
  targetQueries: [
    ".com.my vs .my",
    ".com.my vs .com",
    "how to register .com.my domain",
    "which domain is best for business malaysia",
  ],
  faqs: [
    {
      q: "Do I need SSM registration to get a .com.my domain?",
      a: "Yes. MYNIC, the registry for Malaysian domains, requires a business registered with SSM for .com.my, and registrars ask for your SSM registration documents.",
    },
    {
      q: "Can an individual or a foreigner register a .my domain?",
      a: "Yes. Since MYNIC relaunched .my in 2024, it has been open to individuals and organisations from any country. You may still be asked for identification such as a passport.",
    },
    {
      q: "Is .com.my better than .com for SEO in Malaysia?",
      a: "A Malaysian domain tells Google your site is meant for Malaysia, which can help a little with local searches. A .com can rank just as well in Malaysia if the content is clearly local. Content, speed and your Google Business Profile matter far more than the extension.",
    },
  ],
  Body: ({ market }) => (
    <>
      <p>
        <strong>Short answer:</strong> if your business is SSM-registered and serves Malaysian customers, get the{" "}
        <strong>.com.my</strong>. If you aren&apos;t registered yet, take the <strong>.my</strong>, which anyone can
        register. If you sell overseas or plan to, get the <strong>.com</strong>. If the budget allows, register
        the matching .com as well and point it at your main site, so nobody else can take it.
      </p>

      <h2>The three options at a glance</h2>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>.com.my</th>
            <th>.my</th>
            <th>.com</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Who can register</td>
            <td>SSM-registered businesses</td>
            <td>Anyone, individuals included</td>
            <td>Anyone</td>
          </tr>
          <tr>
            <td>Documents</td>
            <td>SSM registration documents</td>
            <td>Identification may be requested</td>
            <td>None</td>
          </tr>
          <tr>
            <td>Signals to customers</td>
            <td>A registered Malaysian business</td>
            <td>Malaysian, short and modern</td>
            <td>Global, familiar</td>
          </tr>
          <tr>
            <td>Signals to Google</td>
            <td>Targets Malaysia</td>
            <td>Targets Malaysia</td>
            <td>No country by default</td>
          </tr>
          <tr>
            <td>Availability</td>
            <td>Often good</td>
            <td>Often good</td>
            <td>Short, good names mostly taken</td>
          </tr>
        </tbody>
      </Table>
      <p>
        All three typically cost somewhere around RM50 to RM150 a year, depending on the registrar and any
        promotions. Check the renewal price, not just the first-year price.
      </p>

      <h2>.com.my: the registered-business option</h2>
      <p>
        Malaysian domains are run by <Source href="https://mynic.my/">MYNIC</Source>, the national registry, and
        sold through accredited registrars. For .com.my you need a business registered with SSM, either a sole
        proprietorship or partnership (enterprise) or a Sdn Bhd. The registrar will ask for your registration
        documents and check that the details match.
      </p>
      <p>
        Because of that check, a .com.my quietly tells customers you&apos;re a real, registered Malaysian business.
        For a clinic, a contractor or a B2B supplier, that trust is worth having.
      </p>

      <h2>.my: shorter, and open to everyone</h2>
      <p>
        MYNIC relaunched .my in 2024 and opened it to individuals and organisations anywhere. That makes it the
        natural pick for freelancers, home businesses that haven&apos;t registered yet, and anyone who wants a
        short, clearly Malaysian address. It also signals Malaysia to Google, just like .com.my.
      </p>

      <h2>.com: global, but crowded</h2>
      <p>
        Everyone recognises .com, and it&apos;s the right choice if you sell to customers outside Malaysia. The
        problem is availability: short, obvious names were taken years ago, which pushes people into long names
        with hyphens and numbers. A clean .com.my beats a messy .com.
      </p>

      <Callout title="Most important: register it in your own name">
        Whatever you choose, the domain must be registered to you or your business, with your email on the account.
        If a designer or agency registers it under their own name, they effectively own your web address. Ask to
        see the registrant details. Then turn on auto-renew, because expired domains can be bought by anyone.
      </Callout>

      <h2>Does the extension matter for Google?</h2>
      <p>
        A little. Country domains like .my and .com.my tell Google your site is aimed at Malaysia, which can help
        with local searches. But it&apos;s a small factor. What decides whether you appear when someone searches
        &ldquo;tuition centre Puchong&rdquo; is clear, local content, a fast website (see{" "}
        <To href="/blog/why-is-my-website-slow">why your website is slow</To>) and a well-kept{" "}
        <To href="/blog/google-business-profile-malaysia">Google Business Profile</To>.
      </p>

      <h2>Picking the name itself</h2>
      <ul>
        <li>Keep it short and easy to say over the phone. If you need to spell it out twice, it&apos;s too hard.</li>
        <li>Avoid hyphens and numbers. They get forgotten or typed wrong.</li>
        <li>Use your business name, not a keyword soup like best-aircon-service-klang.</li>
        <li>Say it aloud in BM and English, and check it doesn&apos;t accidentally read as something awkward.</li>
      </ul>

      <h2>How it works with JPBC</h2>
      <p>
        Every website plan includes the domain, a {market.voice.domainLine}, registered in your name, so it&apos;s
        yours even if you leave us. See what else is included on our <To href="/pricing">pricing page</To>.
      </p>

      <AskUs market={market} message="Hi JPBC! Can you help me choose and register a domain for my business?">
        Not sure which name to go for? Send us a few ideas and we&apos;ll check what&apos;s available.
      </AskUs>
    </>
  ),
};
