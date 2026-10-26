import type { Post } from "./types";
import { Callout, Table, To, Source, AskUs } from "./parts";

export const post: Post = {
  slug: "shopee-vs-own-online-store-malaysia",
  title: "Shopee vs Your Own Online Store: What Malaysian Sellers Really Pay in 2026",
  description:
    "Marketplace fees went up again in 2026. How to work out what Shopee and Lazada really cost you, and when your own online store starts to make sense.",
  date: "2026-10-24",
  readMinutes: 8,
  tag: "Online stores",
  targetQueries: [
    "shopee vs own website malaysia",
    "own online store vs shopee",
    "shopee seller fees malaysia 2026",
    "ecommerce website malaysia small business",
  ],
  faqs: [
    {
      q: "How much does Shopee take per order in Malaysia?",
      a: "It depends on your category and which programmes you join. After the February 2026 changes, sellers commonly report total fees of around 15 to 20 percent of order value once commission, transaction and programme fees are added, plus a small fixed fee per order. Check the current rate card in Shopee Seller Centre for your category.",
    },
    {
      q: "Should I leave Shopee and only sell on my own website?",
      a: "Usually not. Most Malaysian sellers do best running both: the marketplace brings new buyers, and your own store keeps repeat customers without paying commission on every order.",
    },
    {
      q: "Can a small business take online payments on its own website in Malaysia?",
      a: "Yes. Payment providers in Malaysia support FPX online banking, cards and e-wallets for registered businesses. Each provider has its own fees and onboarding requirements, so compare a few before choosing.",
    },
  ],
  Body: ({ market }) => (
    <>
      <p>
        <strong>Short answer:</strong> Shopee and Lazada are the fastest way to reach buyers, but you pay for it on
        every single order, and after the 2026 fee increases that cut is often in the high teens as a percentage of
        order value. Your own online store costs more to set up and you have to bring your own traffic, but repeat
        customers don&apos;t cost you commission. Most sellers that last end up running both.
      </p>

      <h2>What marketplaces actually charge</h2>
      <p>A marketplace bill is several fees stacked together:</p>
      <ul>
        <li>
          <strong>Commission,</strong> a percentage that depends on your product category. Shopee Malaysia raised
          marketplace commission rates from 1 February 2026.
        </li>
        <li>
          <strong>Transaction or payment fee</strong> on each order, higher for some payment methods like buy-now
          pay-later.
        </li>
        <li>
          <strong>Programme fees</strong> for things like free-shipping and cashback programmes. Optional on paper,
          but hard to skip if you want visibility.
        </li>
        <li>
          <strong>A small fixed fee</strong> per order on top.
        </li>
        <li>
          <strong>Ads,</strong> because ranking on page one of a crowded category increasingly means paying for it.
        </li>
      </ul>
      <p>
        Third-party breakdowns of the 2026 changes put a typical seller&apos;s total at around 15 to 20 percent of
        order value before ads, and SST applies on top of the fees. Rates change often and vary by category, so take
        your own numbers from the rate card in{" "}
        <Source href="https://seller.shopee.com.my/">Shopee Seller Centre</Source> rather than from any blog,
        including this one.
      </p>

      <Callout title="Do this calculation tonight">
        Open last month&apos;s Shopee income statement. Add up every fee, plus what you spent on ads, and divide by
        your total sales. That single percentage is what the marketplace really costs you. Most sellers have never
        worked it out.
      </Callout>

      <h2>What your own online store costs</h2>
      <p>The costs look different: more upfront, less per order.</p>
      <ul>
        <li>
          <strong>Building the store.</strong> A hosted platform like Shopify starts with a monthly subscription
          (from around USD 39 for its basic plan). A custom-built store costs more upfront but has no platform
          subscription.
        </li>
        <li>
          <strong>Payment gateway fees,</strong> usually a few percent per transaction for cards and FPX. That&apos;s
          far lower than a marketplace&apos;s stacked fees.
        </li>
        <li>
          <strong>Delivery.</strong> You arrange couriers yourself, typically through an aggregator.
        </li>
        <li>
          <strong>Getting traffic.</strong> This is the big one. Nobody stumbles onto your store. You bring buyers
          through Instagram, TikTok, Google, WhatsApp broadcasts and the customers you already have.
        </li>
      </ul>

      <h2>Side by side</h2>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>Shopee / Lazada</th>
            <th>Your own store</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Setup cost</td>
            <td>Almost nothing</td>
            <td>Higher: platform or custom build</td>
          </tr>
          <tr>
            <td>Cost per order</td>
            <td>High: stacked fees, often in the high teens</td>
            <td>Low: mainly the payment gateway fee</td>
          </tr>
          <tr>
            <td>New customers</td>
            <td>Built-in: shoppers already search there</td>
            <td>You bring them yourself</td>
          </tr>
          <tr>
            <td>Customer details</td>
            <td>Mostly stay with the platform</td>
            <td>Yours: you can follow up and build repeat sales</td>
          </tr>
          <tr>
            <td>Competition on the page</td>
            <td>Competitors listed right next to you</td>
            <td>Only your products</td>
          </tr>
          <tr>
            <td>Rules and fees</td>
            <td>Platform can change them anytime</td>
            <td>You decide</td>
          </tr>
        </tbody>
      </Table>

      <h2>When your own store starts to make sense</h2>
      <p>You&apos;re probably ready if two or more of these sound familiar:</p>
      <ul>
        <li>A good share of your orders come from people who&apos;ve bought from you before.</li>
        <li>You already have a following on Instagram, TikTok or a WhatsApp customer group.</li>
        <li>Your margins are being squeezed by every fee increase.</li>
        <li>
          You sell something customers reorder, like food, skincare, supplies or spare parts, where repeat buyers
          matter most.
        </li>
        <li>You want to look like a brand, not one listing among hundreds.</li>
      </ul>
      <p>
        If you&apos;re just starting out and nobody knows your brand yet, stay on the marketplaces for now. They
        solve the hardest problem, finding buyers, while you work out what sells.
      </p>

      <h2>The setup most sellers end up with</h2>
      <ol>
        <li>Keep your Shopee and Lazada shops for discovery and new buyers.</li>
        <li>
          Open your own store for repeat customers. Put a card in every parcel inviting buyers to order direct next
          time.
        </li>
        <li>Point all your social media and WhatsApp traffic to your own store, not the marketplace listing.</li>
      </ol>
      <p>
        Over time, more of your sales move to the channel where you keep more of each ringgit, without giving up the
        marketplace&apos;s reach.
      </p>

      <h2>What a simple online store needs</h2>
      <p>
        Not much, to start: a product catalogue with good photos, a cart and checkout, payment by FPX, card or
        e-wallet, an order list you can manage from your phone, and delivery fees that make sense for East and West
        Malaysia. Fancy features can wait. If you&apos;re still working out the basics of getting online, start with{" "}
        <To href="/blog/how-much-does-a-website-cost-in-malaysia">what a website costs in Malaysia</To>.
      </p>

      <AskUs market={market} message="Hi JPBC Web Designs, I sell on Shopee and I'm thinking about my own online store.">
        We build simple online stores for Malaysian sellers: your catalogue, checkout and an admin you can run from
        your phone. Want to know if it makes sense for your numbers?
      </AskUs>
    </>
  ),
};
