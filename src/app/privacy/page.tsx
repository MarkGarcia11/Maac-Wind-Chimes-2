import type { Metadata } from "next";
import { LegalPage } from "@/components/Legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Maac Wind Chimes handles your information — plainly and carefully.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="The fine print, kindly"
      title="Privacy Policy"
      updated="January 2026"
      intro="We're a two-person workshop, not a data company. We collect only what we need to make and mail your chime, and we never sell your information to anyone."
      sections={[
        {
          h: "What we collect",
          p: "When you order, we ask for your name, email, shipping address, and optionally your phone number. When you write to us, we keep the message. If you join the newsletter list, we keep your email. That's the whole list.",
        },
        {
          h: "What we do with it",
          p: `We use it to make and ship your chime, to answer you, and — only if you asked — to send an occasional gentle note. Questions go to ${site.email} or ${site.phoneDisplay}.`,
        },
        {
          h: "What we never do",
          p: "We don't sell, rent, or trade your information. We don't run advertising trackers. We don't email you unless you asked.",
        },
        {
          h: "Cookies",
          p: "This site stores your cart and saved list on your own device (your browser), not on our servers. There are no advertising cookies.",
        },
        {
          h: "Your choices",
          p: "Write or call anytime to ask what we hold about you, to correct it, or to ask us to forget it. We'll happily do so.",
        },
      ]}
    />
  );
}
