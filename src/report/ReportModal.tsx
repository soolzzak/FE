import { useAtom } from 'jotai';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { DetailUserProfile } from '../api/mypage';
import { ReportApi } from '../api/report';
import { isOpenReportAtom } from '../store/modalStore';
import { CancelButton } from '../components/common/CancelButton';

export const ReportModal = ({
  onCloseReport,
  userinfo,
}: {
  onCloseReport: () => void;
  userinfo: DetailUserProfile;
}) => {
  const [, setIsOpenReport] = useAtom(isOpenReportAtom);
  const [reportKind, setReportKind] = useState<string | undefined>();
  const [another, setAnother] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | undefined>();
  const reportReason = [
    '광고/사기',
    '금지된 표현',
    '욕설',
    '음담패설',
    '노출',
    '기타',
  ];

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReportKind(e.target.value);
  };

  const reportHandler = async () => {
    const reportDetail = {
      reportKind,
      another,
    };

    if (reportKind === '기타' && another === null) {
      setErrMsg('신고사유를 작성해주세요');
    } else if (!reportKind) {
      setErrMsg('신고사유를 선택해주세요');
    } else {
      const response = await ReportApi(userinfo.userId, reportDetail);
      toast.success(response?.message);

      setErrMsg('');
      setIsOpenReport(false);
    }
  };

  return (
    <div className="flex flex-col mt-32 md:w-[597.5px]  w-[360px]  bg-[#FFFFFF] rounded-[30px] p-8">
      <div className="font-semibold text-[24px] mb-3">신고하기</div>

      <div className="font-medium text-lg text-[#4D4D4D] mb-5">
        허위 신고일 경우 서비스의 이용제한 등 <br className="md:hidden block" />{' '}
        불이익을 받을 수 있으니,&nbsp;
        <br className="hidden md:block" />
        신중하게 판단하신 후 신고해 주세요.
      </div>

      <div className="f-jic-col">
        <select
          className="h-[42px] w-full border border-[#929292] rounded-lg text-base font-normal indent-2 mb-5"
          value={reportKind}
          onChange={selectHandler}
        >
          <option value="default" hidden>
            신고사유를 선택해주세요
          </option>
          {reportReason.map((item) => (
            <option className="text-[#4D4D4D]" key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <div className="text-ts text-red-600">{errMsg}</div>
        {reportKind === '기타' ? (
          <textarea
            value={another || ''}
            onChange={(e) => setAnother(e.target.value)}
            className="w-full h-[136.54px] rounded-[18px] bg-[#F3F3F3] flex mb-5"
            placeholder="그 외 신고사유를 작성해주세요"
          />
        ) : null}
      </div>

      <div className="flex justify-center items-center">
        <button
          type="button"
          onClick={reportHandler}
          className="md:w-full h-12 w-[320px] bg-[#F82D2D] rounded-[18px] text-[#FFFFFF] font-bold text-[22px] hover:bg-opacity-80"
        >
          신고하기
        </button>
      </div>
    </div>
  );
};
