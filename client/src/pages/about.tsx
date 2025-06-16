import { CheckCircle } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">About Me</h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <div className="w-80 h-80 rounded-2xl shadow-lg mx-auto md:mx-0 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Professional Photo Placeholder</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-gray-900">Sarah Johnson</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                With over 15 years of experience in community building and personal development, I'm passionate about helping individuals and organizations create meaningful connections that transform lives and communities.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                My journey began in corporate consulting, where I discovered the profound impact of authentic communication. I've since dedicated my career to teaching others how to build genuine relationships, facilitate effective meetings, and create thriving communities.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                When I'm not coaching, you'll find me practicing tea ceremony, which has taught me the art of mindful presence and the beauty of shared rituals in bringing people together.
              </p>
              
              <div className="pt-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Certifications & Experience</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="text-accent mr-3" size={20} />
                    Certified Professional Coach (ICF)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-accent mr-3" size={20} />
                    Community Leadership Certificate
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-accent mr-3" size={20} />
                    Tea Ceremony Master Level 3
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-accent mr-3" size={20} />
                    15+ years in organizational development
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
