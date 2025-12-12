import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'motion/react';
import { 
  FileText, 
  Scan, 
  Layers, 
  User, 
  Monitor, 
  BarChart2, 
  LayoutGrid
} from 'lucide-react';

// --- Geometry Helpers ---

const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
};

const createSectorPath = (x: number, y: number, outerR: number, innerR: number, startAngle: number, endAngle: number) => {
  const outerStart = polarToCartesian(x, y, outerR, endAngle);
  const outerEnd = polarToCartesian(x, y, outerR, startAngle);
  const innerStart = polarToCartesian(x, y, innerR, endAngle);
  const innerEnd = polarToCartesian(x, y, innerR, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M", outerStart.x, outerStart.y,
    "A", outerR, outerR, 0, largeArcFlag, 0, outerEnd.x, outerEnd.y,
    "L", innerEnd.x, innerEnd.y,
    "A", innerR, innerR, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
    "Z"
  ].join(" ");
};

// --- Types & Data ---

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  startAngle: number;
  endAngle: number;
}

const MENU_ITEMS: MenuItem[] = [
  { id: 'vision', label: 'Vision', icon: Scan, startAngle: 0, endAngle: 60 },
  { id: 'portfolio', label: 'Portfolio', icon: Layers, startAngle: 60, endAngle: 120 },
  { id: 'people', label: 'People', icon: User, startAngle: 120, endAngle: 180 },
  { id: 'insights', label: 'Insights', icon: Monitor, startAngle: 180, endAngle: 240 },
  { id: 'careers', label: 'Careers', icon: BarChart2, startAngle: 240, endAngle: 300 },
  { id: 'about', label: 'About Us', icon: FileText, startAngle: 300, endAngle: 360 },
];

interface CircularMenuProps {
  onSelect?: (id: string) => void;
}

