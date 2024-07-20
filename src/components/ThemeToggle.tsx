"use client"
import React from 'react'
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

function ThemeToggle() {
    const { theme, setTheme } = useTheme();
const toggleTheme = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark')
}

  return (
   

     
            
              <button className="ml-auto !p-0 hidden mr-4 lg:block" onClick={() => toggleTheme()}>
              {theme === "light" ? (
                <Moon size={20} className="ml-auto" />
              ) : (
                <Sun size={20} className="ml-auto" />
              )}
              </button>
          
  )
}

export default ThemeToggle