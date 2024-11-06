import { MeetingCostCalculator } from "@/components/MeetingCostCalculator";
import { OptInBanner } from "@/components/OptInBanner";
import HeroBlock from "@/components/pages/lp/HeroBlock";
import MeetingManifesto from "@/components/pages/lp/MeetingManifesto";

export default function LandingPage() {
  return (
    <>
      {/* <OptInBanner /> */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto py-8">
          {/* Content goes here */}
          <MeetingCostCalculator isDark={false} />
        </div>
      </div>
    </>
  );
}
