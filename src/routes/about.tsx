import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/config/site";
import { SectionHeading } from "@/components/SectionHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AboutSection } from "@/components/AboutSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";

const title = `About Vishnu Bhavan — 100% Pure Vegetarian Restaurant, Jaffna`;
const description =
  "About Vishnu Bhavan: Authentic South Indian and Jaffna-style vegetarian food, breakfast items, lunch specials, evening dishes, traditional snacks, sweets and beverages.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "restaurant" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="flex flex-col bg-[#0d0f14]">
      <div className="relative overflow-hidden pt-14 pb-12 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20 bg-[#0a0c10]">
        <span className="glow-orb top-[-20%] left-1/2 h-96 w-96 -translate-x-1/2 bg-amber-600/20" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "About Us" }]} />
          <SectionHeading
            as="h1"
            eyebrow="Pure Vegetarian Kitchen"
            title={`About ${site.name}`}
            subtitle="Authentic South Indian & traditional Jaffna pure vegetarian restaurant on Kankesanturai Road, Jaffna, Sri Lanka."
          />
        </div>
      </div>
      <div className="divider-glow" aria-hidden="true" />
      <AboutSection withLink={false} />
      <div className="divider-glow" aria-hidden="true" />
      <WhyChooseUs />
    </div>
  );
}
