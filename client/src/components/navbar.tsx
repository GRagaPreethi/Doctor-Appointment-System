import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export function Navbar({ onLoginClick, onRegisterClick }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const [location] = useLocation();

  const handleScroll = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary">MediCare</h1>
            </Link>
            {location === "/" && (
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-4">
                  <button
                    onClick={() => handleScroll("home")}
                    className="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => handleScroll("features")}
                    className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Features
                  </button>
                  <button
                    onClick={() => handleScroll("doctors")}
                    className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Doctors
                  </button>
                  <button
                    onClick={() => handleScroll("contact")}
                    className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Contact
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <span className="text-gray-600 text-sm">
                    Welcome, {user?.firstName}
                  </span>
                  <Link href={user?.role === "doctor" ? "/doctor-dashboard" : "/patient-dashboard"}>
                    <Button variant="outline" size="sm">
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={onLoginClick}>
                    Login
                  </Button>
                  <Button onClick={onRegisterClick}>
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {location === "/" && (
              <>
                <button
                  onClick={() => handleScroll("home")}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary"
                >
                  Home
                </button>
                <button
                  onClick={() => handleScroll("features")}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary"
                >
                  Features
                </button>
                <button
                  onClick={() => handleScroll("doctors")}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary"
                >
                  Doctors
                </button>
                <button
                  onClick={() => handleScroll("contact")}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary"
                >
                  Contact
                </button>
              </>
            )}
            
            {isAuthenticated ? (
              <>
                <div className="px-3 py-2 text-sm text-gray-600">
                  Welcome, {user?.firstName}
                </div>
                <Link href={user?.role === "doctor" ? "/doctor-dashboard" : "/patient-dashboard"}>
                  <div className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary">
                    Dashboard
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    onLoginClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    onRegisterClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block px-3 py-2 text-base font-medium text-primary hover:text-primary/80"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
