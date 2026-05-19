import { useState, useEffect } from 'react'

// =========================================
// DEBOUNCE HOOK
// Returns a value that only updates after
// the user stops changing it for `delay` ms
// =========================================
export function useDebounce<T>(value: T, delay = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        // Set a timer to update the debounced value
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        // If value changes before delay is up,
        // cancel the previous timer and start fresh
        return () => clearTimeout(timer)
    }, [value, delay])

    return debouncedValue
}