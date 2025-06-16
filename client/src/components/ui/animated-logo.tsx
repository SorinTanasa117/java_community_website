import { Heart } from "lucide-react";

export default function AnimatedLogo() {
  return (
    <div className="mb-8 flex justify-center">
      <div className="relative">
        <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center animate-spin-slow">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
            <Heart className="text-primary text-4xl" size={48} />
          </div>
        </div>
        <div className="absolute inset-0 w-32 h-32 border-4 border-accent rounded-full opacity-30 animate-pulse"></div>
      </div>
    </div>
  );
}
