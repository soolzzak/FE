import { SignupInput } from '../components/signup/SignupInput';

export const Signup = () => (
  <div className="flex flex-col items-center grad h-screen">
    <div className="bg-white mt-24 mb-4 px-12 py-8 rounded-xl">
      <div className="text-2xl font-bold mb-3">회원가입</div>
      <SignupInput />
    </div>
  </div>
);
