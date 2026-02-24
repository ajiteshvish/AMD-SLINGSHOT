"use client";

import React, { useState, useEffect, useRef } from "react";
import { Eye, EyeOff, Github, Twitter, Linkedin, Mail, Lock, User } from "lucide-react";
import { GlowButton } from "@/components/ui/pulse-beams";

interface FormFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
  showToggle?: boolean;
  onToggle?: () => void;
  showPassword?: boolean;
}

const AnimatedFormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  value,
  onChange,
  icon,
  showToggle,
  onToggle,
  showPassword
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div className="relative group">
      <div
        className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5 transition-all duration-300 ease-in-out"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors duration-200 group-focus-within:text-blue-400">
          {icon}
        </div>
        
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-transparent pl-10 pr-12 py-3 text-white placeholder:text-gray-500 focus:outline-none"
          placeholder=""
        />
        
        <label className={`absolute left-10 transition-all duration-200 ease-in-out pointer-events-none ${
          isFocused || value 
            ? 'top-2 text-xs text-blue-400 font-medium' 
            : 'top-1/2 -translate-y-1/2 text-sm text-gray-500'
        }`}>
          {placeholder}
        </label>

        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {isHovering && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1) 0%, transparent 70%)`
            }}
          />
        )}
      </div>
    </div>
  );
};

const SocialButton: React.FC<{ icon: React.ReactNode; name: string }> = ({ icon, name }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className="relative group p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 ease-in-out overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={name}
    >
      <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 transition-transform duration-500 ${
        isHovered ? 'translate-x-0' : '-translate-x-full'
      }`} />
      <div className="relative text-white group-hover:text-blue-400 transition-colors">
        {icon}
      </div>
    </button>
  );
};

const FloatingParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.3;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas!.width) this.x = 0;
        if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        if (this.y < 0) this.y = canvas!.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export interface SignInFloProps {
  mode?: 'signin' | 'signup';
  onSubmit: (data: { email: string; password: string; name?: string }) => Promise<void>;
  onToggleMode?: () => void;
  error?: string;
  demoHint?: boolean;
}

export const SignInFlo: React.FC<SignInFloProps> = ({
  mode = 'signin',
  onSubmit,
  onToggleMode,
  error,
  demoHint = false,
}) => {
  const [email, setEmail] = useState(mode === 'signin' ? 'demo@reviewdekho.com' : '');
  const [password, setPassword] = useState(mode === 'signin' ? 'demo123' : '');
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const isSignUp = mode === 'signup';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({ email, password, name: isSignUp ? name : undefined });
    } catch {
      // error is handled by parent
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingParticles />
      
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full mb-4">
              <User className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-gray-400">
              {isSignUp ? 'Sign up to start analyzing sellers' : 'Sign in to your ReviewDekho account'}
            </p>
          </div>

          {demoHint && !isSignUp && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 mb-6 text-center">
              <p className="text-xs text-blue-400 font-medium">🎯 Demo Mode — Use any email & password</p>
              <p className="text-[11px] text-gray-400 mt-1">Use <strong>admin@</strong> in email for Admin access</p>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-6 text-center">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <AnimatedFormField
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon={<User size={18} />}
              />
            )}

            <AnimatedFormField
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={18} />}
            />

            <AnimatedFormField
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={18} />}
              showToggle
              onToggle={() => setShowPassword(!showPassword)}
              showPassword={showPassword}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-500 bg-black border-white/20 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>
              
              {!isSignUp && (
                <button
                  type="button"
                  className="text-sm text-blue-400 hover:underline"
                >
                  Forgot password?
                </button>
              )}
            </div>

            <GlowButton
              type="submit"
              disabled={isSubmitting}
              className="w-full text-base"
            >
              <span className={`transition-opacity duration-200 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                {isSignUp ? 'Create Account' : 'Sign In'}
              </span>
              
              {isSubmitting && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              )}
            </GlowButton>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-zinc-900 text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <SocialButton icon={<Github size={20} />} name="GitHub" />
              <SocialButton icon={<Twitter size={20} />} name="Twitter" />
              <SocialButton icon={<Linkedin size={20} />} name="LinkedIn" />
            </div>
          </div>

          {onToggleMode && (
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  type="button"
                  onClick={onToggleMode}
                  className="text-blue-400 hover:underline font-medium"
                >
                  {isSignUp ? 'Sign in' : 'Sign up'}
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
