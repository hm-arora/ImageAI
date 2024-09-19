import PricingComponent from "@/components/custom/PricingComponent";
import { NavbarWrapper } from "@/components/NavbarWrapper";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const PricingPage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <NavbarWrapper>
      <div className="transition-bg relative flex h-full flex-col items-center justify-center bg-zinc-50  font-satoshi text-slate-950 dark:bg-[#121212]">
        <PricingComponent session={session} />
      </div>
    </NavbarWrapper>
  );
};

export default PricingPage;
