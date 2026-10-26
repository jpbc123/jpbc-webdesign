import type { Post } from "./types";
import { Callout, To, AskUs } from "./parts";
import { editHours, price } from "@/lib/market";

export const post: Post = {
  slug: "website-vs-facebook-page",
  title: "Do I Need a Website If My Business Already Has a Facebook Page?",
  description:
    "When a Facebook page is enough for a Malaysian small business, when it isn't, and why the businesses that grow usually end up with both.",
  date: "2026-10-24",
  readMinutes: 6,
  tag: "Getting started",
  targetQueries: [
    "do i need a website if i have a facebook page",
    "website vs facebook page for small business",
    "is facebook page enough for business malaysia",
  ],
  faqs: [
    {
      q: "Is a Facebook page enough for a small business in Malaysia?",
      a: "It can be, if nearly all your customers already know you and order through friends or regulars. If you want strangers to find you on Google, look professional to corporate clients, or stop depending on one platform's rules, you need a website too.",
    },
    {
      q: "Will a website help me show up on Google?",
      a: "Yes. Google sends local searches to websites and Google Business Profiles far more than to Facebook pages. A fast website with your services and areas clearly written out gives Google something to rank.",
    },
    {
      q: "Should I stop posting on Facebook once I have a website?",
      a: "No. Keep Facebook for updates and conversations, and use the website as your permanent home base that every post, ad and QR code links back to.",
    },
  ],
  Body: ({ market }) => {
    const monthly = price(market, market.pricing.monthly);

    return (
      <>
        <p>
          <strong>Short answer:</strong> a Facebook page is a great place to talk to customers you already have. A
          website is how new customers find you, check you&apos;re legit, and contact you. If you only want the
          first, Facebook might be enough. If you want to grow, you&apos;ll want both, with the website as home base.
        </p>

        <h2>When a Facebook page really is enough</h2>
        <p>Be honest with yourself. A Facebook page alone can work fine if:</p>
        <ul>
          <li>Almost all your orders come from regulars, friends or word of mouth.</li>
          <li>You sell to a small community (a taman, a church, a school group) that already follows you.</li>
          <li>You&apos;re testing an idea and aren&apos;t sure it&apos;ll last six months.</li>
        </ul>
        <p>
          In those cases, spend your money on stock or ads first. A website won&apos;t magically bring customers to a
          business that doesn&apos;t yet know who its customers are.
        </p>

        <h2>Where a Facebook page lets you down</h2>

        <h3>People search Google, not Facebook</h3>
        <p>
          When someone in Shah Alam needs an aircon service at 9pm, they type &ldquo;aircon service near me&rdquo;
          into Google. Google mostly answers with its map listings (your{" "}
          <To href="/blog/google-business-profile-malaysia">Google Business Profile</To>) and websites. A Facebook
          page can show up, but it&apos;s rarely what ranks for the searches that bring in new customers.
        </p>

        <h3>You don&apos;t own it</h3>
        <p>
          Your page lives on Meta&apos;s land, under Meta&apos;s rules. Pages get hacked, admin accounts get locked,
          and reach changes whenever the algorithm does. If your page disappeared tomorrow, how would customers find
          you? A website on your own domain is an address no platform can take away.
        </p>

        <h3>Not everyone is on Facebook</h3>
        <p>
          Younger customers spend more time on TikTok and Instagram, and many corporate buyers simply don&apos;t look
          for suppliers on Facebook. A website works for everyone: one link you can put in your WhatsApp profile, on
          your TikTok bio, on a QR code at your counter and on your lorry.
        </p>

        <h3>It looks less established</h3>
        <p>
          For a hawker stall, a Facebook page feels natural. For a clinic, a renovation contractor, a law firm or a
          B2B supplier, customers expect a proper website. Many people quietly check whether a business has one
          before they call, especially for big-ticket jobs.
        </p>

        <h3>Information gets buried</h3>
        <p>
          Your prices, service areas and FAQ are hidden under months of posts. A website puts the answers people
          need in one place, which also means fewer &ldquo;boss, how much ah?&rdquo; messages asking the same thing.
        </p>

        <Callout title="Rule of thumb">
          Facebook is for conversations. Your website is for decisions. Customers chat with you on social media, but
          they decide to buy after checking your website and your Google reviews.
        </Callout>

        <h2>The setup that works for most small businesses</h2>
        <ol>
          <li>
            <strong>A simple, fast website</strong> with your services, prices (or price ranges), service areas,
            photos of real work and a WhatsApp button. Five pages is plenty to start.
          </li>
          <li>
            <strong>A verified Google Business Profile</strong> linked to that website, so you show up on Google Maps.
          </li>
          <li>
            <strong>Facebook, Instagram or TikTok</strong> for regular updates, each linking back to the website.
          </li>
        </ol>
        <p>
          That&apos;s it. You don&apos;t need an online store or a booking system on day one. Start with the basics,
          then add features when customers ask for them.
        </p>

        <h2>What does that cost?</h2>
        <p>
          Less than most people think. Our monthly plan is {monthly}/month with nothing upfront, covering the
          website, domain, hosting and {editHours(market)} of edits a month. For a full comparison of your options, read{" "}
          <To href="/blog/how-much-does-a-website-cost-in-malaysia">how much a website costs in Malaysia</To>.
        </p>

        <AskUs market={market} message="Hi JPBC Web Designs, I only have a Facebook page right now. Would a website help my business?">
          Not sure if your business needs a website yet? Tell us what you do and we&apos;ll give you a straight
          answer.
        </AskUs>
      </>
    );
  },
};
