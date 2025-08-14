import { Carousel, Card } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  ExclamationCircleOutlined,
  HeartOutlined,
  MedicineBoxOutlined,
  BugOutlined,
  SafetyOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";
import { useRef } from "react";
import type { CarouselRef } from "antd/es/carousel";

interface SafetyItem {
  id: number;
  title: string;
  description: string;
  details: string;
  link: string;
  icon: React.ReactNode;
  severity: "high" | "medium" | "low";
}

function SafetyEvaluation() {
  const carouselRef = useRef<CarouselRef>(null);

  const safetyData: SafetyItem[] = [
    {
      id: 1,
      title: "Off-Target Effects",
      description:
        "Some PARP inhibitors can inhibit other PARP family members like PARP2 and PARP3, and there have been observations of off-target effects on kinases as well.",
      details:
        "Cross-reactivity with PARP2/PARP3 and kinase inhibition may lead to unexpected cellular responses and potential therapeutic complications.",
      link: "https://aacrjournals.org/cancerres/article/72/21/5588/576072/Trapping-of-PARP1-and-PARP2-by-Clinical-PARP",
      icon: <ExclamationCircleOutlined className="text-2xl" />,
      severity: "high",
    },
    {
      id: 2,
      title: "Side Effects",
      description:
        "Common side effects of PARP inhibitors include an increased risk of infection, bleeding problems, tiredness, and breathlessness due to a drop in the number of blood cells.",
      details:
        "Hematological toxicities are dose-limiting and require careful monitoring. Additional effects include nausea, fatigue, diarrhea, indigestion and taste changes, headaches, and dizziness.",
      link: "https://www.cancerresearchuk.org/about-cancer/treatment/targeted-cancer-drugs-immunotherapy/parp-inhibitors/",
      icon: <MedicineBoxOutlined className="text-2xl" />,
      severity: "medium",
    },
    {
      id: 3,
      title: "Cardiovascular Toxicities",
      description:
        "Certain PARP inhibitors, such as niraparib, have been associated with cardiovascular toxicities including hypertension, tachycardia, and palpitations.",
      details:
        "Cardiovascular monitoring is essential, particularly in patients with pre-existing cardiac conditions. Blood pressure management may be required during treatment.",
      link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7292736/",
      icon: <HeartOutlined className="text-2xl" />,
      severity: "high",
    },
    {
      id: 4,
      title: "Hematological Toxicity",
      description:
        "Some PARP inhibitors may cause hematological toxicity, which can lead to issues like thrombocytopenia (a lack of platelets), resulting in increased bruising or bleeding.",
      details:
        "Regular blood count monitoring is crucial. Dose modifications or treatment interruptions may be necessary based on severity of hematological changes.",
      link: "https://targetovariancancer.org.uk/parp-inhibitors-side-effects/",
      icon: <BugOutlined className="text-2xl" />,
      severity: "medium",
    },
    {
      id: 5,
      title: "Drug Resistance",
      description:
        "Over time, tumors may develop resistance to PARP inhibitors, which can be due to various mechanisms including mutations in PARP-1 that impair its DNA binding affinity.",
      details:
        "Resistance mechanisms include PARP-1 mutations, restoration of homologous recombination, and replication fork protection. Combination therapies are being explored to overcome resistance.",
      link: "https://www.mdpi.com/2072-6694/16/20/3441/",
      icon: <SafetyOutlined className="text-2xl" />,
      severity: "high",
    },
    {
      id: 6,
      title: "Specificity",
      description:
        "Designing small molecules that specifically target PARP1 without affecting other PARP family members is challenging due to the high conservation of catalytic domains.",
      details:
        "The structural similarity between PARP family members makes selective inhibition difficult, potentially leading to unintended biological effects and reduced therapeutic window.",
      link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11308664/",
      icon: <ExperimentOutlined className="text-2xl" />,
      severity: "medium",
    },
  ];

  const getSeverityColor = (severity: SafetyItem["severity"]) => {
    switch (severity) {
      case "high":
        return "from-red-400 to-red-500";
      case "medium":
        return "from-orange-400 to-orange-500";
      case "low":
        return "from-green-400 to-green-500";
      default:
        return "from-orange-400 to-orange-500";
    }
  };

  const getSeverityBorder = (severity: SafetyItem["severity"]) => {
    switch (severity) {
      case "high":
        return "border-red-300";
      case "medium":
        return "border-orange-300";
      case "low":
        return "border-green-300";
      default:
        return "border-orange-300";
    }
  };

  const getSeverityBadge = (severity: SafetyItem["severity"]) => {
    switch (severity) {
      case "high":
        return "bg-red-500 text-white";
      case "medium":
        return "bg-orange-500 text-white";
      case "low":
        return "bg-green-500 text-white";
      default:
        return "bg-orange-500 text-white";
    }
  };

  return (
    <div className="mt-4 bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#374151] mb-2">
            Safety Evaluation
          </h2>
          <p className="text-[#6B7280] text-sm">
            Target liability assessment for PARP1 inhibitors
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => carouselRef.current?.prev()}
            className="w-10 h-10 rounded-full bg-white text-gray-600 flex items-center justify-center hover:bg-[#2563EB] hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-200"
          >
            <LeftOutlined />
          </button>
          <button
            onClick={() => carouselRef.current?.next()}
            className="w-10 h-10 rounded-full bg-white text-gray-600 flex items-center justify-center hover:bg-[#2563EB] hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-200"
          >
            <RightOutlined />
          </button>
        </div>
      </div>

      <div className="pt-2 pb-4">
        <Carousel
          ref={carouselRef}
          dots={true}
          slidesToShow={3}
          slidesToScroll={1}
          autoplay={false}
          speed={300}
          easing="ease-in-out"
          infinite={true}
          responsive={[
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                speed: 300,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 300,
              },
            },
          ]}
          className="safety-carousel"
        >
          {safetyData.map((item) => (
            <div key={item.id} className="px-3 py-2">
              <Card
                className={`h-[400px] shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${getSeverityBorder(
                  item.severity
                )} rounded-xl overflow-hidden group hover:-translate-y-2 hover:z-10 relative`}
                styles={{ body: { padding: 0, height: "100%" } }}
              >
                <div className="h-full flex flex-col">
                  {/* Header with gradient background */}
                  <div
                    className={`bg-gradient-to-r ${getSeverityColor(
                      item.severity
                    )} p-4 text-white relative overflow-hidden`}
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-white/90">{item.icon}</div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityBadge(
                            item.severity
                          )}`}
                        >
                          {item.severity.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 flex flex-col">
                    <p className="text-[#374151] text-sm leading-relaxed mb-3 flex-1">
                      {item.description}
                    </p>

                    <div className="border-t border-gray-100 pt-3 mt-auto">
                      <p className="text-[#6B7280] text-xs leading-relaxed mb-3">
                        {item.details}
                      </p>

                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-[#2563EB] hover:text-blue-700 text-xs font-medium transition-colors duration-200"
                      >
                        <span className="mr-1">Learn more</span>
                        <svg
                          className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </Carousel>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .safety-carousel .slick-dots {
          bottom: -40px;
        }

        .safety-carousel .slick-dots li button {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #f1f5f9;
          border: 2px solid #e2e8f0;
        }

        .safety-carousel .slick-dots li.slick-active button {
          background: #2563EB;
          border-color: #2563EB;
        }

        .safety-carousel .slick-track {
          display: flex;
          align-items: stretch;
          padding: 8px 0;
        }

        .safety-carousel .slick-slide > div {
          height: 100%;
        }

        .safety-carousel .slick-slide {
          overflow: visible;
        }

        .safety-carousel {
          overflow: visible;
        }
        `,
        }}
      />
    </div>
  );
}

export default SafetyEvaluation;
