"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

// Unique vibrant color per node index
const NODE_COLORS = [
  { bg: "bg-blue-500",   border: "border-blue-400",   glow: "shadow-blue-500/70",   hex: "#3b82f6", label: "text-blue-300" },
  { bg: "bg-red-500",    border: "border-red-400",    glow: "shadow-red-500/70",    hex: "#ef4444", label: "text-red-300"  },
  { bg: "bg-emerald-500",border: "border-emerald-400",glow: "shadow-emerald-500/70",hex: "#10b981", label: "text-emerald-300"},
  { bg: "bg-orange-500", border: "border-orange-400", glow: "shadow-orange-500/70", hex: "#f97316", label: "text-orange-300"},
  { bg: "bg-cyan-500",   border: "border-cyan-400",   glow: "shadow-cyan-500/70",   hex: "#06b6d4", label: "text-cyan-300"  },
  { bg: "bg-purple-500", border: "border-purple-400", glow: "shadow-purple-500/70", hex: "#a855f7", label: "text-purple-300"},
];

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [viewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [orbitRadius, setOrbitRadius] = useState(260);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) newState[parseInt(key)] = false;
      });
      newState[id] = !prev[id];
      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => { newPulseEffect[relId] = true; });
        setPulseEffect(newPulseEffect);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }
      return newState;
    });
  };

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) setOrbitRadius(110);
      else if (w < 768) setOrbitRadius(160);
      else if (w < 1024) setOrbitRadius(210);
      else setOrbitRadius(270);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let rotationTimer: ReturnType<typeof setInterval>;
    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => Number(((prev + 0.35) % 360).toFixed(3)));
      }, 50);
    }
    return () => { if (rotationTimer) clearInterval(rotationTimer); };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = orbitRadius;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.5, Math.min(1, 0.5 + 0.5 * ((1 + Math.sin(radian)) / 2)));
    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":   return "text-white bg-black border-white";
      case "in-progress": return "text-black bg-white border-black";
      case "pending":     return "text-white bg-black/40 border-white/50";
      default:            return "text-white bg-black/40 border-white/50";
    }
  };

  return (
    <div
      className="relative z-20 w-full min-h-[600px] h-[65vh] sm:h-[700px] md:h-[800px] lg:h-[90vh] flex flex-col items-center justify-center bg-black overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-900/20 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-purple-900/20 blur-[80px]" />
      </div>

      <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{ perspective: "1200px", transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)` }}
        >
          {/* ── Center Orb ── */}
          <div className="absolute flex items-center justify-center z-10 pointer-events-none">
            {/* Outer slow-ping rings */}
            <div className="absolute w-40 h-40 rounded-full border border-white/10 animate-ping opacity-30" style={{ animationDuration: "3s" }} />
            <div className="absolute w-52 h-52 rounded-full border border-white/5  animate-ping opacity-20" style={{ animationDuration: "4s", animationDelay: "1s" }} />
            {/* Gradient orb */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 via-violet-600 to-emerald-500 animate-pulse shadow-[0_0_80px_30px_rgba(139,92,246,0.5)] flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-md shadow-[0_0_30px_10px_rgba(255,255,255,0.6)]" />
            </div>
          </div>

          {/* ── Decorative inner ring ── */}
          <div
            className="absolute rounded-full border border-white/5 pointer-events-none"
            style={{ width: `${orbitRadius * 0.6}px`, height: `${orbitRadius * 0.6}px` }}
          />

          {/* ── Main orbit ring ── */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: `${orbitRadius * 2}px`,
              height: `${orbitRadius * 2}px`,
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 0 40px rgba(139,92,246,0.08), inset 0 0 40px rgba(139,92,246,0.04)",
            }}
          />

          {/* ── Outer decorative ring ── */}
          <div
            className="absolute rounded-full border border-white/5 pointer-events-none"
            style={{ width: `${orbitRadius * 2.3}px`, height: `${orbitRadius * 2.3}px` }}
          />

          {/* ── Orbit Nodes ── */}
          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;
            const color = NODE_COLORS[index % NODE_COLORS.length];

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 500 : 300 + position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className="absolute transition-all duration-700 cursor-pointer w-14 h-14 flex items-center justify-center"
                style={nodeStyle}
                onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }}
              >
                {/* Glow halo */}
                <div
                  className={`absolute rounded-full pointer-events-none transition-all duration-500 ${isPulsing ? "animate-pulse" : ""}`}
                  style={{
                    background: `radial-gradient(circle, ${color.hex}55 0%, transparent 70%)`,
                    width: `${item.energy * 0.7 + 60}px`,
                    height: `${item.energy * 0.7 + 60}px`,
                    left: `-${(item.energy * 0.7 + 60 - 56) / 2}px`,
                    top: `-${(item.energy * 0.7 + 60 - 56) / 2}px`,
                  }}
                />

                {/* Icon button */}
                <div
                  className={`
                    w-14 h-14 rounded-full flex items-center justify-center
                    border-2 transition-all duration-300 transform
                    ${isExpanded
                      ? `${color.bg} border-white shadow-[0_0_30px_8px] ${color.glow} scale-125`
                      : isRelated
                      ? `bg-white/20 ${color.border} ${color.bg.replace("bg-","shadow-[0_0_20px_4px_rgba(")}} animate-pulse`
                      : `bg-black/80 ${color.border} shadow-[0_0_15px_3px] ${color.glow}`
                    }
                  `}
                >
                  <Icon size={22} className="text-white drop-shadow-lg" />
                </div>

                {/* Label */}
                <div
                  className={`
                    absolute top-16 whitespace-nowrap text-xs sm:text-sm font-bold tracking-wider
                    transition-all duration-300 drop-shadow-md
                    ${isExpanded ? `${color.label} scale-110 drop-shadow-[0_0_10px_currentColor]` : "text-white/75"}
                  `}
                >
                  {item.title}
                </div>

                {/* Expanded card */}
                {isExpanded && (
                  <Card className="absolute top-24 left-1/2 -translate-x-1/2 w-[300px] sm:w-[340px] max-md:fixed max-md:top-1/2 max-md:left-1/2 max-md:-translate-y-1/2 max-md:w-[90vw] max-md:max-w-[340px] bg-black/95 backdrop-blur-xl border-white/20 shadow-2xl overflow-visible z-[1000] rounded-xl"
                    style={{ boxShadow: `0 0 40px 4px ${color.hex}33` }}
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-white/40" />
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge className={`px-2 text-xs ${getStatusStyles(item.status)}`}>
                          {item.status === "completed" ? "COMPLETE" : item.status === "in-progress" ? "IN PROGRESS" : "PENDING"}
                        </Badge>
                        <span className="text-xs font-mono text-white/50">{item.date}</span>
                      </div>
                      <CardTitle className={`text-sm mt-2 ${color.label}`}>{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-white/80">
                      <p>{item.content}</p>
                      <div className="mt-4 pt-3 border-t border-white/10">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="flex items-center"><Zap size={10} className="mr-1" /> Energy Level</span>
                          <span className="font-mono">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${item.energy}%`, background: `linear-gradient(90deg, ${color.hex}, #a855f7)` }}
                          />
                        </div>
                      </div>
                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-white/10">
                          <div className="flex items-center mb-2">
                            <Link size={10} className="text-white/70 mr-1" />
                            <h4 className="text-xs uppercase tracking-wider font-medium text-white/70">Connected Nodes</h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find((i) => i.id === relatedId);
                              const relColor = NODE_COLORS[(relatedId - 1) % NODE_COLORS.length];
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className={`flex items-center h-6 px-2 py-0 text-xs rounded-full border bg-transparent hover:bg-white/10 transition-all ${relColor.border} ${relColor.label}`}
                                  onClick={(e) => { e.stopPropagation(); toggleItem(relatedId); }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight size={8} className="ml-1 opacity-60" />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
