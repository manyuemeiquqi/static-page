import { useNavigate } from "react-router";
import CopilotDemo from "../chat-page";
import Approveddrugs from "./Approveddrugs";
import MarketOpportunities from "./MarketOppotunities";
import PipelineDrugs from "./pipelinedrugs";
import SwotAnalysis from "./swotanalysis";
import KeyDevelopment from "./keydevelopment";
import PositioningParadigm from "./positioningparadigm";

function TargetDetail() {
  const navigate = useNavigate();

  return (
    <div className="flex bg-[#f8f9fa] min-h-screen w-full overflow-x-clip">
      <div className="min-h-full w-full min-w-0 flex-1">
        <div className="flex flex-1 flex-col h-screen w-full overflow-auto relative p-4">
          <div className="flex items-center gap-4 mb-2">
            <div
              className="text-primary cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              Disease Search
            </div>
            <svg
              className="w-4 h-4 text-gray-400 flex-shrink-0"
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
            <div className="text-[#4b6664] cursor-pointer">
              Disease of Cellular Proliferation
            </div>
            <svg
              className="w-4 h-4 text-gray-400 flex-shrink-0"
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
            <div className="text-[#4b6664] cursor-pointer">Cancer</div>
            <svg
              className="w-4 h-4 text-gray-400 flex-shrink-0"
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
            <div className="text-[#4b6664] cursor-pointer">
              Organ system cancer
            </div>
            <svg
              className="w-4 h-4 text-gray-400 flex-shrink-0"
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
            <div className="text-[#4b6664] cursor-pointer">Breast cancer</div>
            <svg
              className="w-4 h-4 text-gray-400 flex-shrink-0"
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
            <div className="text-[#4b6664] cursor-pointer">PARP1</div>
          </div>
          <div className="shadow-card mb-4">
            <div className="flex gap-2 ">
              <div className="text-3xl font-bold">
                poly(ADP-ribose) polymerase 1
              </div>
              <div className="text-xl text-[#4B5563] font-[500] leading-[44px]">
                (PARP1)
              </div>
            </div>
            {/* <div className="text-[#6B7280] mb-3">ICD-10: C50.9</div> */}
            <div className="text-[#374151] mb-3">
              PARP1 is a protein involved in DNA repair and chromatin
              remodeling. It is the most abundant enzyme in the PARP family,
              accounting for 90% of the NAD+ used by the family. PARP1 primarily
              resides in the cell nucleus, but it has also been found in the
              cytoplasm.
            </div>

            <div className=" flex gap-4">
              <div className="app-tag bg-[#edf5ff] text-[#1E40AF]">PARP</div>
              <div className="app-tag bg-[#f9f4ff] text-[#6B21A8]">ARTD1</div>
              <div className="app-tag  bg-[#e6f9f0] text-[#059669]">
                Poly-PARP
              </div>
              <div className="app-tag bg-[#f1f2f4] text-[#1F2937]">PARS</div>
            </div>
          </div>
          {/* <Row className="mt-4" gutter={16}>
            <Col span={12}>
              <div className="shadow-card h-[200px]">
                <div className="card-title mb-3">Top Cited Publications</div>
                <div className="mb-2">
                  <div className="text-primary font-[550] text-[15px]">
                    Nature, 2025 - "AD-P300 Gene Editing Breakthrough"
                  </div>
                  <div className="text-[#6B7280]">
                    DOI: 10.1038/s41586-025-01234-5
                  </div>
                </div>

                <div>
                  <div className="text-primary font-[550] text-[15px]">
                    Cell, 2024 - "Novel Tau Phosphorylation Mechanism"
                  </div>
                  <div className="text-[#6B7280]">
                    DOI: 10.1016/j.cell.2024.01.045
                  </div>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="shadow-card h-[200px]">
                <div className="card-title mb-3">Clinical Trial Updates</div>
                <div className="flex gap-3 items-center">
                  <div className="text-[#4B5563]">Ongoing:</div>
                  <div className="flex gap-2">
                    <div className="app-tag bg-[#d6e7fc] !rounded text-[#1E40AF] !h-full">
                      Phase III ×3
                    </div>
                    <div className="app-tag bg-[#d6e7fc] !rounded text-[#1E40AF] !h-full">
                      Phase II ×8
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 items-center mt-3">
                  <div className="text-[#4B5563]">Past 12M:</div>
                  <div className="app-tag bg-[#e2fbe8] !rounded text-[#166534] !h-full">
                    +4 new
                  </div>
                </div>
              </div>
            </Col>
          </Row> */}
          <MarketOpportunities />
          <SwotAnalysis />
          <KeyDevelopment/>
          <Approveddrugs />
          <PipelineDrugs />
          <PositioningParadigm/>
          {/* <Row className="mt-4" gutter={16}>
            <Col span={12}>
              <div className="shadow-card  h-[200px]">
                <div className="card-title mb-3">Approved Drugs</div>

                <div className="flex  items-center gap-4">
                  <div>
                    <div className="text-[#4B5563]">FDA Approved</div>
                    <div className="text-primary text-[18px]">4 drugs</div>
                  </div>
                  <div>
                    <div className="text-[#4B5563]">EMA Approved</div>
                    <div className="text-primary text-[18px]">3 drugs</div>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="shadow-card h-[200px]">
                <div className="card-title mb-3">News Highlights</div>
                <div className="">
                  <div className="text-primary font-[550] text-[15px]">
                    2025-05: Lilly's Donanemab Priority Review
                  </div>
                  <div className="text-[#6B7280]">FDA accelerated pathway</div>
                </div>
                <div>
                  <div className="text-primary font-[550] text-[15px]">
                    2025-03: Biogen Announces Phase III Results
                  </div>
                  <div className="text-[#6B7280]">
                    Significant cognitive improvement
                  </div>
                </div>
              </div>
            </Col>
          </Row> */}

          {/* <div></div>

          <div>趋势图</div>
          <Row>
            <Col span={12}>top 新闻</Col>
            <Col span={12}>top 文献</Col>
          </Row>
          <div>接入私有化数据辅助决策</div> */}
          {/* 在 Associated Targets 上方添加 Approved Drugs 表格 */}
    
        </div>
      </div>

      <div className="sticky w-[26rem]">
        <div className="overflow-hidden shadow-card h-full">
          <div className="h-screen px-3 flex flex-col pb-2 fixed top-0 right-0  w-[26rem]  border-border-300 border-r-0.5 shadow-lg ">
            {/* <div className="flex w-full justify-between items-center py-3 text-[18px] mb-3"> */}
            {/* <div>1</div> */}
            <CopilotDemo />
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TargetDetail;
