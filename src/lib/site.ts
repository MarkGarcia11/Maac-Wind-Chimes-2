/**
 * MAAC WIND CHIMES — single source of truth for editable site settings.
 * Everything the client might want to change (phone, email, shipping,
 * store links) lives here so nothing is scattered across the codebase.
 */
export const site = {
  name: "Maac Wind Chimes",
  tagline: "The sound of a memory.",
  since: 1998,
  city: "Elkhorn",
  state: "NE",
  zip: "68022",
  // ONE consistent phone number everywhere (confirm with client).
  phoneDisplay: "(402) 880-9981",
  phoneHref: "tel:+14028809981",
  email: "winchimike@aol.com",
  shippingFlatCents: 1100, // "+ $11.00 shipping" from the original site
  currency: "USD",
  social: {
    facebook: "https://www.facebook.com/winchimike",
  },
  stores: {
    ebay:
      "http://stores.ebay.com/GROW-Nebraska/_i.html?_nkw=MAAC&submit=Search",
    amazon: "https://www.amazon.com/s?me=A3BI7YTNENK0JD&field-keywords=MAAC",
    growNebraska: "http://www.buynebraska.com/category-s/2259.htm",
    growNebraskaOrg: "http://grownebraska.org",
  },
  hours: "Mon–Sat, 9:00 AM – 5:00 PM Central",
  announcement: "Handmade in Elkhorn, Nebraska since 1998",
} as const;

export const money = (cents: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: site.currency,
  }).format(cents / 100);

export const addressLines = [`${site.city}, ${site.state} ${site.zip}`];
