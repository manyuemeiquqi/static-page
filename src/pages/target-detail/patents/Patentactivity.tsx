import React from "react";

interface Patent {
  id: string;
  title: string;
  patentNumber: string;
  country: string;
  date: string;
}

const PatentActivity: React.FC = () => {
  const recentPatents: Patent[] = [
    {
      id: "1",
      title:
        "A small molecule inhibitor targeting APP protein and its applications",
      patentNumber: "CN202310567890.1",
      country: "CN",
      date: "2023-12",
    },
    {
      id: "2",
      title:
        "APP protein specific antibody and its application in Alzheimer's disease diagnosis",
      patentNumber: "US2022154321A1",
      country: "US",
      date: "2022-08",
    },
    {
      id: "3",
      title:
        "APP protein-based drug screening method for Alzheimer's disease treatment",
      patentNumber: "EP4123456A1",
      country: "EP",
      date: "2022-06",
    },
    {
      id: "4",
      title:
        "Antisense oligonucleotide targeting APP mRNA and its applications",
      patentNumber: "JP2022123456A",
      country: "JP",
      date: "2022-05",
    },
    {
      id: "5",
      title:
        "A natural compound inhibiting APP protein cleavage and its derivatives",
      patentNumber: "WO2023123456A1",
      country: "WO",
      date: "2022-04",
    },
  ];

  const getCountryFlag = (country: string) => {
    const flags: Record<string, string> = {
      CN: "🇨🇳",
      US: "🇺🇸",
      EP: "🇪🇺",
      JP: "🇯🇵",
      WO: "🌍",
    };
    return flags[country] || "🏳️";
  };

  const getCountryName = (country: string) => {
    const names: Record<string, string> = {
      CN: "China",
      US: "United States",
      EP: "Europe",
      JP: "Japan",
      WO: "International",
    };
    return names[country] || "Unknown";
  };

  return (
    <div className="shadow-card mb-4">
      <div className="card-title mb-4">Recent 5 Patents</div>

      <div className="space-y-2">
        {recentPatents.map((patent) => (
          <div
            key={patent.id}
            className="border-l-4 border-blue-400 pl-3 py-2 hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-base">
                {getCountryFlag(patent.country)}
              </span>
              <span className="text-base text-[#1751c6] font-medium">
                {getCountryName(patent.country)}
              </span>
              <span className="text-xs text-[#9CA3AF] bg-gray-100 px-2 py-0.5 rounded">
                {patent.date}
              </span>
            </div>

            <h3 className="text-green-600 font-semibold text-sm leading-tight mb-1.5">
              {patent.title}
            </h3>

            <div className="text-sm text-[#6B7280] font-mono bg-gray-50 px-2 py-1 rounded inline-block">
              {patent.patentNumber}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatentActivity;