export const CircularMenu = ({ onSelect }: CircularMenuProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeSegment, setActiveSegment] = useState<string | null>(null);
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1000);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const size = isMobile ? Math.min(windowWidth - 32, 400) : 600;
  
  const center = size / 2;
  const outerRadius = size / 2;
  const innerRadius = isMobile ? 60 : 80; 
  const iconRadius = (outerRadius + innerRadius) / 2;

  // Motion values for joystick position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Helper to determine segment from coordinates
  const getSegmentFromCoords = (dragX: number, dragY: number): string | null => {
    const distance = Math.sqrt(dragX * dragX + dragY * dragY);
    
    // Threshold distance
    if (distance > 20) { 
      let angle = Math.atan2(dragY, dragX) * (180 / Math.PI);
      angle = (angle + 360) % 360;
      let menuAngle = angle + 90;
      menuAngle = (menuAngle + 360) % 360;

      const activeItem = MENU_ITEMS.find(item => 
        menuAngle >= item.startAngle && menuAngle < item.endAngle
      );

      return activeItem ? activeItem.id : null;
    }
    return null;
  };

  // Monitor drag to update active segment visually
  useEffect(() => {
    const updateActiveSegment = (latestX: number, latestY: number) => {
      const segmentId = getSegmentFromCoords(latestX, latestY);
      setActiveSegment(segmentId);
    };

    const unsubscribeX = x.on("change", (latestX) => {
      updateActiveSegment(latestX, y.get());
    });
    const unsubscribeY = y.on("change", (latestY) => {
      updateActiveSegment(x.get(), latestY);
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, []); 

  const handleSelection = (id: string) => {
    setSelectedSegment(id);
    if (onSelect) onSelect(id);
    
    // Reset selection highlight after a delay
    setTimeout(() => {
      setSelectedSegment(null);
    }, 300);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1], 
        staggerChildren: 0.05
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      rotate: 20,
      transition: { duration: 0.4 }
    }
  };

  const segmentVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };

  // Mobile joystick dimensions
  const joystickClass = isMobile 
    ? "w-24 h-24 -ml-12 -mt-12" 
    : "w-32 h-32 -ml-16 -mt-16";

  return (
    <div className="relative flex items-center justify-center w-full h-screen bg-[#050505] overflow-hidden">
      
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }} 
      />

      <div className="relative" style={{ width: size, height: size }}>
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="absolute inset-0 drop-shadow-2xl"
            >
              {MENU_ITEMS.map((item) => {
                const isHovered = activeSegment === item.id;
                const isSelected = selectedSegment === item.id;
                
                const pathData = createSectorPath(
                  center, 
                  center, 
                  outerRadius - 2, 
                  innerRadius + 2, 
                  item.startAngle, 
                  item.endAngle
                );

                const midAngle = (item.startAngle + item.endAngle) / 2;
                const iconPos = polarToCartesian(center, center, iconRadius, midAngle);

                // Determine fill color
                let fillColor = "#111111";
                if (isSelected) fillColor = "#ffffff";
                else if (isHovered) fillColor = "#d4d4d8";

                // Determine text/icon color
                const contentColor = (isSelected || isHovered) ? 'text-black' : 'text-white';

                return (
                  <motion.g 
                    key={item.id}
                    variants={segmentVariants}
                    onClick={() => handleSelection(item.id)}
                    onMouseEnter={() => !isDragging && setActiveSegment(item.id)}
                    onMouseLeave={() => !isDragging && setActiveSegment(null)}
                    className="cursor-pointer group"
                    style={{ transformOrigin: 'center' }}
                  >
                    <motion.path
                      d={pathData}
                      fill={fillColor}
                      stroke="#222"
                      strokeWidth="1"
                      initial={{ fill: "#111111" }}
                      animate={{ 
                        fill: fillColor,
                        scale: isHovered || isSelected ? 1.02 : 1
                      }}
                      transition={{ duration: 0.2 }}
                    />

                    <foreignObject 
                      x={iconPos.x - (isMobile ? 40 : 60)} 
                      y={iconPos.y - (isMobile ? 30 : 50)} 
                      width={isMobile ? 80 : 120} 
                      height={isMobile ? 60 : 100}
                      className="pointer-events-none"
                    >
                      <div className={`flex flex-col items-center justify-center h-full transition-colors duration-300 ${contentColor}`}>
                        <item.icon 
                          size={isMobile ? 24 : 32} 
                          strokeWidth={1.5}
                          className="mb-2"
                        />
                        <span className={`font-medium tracking-wide ${isMobile ? 'text-xs' : 'text-sm'}`}>{item.label}</span>
                      </div>
                    </foreignObject>
                  </motion.g>
                );
              })}
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Center Joystick Button */}
        <motion.div
          className={`absolute top-1/2 left-1/2 z-20 rounded-full bg-white flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.1)] cursor-grab active:cursor-grabbing ${joystickClass}`}
          
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => {
            setIsDragging(false);
            
            // Calculate selection based on final position before spring-back
            const finalX = x.get();
            const finalY = y.get();
            const selectedId = getSegmentFromCoords(finalX, finalY);
            
            if (selectedId) {
              handleSelection(selectedId);
            }
            setActiveSegment(null);
          }}
          style={{ x, y }}
          
          onClick={() => {
            if (!isDragging) setIsOpen(!isOpen);
          }}

          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2 
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            <div className="absolute top-4 text-black/20 text-xs">▲</div>
            <div className="absolute bottom-4 text-black/20 text-xs">▼</div>
            <div className="absolute left-4 text-black/20 text-xs">◀</div>
            <div className="absolute right-4 text-black/20 text-xs">▶</div>

            <motion.div
              animate={{ rotate: isOpen ? 0 : 180 }}
              transition={{ duration: 0.4 }}
            >
              {isOpen ? (
                 <LayoutGrid size={isMobile ? 24 : 32} className="text-black" />
              ) : (
                 <LayoutGrid size={isMobile ? 24 : 32} className="text-black opacity-50" />
              )}
            </motion.div>
          </div>
        </motion.div>

         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/5 blur-[100px] rounded-full pointer-events-none -z-10" />
      </div>

    </div>
  );
};
