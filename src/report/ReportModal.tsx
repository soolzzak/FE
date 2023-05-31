import { useState } from "react";

export const ReportModal = () => {
    const [reportState, setReportState] = useState<string | undefined>();
    const [reportDetail, setReportDetail] = useState<string | undefined>();
    const reportReason = [
        "광고/사기",
        "금지된 표현",
        "욕설",
        "언어폭력",
        "기타"
    ]

    const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setReportState(e.target.value)
    }

    return (
            <div className="flex flex-col mt-32 w-[597.5px] h-[503.41px] bg-[#FFFFFF] rounded-[30px] py-8 px-6">
                <div className="font-semibold text-[24px] mb-3">
                    신고하기
                </div>

                <div className="font-medium text-lg text-[#4D4D4D] mb-3">
                    허위 신고일 경우 서비스의 이용제한 등 불이익을 받을 수 있으니 신중하게 판단하신 후 신고해 주세요.
                </div>

                <select
                className="w-[525px] h-[42px] border border-[#929292] rounded-lg text-base font-normal indent-2  mb-3"
                value={reportState}
                onChange={selectHandler}
                >
                    <option value="default" hidden>신고사유를 선택해주세요</option>
                    {reportReason.map((item) => (
                        <option className="text-[#4D4D4D]" key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
                {reportState === '기타' ? 
                <input
                type="text"
                value={reportDetail || ''}
                onChange={(e) => setReportDetail(e.target.value)}
                className="w-[525px] h-[136.54px] rounded-[18px] bg-[#F3F3F3]  mb-3"
                placeholder="그 외 신고사유를 작성해주세요"
                /> : null}
                
                <button type="button" className="w-[525px] h-12 bg-[#929292] rounded-[18px] text-[#FFFFFF] font-bold text-[22px] hover:bg-opacity-80">
                    신고하기 버튼
                </button>
            </div>
    )
};
