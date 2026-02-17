import { useCallback, useEffect, useRef, useState } from "react"
import { flushSync } from "react-dom"
import { cn } from "@/lib/shadcnUtils"
import { toggleTheme, isDark as checkIsDark } from "@/lib/theme"
import { Button } from "@/components/ui/button"
import ThemeIcon from "@/components/common/NavBar/ThemeIcon"

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const updateTheme = () => setIsDark(checkIsDark())
    setMounted(true)
    updateTheme()
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [])

  const handleToggle = useCallback(async () => {
    if (!buttonRef.current) return

    await document.startViewTransition(() => {
      flushSync(() => {
        const next = toggleTheme()
        setIsDark(next === "dark")
      })
    }).ready

    const { top, left, width, height } = buttonRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    )

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    )
  }, [isDark, duration])

  if (!mounted) return null

  return (
    <Button
      ref={buttonRef}
      onClick={handleToggle}
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      title="Toggle theme"
      className={cn(className)}
      {...props}
    >
      <ThemeIcon icon={isDark ? "sun" : "moon"} />
    </Button>
  )
}
