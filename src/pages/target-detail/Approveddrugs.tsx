import { Table } from "antd";

function Approveddrugs() {
  const approvedDrugsData = [
    {
      name: "Olaparib",
      modality: "small molecule",
      novelty: "",
      indication: "Ovarian, breast, prostate, pancreatic cancer",
      url: "https://pubchem.ncbi.nlm.nih.gov/compound/Olaparib#section=2D-Structure",
      positioning:
        "First-in-class PARP inhibitor; broadest label across multiple tumor types",
      owner: "KuDOS Pharmaceuticals (UK) (acquired)",
      mcompany: "AstraZeneca and Merck & Co. (MSD) (co-marketing, U.S.)",
      gsales: "$4 billion(2027)",
    },
    {
      name: "Rucaparib",
      modality: "small molecule",
      novelty: "",
      indication: "Ovarian, prostate cancer",
      url: "https://pubchem.ncbi.nlm.nih.gov/compound/Rucaparib#section=2D-Structure",
      positioning:
        "Second-line maintenance in ovarian cancer; targeted therapy in BRCA-mutated tumors",
      owner: "Clovis Oncology",
      mcompany:
        "Clovis Oncology (filed bankruptcy in 2022); rights sold to Pharma&, Fresenius Kabi in some regions",
      gsales: "$3.6 billion(2032)",
    },
    {
      name: "Niraparib",
      modality: "small molecule",
      novelty: "",
      indication: "Ovarian, fallopian tube, peritoneal cancer",
      url: "https://pubchem.ncbi.nlm.nih.gov/compound/Niraparib#section=2D-Structure",
      positioning: "regardless of BRCA/HRD status",
      owner: "Tesaro (U.S.)",
      mcompany: "GSK (GlaxoSmithKline) — acquired Tesaro in 2019",
      gsales: "$1.5 billion(2027)",
    },
    {
      name: "Talazoparib",
      modality: "small molecule",
      novelty: "",
      indication: "Breast cancer (BRCA+)",
      url: "https://pubchem.ncbi.nlm.nih.gov/compound/Talazoparib#section=2D-Structure",
      positioning:
        "Metastatic breast cancer (BRCA+); first-line or later lines",
      owner: "BioMarin (discovery stage)",
      mcompany: "Pfizer (acquired from Medivation in 2016)",
      gsales: "$929 million(2030)",
    },
    {
      name: "Pamiparib",
      modality: "small molecule",
      novelty: "",
      indication: "Ovarian cancer (China NMPA approved)",
      url: "https://pubchem.ncbi.nlm.nih.gov/compound/Pamiparib#section=2D-Structure",
      positioning:
        "China-focused PARP inhibitor; ovarian cancer maintenance therapy",
      owner: "BeiGene (China)",
      mcompany: "BeiGene (NMPA-approved in China)",
      gsales: "$70 million(2027)",
    },
    {
      name: "Fluzoparib",
      modality: "small molecule",
      novelty: "",
      indication: "Ovarian, breast cancer",
      url: "https://pubchem.ncbi.nlm.nih.gov/compound/Fluzoparib#section=2D-Structure",
      positioning: "China-approved PARP inhibitor; ovarian and breast cancer",
      owner: "Jiangsu Hengrui Pharma (China)",
      mcompany: "Hengrui (marketed in China)",
      gsales: "$150–250 million(2027)",
    },
    {
      name: "Senaparib",
      modality: "small molecule",
      novelty: "",
      indication: "Ovarian, fallopian tube or primary peritoneal cancer",
      url: "https://pubchem.ncbi.nlm.nih.gov/compound/Senaparib#section=2D-Structure",
      positioning: "China-approved PARP inhibitor; ovarian cancer",
      owner: "IMPACT Therapeutics(China)",
      mcompany:
        "Hangzhou Zhongmei Huadong Pharmaceutical Co., Ltd(marketed in China)",
      gsales: "",
    },
  ];

  return (
    <div className="shadow-card mt-4">
      <div className="flex justify-between items-center mb-4">
        <div className="card-title">
          Competitive Landscape - Approved drugs(information)
        </div>
      </div>

        <Table
          pagination={false}
          scroll={{ x: 1400, y: 400 }}
          columns={[
            {
              title: "Drug Name",
              render: (_, record) => (
                <div className="flex flex-col gap-1">
                  <a
                    href={record.url}
                    target="_blank"
                    className="text-primary font-bold text-[15px]"
                  >
                    {record.name}
                  </a>
                </div>
              ),
              width: 100,
            },
            {
              title: "Approved Indications",
              render: (_, record) => (
                <div className="flex flex-col gap-1">
                  <div className="font-medium text-[15px] text-[#6B7280]">
                    {record.indication}
                  </div>
                </div>
              ),
              width: 150,
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
              width: 100,
            },
            {
              title: "Strategic Positioning",
              dataIndex: "positioning",
              render: (_, record) => (
                <div className="flex flex-col gap-1">
                  <div className="text-[#6B7280] font-medium text-[15px]">
                    {record.positioning}
                  </div>
                </div>
              ),
              width: 150,
            },
            {
              title: "global sales (estimated)",
              dataIndex: "sale",
              render: (_, record) => (
                <div className="flex flex-col gap-1">
                  <div className="text-[#6B7280] font-medium text-[15px]">
                    {record.gsales}
                  </div>
                </div>
              ),
              width: 150,
            },
            {
              title: "Original Developer / Owner",
              dataIndex: "ower",
              render: (_, record) => (
                <div className="flex flex-col gap-1">
                  <div className="text-[#6B7280] font-medium text-[15px]">
                    {record.owner}
                  </div>
                </div>
              ),
              width: 180,
            },
            {
              title: "Current Marketing Company",
              dataIndex: "mcompany",
              render: (_, record) => (
                <div className="flex flex-col gap-1">
                  <div className="text-[#6B7280] font-medium text-[15px]">
                    {record.mcompany}
                  </div>
                </div>
              ),
              width: 200,
            },
          ]}
          dataSource={approvedDrugsData}
        />
    </div>
  );
}

export default Approveddrugs;
