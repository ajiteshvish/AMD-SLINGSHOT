"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
  isHash?: boolean
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(items[0].name)

  // Sync active tab with current route
  useEffect(() => {
    const current = items.find(item => item.url === location.pathname)
    if (current) setActiveTab(current.name)
  }, [location.pathname, items])

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6",
        className,
      )}
    >
      <div className="flex items-center gap-3 bg-black/40 border border-white/10 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          const handleClick = () => {
            setActiveTab(item.name)
            if (item.isHash && item.url.startsWith('#')) {
              const el = document.querySelector(item.url)
              el?.scrollIntoView({ behavior: 'smooth' })
            }
          }

          const linkContent = (
            <>
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-white/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-400 rounded-t-full">
                    <div className="absolute w-12 h-6 bg-blue-400/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-blue-400/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-blue-400/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </>
          )

          if (item.isHash) {
            return (
              <a
                key={item.name}
                href={item.url}
                onClick={handleClick}
                className={cn(
                  "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                  "text-white/70 hover:text-blue-400",
                  isActive && "text-white",
                )}
              >
                {linkContent}
              </a>
            )
          }

          return (
            <Link
              key={item.name}
              to={item.url}
              onClick={handleClick}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-white/70 hover:text-blue-400",
                isActive && "text-white",
              )}
            >
              {linkContent}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
