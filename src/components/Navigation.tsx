import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { 
  Home, 
  Lightbulb, 
  TestTube, 
  Cloud, 
  Bug, 
  TrendingUp, 
  MessageCircle, 
  MessageSquare,
  Menu,
  X,
  Leaf,
  Eye,
  EyeOff,
  User,
  Settings,
  LogOut,
  ChevronDown,
  ShoppingBag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navigation = [
  { name: "dashboard", href: "/", icon: Home },
  { name: "advisory", href: "/advisory", icon: Lightbulb },
  { name: "soilHealth", href: "/soil", icon: TestTube },
  { name: "weather", href: "/weather", icon: Cloud },
  { name: "pestDetection", href: "/pests", icon: Bug },
  { name: "marketPrices", href: "/market", icon: TrendingUp },
  { name: "marketplace", href: "/marketplace", icon: ShoppingBag },
  { name: "chatbot", href: "/chat", icon: MessageCircle },
  { name: "feedback", href: "/feedback", icon: MessageSquare },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [isNavbarManuallyHidden, setIsNavbarManuallyHidden] = useState(false);
  const [isPromptDismissed, setIsPromptDismissed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, logout } = useAuth();

  const headerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement[]>([]);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const logo = logoRef.current;

    if (header && logo) {
      // Initial header animation
      gsap.fromTo(header,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );

      // Logo animation
      gsap.fromTo(logo,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 1, delay: 0.3, ease: "back.out(1.7)" }
      );

      // Stagger animation for nav items
      if (navItemsRef.current.length > 0) {
        gsap.fromTo(navItemsRef.current,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.5, 
            stagger: 0.1, 
            delay: 0.5,
            ease: "power2.out" 
          }
        );
      }
    }
  }, []);

  useEffect(() => {
    const mobileMenu = mobileMenuRef.current;
    
    if (mobileMenu) {
      if (isMobileMenuOpen) {
        gsap.fromTo(mobileMenu,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" }
        );
      } else {
        gsap.to(mobileMenu,
          { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" }
        );
      }
    }
  }, [isMobileMenuOpen]);

  const addNavItemRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      navItemsRef.current[index] = el;
    }
  };

  const handleNavItemClick = (href: string) => {
    // Add click animation
    const clickedItem = navItemsRef.current.find(item => 
      item?.querySelector(`a[href="${href}"]`)
    );
    
    if (clickedItem) {
      gsap.to(clickedItem, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide navbar when scrolling down, show when scrolling up (only if not manually hidden)
      if (!isNavbarManuallyHidden) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down and past 100px
          setIsNavbarHidden(true);
          setIsPromptDismissed(false); // Reset prompt when navbar hides
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up
          setIsNavbarHidden(false);
          setIsPromptDismissed(false); // Reset prompt when navbar shows
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isNavbarManuallyHidden]);

  return (
    <div>
    <Card ref={headerRef} className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur-lg shadow-[var(--shadow-soft)] transition-smooth">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <div ref={logoRef} className="p-2 bg-primary rounded-xl transition-smooth hover:scale-110 cursor-pointer">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-heading text-foreground">
                CropCare
              </h1>
              <p className="text-xs text-muted-foreground">{t('subtitle')}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center space-x-2">
              <ThemeToggle />
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 h-10">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                          {getUserInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden lg:block font-medium">{user.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Account Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div ref={mobileMenuRef} className="mt-4 pt-4 border-t md:hidden overflow-hidden">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navigation.map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleNavItemClick(item.href);
                  }}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-smooth hover:bg-accent/50 ${
                    isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{t(item.name)}</span>
                </Link>
              );
            })}
          </div>
          
          {/* Mobile User Profile */}
          {user && (
            <div className="px-4 py-3 border-t border-border/50">
              <div className="flex items-center space-x-3 mb-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getUserInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="space-y-2">
                <Link
                  to="/settings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm hover:bg-accent/50 transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  <span>Account Settings</span>
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm hover:bg-accent/50 transition-colors text-destructive w-full text-left"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
          
          {/* Mobile Controls - Language and Theme */}
          <div className="flex items-center justify-center space-x-4 py-3 border-t border-border/50">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">{t('language')}:</span>
              <LanguageSelector />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">{t('theme')}:</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}

    </Card>

      {/* Desktop Navigation - Floating */}
      <div className={`hidden md:block fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-300 ${
        isNavbarHidden || isNavbarManuallyHidden ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}>
        <Card className="bg-card/95 backdrop-blur-lg shadow-[var(--shadow-strong)] border-primary/20">
          <div className="flex items-center p-3 space-x-1">
            {navigation.map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <div key={item.name} ref={(el) => addNavItemRef(el, index)}>
                  <Link
                    to={item.href}
                    onClick={() => handleNavItemClick(item.href)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-smooth hover:bg-accent/50 ${
                      isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{t(item.name)}</span>
                  </Link>
                </div>
              );
            })}
            
            {/* Language Selector & Controls */}
            <div className="border-l border-border/50 pl-2 ml-2 flex items-center space-x-2">
              <LanguageSelector />
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setIsNavbarManuallyHidden(true);
                  setIsNavbarHidden(true);
                }}
                className="h-10 w-10 hover:bg-accent/50"
                title="Hide navigation"
              >
                <EyeOff className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Show Navbar Button when hidden */}
      {(isNavbarHidden || isNavbarManuallyHidden) && (
        <div className="hidden md:block fixed bottom-4 right-4 z-30">
          <Button
            onClick={() => {
              setIsNavbarManuallyHidden(false);
              setIsNavbarHidden(false);
              setIsPromptDismissed(true);
            }}
            className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
            title="Show navigation"
          >
            <Eye className="h-5 w-5 text-primary-foreground" />
          </Button>
        </div>
      )}

    </div>
  );
}