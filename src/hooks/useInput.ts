import { useState } from "react"

type ReturnTypes = [
    string | undefined,
    (e: React.ChangeEvent<HTMLInputElement>) => void
]

export const useInput = (): ReturnTypes => {
    const [inputValue, setInputValue] = useState<string | undefined>();
    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    return [inputValue, inputChangeHandler]
}