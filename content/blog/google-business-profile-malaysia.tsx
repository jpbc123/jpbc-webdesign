import type { Post } from "./types";
import { Callout, To, Source, AskUs } from "./parts";
import { price } from "@/lib/market";

export const post: Post = {
  slug: "google-business-profile-malaysia",
  title: "How to Set Up and Verify Your Google Business Profile in Malaysia (Step by Step)",
  description:
    "Get your business on Google Maps: create or claim your profile, pass video verification, and avoid the mistakes that get Malaysian listings suspended.",
  date: "2026-10-24",
  readMinutes: 9,
  tag: "Google Maps",
  targetQueries: [
    "how to set up google business profile malaysia",
    "google business profile verification video",
    "how to put my business on google maps malaysia",
    "google my business malaysia",
  ],
  faqs: [
    {
      q: "Is Google Business Profile free in Malaysia?",
      a: "Yes. Creating, verifying and managing a Google Business Profile is free. You only pay if you hire someone to set it up and optimise it for you, or if you run Google Ads.",
    },
    {
      q: "How long does Google Business Profile verification take?",
      a: "After you submit a video or other verification, Google's review usually takes a few business days. It can take longer if Google asks for more evidence, so submit a clear video the first time.",
    },
    {
      q: "Can I list a home-based business on Google Maps?",
      a: "Yes, as a service-area business. You verify the business but hide your home address, and show the areas you serve instead, such as Petaling Jaya or Subang Jaya.",
    },
    {
      q: "Can I use a virtual office address for my Google Business Profile?",
      a: "No. Google's guidelines don't allow virtual offices or mailbox addresses unless staff actually serve customers there during your listed hours. Listings that break this rule risk suspension.",
    },
  ],
  Body: ({ market }) => {
    const gbp = price(market, market.pricing.addons.googleBusinessProfile);

    return (
      <>
        <p>
          <strong>Short answer:</strong> go to{" "}
          <Source href="https://www.google.com/business/">google.com/business</Source>, search for your business,
          claim it or create it, fill in your details, then verify it, usually by recording a short video of your
          business. It&apos;s free, takes about an hour of your time, and Google reviews the verification in a few
          business days.
        </p>
        <p>
          Your Google Business Profile is the listing that appears on Google Maps and in the map box at the top of
          local searches. For a lot of Malaysian small businesses it brings in more calls than the website does. Here
          is the whole process, including the parts that trip people up.
        </p>

        <h2>Before you start: what you need</h2>
        <ul>
          <li>
            A Google account you&apos;ll keep forever. Use a business Gmail, not your staff&apos;s personal email.
          </li>
          <li>Your business name exactly as it appears on your signboard, receipts and SSM registration.</li>
          <li>A phone number customers can actually reach (a WhatsApp-enabled mobile is fine).</li>
          <li>Your website address, if you have one.</li>
          <li>Your phone, charged, for the verification video.</li>
        </ul>

        <h2>Step 1: Check whether your business is already listed</h2>
        <p>
          Search your business name on Google Maps first. Customers or Google itself may have already created a
          listing. If it exists, claim that one rather than making a new one. Duplicates confuse Google and can split
          your reviews across two listings. If someone else (an old staff member, a previous agency) controls it,
          you can request access from inside Google Business Profile.
        </p>

        <h2>Step 2: Create or claim the profile</h2>
        <p>
          At <Source href="https://www.google.com/business/">google.com/business</Source>, sign in and follow the
          prompts. You&apos;ll be asked for:
        </p>
        <ol>
          <li>
            <strong>Business name.</strong> Your real name only. &ldquo;Ali Aircon Service&rdquo; is fine. &ldquo;Ali
            Aircon Service Shah Alam Best Cheap 24 Jam&rdquo; is keyword stuffing, breaks Google&apos;s rules, and is
            a common reason listings get suspended.
          </li>
          <li>
            <strong>Primary category.</strong> The single most important setting. Pick the most specific one that
            fits (&ldquo;Air conditioning repair service&rdquo; beats &ldquo;Contractor&rdquo;). You can add
            secondary categories later.
          </li>
          <li>
            <strong>Location type.</strong> See the next step, because this is where most people go wrong.
          </li>
          <li>
            <strong>Phone number and website.</strong>
          </li>
        </ol>

        <h2>Step 3: Storefront or service-area business?</h2>
        <p>Google treats these differently, and picking the wrong one causes most verification problems.</p>
        <ul>
          <li>
            <strong>Storefront:</strong> customers come to you, like a restoran, klinik, salon or tuition centre. Show
            your address and drop the pin exactly on your shoplot.
          </li>
          <li>
            <strong>Service-area business:</strong> you go to customers, like aircon, plumbing, cleaning, renovation or
            mobile car wash. Hide your address and list the areas you cover instead, for example Petaling Jaya, Subang
            Jaya and Puchong.
          </li>
          <li>
            <strong>Both:</strong> a shop that also does delivery or on-site work can show the address and list
            service areas.
          </li>
        </ul>

        <Callout title="Home-based? Don't show your address">
          If customers don&apos;t visit you, don&apos;t publish your home address. Set it up as a service-area
          business. Virtual offices and coworking mailboxes aren&apos;t allowed as a listed address unless staff
          really serve customers there during your opening hours.
        </Callout>

        <h2>Step 4: Verify the business</h2>
        <p>
          Google picks the verification method for you, and you can&apos;t choose. These days most small businesses
          are asked for a <strong>video recording</strong>. Some get a phone call, SMS or email code instead. Google
          explains the video option in its{" "}
          <Source href="https://support.google.com/business/answer/14271705">video verification guide</Source>.
        </p>
        <p>What the video needs to prove, in one continuous, unedited take on your phone:</p>
        <ol>
          <li>
            <strong>Where you are.</strong> Start outside: the street sign, a nearby landmark, your shop sign. For a
            service-area business, show your area and your branded van or equipment.
          </li>
          <li>
            <strong>That the business is real and operating.</strong> Show the inside: the counter, your tools,
            equipment, stock, or the kitchen.
          </li>
          <li>
            <strong>That you manage it.</strong> Unlock the shop, open the till, or show something only staff can
            access.
          </li>
        </ol>
        <p>
          Record it through the Google Business Profile app or the Google Maps app while logged in to the account
          that manages the listing. You can&apos;t film it elsewhere and upload it later. Aim for about a minute, film
          in daylight, and keep moving slowly so the footage is clear.
        </p>
        <p>
          Then wait. Reviews usually take a few business days. If it&apos;s rejected, Google normally says why. Fix
          that one thing and record again.
        </p>

        <h2>Step 5: Fill in everything after you&apos;re verified</h2>
        <p>
          A verified but empty profile won&apos;t rank well. Spend another 30 minutes on these:
        </p>
        <ul>
          <li>
            <strong>Opening hours, including special hours.</strong> Set holiday hours for Raya, Chinese New Year,
            Deepavali and Christmas. Nothing annoys a customer like driving over to a closed shop.
          </li>
          <li>
            <strong>Photos.</strong> Your shopfront, your team, your actual work. Real photos beat stock photos every
            time.
          </li>
          <li>
            <strong>Services or products,</strong> with prices if you can.
          </li>
          <li>
            <strong>Description.</strong> You get up to 750 characters. Say what you do, where, and for whom, in
            plain language.
          </li>
          <li>
            <strong>Website link.</strong> Point it at your website, not your Facebook page.
          </li>
        </ul>

        <h2>Step 6: Get reviews, and reply to all of them</h2>
        <p>
          Reviews are a big part of how Google ranks map listings, and they&apos;re what customers read first. Ask
          every happy customer. The easiest way is to send your review link on WhatsApp right after the job is
          done, while they&apos;re still pleased. Reply to every review, the bad ones especially. A calm, polite reply
          to a one-star review often impresses future customers more than ten five-star ones.
        </p>
        <p>Don&apos;t buy reviews or offer discounts for them. Google removes them and can suspend the listing.</p>

        <h2>Your profile works better with a website behind it</h2>
        <p>
          Google cross-checks your profile with your website. A website that shows the same name, address, phone
          number and service areas helps Google trust both, and gives customers somewhere to land when they tap
          &ldquo;Website&rdquo;. If you&apos;re still deciding, read{" "}
          <To href="/blog/website-vs-facebook-page">do I need a website if I have a Facebook page</To>.
        </p>

        <AskUs market={market} message="Hi JPBC Web Designs, I need help with my Google Business Profile.">
          Stuck on verification, or would rather have it done for you? Our{" "}
          <To href="/services/google-business-profile">Google Business Profile service</To> is a one-time {gbp}: we
          set it up, handle verification and optimise every field.
        </AskUs>
      </>
    );
  },
};
