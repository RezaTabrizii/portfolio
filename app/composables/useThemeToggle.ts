/** Flips between light and dark, pinning the choice over the system preference. */
export function useThemeToggle() {
  const colorMode = useColorMode()
  return () => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
}
