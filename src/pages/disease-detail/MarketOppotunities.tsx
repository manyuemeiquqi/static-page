import { Table } from "antd";
import PrevalenceCard from "./PrevalenceCard.tsx";
import PatientProfile from "./PatientProfile.tsx";
function MarketOpportunities() {
  const unmetNeedsData = [
    "Fast Track Designation",
    "Breakthrough Therapy Designation",
    "Accelerated Approval",
    "Heterogeneous Disease Phenotypes",
    "Drug Resistance",
    "Biomarker Limitations",
    "Confirmatory Trial Delays",
  ];

  const survivalData = [
    {
      stage: "Stage I",
      seerStage: "Localized",
      survivalRate: "91%",
    },
    {
      stage: "Stage II-III",
      seerStage: "Regional",
      survivalRate: "66%",
    },
    {
      stage: "Stage IV",
      seerStage: "Distant",
      survivalRate: "12%",
    },
    {
      stage: "All stages combined",
      seerStage: "-",
      survivalRate: "77%",
    },
  ];

  return (
    <div className="shadow-card mb-4">
      <div className="card-title mb-4">Market Opportunities</div>

      <div className="mb-4">
        <div className="grid grid-cols-6 gap-3">
          <div className="col-span-3 bg-[#f8f9fa] rounded-lg p-3">
            <div className="text-[16px] font-[500] text-[#374151] mb-3">
              Unique bench-to-bedside strategy
            </div>
            <div className="space-y-2">
              {unmetNeedsData.map((need, index) => {
                // 使用渐变色组合
                const gradients = [
                  "from-emerald-500 to-teal-500",
                  "from-violet-500 to-purple-500",
                  "from-amber-500 to-orange-500",
                  "from-rose-500 to-pink-500",
                  "from-cyan-500 to-blue-500",
                  "from-indigo-500 to-blue-500",
                  "from-teal-500 to-emerald-500",
                ];

                const hoverColors = [
                  "hover:bg-emerald-50 hover:border-emerald-200",
                  "hover:bg-violet-50 hover:border-violet-200",
                  "hover:bg-amber-50 hover:border-amber-200",
                  "hover:bg-rose-50 hover:border-rose-200",
                  "hover:bg-cyan-50 hover:border-cyan-200",
                  "hover:bg-indigo-50 hover:border-indigo-200",
                  "hover:bg-teal-50 hover:border-teal-200",
                ];

                const textColors = [
                  "group-hover:text-emerald-700",
                  "group-hover:text-violet-700",
                  "group-hover:text-amber-700",
                  "group-hover:text-rose-700",
                  "group-hover:text-cyan-700",
                  "group-hover:text-indigo-700",
                  "group-hover:text-teal-700",
                ];

                const gradient = gradients[index % gradients.length];
                const hoverColor = hoverColors[index % hoverColors.length];
                const textColor = textColors[index % textColors.length];

                return (
                  <div
                    key={index}
                    className={`group flex items-center gap-3 p-2.5 rounded-lg bg-white border border-transparent ${hoverColor} transition-all duration-200 cursor-pointer`}
                  >
                    <div className="relative">
                      <div
                        className={`w-2 h-2 bg-gradient-to-r ${gradient} rounded-full group-hover:scale-125 transition-transform duration-200`}
                      ></div>
                      <div
                        className={`absolute inset-0 w-2 h-2 bg-gradient-to-r ${gradient} rounded-full animate-pulse opacity-0 group-hover:opacity-30`}
                      ></div>
                    </div>
                    <div
                      className={`text-[14px] text-[#374151] leading-relaxed ${textColor} group-hover:font-medium transition-all duration-200`}
                    >
                      {need}
                    </div>
                    {/* <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <svg
                        className={`w-3 h-3 ${textColor.replace(
                          "group-hover:",
                          ""
                        )}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div> */}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-span-3 bg-[#f8f9fa] rounded-lg p-4">
            <div className="text-[16px] font-[500] text-[#374151] mb-3">
              Market Size Overview
            </div>

            <div className="bg-white rounded-lg p-4 space-y-4">
              {/* 主要内容 */}
              <div className="text-[14px] leading-relaxed text-[#374151]">
                <p className="mb-3">
                  The market size of{" "}
                  <span className="font-semibold text-blue-600">
                    Triple-Negative Breast Cancer (TNBC)
                  </span>{" "}
                  is growing steadily. According to Credence Research, the TNBC
                  market size was{" "}
                  <span className="font-bold text-blue-700">
                    USD 686.89 million in 2023
                  </span>{" "}
                  and is projected to reach{" "}
                  <span className="font-bold text-green-600">
                    USD 1.05 billion by 2032
                  </span>
                  , with a compound annual growth rate (CAGR) of
                  <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-medium ml-1">
                    6.14%
                  </span>
                  .
                </p>

                <p>
                  Another report from Dataintelo indicates that the global TNBC
                  treatment market was valued at
                  <span className="font-bold text-blue-700">
                    $874 million in 2023
                  </span>{" "}
                  and is expected to reach approximately
                  <span className="font-bold text-green-600">
                    $1.5 billion by 2032
                  </span>
                  , growing at a CAGR of
                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded font-medium ml-1">
                    6.2%
                  </span>
                  .
                </p>
              </div>

              {/* 分隔线 */}
              <div className="border-t border-gray-200"></div>

              {/* 关键数据摘要 */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <div className="text-[11px] text-blue-600 font-medium uppercase tracking-wide mb-1">
                    Market Value 2023
                  </div>
                  <div className="text-[18px] font-bold text-blue-700">
                    $686.89M - $874M
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <div className="text-[11px] text-green-600 font-medium uppercase tracking-wide mb-1">
                    Projected 2032
                  </div>
                  <div className="text-[18px] font-bold text-green-700">
                    $1.05B - $1.5B
                  </div>
                </div>
              </div>

              {/* 参考链接 */}
              <div className="border-t border-gray-200 pt-3">
                <div className="text-[14px] text-gray-500 mb-2 font-medium">
                  References:
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] text-gray-400 flex-shrink-0">
                      [1]
                    </span>
                    <a
                      href="https://www.credenceresearch.com/report/triple-negative-breast-cancer-tnbc-market#:~:text=%7CTriple,which%20underscores%20the%20urgent%20need%20for%20innovative%20therapies%20and%20enhanced%20diagnostic%20tools"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[14px] text-blue-600 hover:text-blue-800 hover:underline transition-colors leading-tight"
                    >
                      Credence Research - Triple Negative Breast Cancer Market
                      Report
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] text-gray-400 flex-shrink-0">
                      [2]
                    </span>
                    <a
                      href="https://dataintelo.com/report/global-triple-negative-breast-cancer-treatment-market#:~:text=Triple,which%20hold%20promise%20for%20better%20patient%20outcomes%20and%20are%20accelerating%20market%20growth"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[14px] text-blue-600 hover:text-blue-800 hover:underline transition-colors leading-tight"
                    >
                      DataIntelo - Global TNBC Treatment Market Analysis
                    </a>
                  </div>
                </div>
              </div>
              {/* 增长因素提示 */}
            </div>
          </div>
        </div>
        <div className="bg-amber-50 border mt-4 border-amber-200 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            <span className="text-[14px] font-medium text-amber-800">
              Key Growth Drivers
            </span>
          </div>
          <div className="text-[14px] text-amber-700 leading-relaxed">
            Urgent need for innovative therapies and enhanced diagnostic tools
            underscores the market expansion potential.
          </div>
        </div>
      </div>

      {/* Patient Profile */}
      {/* Prevalence */}
      <PrevalenceCard />

      {/* Survival Rates Table */}
      <div className="col-span-3 bg-[#f8f9fa] rounded-lg p-4">
        <div className="text-[16px] font-[500] text-[#374151] mb-2">
          Survival rate
        </div>
        <Table
          size="small"
          pagination={false}
          columns={[
            {
              title: "Stage",
              dataIndex: "stage",
              render: (text: string) => (
                <div className="text-[14px] font-[500] text-[#374151]">
                  {text}
                </div>
              ),
            },
            {
              title: "SEER Stage",
              dataIndex: "seerStage",
              render: (text: string) => (
                <div className="text-[12px] text-[#6B7280]">{text}</div>
              ),
            },
            {
              title: "Survival Rate",
              dataIndex: "survivalRate",
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              render: (text: string, record: any) => {
                const getColor = (rate: string) => {
                  const num = parseInt(rate);
                  if (num >= 80) return "text-green-600 font-bold";
                  if (num >= 50) return "text-orange-600 font-bold";
                  return "text-red-600 font-bold";
                };

                return (
                  <div
                    className={`text-[14px] ${
                      record.stage === "All stages combined"
                        ? "text-primary font-bold"
                        : getColor(text)
                    }`}
                  >
                    {text}
                  </div>
                );
              },
            },
          ]}
          dataSource={survivalData}
        />
      </div>

      <PatientProfile />
    </div>
  );
}

export default MarketOpportunities;
