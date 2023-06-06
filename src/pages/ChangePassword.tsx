import { ChangePwdInput } from "../components/login/ChangePwdInput";

export const ChangePassword = () => (
    <div className="flex flex-col items-center">
      <div className="text-2xl font-bold mt-36 mb-10">비밀번호 찾기</div>
      <ChangePwdInput />
    </div>
  );