import CopilotDemo from "../chat-page";
import { useNavigate } from "react-router";
import MarketOpportunities from "./MarketOppotunities";
import TargetTable from "./TargetTable";
import TargetTimeline from "./TargetTimeline";
import { useState } from "react";
import DrugCandidates from "./DrugCandidates";
import ApprovedDrugs from "./ApprovedDrugs";

function DiseaseDetail() {
  const navigate = useNavigate();
  // 添加新闻数据，包含链接

  // 添加临床试验数据

  const newsData = [
    {
      date: "June 2, 2025",
      category: "Partnership",
      title:
        "BioNTech Stock Jumps on Bristol Myers Squibb Cancer Drug Collaboration",
      summary:
        "BioNTech's U.S.-listed shares surged over 15% after it announced a global strategic partnership with Bristol Myers Squibb to co-develop and commercialize its bispecific antibody candidate BNT327 for multiple solid tumors.",
      source: "Investopedia",
      url: "https://www.investopedia.com/biontech-stock-jumps-on-bristol-myers-squibb-cancer-drug-collaboration-11746217",
      borderColor: "border-primary",
    },
    {
      date: "ASCO 2025",
      category: "Clinical Trial",
      title:
        "Sacituzumab Govitecan Shows Superiority Over Standard of Care for PD-L1 Positive TNBC",
      summary:
        "At ASCO 2025, the phase III ASCENT-04/KEYNOTE-D19 trial in 443 treatment-naive, PD-L1–positive (CPS ≥ 10) metastatic TNBC patients showed that sacituzumab govitecan plus pembrolizumab reduced the risk of progression or death by 35% (HR 0.65; P < 0.001), with a median PFS of 11.2 vs 7.8 months versus chemotherapy plus pembrolizumab.",
      source: "Oncology Central",
      url: "https://www.oncology-central.com/asco-2025-sacituzumab-govitecan-shows-superiority-over-standard-of-care-for-pd-l1-positive-tnbc",
      borderColor: "border-green-500",
    },
    {
      date: "ASCO 2025",
      category: "Breakthrough",
      title: "AstraZeneca Shows Strong Results Across Multiple Cancer Types",
      summary:
        "At ASCO 2025, AstraZeneca showed that adding Imfinzi cut gastric cancer recurrence by 29%, Enhertu + Perjeta extended HER2-positive breast cancer progression-free survival to 40.7 months versus 26.9 months with standard therapy, and camizestrant reduced progression risk by 56% in ESR1-mutant breast cancer.",
      source: "Investors.com",
      url: "https://www.investors.com/news/technology/astrazeneca-azn-breast-cancer-treatment-asco/",
      borderColor: "border-blue-500",
    },
    {
      date: "Jan 13, 2025",
      category: "FDA Fast Track",
      title:
        "FDA Fast Tracks Emiltatug Ledadotin in Advanced Metastatic Breast Cancer",
      summary:
        "The FDA granted Fast Track designation to emiltatug ledadotin (XMT-1660), a B7-H4–targeting ADC with a defined drug-to-antibody ratio, for advanced or metastatic HER2-low/negative breast cancer following prior topoisomerase-1 inhibitor ADC (or endocrine therapy ineligible/progressed HR-positive disease).",
      source: "Targeted Oncology",
      url: "https://www.targetedonc.com/view/fda-fast-tracks-emiltatug-ledadotin-in-advanced-metastatic-breast-cancer",
      borderColor: "border-orange-500",
    },
    {
      date: "Ongoing",
      category: "Phase III",
      title: "Clinical Trials to Watch in Triple-Negative Breast Cancer",
      summary:
        "Two phase 3 trials are now testing in early-stage triple-negative breast cancer whether patients who achieve a pathologic complete response after neoadjuvant chemotherapy + pembrolizumab can safely stop pembrolizumab versus continue for up to 27 weeks (OptimICE-PCR), and whether adding the antibody–drug conjugate sacituzumab govitecan plus pembrolizumab can improve outcomes versus standard adjuvant regimens in those with residual disease (ASCENT-05/AFT-65).",
      source: "CURE Today",
      url: "https://www.curetoday.com/view/clinical-trials-to-watch-in-triple-negative-breast-cancer",
      borderColor: "border-purple-500",
    },
  ];

  const handleNewsClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // 添加高引用论文数据
  const topPapersData = [
    {
      title:
        "Triple-negative breast cancer: clinical features and patterns of recurrence",
      authors: "Dent, Rebecca, et al.",
      journal: "Clinical cancer research",
      year: "2007",
      volume: "13.15",
      pages: "4429-4434",
      citations: 6460,
      summary:
        "Patients with triple‐negative tumors experienced a 2.6‐fold higher risk of distant recurrence and a 3.2‐fold higher risk of death within five years—peaking around three years post‐diagnosis before declining rapidly—unlike the constant recurrence risk seen in other subtypes.",
      category: "Clinical Research",
      impactLevel: "high",
      borderColor: "border-red-400", // 添加边框颜色
    },
    {
      title:
        "Identification of human triple-negative breast cancer subtypes and preclinical models for selection of targeted therapies",
      authors: "Lehmann, Brian D., et al.",
      journal: "The Journal of clinical investigation",
      year: "2011",
      volume: "121.7",
      pages: "2750-2767",
      citations: 6405,
      summary:
        "Lehmann et al. performed gene‐expression profiling of 587 triple‐negative breast cancer (TNBC) cases and identified six distinct molecular subtypes, then demonstrated that representative cell‐line models exhibit subtype‐specific drug sensitivities, highlighting the utility of TNBC subtyping to guide targeted therapy selection.",
      category: "Molecular Biology",
      impactLevel: "high",
      borderColor: "border-blue-400",
    },
    {
      title:
        "Triple-negative breast cancer molecular subtyping and treatment progress",
      authors: "Yin, Li, et al.",
      journal: "Breast Cancer Research",
      year: "2020",
      volume: "22",
      pages: "1-13",
      citations: 2248,
      summary:
        "This review classifies TNBC into distinct molecular subtypes and luminal androgen receptor, summarizes both established chemotherapeutic regimens and emerging targeted and immunotherapeutic strategies tailored to each subtype to inform more effective, personalized treatments.",
      category: "Review",
      impactLevel: "medium",
      borderColor: "border-purple-400",
    },
    {
      title:
        "Adjuvant capecitabine for breast cancer after preoperative chemotherapy",
      authors: "Masuda, Norikazu, et al.",
      journal: "New England Journal of Medicine",
      year: "2017",
      volume: "376.22",
      pages: "2147-2159",
      citations: 1886,
      summary:
        "In a randomized trial of 910 patients with HER2-negative residual invasive breast cancer after neoadjuvant anthracycline–taxane chemotherapy, adding adjuvant capecitabine significantly improved 5-year disease-free survival and overall survival, with marked benefits seen in the triple-negative subgroup.",
      category: "Clinical Trial",
      impactLevel: "medium",
      borderColor: "border-green-400",
    },
    {
      title: "Triple-negative breast cancer: therapeutic options",
      authors: "Cleator, Susan, Wolfgang Heller, and R. Charles Coombes",
      journal: "The lancet oncology",
      year: "2007",
      volume: "8.3",
      pages: "235-244",
      citations: 1403,
      summary:
        "Triple-negative breast cancer (TNBC), defined by the lack of oestrogen, progesterone, and HER2 receptors and accounting for roughly 15% of breast cancers—particularly in premenopausal African and African-American women—is aggressive, poorly differentiated, and transcriptionally aligns with basal-like and BRCA1-associated tumours.",
      category: "Review",
      impactLevel: "medium",
      borderColor: "border-orange-400",
    },
  ];

  // ...existing code...

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Clinical Research":
        return "bg-[#e2fbe8] text-[#166534]";
      case "Molecular Biology":
        return "bg-[#edf5ff] text-[#1E40AF]";
      case "Review":
        return "bg-[#f9f4ff] text-[#6B21A8]";
      case "Clinical Trial":
        return "bg-[#fef3e2] text-[#D97706]";
      default:
        return "bg-[#f1f2f4] text-[#1F2937]";
    }
  };

  const getImpactColor = (level: string) => {
    switch (level) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };
  const [activeTab, setActiveTab] = useState("news"); // "news" 或 "papers"

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
            <div className="text-[#4b6664] cursor-pointer">TNBC</div>
          </div>
          <div className="shadow-card mb-4">
            <div className="flex gap-2 ">
              <div className="text-3xl font-bold">
                Triple-negative breast cancer
              </div>
              <div className="text-xl text-[#4B5563] font-[500] leading-[44px]">
                (TNBC)
              </div>
            </div>
            {/* <div className="text-[#6B7280] mb-3">ICD-10: C50.9</div> */}
            <div className="text-[#374151] mb-3">
              Triple-negative breast cancer (TNBC) is an aggressive and
              heterogeneous subtype of breast cancer—comprising about 10–20% of
              breast cancers—whose tumor cells lack estrogen receptors (ER),
              progesterone receptors (PR), and HER2 expression, making it more
              common among younger and BRCA1-mutated patients, prone to early
              recurrence, and resistant to hormonal and HER2-targeted therapies.
            </div>

            <div className=" flex gap-4">
              <div className="app-tag bg-[#edf5ff] text-[#1E40AF]">
                Global patients ≈ 2.3M
              </div>
              <div className="app-tag bg-[#f9f4ff] text-[#6B21A8]">
                Annual incidence 230K
              </div>
              <div className="app-tag  bg-[#e6f9f0] text-[#059669]">
                Oncology
              </div>
              <div className="app-tag bg-[#f1f2f4] text-[#1F2937]">
                Aggressive subtype
              </div>
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
          <TargetTimeline />
          <MarketOpportunities />
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
          <DrugCandidates />
          <ApprovedDrugs />
          <TargetTable />
          <div className="shadow-card mt-4">
            <div className="flex items-center justify-between mb-4">
              <div className="card-title">New and Publications</div>

              {/* 切换标签 */}
              <div className="flex bg-gray-100 rounded-lg p-1 ">
                <button
                  onClick={() => setActiveTab("news")}
                  className={`px-4 py-2 cursor-pointer rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === "news"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  📰 News & Updates
                </button>
                <button
                  onClick={() => setActiveTab("papers")}
                  className={`px-4 py-2 cursor-pointer rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === "papers"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  📚 Top Cited Papers
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {activeTab == "news"
                ? newsData.map((news, index) => (
                    <div
                      key={index}
                      className={`border-l-4 ${news.borderColor} pl-4`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="app-tag bg-[#e2fbe8] text-[#166534] !px-2 !py-1 text-xs">
                          {news.date}
                        </div>
                        <div className="app-tag bg-[#edf5ff] text-[#1E40AF] !px-2 !py-1 text-xs">
                          {news.category}
                        </div>
                      </div>
                      <div
                        className="text-primary font-[550] text-[15px] mb-1 cursor-pointer hover:underline transition-colors duration-200"
                        onClick={() => handleNewsClick(news.url)}
                      >
                        {news.title}
                      </div>
                      <div className="text-[#6B7280] text-sm">
                        {news.summary}
                      </div>
                      <div className="text-xs text-[#9CA3AF] mt-1">
                        Source: {news.source}
                      </div>
                    </div>
                  ))
                : topPapersData.map((paper, index) => (
                    <div
                      key={index}
                      className={`border-l-4 ${paper.borderColor} pl-4 hover:bg-gray-50 transition-colors duration-200 rounded-r-lg p-3`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`app-tag !px-2 !py-1 text-xs ${getCategoryColor(
                            paper.category
                          )}`}
                        >
                          {paper.category}
                        </div>
                        <div className="app-tag bg-[#f1f5f9] text-[#475569] !px-2 !py-1 text-xs">
                          {paper.year}
                        </div>
                        <div
                          className={`flex items-center gap-1 text-xs font-medium ${getImpactColor(
                            paper.impactLevel
                          )}`}
                        >
                          <span>📊</span>
                          <span>
                            {paper.citations.toLocaleString()} citations
                          </span>
                        </div>
                      </div>

                      <div className="text-primary font-[550] text-[15px] mb-1 leading-tight">
                        {paper.title}
                      </div>

                      <div className="text-[#6B7280] text-sm mb-2">
                        <span className="font-medium">{paper.authors}</span>
                        <span className="mx-1">•</span>
                        <span className="italic">{paper.journal}</span>
                        <span className="mx-1">•</span>
                        <span>
                          {paper.volume} ({paper.year}): {paper.pages}
                        </span>
                      </div>

                      <div className="text-[#374151] text-sm leading-relaxed">
                        {paper.summary}
                      </div>
                    </div>
                  ))}
            </div>
          </div>
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

export default DiseaseDetail;
