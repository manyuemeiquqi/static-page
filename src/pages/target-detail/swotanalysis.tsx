import React from "react";

interface SWOTItem {
  title: string;
  content: string;
}

interface SWOTSection {
  title: string;
  items: SWOTItem[];
  bgColor: string;
  borderColor: string;
  titleColor: string;
}

function SwotAnalysis() {
  // 获取内容标题颜色（同色系，更深）
  const getContentTitleColor = (sectionTitle: string) => {
    switch (sectionTitle) {
      case "Strengths":
        return "text-blue-900";
      case "Weaknesses":
        return "text-yellow-900";
      case "Opportunities":
        return "text-green-900";
      case "Threats":
        return "text-purple-900";
      default:
        return "text-gray-800";
    }
  };

  // 获取内容文本颜色（同色系，中等深度）
  const getContentTextColor = (sectionTitle: string) => {
    switch (sectionTitle) {
      case "Strengths":
        return "text-blue-800";
      case "Weaknesses":
        return "text-yellow-800";
      case "Opportunities":
        return "text-green-800";
      case "Threats":
        return "text-purple-800";
      default:
        return "text-gray-700";
    }
  };

  const swotData: SWOTSection[] = [
    {
      title: "Strengths",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300",
      titleColor: "text-blue-800",
      items: [
        {
          title: "Critical role in DNA repair:",
          content:
            "PARP1 senses single-strand breaks and recruits repair machinery, making it a high-value target for cancer cells reliant on DNA repair pathways.",
        },
        {
          title: "Clinically validated target:",
          content:
            "Multiple PARP1 inhibitors (olaparib, rucaparib, niraparib, talazoparib) are FDA-approved, with demonstrated survival benefit in BRCA-mutant cancers.",
        },
        {
          title: "Synthetic lethality exploitable:",
          content:
            "BRCA-deficient tumors are exquisitely sensitive to PARP1 inhibition, offering a precision-medicine approach.",
        },
      ],
    },
    {
      title: "Weaknesses",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-300",
      titleColor: "text-yellow-800",
      items: [
        {
          title: "Adverse effects:",
          content:
            "On-target toxicities (myelosuppression, anemia, thrombocytopenia) can limit dosing and combination regimens.",
        },
        {
          title: "Acquired resistance mechanisms:",
          content:
            "Tumor cells can restore homologous recombination (e.g. via reversion mutations) or upregulate drug efflux pumps.",
        },
        {
          title: "Tumor heterogeneity:",
          content:
            'Not all patients with "HR deficient" signatures respond uniformly; biomarker assays can be complex and variable.',
        },
      ],
    },
    {
      title: "Opportunities",
      bgColor: "bg-green-50",
      borderColor: "border-green-300",
      titleColor: "text-green-800",
      items: [
        {
          title: "Expansion into new indications:",
          content:
            "Beyond BRCA-mutant ovarian and breast cancers, PARP1 inhibitors show promise in prostate, pancreatic, and other solid tumors with DNA repair defects.",
        },
        {
          title: "Combination therapies:",
          content:
            "Synergy with immune checkpoint blockade, anti-angiogenics, or DNA damage response (DDR) inhibitors may overcome resistance and broaden efficacy.",
        },
        {
          title: "Companion diagnostics:",
          content:
            "Improved assays (e.g. functional HRD scores, ctDNA-based PAR activity) can better select responders and justify premium pricing.",
        },
      ],
    },
    {
      title: "Threats",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-300",
      titleColor: "text-purple-800",
      items: [
        {
          title: "Competitive landscape:",
          content:
            "Numerous next-gen PARP inhibitors and combination regimens (e.g. with immunotherapy, ATR inhibitors) are in clinical development.",
        },
        {
          title: "Market saturation & pricing pressure:",
          content:
            "Multiple approved compounds and LOE approaching for first entrants could drive down margins.",
        },
        {
          title: "Safety liabilities:",
          content:
            "Long-term PARP1 inhibition could impact normal tissue repair (e.g. hematopoietic stem cells), raising chronic toxicity concerns.",
        },
      ],
    },
  ];

  return (
    <div className="mt-4 bg-white rounded-lg p-6 shadow-sm">
      <div className="text-[18px] font-semibold text-[#374151] mb-6">
        SWOT Analysis - PARP1 Target
      </div>

      <div className="grid grid-cols-2 gap-6">
        {swotData.map((section, index) => (
          <div
            key={index}
            className={`${section.bgColor} ${section.borderColor} border-2 rounded-lg p-5`}
          >
            <h3 className={`text-[16px] font-bold ${section.titleColor} mb-4`}>
              {section.title}
            </h3>

            <div className="space-y-4">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="text-[14px]">
                  <span
                    className={`font-semibold ${getContentTitleColor(
                      section.title
                    )}`}
                  >
                    {item.title}
                  </span>
                  <span
                    className={`${getContentTextColor(section.title)} ml-1`}
                  >
                    {item.content}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SwotAnalysis;
