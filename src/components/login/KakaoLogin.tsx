import { useEffect } from 'react'

export const KakaoLogin = () => {
    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get('code')
        
    }, [])
    return (
        <div>
            ddddddddddddddd
        </div>
    )
}