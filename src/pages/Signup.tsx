import { SignupInput } from '../components/signup/SignupInput';

export const Signup = () => (
  <div className="flex flex-col items-center gradient">
    <div className="bg-white mt-24 mb-4 p-12 rounded-xl">
      <div className="text-2xl font-bold">회원가입</div>
      <SignupInput />
    </div>
  </div>
);
