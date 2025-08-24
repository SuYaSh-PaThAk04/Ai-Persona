"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

const personas = [
  { id: 1, name: "Hitesh-Choudhary", image: "/persona.png" },
];

export default function HomePage() {
  const router = useRouter();

  const handleSelect = (persona) => {
    // navigate to chat with selected persona
    router.push(`/chat`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white flex flex-col">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-pink-900/10 via-transparent to-transparent"></div>
      
      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Welcome! 👋
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-slate-300 max-w-2xl leading-relaxed"
          >
            Choose a persona to start an intelligent conversation
          </motion.p>
        </motion.div>

        {/* Personas Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl w-full"
        >
          {personas.map((persona, index) => (
            <motion.div
              key={persona.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.7 + index * 0.1, 
                duration: 0.5,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05,
                y: -8
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(persona)}
              className="group cursor-pointer"
            >
              <div className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl hover:bg-slate-800/70 transition-all duration-300 hover:border-purple-500/50 hover:shadow-purple-500/10">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Avatar with gradient border */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-1 group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                      <div className="w-full h-full bg-slate-900 rounded-full"></div>
                    </div>
                    <Image
                      src={persona.image}
                      alt={persona.name}
                      width={120}
                      height={120}
                      className="relative rounded-full shadow-2xl group-hover:shadow-purple-500/25 transition-shadow duration-300"
                    />
                    {/* Online indicator */}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-800 shadow-lg flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  {/* Name and description */}
                  <h2 className="text-2xl font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors duration-300">
                    {persona.name.replace('-', ' ')}
                  </h2>
                  <p className="text-slate-400 text-sm mb-4 group-hover:text-slate-300 transition-colors duration-300">
                    AI Assistant • Ready to help
                  </p>
                  
                  {/* Start chat button */}
                  <div className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600/80 to-pink-600/80 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 backdrop-blur-sm">
                    Start Conversation
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-500 text-sm">
            Click on any persona to begin your conversation
          </p>
        </motion.div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
        initial={{
  x: typeof window !== "undefined" ? Math.random() * window.innerWidth : 0,
  y: typeof window !== "undefined" ? Math.random() * window.innerHeight : 0,
  opacity: 0
}}
            animate={{
              y: [null, -100, -200],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
