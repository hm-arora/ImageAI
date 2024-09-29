import { Icons } from "@/components/Icons";
import { GITHUB_URL } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

export default function Footer({
  onPricingClick,
}: {
  onPricingClick: () => void;
}) {
  return (
    <footer className="border-t border-base-content/10 text-gray-300 w-full max-w-6xl mx-auto">
      <div className="px-8 py-24 max-w-6xl mx-auto">
        <div className="flex lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col md:gap-24">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <Link
              href="/#"
              className="flex gap-2 justify-center md:justify-start items-center"
            >
              <div className="w-6 h-6 relative">
                <Image
                  src="/images/image.svg"
                  width={24}
                  height={24}
                  alt="Logo"
                />
              </div>

              <strong className="font-extrabold tracking-tight text-base md:text-lg text-white">
                ImageAI
              </strong>
            </Link>
            <p className="mt-3 text-sm text-base-content/80">
              Train and generate custom AI images with your own data. Generate
              images of People, Products, Nature, etc.
            </p>
          </div>

          <div className="flex-1 flex flex-wrap justify-center -mb-10 md:mt-0 mt-10 text-center md:gap-24">
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <h3 className="footer-title font-semibold text-base-content tracking-widest text-sm md:text-left mb-3">
                LINKS
              </h3>
              <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                <div
                  className="cursor-pointer hover:text-white transition-all duration-300"
                  onClick={onPricingClick}
                >
                  Pricing
                </div>
                <Link
                  href={GITHUB_URL}
                  className="cursor-pointer hover:text-white transition-all duration-300"
                >
                  GitHub
                </Link>
              </div>
            </div>

            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <h3 className="footer-title font-semibold text-base-content tracking-widest text-sm md:text-left mb-3">
                LEGAL
              </h3>
              <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                <Link href="/terms" className="link link-hover">
                  Terms of services
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 text-sm">
          <div className="flex flex-row justify-start items-center gap-4">
            <Image
              src="/twitter-avatar.jpg"
              alt="Himanshu"
              width={32}
              height={32}
              className="rounded-full w-8 aspect-square"
            />
            <div className="text-left text-base-content-secondary leading-relaxed">
              Hey Explorer 👋 I&apos;m{" "}
              <a
                href="https://twitter.com/hm_arora"
                target="_blank"
                rel="noreferrer"
                className="link text-base-content font-medium underline"
              >
                Himanshu
              </a>
              , the creator of{" "}
              <span className="font-bold underline">ImageAI</span>. You can
              follow my work on{" "}
              <a
                href="https://twitter.com/hm_arora"
                target="_blank"
                rel="noreferrer"
                className="link text-base-content font-medium underline"
              >
                Twitter.
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
