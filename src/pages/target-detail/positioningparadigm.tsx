import React, { useState } from "react";

// 添加自定义样式
const customStyles = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideUp {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
  
  .expand-enter {
    animation: slideDown 0.3s ease-out forwards;
  }
  
  .expand-exit {
    animation: slideUp 0.3s ease-out forwards;
  }
`;

interface TreatmentItem {
  type: string;
  details: string;
  examples: string;
}

interface TreatmentCategory {
  category: string;
  items: TreatmentItem[];
  color: string;
  bgColor: string;
  borderColor: string;
}

function PositioningParadigm() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const treatmentData: TreatmentCategory[] = [
    {
      category: "First-Line Maintenance Therapy",
      color: "#3B82F6",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      items: [
        {
          type: "Ovarian Cancer",
          details:
            "PARP inhibitors are now standard first-line maintenance therapy after platinum-based chemotherapy in advanced ovarian cancer.",
          examples:
            "Rucaparib has shown significant improvement in progression-free survival (PFS) in both HR-deficient (HRd) and HR-proficient (HRp) patients when used as maintenance therapy in the first-line setting.",
        },
        {
          type: "Breast Cancer",
          details: "Some drugs work better than chemotherapy",
          examples:
            "Olaparib and talazoparib are approved for BRCA-mutated, HER2-negative breast cancer, both in early-stage (adjuvant) and metastatic settings.",
        },
        {
          type: "Endometrial Cancer",
          details: "PARP Inhibitors + Immune Checkpoint Inhibitors (ICIs)",
          examples:
            "Durvalumab + olaparib has shown improved PFS compared with ICI alone, especially in patients with abnormal p53 and functional mismatch repair (MMRp).",
        },
      ],
    },
    {
      category: "Combination Therapy",
      color: "#10B981",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      items: [
        {
          type: "Tumors with high PARP capture potential",
          details: "PARP Inhibitors + Alkylating Agents",
          examples:
            "Preclinical and early clinical data suggest that the combination of PARP inhibitors and temozolomide is synergistic in tumors with high PARP capture potential.",
        },
        {
          type: "AML, breast, and ovarian cancers",
          details: "PARP Inhibitors + DNA Methyltransferase Inhibitors (DNMTI)",
          examples:
            "Combining PARP inhibitors with DNMT inhibitors (e.g., azacytidine, decitabine) enhances PARP trapping and increases oxidative stress, leading to improved antitumor activity.",
        },
      ],
    },
    {
      category: "Emerging and Investigational Roles",
      color: "#8B5CF6",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      items: [
        {
          type: "Colon Cancer",
          details: "Metronomic PARP Inhibition + Immunotherapy",
          examples:
            "Low-dose (metronomic) PARP inhibition has been shown to modulate immunosuppressive cells (e.g., MDSCs) and enhance the efficacy of anti-PD-1 therapy, particularly in colon cancer models. This approach may expand the use of PARP inhibitors beyond BRCA-mutated tumors to immunotherapy-resistant cancers.",
        },
        {
          type: "Next-Generation PARP1-Selective Inhibitors",
          details:
            "These may allow for broader combination strategies and use in earlier lines of therapy.",
          examples:
            "Agents like AZD5305 and HRS-1167 are being developed to reduce hematologic toxicity and improve selectivity for PARP1 over PARP2.",
        },
      ],
    },
  ];

  const getIconForCategory = (category: string) => {
    switch (category) {
      case "First-Line Maintenance Therapy":
        return "🎯";
      case "Combination Therapy":
        return "🔗";
      case "Emerging and Investigational Roles":
        return "🔬";
      default:
        return "📋";
    }
  };

  const getTextColorClass = (color: string) => {
    switch (color) {
      case "#3B82F6":
        return "text-blue-800";
      case "#10B981":
        return "text-green-800";
      case "#8B5CF6":
        return "text-purple-800";
      default:
        return "text-gray-800";
    }
  };

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <div className="mt-4 bg-white rounded-lg p-6 shadow-sm">
        <div className="text-[18px] font-semibold text-[#374151] mb-6">
          Positioning within Treatment Paradigm
        </div>

        <div className="space-y-6">
          {treatmentData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              {/* 类别标题 */}
              <div
                className={`${category.bgColor} ${category.borderColor} border-l-4 p-4 rounded-r-lg`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {getIconForCategory(category.category)}
                  </span>
                  <h3
                    className={`text-[16px] font-bold ${getTextColorClass(
                      category.color
                    )}`}
                  >
                    {category.category}
                  </h3>
                </div>
              </div>

              {/* 治疗项目网格 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-4">
                {category.items.map((item, itemIndex) => {
                  const cardId = `${categoryIndex}-${itemIndex}`;
                  const isExpanded = expandedCard === cardId;

                  return (
                    <div
                      key={itemIndex}
                      className={`${category.bgColor} ${
                        category.borderColor
                      } border rounded-lg p-4 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02] ${
                        isExpanded ? "shadow-md ring-2 ring-opacity-20" : ""
                      }`}
                      style={
                        isExpanded
                          ? ({
                              "--tw-ring-color": category.color,
                            } as React.CSSProperties)
                          : {}
                      }
                      onClick={() => toggleCard(cardId)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4
                          className={`text-[14px] font-semibold ${getTextColorClass(
                            category.color
                          )} flex-1`}
                        >
                          {item.type}
                        </h4>
                        <div className="ml-2 text-gray-400">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className={`transform transition-all duration-300 ease-in-out ${
                              isExpanded
                                ? "rotate-180 text-opacity-80"
                                : "text-opacity-60"
                            }`}
                          >
                            <path d="M7 10l5 5 5-5z" />
                          </svg>
                        </div>
                      </div>

                      <p className="text-[13px] text-gray-700 leading-relaxed mb-3">
                        {item.details}
                      </p>

                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          isExpanded
                            ? "max-h-96 opacity-100 mt-3"
                            : "max-h-0 opacity-0 mt-0"
                        }`}
                      >
                        <div
                          className={`border-t pt-3 transition-all duration-300 ${
                            isExpanded ? "expand-enter" : "expand-exit"
                          }`}
                        >
                          <div className="text-[12px] font-medium text-gray-600 mb-2 transform transition-all duration-400 ease-out delay-100">
                            Examples & Clinical Evidence:
                          </div>
                          <div className="text-[12px] text-gray-700 leading-relaxed bg-white p-3 rounded border transform transition-all duration-400 ease-out delay-150 hover:shadow-sm">
                            {item.examples}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200 transition-all duration-300">
                        <span
                          className={`text-[11px] transition-colors duration-300 ${
                            isExpanded ? "text-gray-600" : "text-gray-500"
                          }`}
                        >
                          Click to {isExpanded ? "collapse" : "expand"}
                        </span>
                        <div
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            isExpanded ? "scale-110 shadow-sm" : "scale-100"
                          }`}
                          style={{ backgroundColor: category.color }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 图例说明 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <div className="text-[14px] font-medium text-gray-700 mb-3">
            Treatment Paradigm Overview
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[12px]">
            <div className="flex items-center gap-2">
              <span className="text-lg">🎯</span>
              <span className="text-gray-600">
                Established standard-of-care treatments
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🔗</span>
              <span className="text-gray-600">
                Combination strategies under investigation
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🔬</span>
              <span className="text-gray-600">
                Novel approaches in development
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PositioningParadigm;
