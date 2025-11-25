import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Bot, X } from "lucide-react";
import AuthCard from '@/components/AuthCard/AuthCard'

// ArcadeEmbed component
function ArcadeEmbed() {
  const arcadeIframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    function onArcadeIframeMessage(e) {
      if (e.origin !== 'https://demo.arcade.software' || !e.isTrusted) return;

      const arcadeIframe = arcadeIframeRef.current;
      if (!arcadeIframe || !arcadeIframe.contentWindow) return;

      if (e.data.event === 'arcade-init') {
        arcadeIframe.contentWindow.postMessage({event: 'register-popout-handler'}, '*');
      }
      
      if (e.data.event === 'arcade-popout-open') {
        arcadeIframe.style['position'] = 'fixed';
        arcadeIframe.style['z-index'] = '9999999';
      }

      if (e.data.event === 'arcade-popout-close') {
        arcadeIframe.style['position'] = 'absolute';
        arcadeIframe.style['z-index'] = 'auto';
      }
    }

    window.addEventListener('message', onArcadeIframeMessage);

    const arcadeIframe = arcadeIframeRef.current;
    if (arcadeIframe && arcadeIframe.contentWindow) {
      arcadeIframe.contentWindow.postMessage({event: 'register-popout-handler'}, '*');
    }
    
    return () => {
      if (arcadeIframe && arcadeIframe.contentWindow) {
        arcadeIframe.contentWindow.postMessage({event: 'unregister-popout-handler'}, '*');
      }

      window.removeEventListener('message', onArcadeIframeMessage);
    }
  }, [])

  return (
    <div style={{ position: 'relative', paddingBottom: 'calc(57.67857142857142% + 41px)', height: 0, width: '100%' }}>
      <iframe
        ref={arcadeIframeRef}
        src="https://demo.arcade.software/xg8kNrE0AqCfdDFIXlyu?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true"
        title="Indian Tax GPT"
        frameBorder="0"
        loading="lazy"
        allowFullScreen
        allow="clipboard-write"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', colorScheme: 'light' }}
      />
    </div>
  )

}


const Hero = () => {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <>
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
                  Get instant, accurate answers to doubts, topic explanations, and previous year questions —
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
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary/5"
                  onClick={() => setShowDemo(true)}
                >
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
            <AuthCard></AuthCard>
          </div>
        </div>
      </section>

      {/* Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Demo Video</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDemo(false)}
                className="hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4">
              <ArcadeEmbed />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;