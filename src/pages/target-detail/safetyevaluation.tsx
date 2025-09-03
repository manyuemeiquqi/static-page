import { Carousel, Card } from "antd";
import {
  LeftOutlined,
  RightOutlined,
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
  links: Array<{
    text: string;
    url: string;
  }>;
  icon: React.ReactNode;
}

function SafetyEvaluation() {
  const carouselRef = useRef<CarouselRef>(null);

  const safetyData: SafetyItem[] = [
    {
      id: 1,
      title: "Basic Information Database",
      links: [
        {
          text: "Target overall (sources: NCBI)",
          url: "https://www.ncbi.nlm.nih.gov/gene?Db=gene&Cmd=DetailsSearch&Term=142",
        },
        {
          text: "Target description (sources: OpenTarget)",
          url: "https://platform.opentargets.org/target/ENSG00000143799",
        },
        {
          text: "Gene symbol (sources: ensemble)",
          url: "https://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=ENSG00000143799;r=1:226360210-226408154",
        },
        {
          text: "Protein (sources: uniport)",
          url: "https://www.uniprot.org/uniprotkb/P09874/entry",
        },
      ],
      icon: <ExperimentOutlined className="text-2xl" />,
    },
    {
      id: 2,
      title: "Gene Function and Carcinogenetic",
      links: [
        {
          text: "Abbvie published data",
          url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9887474/",
        },
        {
          text: "Human Genetics (sources: OMIM)",
          url: "https://omim.org/entry/173870",
        },
        {
          text: "Biological pathways and interactions (sources: reactome)",
          url: "https://reactome.org/content/detail/R-HSA-201568",
        },
        { text: "IntOgen", url: "https://www.intogen.org/search?gene=PARP1" },
        { text: "COSMIC", url: "https://cancer.sanger.ac.uk/cosmic" },
      ],
      icon: <SafetyOutlined className="text-2xl" />,
    },
    {
      id: 3,
      title: "Disease and Expression",
      links: [
        {
          text: "Knock-out Mouse phenotypes (mouse genome informatics/MGI)",
          url: "https://www.informatics.jax.org/marker/MGI:1340806",
        },
        {
          text: "Human (sources: HPA)",
          url: "https://www.proteinatlas.org/ENSG00000143799-PARP1/tissue",
        },
        {
          text: "Splice variants (sources: GTEx portal)",
          url: "https://www.gtexportal.org/home/gene/PARP1",
        },
        {
          text: "Tissue expression in preclinical species (sources: EBI)",
          url: "https://www.ebi.ac.uk/gwas/genes/PARP1",
        },
      ],
      icon: <MedicineBoxOutlined className="text-2xl" />,
    },
    {
      id: 4,
      title: "Clinical Trials and FAERS",
      links: [
        {
          text: "Clinical trials.gov",
          url: "https://www.clinicaltrials.gov/search?term=cancer%20PARP&viewType=Table",
        },
        {
          text: "Public Dashboard 1",
          url: "https://www.fda.gov/drugs/fdas-adverse-event-reporting-system-faers/fda-adverse-event-reporting-system-faers-public-dashboard",
        },
        {
          text: "Public Dashboard 2",
          url: "https://fis.fda.gov/sense/app/95239e26-e0be-42d9-a960-9a5f7f1c25ee/sheet/33a0f68e-845c-48e2-bc81-8141c6aaf772/state/analysis",
        },
      ],
      icon: <BugOutlined className="text-2xl" />,
    },
  ];

  return (
    <div className="mt-4 bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#374151] mb-2">
            Safety Evaluation Reference
          </h2>
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
                className={`h-[400px] shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200 rounded-xl overflow-hidden group hover:-translate-y-2 hover:z-10 relative`}
                styles={{ body: { padding: 0, height: "100%" } }}
              >
                <div className="h-full flex flex-col">
                  {/* Header with gradient background */}
                  <div
                    className={`bg-gradient-to-r p-4 bg-blue-500 text-white relative overflow-hidden`}
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-white/90">{item.icon}</div>
                      </div>
                      <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 flex flex-col">
                    <div className="space-y-3 flex-1">
                      {item.links.map((link, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <span className="text-[#374151] text-sm font-medium">
                            {link.text}
                          </span>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#2563EB] hover:text-blue-700 transition-colors duration-200"
                          >
                            <RightOutlined className="text-xs" />
                          </a>
                        </div>
                      ))}
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
