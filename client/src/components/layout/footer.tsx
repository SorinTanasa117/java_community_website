import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="text-white" size={14} />
            </div>
            <span className="text-gray-900 font-medium">ConnectCoach</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-600 text-sm">
              © 2025 Sorin Tanasa, PhD. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Building meaningful connections, one conversation at a time.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
