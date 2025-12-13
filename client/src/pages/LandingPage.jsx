import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../auth/Login';

const cn = (...classes) => classes.filter(Boolean).join(' ');

const HoverBorderGradient = ({
  children,
  containerClassName,
  className,
  as: Tag = 'div',
  duration = 1,
  clockwise = true,
  ...props
}) => {
  const gradientStyle = {
    background: `conic-gradient(from 0deg, transparent, #e2e8f0, #cbd5e1, #94a3b8, #64748b, #475569, #334155, transparent)`
  };

  return (
    <Tag
      className={cn(
        'relative flex items-center justify-center overflow-hidden p-[1px] group',
        containerClassName
      )}
      {...props}
    >
      <div
        className="absolute inset-0 opacity-75 blur-sm animate-spin"
        style={{
          ...gradientStyle,
          animationDuration: `${duration * 3}s`,
          animationDirection: clockwise ? 'normal' : 'reverse'
        }}
      />
      <div
        className={cn(
          'relative z-10 px-8 py-3 font-medium backdrop-blur-3xl',
          className
        )}
      >
        {children}
      </div>
    </Tag>
  );
};

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl sm:text-7xl font-bold text-center"
      >
        Animate Learning
      </motion.h1>

      <motion.div className="mt-10">
        <HoverBorderGradient
          as="button"
          containerClassName="rounded-full"
          className="bg-white dark:bg-black text-black dark:text-white"
          onClick={() => (user ? navigate('/dashboard') : setShowLogin(true))}
        >
          {user ? 'Welcome Back!' : 'Get Started'}
        </HoverBorderGradient>
      </motion.div>

      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </div>
  );
};

export default LandingPage;
