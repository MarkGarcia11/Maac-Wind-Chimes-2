import type { Metadata } from "next";
import { adminData } from "@/lib/data";
import AdminClient from "@/components/AdminClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Workshop Desk",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const data = await adminData();
  return (
    <div className="mx-auto max-w-[1500px] px-5 pb-28 pt-14 lg:px-10">
      <p className="eyebrow">For Mike</p>
      <h1 className="font-display mt-3 text-5xl text-espresso">The workshop desk.</h1>
      <p className="mt-3 max-w-xl text-espresso-2/75">
        Update prices and availability, add craft fair dates, and read the mail — all in one quiet place.
      </p>
      <AdminClient {...data} />
    </div>
  );
}
