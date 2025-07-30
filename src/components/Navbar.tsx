import { Button } from "@/components/ui/button";
import { Calculator, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-primary rounded-lg p-2">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">UPSCGPT</h1>
              <p className="text-xs text-gray-600">by DzireTechnologies</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-primary transition-colors">
              Home
            </a>
            <a href="#about" className="text-gray-700 hover:text-primary transition-colors">
              About
            </a>
            {/* <a href="#features" className="text-gray-700 hover:text-primary transition-colors">
              Features
            </a> */}
            <a href="#contact" className="text-gray-700 hover:text-primary transition-colors">
              Contact
            </a>
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
              <a href="#home">Get Started</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-3">
              <a href="#home" className="text-gray-700 hover:text-primary transition-colors px-2 py-1">
                Home
              </a>
              <a href="#about" className="text-gray-700 hover:text-primary transition-colors px-2 py-1">
                About
              </a>
              <a href="#features" className="text-gray-700 hover:text-primary transition-colors px-2 py-1">
                Features
              </a>
              <a href="#contact" className="text-gray-700 hover:text-primary transition-colors px-2 py-1">
                Contact
              </a>
              <Button size="sm" className="bg-primary hover:bg-primary/90 mt-2">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;