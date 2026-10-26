import type { Post } from "./types";
import { Callout, Table, To, Source, AskUs } from "./parts";

export const post: Post = {
  slug: "why-is-my-website-slow",
  title: "Why Is My Website So Slow? A 2-Minute Test and What the Numbers Mean",
  description:
    "Test your business website's speed for free with Google PageSpeed Insights, understand the scores in plain English, and fix the usual culprits.",
  date: "2026-10-24",
  readMinutes: 7,
  tag: "Speed",
  targetQueries: [
    "why is my website slow",
    "how to check website speed",
    "pagespeed insights score meaning",
    "website loading slow on mobile",
  ],
  faqs: [
    {
      q: "What is a good PageSpeed Insights score?",
      a: "90 to 100 is good, 50 to 89 needs improvement, and below 50 is poor. Always check the mobile score, because that is how most of your customers see your site and what Google mainly uses.",
    },
    {
      q: "Does website speed affect Google rankings?",
      a: "Yes. Google uses page experience signals, including the Core Web Vitals speed measurements, as part of how it ranks pages. Speed won't beat better content on its own, but a slow site starts at a disadvantage and loses visitors before they read anything.",
    },
    {
      q: "Why is my website fast on my computer but slow on my phone?",
      a: "Phones have slower processors and often slower connections than an office computer on Wi-Fi. Heavy images, page builders and lots of scripts hurt far more on mobile, which is why PageSpeed tests the mobile version on a simulated mid-range phone.",
    },
  ],
  Body: ({ market }) => (
    <>
      <p>
        <strong>Short answer:</strong> most small business websites are slow for the same handful of reasons:
        oversized photos, too many plugins or a heavy page builder, cheap hosting, and too many add-on scripts like
        chat widgets and tracking codes. You can find out which of these is hurting you, for free, in about two
        minutes.
      </p>

      <h2>The 2-minute test</h2>
      <ol>
        <li>
          Go to <Source href="https://pagespeed.web.dev/">pagespeed.web.dev</Source>. It&apos;s Google&apos;s own
          free tool.
        </li>
        <li>Paste your website address and press Analyze.</li>
        <li>
          Make sure the <strong>Mobile</strong> tab is selected. That&apos;s the one that matters.
        </li>
      </ol>
      <p>You&apos;ll get two kinds of results. Here&apos;s how to read them.</p>

      <h2>Reading the results in plain English</h2>

      <h3>The big number (Performance score)</h3>
      <p>
        A score out of 100 from a test that loads your page on a simulated mid-range phone with a slower mobile
        connection.
      </p>
      <ul>
        <li>
          <strong>90–100 (green):</strong> good. Your site is fast.
        </li>
        <li>
          <strong>50–89 (orange):</strong> needs work. Customers notice the wait.
        </li>
        <li>
          <strong>0–49 (red):</strong> poor. People are leaving before your page appears.
        </li>
      </ul>
      <p>
        The score moves a few points each time you run it, so don&apos;t panic over small changes. Look at which
        colour band you&apos;re in.
      </p>

      <h3>&ldquo;Discover what your real users are experiencing&rdquo;</h3>
      <p>
        If your site gets enough visitors, Google also shows how fast it was for real Chrome users over the past 28
        days. These are the <strong>Core Web Vitals</strong>, the speed measures Google uses as a ranking signal:
      </p>
      <Table>
        <thead>
          <tr>
            <th>Measure</th>
            <th>What it means</th>
            <th>Good is</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Largest Contentful Paint (LCP)</td>
            <td>How long until the main content, like your headline or hero photo, appears</td>
            <td>2.5 seconds or less</td>
          </tr>
          <tr>
            <td>Interaction to Next Paint (INP)</td>
            <td>How quickly the page reacts when someone taps a button or menu</td>
            <td>200 milliseconds or less</td>
          </tr>
          <tr>
            <td>Cumulative Layout Shift (CLS)</td>
            <td>How much things jump around while loading, the reason people tap the wrong button</td>
            <td>0.1 or less</td>
          </tr>
        </tbody>
      </Table>
      <p>
        If this section says there isn&apos;t enough data, that&apos;s normal for small sites. Go by the
        Performance score.
      </p>

      <Callout title="Test a competitor too">
        Run the same test on the top three competitors that show up when you search for your service on Google. If
        they&apos;re green and you&apos;re red, you&apos;ve found one reason they rank above you.
      </Callout>

      <h2>The usual culprits, and what to do about each</h2>

      <h3>1. Huge photos</h3>
      <p>
        The most common problem by far. A photo straight from your phone can be several megabytes, many times larger
        than it needs to be. In PageSpeed, look for warnings about image sizes or &ldquo;next-gen formats&rdquo;.
        Resize images to the size they actually appear at and save them as WebP. On WordPress, an image
        optimisation plugin helps.
      </p>

      <h3>2. Page builders and too many plugins</h3>
      <p>
        Drag-and-drop builders and plugin-heavy WordPress sites load lots of code on every page, most of which that
        page never uses. Each plugin adds a little weight and another thing to update. Remove any plugin you
        don&apos;t truly need. If the site is built on a heavy page builder, there&apos;s only so much tuning can
        do, and a rebuild is often cheaper than endless fixes.
      </p>

      <h3>3. Cheap or far-away hosting</h3>
      <p>
        The cheapest shared hosting puts your site on a crowded server, sometimes on the other side of the world.
        If PageSpeed flags slow &ldquo;server response time&rdquo;, your hosting is the bottleneck. Hosting with
        servers in or near Malaysia, or a content delivery network (CDN), makes a real difference.
      </p>

      <h3>4. Sliders, pop-ups, chat widgets and tracking codes</h3>
      <p>
        Every add-on loads its own scripts. A rotating banner slider, a live chat bubble, a Facebook pixel, two
        analytics tools and a cookie pop-up add up. Ask of each one: is anyone actually using this? A plain
        WhatsApp link does the same job as most chat widgets at almost zero cost to speed.
      </p>

      <h3>5. Fancy fonts and animations</h3>
      <p>
        Loading five font weights and animating everything on scroll looks nice in a design meeting and feels
        sluggish on a three-year-old phone. Two or three font weights are plenty.
      </p>

      <h2>Why it&apos;s worth fixing</h2>
      <p>
        Speed isn&apos;t a vanity number. A slow page loses visitors before they read a single word, those visitors
        go to whichever competitor loads first, and Google factors page experience into rankings. For a local
        business, that&apos;s calls and WhatsApp messages you never knew you missed.
      </p>
      <p>
        It&apos;s also why we hand-code our sites as lightweight static pages instead of using WordPress or page
        builders. There&apos;s no database or plugins to slow things down. Thinking about a rebuild? Our{" "}
        <To href="/services/web-design">web design service</To> explains how we build, and{" "}
        <To href="/blog/how-much-does-a-website-cost-in-malaysia">this guide</To> covers what a website costs.
      </p>

      <AskUs market={market} message="Hi JPBC Web Designs, I ran a PageSpeed test on my website. Can you take a look?">
        Ran the test and not sure what to make of it? Send us the link and we&apos;ll tell you what&apos;s slowing
        it down, free.
      </AskUs>
    </>
  ),
};
