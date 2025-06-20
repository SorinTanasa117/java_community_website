import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { ArrowLeft, Users, Lightbulb, MessageSquare, Clock, MapPin, Calendar } from "lucide-react";

interface CommunityData {
  title: string;
  description: string;
  expandedDescription: string;
  details: string[];
  stats: {
    members: string;
    events: string;
    projects: string;
    discussions?: string;
    ceremonies?: string;
    experts?: string;
    tradition?: string;
    varieties?: string;
  };
  image: string;
}

const communities: CommunityData[] = [
  {
    title: "IdeaVerse",
    description: "A creative hub where innovators, entrepreneurs, and dreamers come together to transform ideas into reality. We foster collaboration through monthly ideation sessions, peer mentoring, and project partnerships.",
    expandedDescription: "IdeaVerse is more than just a community—it's a launchpad for transformative ideas. Our members include startup founders, creative professionals, and visionary thinkers who believe in the power of collaboration to change the world.",
    details: [
"There is a world of ideas lying outside of social media and the greater Internet. These are the ideas living in our minds: hopes, dreams, beliefs and questions.",

"I call this world of ideas the IdeaVerse.",

"We have all come to understand recently that digital medias don't reveal our true ideas, because the truth doesn't always sell or gives us the relationships we seek.",

"IdeaVerse meetings are a place I created to allow participants to enter a healthy dialogue and join each other in communities, as a refuge from the increasingly alienating virtual world.",

"For more details and next events, please check out IdeaVerse Dialogues Meetup.com events on the link below."
    ],
    stats: {
      members: "200+ Active Members",
      events: "24 Events This Year",
      projects: "50+ Projects Launched",
    },
    image: "images/ideaverse.png",
  },
  {
    title: "Agora Network",
    description: "An informal philosophical network dedicated to meaningful dialogue and knowledge sharing. We believe in the power of authentic conversations to drive innovation and create lasting personal relationships.",
    expandedDescription: "Named after the ancient Greek marketplace of ideas, Agora Network brings together expats and locals alike who value deep, meaningful conversations over superficial networking. Our community thrives on intellectual curiosity and genuine connection.",
    details: [
    "In ancient Greece, the Agora was a place where people gathered to exchange ideas and engage with their community. Inspired by this tradition, our group is a space for thoughtful conversation and shared experiences.",

    "Agora isn't just another discussion to join or event to attend—it's an invitation to explore what might be possible for ourselves and the world around us.",

    "This meetup is organized by my dear friend Justin Mainous, using the same discussion format I established in 2023 and consistently allowing open and enlightning onversations that have brought countless people together as a community ever since.",

    "For more details and next events, please check out Agora Network  Meetup.com events on the link below."
    ],
    stats: {
      members: "150+ Professionals",
      discussions: "Weekly Sessions",
      experts: "30+ Industry Leaders",
      events: "",
      projects: "",
    },
    image: "images/agora.png",
  },
  {
    title: "Chinese Tea Ceremony",
    description: "A contemplative practice that brings people together through the ritual of tea. This ancient tradition teaches patience, mindfulness, and the art of being fully present with others in shared moments of tranquility.",
    expandedDescription: "Through the ancient art of Gongfu Cha (Chinese tea ceremony), we explore how ritual and mindfulness can deepen our connections with others and ourselves. This practice offers a refuge from our fast-paced world and teaches us the value of presence.",
    details: [
"The Chinese tea ceremony is a centuries-old tradition that embodies a philosophy of simplicity and balance, fostering a moment of quiet reflection.",

"Central to this tradition is the Chinese character for tea, 茶 (chá), which consists of three parts: 艹 (cǎo), meaning 'grass'; 人 (rén), meaning 'person'; and 木 (mù), meaning 'wood' or 'tree.' This composition beautifully symbolizes the connection between nature and humanity, highlighting tea as a gift from the earth.",

"Guests will be guided through the delicate process of brewing and serving tea, appreciating its fragrance, taste, and the mindful gestures involved.",

"Chinese tea ceremony events I host are available at the Agora Network group on Meetup.com."
    ],
    stats: {
      ceremonies: "Weekly Gatherings",
      tradition: "1000+ Years Old",
      varieties: "20+ Tea Types",
      members: "",
      events: "",
      projects: "",
    },
    image: "images/cha.png",
  },
];

export default function Community() {
  const [, setLocation] = useLocation();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleExpand = (index: number) => {
    setExpandedIndex(index);
    window.scrollTo(0, 0);
  };

  const handleCollapse = () => {
    setExpandedIndex(null);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); // Scroll to top when collapsing
  };

  if (expandedIndex !== null) {
    const community = communities[expandedIndex];
    return (
      <div className="min-h-screen bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-8">
            <Button
              onClick={handleCollapse}
              variant="ghost"
              className="sticky top-0 flex items-center text-gray-600 hover:text-primary"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Communities
            </Button>
          </div>

          <div className={`${
            expandedIndex === 0 ? 'animate-slide-in-left' :
            expandedIndex === 2 ? 'animate-slide-in-right' :
            'animate-slide-in-center'
          }`}>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{community.title}</h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {community.expandedDescription}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="space-y-8">
                <Card className="bg-white rounded-2xl shadow-lg">
                 <CardContent className="p-8">
                   <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                     <Lightbulb className="mr-3 text-primary" size={24} />
                     Imagine
                   </h3>
                   <div className="space-y-4">
                     {community.details.map((detail, index) => (
                       <p key={index} className="text-gray-600 leading-relaxed">{detail}</p>
                     ))}
                   </div>
                 </CardContent>
               </Card>
             </div>

             <div className="space-y-8">
               <div className="w-full h-64 bg-gray-200 rounded-2xl flex items-center justify-center">
                 <img
                   src={community.image}
                   alt={community.title}
                   className="w-full h-64 object-cover"
                 />
               </div>

               <div className="text-center space-y-4">
                 {community.title === "IdeaVerse" && (
                  <Button
                    onClick={() => {
                      window.location.href = "https://www.meetup.com/ideaverse-talks-ideas-that-shaped-our-reality";
                    }}
                    className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                  >
                   Join IdeaVerse
                  </Button>
                 )}
                 {community.title === "Agora Network" && (
                  <Button
                    onClick={() => {
                      window.location.href = "https://www.meetup.com/prague-stoicism-meetup-group";
                    }}
                    className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                  >
                   Join Agora Network
                  </Button>
                 )}
                 {community.title === "Chinese Tea Ceremony" && (
                  <Button
                    onClick={() => {
                      window.location.href = "https://www.meetup.com/prague-stoicism-meetup-group";
                    }}
                    className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                  >
                   Join Chinese Tea Ceremony
                  </Button>
                 )}
                 <Button
                   onClick={handleCollapse}
                   variant="outline"
                   className="bg-white text-primary border-2 border-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors duration-200"
                 >
                   View All Communities
                 </Button>
               </div>
             </div>
           </div>


         </div>
       </div>
     </div>
   );
 }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Community</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            <i>'Good friends, good companions, and good associates are not just part of the spiritual life. They ARE the spiritual life.'<br></br></i>
            <br></br>
            The Buddha, Upaddhasutta, SN 45.2
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {communities.map((community, index) => (
            <Card
              key={index}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
                expandedIndex === null ? 'animate-fade-in' : ''
              }`}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <img
                src={community.image}
                alt={community.title}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{community.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {community.description}
                </p>
                <Button
                  onClick={() => handleExpand(index)}
                  variant="outline"
                  className="w-full text-primary border-primary hover:bg-primary hover:text-white transition-colors duration-200"
                >
                  More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}
