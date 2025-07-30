import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Brain, 
  FileText, 
  List, 
  Search, 
  Shield, 
  Users, 
  TrendingUp, 
  CheckCircle,
  ArrowRight
} from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered UPSC Insights",
      description: "Get accurate answers and explanations for UPSC questions using advanced AI models trained on NCERTs, standard books, and PYQs."
    },
    {
      icon: FileText,
      title: "Personalized Study Guidance",
      description: "Step-by-step strategies tailored to your preparation level, strengths, and exam timeline."
    },
    {
      icon: List,
      title: "Syllabus-Wise Breakdown",
      description: "Easily navigate UPSC GS and Optional subjects with topic-wise coverage and simplified notes."
    },
    {
      icon: Search,
      title: "Smart Document Search",
      description: "Use natural language to search across NCERTs, government reports, and current affairs PDFs for instant retrieval."
    },
    {
      icon: Shield,
      title: "Updated Current Affairs",
      description: "Stay current with daily and monthly compilations sourced from trusted newspapers and PIB."
    },
    {
      icon: Users,
      title: "Concept Explainer",
      description: "Get clear, beginner-friendly explanations of complex topics like federalism, economic reforms, and international relations."
    }
  ];

  const benefits = [
    "Save hundreds of hours in note-making",
    "Avoid information overload",
    "Target your weak areas with precision",
    "Boost retention with AI-reinforced learning",
    "Get 24/7 academic support"
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Next-Gen UPSC Preparation</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            How UPSCGPT
            <span className="text-primary"> Transforms </span>
            Your UPSC Journey
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our AI-powered platform simplifies UPSC preparation, offering curated insights, precise answers, and effective revision tools for aspirants at every stage.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm group hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="bg-primary/10 rounded-lg p-3 w-fit mb-3 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-primary/5 to-blue-50/50 rounded-3xl p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                Why Choose UPSCGPT?
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Join hundreds of aspirants who’ve revolutionized their UPSC prep with our intelligent and adaptive AI assistant.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 rounded-full p-3">
                      <Brain className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">AI-Powered Doubt Solver</h4>
                      <p className="text-sm text-gray-600">Answers to GS and current affairs queries</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm text-gray-900 font-medium">
                          "Explain the doctrine of basic structure in Indian Constitution."
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          The basic structure doctrine was established in the Kesavananda Bharati case (1973)...
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Response time: 2.3 seconds</span>
                    <div className="flex items-center space-x-1 text-primary">
                      <span>Get started</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;