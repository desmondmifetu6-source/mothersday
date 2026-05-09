import Link from "next/link";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" fill="currentColor" />
            <span className="font-heading font-semibold text-lg text-text">
              Mother's Day Wall
            </span>
          </div>
          
          <div className="flex gap-8">
            <Link href="/" className="text-text-light hover:text-primary transition-colors text-sm font-medium">Home</Link>
            <Link href="#tributes" className="text-text-light hover:text-primary transition-colors text-sm font-medium">Tributes</Link>
            <Link href="#" className="text-text-light hover:text-primary transition-colors text-sm font-medium">Privacy</Link>
            <Link href="#" className="text-text-light hover:text-primary transition-colors text-sm font-medium">Terms</Link>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-light text-sm">
            © {new Date().getFullYear()} Mother's Day Wall. All rights reserved.
          </p>
          <p className="text-primary/80 text-sm italic flex items-center gap-1">
            Built with love for mothers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
