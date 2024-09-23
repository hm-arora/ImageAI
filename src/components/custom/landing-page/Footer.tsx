import Link from "next/link";
import { Twitter } from "lucide-react";
import { Icons } from "@/components/Icons";

export default function Footer() {
  return (
    <footer className="text-gray-300 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800 w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="flex items-center mb-4 gap-1">
            <Icons.imageAI
              className="fill-[#e8e8e8] w-8 h-8"
            />
            <span className="text-white font-semibold text-lg">ImageAI</span>
          </div>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
                target="_blank"
              >
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
