"use server";

import { revalidatePath } from "next/cache";
import { adminUpdateProduct, adminAddEvent } from "@/lib/data";

export async function updateProductAction(
  id: number,
  data: {
    priceCents?: number;
    availability?: string;
    featured?: boolean;
    name?: string;
  }
) {
  await adminUpdateProduct(id, data);
  revalidatePath("/admin");
  revalidatePath("/collection");
  return { ok: true };
}

export async function addEventAction(form: {
  title: string;
  venue: string;
  address: string;
  space: string;
  description: string;
  date: string;
  start: string;
  end: string;
}) {
  const slug =
    form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 60) +
    "-" + Math.random().toString(36).slice(2, 6);
  const [y, m, d] = form.date.split("-").map(Number);
  const [sh, sm] = form.start.split(":").map(Number);
  const [eh, em] = form.end.split(":").map(Number);
  await adminAddEvent({
    slug,
    title: form.title,
    venue: form.venue,
    address: form.address,
    space: form.space,
    description: form.description,
    startAt: new Date(Date.UTC(y, m - 1, d, sh + 6, sm)), // CT ≈ UTC-6
    endAt: new Date(Date.UTC(y, m - 1, d, eh + 6, em)),
    image: "/images/lifestyle/craft-fair.jpg",
  });
  revalidatePath("/admin");
  revalidatePath("/events");
  return { ok: true };
}
