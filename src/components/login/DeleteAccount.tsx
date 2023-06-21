import { useState } from 'react';
import { useMutation } from 'react-query';
import { DeletePwd, deleteAccount, deleteKakaoAccount } from '../../api/auth';

export const DeleteAccount = () => {
    const [password, setPassword] = useState<string>()
    const deleteAccountMutation = useMutation(deleteAccount);
    const deleteKakaoAccountMutation = useMutation(deleteKakaoAccount);

    const deleteAccountButton = async () => {
        if (!password) return;
        const passwordInfo: DeletePwd = {
            password,
        }
        await deleteAccountMutation.mutate(passwordInfo);
    }

    const deleteKakaoAccountButton = async () => {
        await deleteKakaoAccountMutation.mutate();
    }
    
  return (
    <div className='pt-20'>
    <button type="button" onClick={deleteAccountButton}>일반 회원탈퇴</button>
    <input type='password' className='border border-red-500'
    value={password}
    onChange={(e) => setPassword(e.target.value) } />
    
    <button type="button" onClick={deleteKakaoAccountButton}>카카오 회원탈퇴</button>
    </div>
  )
}
