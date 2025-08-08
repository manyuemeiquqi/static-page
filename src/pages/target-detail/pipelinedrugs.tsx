import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { Table, Button, Space } from "antd";
import { BarChartOutlined, TableOutlined } from "@ant-design/icons";

function PipelineDrugs() {
  const pdrugsChartRef = useRef<SVGSVGElement>(null);
  const [viewMode, setViewMode] = useState<"table" | "chart">("table");

  const pdrugsData = [
    {
      name: "AZD5305",
      company: "AstraZeneca",
      stage: "Phase III",
      modality: "small molecule",
      novelty: "PARP1-selective, new chemical series (strong IP)",
      indication:
        "Ovarian cancer, prostate cancer, breast cancer, pancreatic ductal adenocarcinoma",
    },
    {
      name: "Saruparib",
      company: "AstraZeneca",
      stage: "Phase I/III",
      modality: "small molecule",
      novelty: "IP on safety/efficacy in HRD cancers",
      indication:
        "Ovarian cancer, prostate cancer, breast cancer, pancreatic ductal adenocarcinoma",
    },
    {
      name: "HRS‑1167",
      company: "Hengrui → Merck",
      stage: "Phase I",
      modality: "small molecule",
      novelty: "New PARP1-specific scaffold, ex-China license",
      indication: "Ovarian cancer, advanced gastric cancer, lung cancer",
    },
    {
      name: "NMS‑293",
      company: "Nerviano → Merck (option)",
      stage: "Preclinical",
      modality: "small molecule",
      novelty: "Brain-penetrant inhibitor, novel chemistry",
      indication: "Glioblastoma, lung cancer, lymphoma",
    },
    {
      name: "IMP1734",
      company: "Impact / Eikon",
      stage: "Phase I",
      modality: "small molecule",
      novelty: "Licensed for global co-dev, likely new patent",
      indication:
        "Triple negative breast cancer, prostate cancer, ovarian clear cell carcinoma",
    },
    {
      name: "Senaparib",
      company: "Impact Therapeutics",
      stage: "Preclinical",
      modality: "small molecule",
      novelty: "New compound, patented preclinical inhibitor",
      indication: "Triple negative breast cancer, glioma, Ewing's sarcoma",
    },
    {
      name: "ACE‑86225106",
      company: "Acerand Therapeutics",
      stage: "Phase I/II",
      modality: "small molecule",
      novelty: "Unique novel scaffold; likely IP filings",
      indication:
        "Fallopian tube cancer, primary peritoneal cancer, bile duct cancer, urothelial carcinoma",
    },
    {
      name: "Stenoparib",
      company: "Allarity Therapeutics / Eisai",
      stage: "Early clinical",
      modality: "small molecule",
      novelty: "Dual-target inhibitor; second-gen claims possible",
      indication: "Colorectal cancer, ovarian cancer, malignant mesothelioma",
    },
    {
      name: "veliparib(failed)",
      company: "AbbVie",
      stage: "Phase III",
      modality: "small molecule",
      novelty:
        "Dual PARP1/2 inhibition; weaker trapping activity; key patents now near expiry",
      indication: "Ovarian, TNBC, NSCLC",
    },
    {
      name: "CEP-9722",
      company: "Teva",
      stage: "Phase I",
      modality: "small molecule",
      novelty:
        "Oral pro-drug of CEP-8983; improved PK and tumor penetration; composition-of-matter patents",
      indication: "NSCLC, various solid tumors",
    },
    {
      name: "E7016",
      company: "Eisai",
      stage: "Phase II",
      modality: "small molecule",
      novelty:
        "Indole-based dual PARP/Tankyrase inhibitor; novel brain-penetrant chemistry",
      indication: "Melanoma",
    },
    {
      name: "Fuzuloparib",
      company: "Jiangsu Hengrui",
      stage: "Phase III",
      modality: "small molecule",
      novelty:
        "Pyrazole-derived scaffold; Chinese IP; combination use patents with immuno-oncology agents",
      indication: "Ovarian, breast, prostate",
    },
  ];

  return (
    <div className="shadow-card mt-4">
      <div className="flex justify-between items-center mb-4">
        <div className="card-title">
          Competitive Landscape - Pipline Drugs(information)
        </div>
        <Space>
          <Button
            type={viewMode === "table" ? "primary" : "default"}
            icon={<TableOutlined />}
            onClick={() => setViewMode("table")}
            size="small"
          >
            Table
          </Button>
          <Button
            type={viewMode === "chart" ? "primary" : "default"}
            icon={<BarChartOutlined />}
            onClick={() => setViewMode("chart")}
            size="small"
          >
            Chart
          </Button>
        </Space>
      </div>

      {viewMode === "table" ? (
        <Table
          pagination={false}
          scroll={{ x: 1400, y: 400 }}
          columns={[
            {
              title: "Drug Name",
              render: (_, record) => (
                <div className="flex flex-col gap-1">
                  <div className="text-primary font-bold text-[15px]">
                    {record.name}
                  </div>
                </div>
              ),
              width: 100,
            },
            {
              title: "Company",
              render: (_, record) => (
                <div className="flex flex-col gap-1">
                  <div className="font-medium text-[15px] text-[#6B7280]">
                    {record.company}
                  </div>
                </div>
              ),
              width: 120,
            },
            {
              title: "Stage",
              render: (_, record) => (
                <div className="flex flex-col gap-1">
                  <div className="font-medium text-[15px] text-[#6B7280]">
                    {record.stage}
                  </div>
                </div>
              ),
              width: 100,
            },
            {
              title: "Modality",
              dataIndex: "modality",
              render: (text) => {
                const getModalityColor = (modality: string) => {
                  switch (modality) {
                    case "mAbs":
                      return "bg-[#e2fbe8] text-[#166534]";
                    case "ADCs":
                    case "ADC":
                      return "bg-[#fef3e2] text-[#D97706]";
                    case "small molecule":
                      return "bg-[#edf5ff] text-[#1E40AF]";
                    default:
                      return "bg-[#f1f2f4] text-[#1F2937]";
                  }
                };

                return (
                  <div
                    className={`app-tag !px-2 !py-1 ${getModalityColor(text)}`}
                  >
                    {text}
                  </div>
                );
              },
              width: 120,
            },
            {
              title: "Novelty / IP Highlights",
              render: (_, record) => (
                <div className="flex flex-col gap-1">
                  <div className="font-medium text-[15px] text-[#6B7280]">
                    {record.novelty}
                  </div>
                </div>
              ),
              width: 120,
            },
            {
              title: "Indication",
              dataIndex: "positioning",
              render: (_, record) => (
                <div className="flex flex-col gap-1">
                  <div className="text-[#6B7280] font-medium text-[15px]">
                    {record.indication}
                  </div>
                </div>
              ),
              width: 120,
            },
          ]}
          dataSource={pdrugsData}
        />
      ) : (
        <div className="bg-white rounded-lg p-4" style={{ height: "450px" }}>
          <svg
            ref={pdrugsChartRef}
            width="100%"
            height="100%"
            viewBox="0 0 500 400"
          />
        </div>
      )}
    </div>
  );
}

export default PipelineDrugs;