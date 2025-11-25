// src/pages/Landing/Landing.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useTokenStore } from "src/store/authStore";

const Landing = () => {
  const token = useTokenStore((state) => state.token) || localStorage.getItem("x_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // if authenticated, go to preview which will route to /preview/:uuid/chat
      navigate("/preview");
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Landing;
