import { CheckCircle } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid md:grid-cols-2 gap-12 items-center md:text-left">
            <div className="text-center md:text-left">
                <img
                  src="/images/Sorin.png"
                  alt="Effective Meetings"
                  className="w-full h-full object-cover"
                />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-gray-900">Sorin Tanasa, PhD</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                
Growing up in post-communist Romania, I spent a lot of time thinking what could be an ideal world, and how to get there. That is why I left my home country of Romania thirteen years ago: to embark on a journey to transform the world. </p>

<p>Many countries later, I found a new home in Czechia, where I've been based for the past eleven years. My experience as an expat, combined with my an insatiable hunger for knowledge have taught me a profound truth:</p>

<p>The human civilization isn't the sum of its technological marvels, cool and useful as they are. No, we are the species of animals which used innovation to strengthen ties to one another, across space and time, by honing the most complex system of communication in nature.</p>

<p>Combining the rigor of 12 years of scientific inquiry, communication skills refined across 5 years at Toastmasters, and the wisdom of Eastern philosophies like Buddhism and Taoism, I've distilled a practical philosophy of communication.</p>

<p>Over the past two years, I forged this philosophy into a communication model and refined it across more than 20 discussion meetings that I've hosted, and many more as an active participant.</p>

<p>I invite you to explore this philosophy, and together create a more connected, kinder world, one conversation at a time.</p>
              
              
              <div className="pt-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Certifications & Experience</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="text-accent mr-3" size={20} />
                    Effective Communicator (Toastmasters International)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-accent mr-3" size={20} />
                    2 years hosting Meetup events
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-accent mr-3" size={20} />
                    PhD in Molecular Biology (Masaryk University)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-accent mr-3" size={20} />
                    Surviving 40 years on this crazy planet
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
