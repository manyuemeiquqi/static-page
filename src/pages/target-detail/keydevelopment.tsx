import { useState } from "react";

interface DevelopmentItem {
  date: string;
  category: string;
  title: string;
  description: string;
  source: string;
  url: string;
}

function KeyDevelopment() {
  const [activeTab, setActiveTab] = useState<"news" | "papers">("news");

  const developmentData: DevelopmentItem[] = [
    {
      date: "June 2025",
      category: "Partnership",
      title: "Scientists at UT Health San Antonio Discover Key DNA Complex",
      description:
        "Scientists at The University of Texas Health Science Center at San Antonio (UT Health San Antonio) have discovered a key DNA complex associated with resistance to polymerase inhibitor anticancer drugs.",
      source: "Medical Xpress",
      url: "https://medicalxpress.com/news/2025-06-key-dna-complex-polymerase-inhibitor.html",
    },
    {
      date: "June 2025",
      category: "Clinical Trial",
      title: "Johnson & Johnson Leads with First PARP Inhibitor Combo",
      description:
        "Johnson & Johnson leads with first PARP inhibitor combo to improve efficacy in patients with HRR-altered mCSPC.",
      source: "Investor J&J",
      url: "https://www.investor.jnj.com/news/news-details/2025/Johnson--Johnson-leads-with-first-PARP-inhibitor-combo-to-improve-efficacy-in-patients-with-HRR-altered-mCSPC/default.aspx",
    },
    {
      date: "May 2025",
      category: "Breakthrough",
      title: "Current Treatment Paradigms for Ovarian Cancer Highlighted",
      description:
        "Deena M. Atieh Graham, MD, highlighted current treatment paradigms for ovarian cancer, specifically PARP inhibitors and novel ADCs in this field.",
      source: "OncoLive",
      url: "https://www.onclive.com/view/adcs-and-parp-inhibitors-are-among-2025-s-practice-changing-agents-in-ovarian-cancer",
    },
    {
      date: "April 2025",
      category: "FDA Fast Track",
      title:
        "PARP Inhibitor Olaparib and PD-1 Inhibitor Combination Shows Promise",
      description:
        "According to the results of a molecularly matched, tumor-agnostic phase II trial, the combination of the PARP inhibitor olaparib and the PD-1 inhibitor pembrolizumab demonstrated antitumor activity with no new safety signals, particularly in patients with BRCA1/2 mutations.",
      source: "ASCO Post",
      url: "https://ascopost.com/news/april-2025/molecularly-selected-tumor-agnostic-phase-ii-trial-focuses-on-combination-therapy/",
    },
    {
      date: "April 2025",
      category: "Ongoing",
      title: "Rakovina Therapeutics Showcases AI-Discovered Cancer Therapies",
      description:
        "Rakovina Therapeutics showcased preclinical results of its novel AI-discovered cancer therapies at the American Association for Cancer Research (AACR) Annual Meeting 2025.",
      source: "Rakovina Therapeutics",
      url: "https://www.rakovinatherapeutics.com/rakovina-therapeutics-showcases-preclinical-results-of-novel-ai-discovered-cancer-therapies-at-aacr-2025/",
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Partnership":
        return "bg-blue-100 text-blue-800";
      case "Clinical Trial":
        return "bg-green-100 text-green-800";
      case "Breakthrough":
        return "bg-purple-100 text-purple-800";
      case "FDA Fast Track":
        return "bg-orange-100 text-orange-800";
      case "Ongoing":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryBorder = (category: string) => {
    switch (category) {
      case "Partnership":
        return "border-l-blue-500";
      case "Clinical Trial":
        return "border-l-green-500";
      case "Breakthrough":
        return "border-l-purple-500";
      case "FDA Fast Track":
        return "border-l-orange-500";
      case "Ongoing":
        return "border-l-gray-500";
      default:
        return "border-l-gray-500";
    }
  };

  return (
    <div className="mt-4 bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <div className="text-[18px] font-semibold text-[#374151] mb-6">
          Key Development
        </div>

        {/* Tab Navigation */}
        <div className="flex mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("news")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "news"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            📰 News & Updates
          </button>
          <button
            onClick={() => setActiveTab("papers")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ml-6 ${
              activeTab === "papers"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            📄 Top Cited Papers
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {developmentData.map((item, index) => (
            <div
              key={index}
              className={`border-l-4 ${getCategoryBorder(
                item.category
              )}  p-4 rounded-r-lg hover:bg-gray-100 transition-colors`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600">
                    {item.date}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(
                      item.category
                    )}`}
                  >
                    {item.category}
                  </span>
                </div>
              </div>

              <h3 className="text-[16px] font-semibold text-blue-700 mb-2 hover:text-blue-800 cursor-pointer">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              </h3>

              <p className="text-[14px] text-gray-700 leading-relaxed mb-3">
                {item.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Source: {item.source}
                </span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                >
                  View Details →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default KeyDevelopment;
