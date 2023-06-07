import { useEffect } from 'react'

export const KakaoLogin = () => {
    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get('code')
        // async get~~~~~~~~~~~~~~~~~~~~~~~~~~~
        
        // await ~~~~~~~~~~~~~~~~~~~response~~~~~~~~~~
    }, [])
    return (
        <div>
            ddddddddddddddd
        </div>
    )
}


export const KakaoLoginBtn = () => {
    const REST_API_KEY = 'b39a9a7ab117d1d1c9ca71fa61285f13';
    const REDIRECT_URI = 'https://api.honsoolzzak.com/api/login/oauth2/code/kakao&response_type=code&scope=profile_image,account_email,gender,birthday,age_range';
    const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=b39a9a7ab117d1d1c9ca71fa61285f13&redirect_uri=${REDIRECT_URI}`;
    window.location.href = KAKAO_AUTH_URI;
}
    
  