'use client'
import { useEffect, useState } from "react"

const useDebounce = <T> (value: T, delay: number) => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setDebounceValue(value);
        }, delay)
        return () => {
            clearTimeout(timeOut)
        }
    }, [value, delay])

    return debounceValue
};

export default useDebounce