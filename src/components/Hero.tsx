import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Bot, FileText, Calculator } from "lucide-react";
import AuthCard from '@/components/AuthCard/AuthCard'


const Hero = () => {
  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-white to-blue-50/30 pt-20 md:pt-0 flex items-center">
      <div className="container mx-auto px-4 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-5rem)]">
          {/* Left side - Hero Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
                <Bot className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">AI-Powered UPSC Mentor</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Your Smart
                <span className="text-primary"> UPSC Prep </span>
                Companion
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Get instant, accurate answers to GS doubts, topic explanations, and previous year questions —
                all powered by AI trained for UPSC preparation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white" href="#home" asChild>
                <a href="#about">
                  Explore Features
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5">
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-gray-600">Free to use</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-gray-600">Updated with latest syllabus</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-gray-600">24/7 available</span>
              </div>
            </div>
          </div>

          {/* Right side - Auth Card */}
          {/* <div className="animate-scale-in">
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-4">
                  <Calculator className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Get Started Today</CardTitle>
                <CardDescription className="text-gray-600">
                  Sign in to access your personalized tax assistant
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <Button 
                  className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 shadow-sm"
                  size="lg"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">or</span>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full border-primary text-primary hover:bg-primary/5"
                  size="lg"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Continue as Guest
                </Button>
                
                <p className="text-xs text-gray-500 text-center">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </CardContent>
            </Card>
          </div> */}
          <AuthCard></AuthCard>
        </div>
      </div>
    </section>
  );
};

export default Hero;