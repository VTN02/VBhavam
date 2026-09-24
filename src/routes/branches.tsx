import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/config/site";
import { branches } from "@/data/branches";
import { SectionHeading } from "@/components/SectionHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BranchCard } from "@/components/BranchCard";
import { Reveal } from "@/components/Reveal";

const title = `Find Us in Jaffna — Restaurant Location | ${site.name}`;
const description =
  "Find Vishnu Bhavan on the prominent Jaffna–Kankesanturai (KKS) Road in Jaffna, Sri Lanka. Daily operating hours 6:00 AM – 10:00 PM.";

export const Route = createFileRoute("/branches")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "restaurant" },
      { property: "og:url", content: "/branches" },
    ],
    links: [{ rel: "canonical", href: "/branches" }],
  }),
  component: BranchesPage,
});

function BranchesPage() {
  return (
    <div className="relative overflow-hidden py-14 sm:py-16 lg:py-20 bg-[#0d0f14] min-h-[calc(100vh-4rem)]">
      <span className="glow-orb top-[-10%] left-[-6%] h-96 w-96 bg-amber-600/15" aria-hidden="true" />
      <span className="glow-orb bottom-[-10%] right-[-5%] h-80 w-80 bg-orange-600/10" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Find Us" }]} />
        <SectionHeading
          as="h1"
          eyebrow="Visit Us in Jaffna"
          title="Restaurant Location &amp; Directions"
          subtitle="Conveniently situated on the prominent Jaffna–Kankesanturai (KKS) Road in Jaffna, Sri Lanka."
        />
        <div className="mt-12 max-w-3xl mx-auto">
          {branches.map((branch, i) => (
            <Reveal key={branch.id} delay={i * 100}>
              <BranchCard branch={branch} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
