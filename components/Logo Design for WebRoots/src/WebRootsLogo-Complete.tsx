/**
 * WebRoots Logo Component - Complet și gata de integrare
 * 
 * DEPENDENȚE NECESARE:
 * - motion/react (pentru animații)
 * 
 * INSTALARE:
 * npm install motion
 * sau
 * yarn add motion
 * 
 * UTILIZARE:
 * import WebRootsLogo from './WebRootsLogo-Complete';
 * 
 * <WebRootsLogo />
 */

import { motion } from "motion/react";

export default function WebRootsLogo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {/* Logo SVG cu animații */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          duration: 1
        }}
      >
        <svg
          width="280"
          height="280"
          viewBox="0 0 280 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          {/* Definire gradient-uri pentru culori vibrante */}
          <defs>
            {/* Gradient pentru rădăcini - verde spre maro */}
            <linearGradient id="rootGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            
            {/* Gradient pentru trunchi */}
            <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            
            {/* Gradient pentru bracket-uri - albastru spre cyan */}
            <linearGradient id="codeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            
            {/* Glow effect */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Cercuri de fundal animate - efect digital */}
          <g>
            <circle cx="140" cy="140" r="120" fill="#3b82f6" opacity="0.05">
              <animate attributeName="r" values="120;130;120" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.05;0.1;0.05" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="140" cy="140" r="100" fill="#06b6d4" opacity="0.05">
              <animate attributeName="r" values="100;110;100" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.05;0.08;0.05" dur="2.5s" repeatCount="indefinite" />
            </circle>
          </g>
          
          {/* Rădăcini (roots) - partea de jos cu animații */}
          <g className="roots" filter="url(#glow)">
            {/* Rădăcină principală centru */}
            <path
              d="M140 140 L140 200 Q140 215 133 222 L120 235"
              stroke="url(#rootGradient)"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            >
              <animate 
                attributeName="stroke-dasharray" 
                values="0,200;200,200" 
                dur="2s" 
                fill="freeze"
              />
            </path>
            
            {/* Rădăcină stânga */}
            <path
              d="M133 155 L115 185 Q108 200 95 208 L75 222"
              stroke="url(#rootGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            >
              <animate 
                attributeName="stroke-dasharray" 
                values="0,150;150,150" 
                dur="2.2s" 
                fill="freeze"
              />
            </path>
            
            {/* Rădăcină dreaptă */}
            <path
              d="M147 155 L165 185 Q172 200 185 208 L205 222"
              stroke="url(#rootGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            >
              <animate 
                attributeName="stroke-dasharray" 
                values="0,150;150,150" 
                dur="2.4s" 
                fill="freeze"
              />
            </path>
            
            {/* Rădăcini secundare */}
            <path
              d="M125 170 L100 195 Q93 202 85 208"
              stroke="#10b981"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            >
              <animate 
                attributeName="stroke-dasharray" 
                values="0,100;100,100" 
                dur="2.6s" 
                fill="freeze"
              />
            </path>
            
            <path
              d="M155 170 L180 195 Q187 202 195 208"
              stroke="#10b981"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            >
              <animate 
                attributeName="stroke-dasharray" 
                values="0,100;100,100" 
                dur="2.8s" 
                fill="freeze"
              />
            </path>
            
            {/* Noduri animate la capetele rădăcinilor */}
            <circle cx="120" cy="235" r="5" fill="#10b981">
              <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="75" cy="222" r="4" fill="#10b981">
              <animate attributeName="r" values="3;5;3" dur="2.3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2.3s" repeatCount="indefinite" />
            </circle>
            <circle cx="205" cy="222" r="4" fill="#10b981">
              <animate attributeName="r" values="3;5;3" dur="2.7s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2.7s" repeatCount="indefinite" />
            </circle>
            <circle cx="85" cy="208" r="3" fill="#059669">
              <animate attributeName="r" values="2;4;2" dur="2.1s" repeatCount="indefinite" />
            </circle>
            <circle cx="195" cy="208" r="3" fill="#059669">
              <animate attributeName="r" values="2;4;2" dur="2.5s" repeatCount="indefinite" />
            </circle>
          </g>
          
          {/* Trunchi cu gradient și animație */}
          <rect
            x="131"
            y="98"
            width="18"
            height="50"
            rx="3"
            fill="url(#trunkGradient)"
            filter="url(#glow)"
          >
            <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
          </rect>
          
          {/* Copac/Coroană - reprezentând <> taguri HTML/Web */}
          <g className="crown" filter="url(#glow)">
            {/* Bracket stânga - < */}
            <path
              d="M112 98 L84 70 L112 42"
              stroke="url(#codeGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            >
              <animate 
                attributeName="stroke-dasharray" 
                values="0,150;150,150" 
                dur="1.5s" 
                fill="freeze"
              />
            </path>
            
            {/* Bracket dreapta - > */}
            <path
              d="M168 98 L196 70 L168 42"
              stroke="url(#codeGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            >
              <animate 
                attributeName="stroke-dasharray" 
                values="0,150;150,150" 
                dur="1.5s" 
                fill="freeze"
              />
            </path>
            
            {/* Slash în mijloc - / */}
            <path
              d="M147 49 L133 91"
              stroke="#06b6d4"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            >
              <animate 
                attributeName="stroke-dasharray" 
                values="0,100;100,100" 
                dur="1.8s" 
                fill="freeze"
              />
              <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
            </path>
          </g>
          
          {/* Particule digitale flotante */}
          <g>
            <circle cx="98" cy="56" r="3" fill="#3b82f6" opacity="0.6">
              <animate attributeName="cy" values="56;50;56" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="182" cy="56" r="3" fill="#06b6d4" opacity="0.6">
              <animate attributeName="cy" values="56;50;56" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="105" cy="77" r="2" fill="#8b5cf6" opacity="0.5">
              <animate attributeName="cy" values="77;72;77" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="175" cy="77" r="2" fill="#8b5cf6" opacity="0.5">
              <animate attributeName="cy" values="77;72;77" dur="2.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.8s" repeatCount="indefinite" />
            </circle>
            
            {/* Pixeli în mișcare în jurul logo-ului */}
            <circle cx="70" cy="140" r="2" fill="#10b981">
              <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="210" cy="140" r="2" fill="#3b82f6">
              <animate attributeName="opacity" values="0;1;0" dur="3.5s" repeatCount="indefinite" />
            </circle>
          </g>
          
          {/* Conexiuni digitale - linii animate între noduri */}
          <g opacity="0.3">
            <line x1="120" y1="235" x2="75" y2="222" stroke="#10b981" strokeWidth="1" strokeDasharray="2,2">
              <animate attributeName="stroke-dashoffset" values="0;-10" dur="2s" repeatCount="indefinite" />
            </line>
            <line x1="120" y1="235" x2="205" y2="222" stroke="#10b981" strokeWidth="1" strokeDasharray="2,2">
              <animate attributeName="stroke-dashoffset" values="0;-10" dur="2.2s" repeatCount="indefinite" />
            </line>
          </g>
        </svg>
      </motion.div>
      
      {/* Text Logo cu animații */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h1 className="text-5xl tracking-tight">
          <motion.span 
            className="bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ["0%", "100%", "0%"]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ backgroundSize: "200% auto" }}
          >
            Web
          </motion.span>
          <motion.span 
            className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent ml-1"
            animate={{ 
              backgroundPosition: ["0%", "100%", "0%"]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "linear",
              delay: 0.3
            }}
            style={{ backgroundSize: "200% auto" }}
          >
            Roots
          </motion.span>
        </h1>
        
        <motion.p 
          className="text-gray-600 dark:text-gray-400 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Fundația site-urilor tale web
        </motion.p>
        
        {/* Indicatori decorativi animați */}
        <div className="flex gap-2 justify-center mt-4">
          <motion.div
            className="w-2 h-2 rounded-full bg-blue-500"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-cyan-500"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2
            }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-green-500"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

/**
 * EXEMPLU DE UTILIZARE ÎN APP:
 * 
 * import WebRootsLogo from './WebRootsLogo-Complete';
 * 
 * function App() {
 *   return (
 *     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-blue-950 dark:to-cyan-950">
 *       <WebRootsLogo />
 *     </div>
 *   );
 * }
 * 
 * export default App;
 */
