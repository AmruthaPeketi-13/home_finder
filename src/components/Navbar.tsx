import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Building, CalendarDays, PlusCircle, MessageCircle, User, Settings, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';

export const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/home', label: 'Home', icon: Home },
    { path: '/buy', label: 'Buy', icon: Building },
    { path: '/rent', label: 'Rent', icon: Building },
    { path: '/book', label: 'Book', icon: CalendarDays },
    { path: '/post', label: 'Post Property', icon: PlusCircle },
    { path: '/chat', label: 'Chat', icon: MessageCircle },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-3">
            <motion.div 
              className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-5 h-5 text-primary-foreground" />
            </motion.div>
            <span className="text-xl font-display font-bold text-foreground hidden sm:block">PropNest</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <div className="flex items-center gap-2">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </div>
                {isActive(item.path) && (
                  <motion.div
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full"
                    layoutId="navbar-indicator"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-1">
            <Link
              to="/profile"
              className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
            >
              <User className="w-5 h-5" />
            </Link>
            <Link
              to="/settings"
              className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
            >
              <Settings className="w-5 h-5" />
            </Link>
            <Link
              to="/"
              className="p-2.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
            >
              <LogOut className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all ml-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden py-4 border-t border-border"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive(item.path)
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

// Add AnimatePresence import
import { AnimatePresence } from 'framer-motion';

export default Navbar;
