import { site } from "@/config/site";

/** Build a wa.me link with a pre-filled message. */
export function whatsappLink(message: string, number: string = site.whatsappNumber) {
  const digits = String(number).replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export const waMessages = {
  general: () =>
    `Hi ${site.name}, I would like to inquire about today's vegetarian menu and specials.`,
  sample1_product: () =>
    `Hi ${site.name}, I would like to check availability for breakfast/lunch items and take away packs.`,
  sample2_repair: () =>
    `Hi ${site.name}, I would like to inquire about bulk sweets, snacks, or catering orders in Jaffna.`,
  product: (productName: string) =>
    `Hi, I'm interested in ordering or checking availability for ${productName} at ${site.name}.`,
  productShort: (productName: string) =>
    `Hi, is ${productName} available right now?`,
  repair: (serviceName?: string) =>
    serviceName
      ? `Hi, I would like to inquire about ${serviceName}.`
      : `Hi, I would like to inquire about Vishnu Bhavan special meals.`,
  branch: (branchName: string) =>
    `Hi, I would like to contact ${site.name} at ${branchName}.`,
  contactForm: (data: { name: string; phone: string; email: string; message: string }) =>
    `Hi ${site.name}, I'd like to make an inquiry.\n\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\n\n${data.message}`,
  developer: () =>
    `Hi Vithusan, I saw your work on the ${site.name} website and I'd like to inquire about website design and development services.`,
};
