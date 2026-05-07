'use client'

import { useEffect, useState } from 'react'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { flushSync } from 'react-dom'

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme()

  const [mounted, setMounted] = useState(false)

  /* Hydration ミスマッチ対策 */
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-8 h-8" />

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    /* ★ 1) ボタン中心座標と半径を計算 → CSS 変数に流し込む */
    const rect = e.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )
    const root = document.documentElement
    root.style.setProperty('--theme-toggle-x', `${x}px`)
    root.style.setProperty('--theme-toggle-y', `${y}px`)
    root.style.setProperty('--theme-toggle-radius', `${radius}px`)

    /* ★ 2) View Transition API があれば円形マスク付きで切り替え */
    const next = resolvedTheme === 'dark' ? 'light' : 'dark'

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        /* flushSync で React 更新を同期実行し、
           同時に <html> の classList を手動操作して
           スナップショット取得後すぐに DOM を正しい状態へ */
        flushSync(() => {
          setTheme(next) // next-themes の内部 state
          if (next === 'dark') {
            root.classList.add('dark')
          } else {
            root.classList.remove('dark')
          }
        })
      })
    } else {
      /* ★ 3) フォールバック：普通の切り替え */
      setTheme(next)
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} theme`}
      className={`
        relative w-8 h-8 rounded-full
        transition-all duration-300 ease-out
        transform-gpu will-change-transform
        cursor-pointer
      `}
      style={{
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
    >
      <div className="relative flex items-center justify-center w-full h-full overflow-hidden">
        {/* Moon (dark) */}
        <div
          className={`
            absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out 
            ${resolvedTheme === 'dark' ? 'rotate-0 opacity-100' : 'rotate-180 opacity-0'}
            `}
        >
          <Moon className="w-5 h-5 text-yellow-300" />
        </div>
        {/* Sun (light) */}
        <div
          className={`
            absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out 
            ${resolvedTheme === 'light' ? 'rotate-0 opacity-100' : '-rotate-180 opacity-0'}
            `}
        >
          <Sun className="w-5 h-5 text-amber-500" />
        </div>
      </div>
    </button>
  )
}

export default ThemeToggle
