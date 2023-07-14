import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

type ThemeProviderProps = {
    initialTheme?: string
    children: React.ReactNode
  }

interface ThemeContextProps {
    theme?: string
    changeThemeTo?: (newTheme: string) => void
  }

export const ThemeContext = createContext<ThemeContextProps>({})

function ThemeProvider ({ children, initialTheme = 'dark' }: PropsWithChildren<ThemeProviderProps>) {
    const [mounted, setMounted] = useState(false)
    const [theme, setTheme] = useState(initialTheme)

    function changeThemeTo(theme: string) {
        // clear all theme
        document.body.classList.remove('dark', 'light')

        // set current theme
        if (theme === 'light') {
            document.body.classList.add('light')
            setTheme('light')
        } else {
            document.body.classList.add('dark')
            setTheme('dark')
        }
        localStorage.setItem('theme', theme)
    }

    useEffect(() => {
        if (mounted) {
            if (localStorage && ('theme' in localStorage)) {
                // remove all existing
                document.body.classList.remove('dark', 'light')
                // add theme specific
                if (localStorage.theme === 'dark') {
                    document.body.classList.add('dark')
                    setTheme('dark')
                } else {
                    document.body.classList.add('light')
                    setTheme('light')
                }
            } else {
                // set default theme
                document.body.classList.add(theme)
                localStorage.setItem('theme', theme)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mounted])

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }


    return (
        <ThemeContext.Provider value={{ theme, changeThemeTo }}>
          {children}
        </ThemeContext.Provider>
      )
}

// export hooks
export const useTheme = ()=> (useContext(ThemeContext))

export default ThemeProvider