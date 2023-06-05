import { SignupInput } from '../components/signup/SignupInput';

export const Signup = () => (
  <div className="flex flex-col items-center">
    <div className="text-2xl font-bold mt-36 mb-10">회원가입</div>
    <SignupInput />
  </div>
);
