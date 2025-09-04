import React from "react";
import { Table } from "antd";
import Mol2D from "./Molecule";

interface PatentData {
  id: string;
  company: string;
  dispalykey: string;

  typical: string;
  redata: string;
  link: string;
}

const PatentTable: React.FC = () => {
  const patentData: PatentData[] = [
    {
      id: "1",
      company: "BROAD INST INC",
      dispalykey: "US 12263159 B2",
      typical: "COC12CC(C(=O)NC3=NC=C(OC4=CN=C(N5CCOCC5)N=C4)S3)(C1)C2",
      redata:
        "The present invention relates to a novel fused ring compound having urea structure that exhibits excellent NAMPT activating effect, and a method using the same for treating/preventing metabolic disorder, cardiovascular and kidney disease, mitochondrial disease, neurodegenerative disease, ocular disease, and muscle wasting disorder.",
      link: "https://patents.google.com/patent/US12263159B2/en?oq=US+12263159+B2",
    },
    {
      id: "2",
      company: "REGLAGENE INC",
      dispalykey: "US 12215102 B2",
      typical: "O=C(NCC1=CC=NC=C1)NC1=CC=C2OC(C3=CC=CC=C3)=NC2=C1",
      redata:
        "The novel compounds, compositions and methods disclosed herein are effective for treating a subject having or suspected of developing a health condition, for example, cancer (i.e. brain cancer or a cancer metastasizing to the brain).",
      link: "https://patents.google.com/patent/US12215102B2/en?oq=US+12215102+B2",
    },
    {
      id: "3",
      company: "BREAKPOINT THERAPEUTICS GMBH",
      dispalykey: "US 12162895 B2",
      typical:
        "COC1=CN=C(Cl)C=C1C1=C(C(=O)NC2=NC3=CN=C(NCC(C)(C)O)N=C3S2)C=NC(C)=C1",
      redata:
        "The compound of the present invention inhibits Polθ. This novel therapeutic compound is therefore useful for the treatment and/or prevention of diseases and conditions in which Polθ activity is implicated, such as, for example but not limited to, the treatment and/or prevention of cancer. ",
      link: "https://patents.google.com/patent/US12162895B2/en?oq=US+12162895+B2",
    },
    {
      id: "4",
      company: "BREAKPOINT THERAPEUTICS GMBH",
      dispalykey: "US 12145945 B2",
      typical:
        "COC1=C(C2=CC(C)=NC=C2C(=O)NC2=NC3=CN=C(N4CCCCC4=O)C=C3S2)C=C(Cl)N=C1",
      redata:
        "The present invention relates to a compound of the Formula:and pharmaceutically salts thereof.The compound of the present invention inhibits Polθ.",
      link: "https://patents.google.com/patent/US12145945B2/en?oq=US+12145945+B2",
    },
    {
      id: "5",
      company: "GILEAD SCIENCES INC",
      dispalykey: "US 2024/0376110 A1",
      typical:
        "NC1=NC2=C(C=C(C(=O)N3CCC[C@@H]4OC5=C(C=CC(C(F)(F)F)=C5)[C@@H]43)C(F)=C2)N2C=NC=C12",
      redata:
        "The present disclosure relates generally to compounds that inhibit PRMT5. The disclosure further relates to the use of the compounds for the preparation of a medicament for the treatment of diseases and/or conditions through inhibiting PRMT5.",
      link: "https://patents.google.com/patent/US20240376110A1/en?oq=US+2024%2f0376110+A1",
    },
    {
      id: "6",
      company: "XINTHERA INC",
      dispalykey: "US 2024/0368162 A1",
      typical: "N#CC1=CN=C(N2CCN(CC3=CN=C4C=C(Cl)C(=O)NC4=C3)CC2)C=C1",
      redata:
        "Described herein are PARP1 inhibitors and pharmaceutical compositions comprising said inhibitors. The subject compounds and compositions are useful for the treatment of cancer.",
      link: "https://patents.google.com/patent/US20240368162A1/en?oq=US+2024%2f0368162+A1",
    },
    {
      id: "7",
      company: "REGLAGENE INC",
      dispalykey: "US 2024/0327398 A1",
      typical: "CCC1OC2=C(C=C(CN3CCN(C4=C(C)N=C(C(=O)NC)C=C4)CC3)C=C2)NC1=O",
      redata:
        "The novel compounds, compositions and methods disclosed herein are effective for treating a subject having or suspected of developing a health condition, for example, cancer (i.e. brain cancer or a cancer metastasizing to the brain).",
      link: "https://patents.google.com/patent/US20240327398A1/en?oq=US+2024%2f0327398+A1",
    },
    {
      id: "8",
      company: "SANFORD BURNHAM PREBYS MEDICAL DISCOVERY INST",
      dispalykey: "US 2024/0285597 A1",
      typical: "O=C1CCC2(CNC2)C(=O)N1",
      redata:
        "The present invention relates to a novel fused ring compound having urea structure that exhibits excellent NAMPT activating effect, and a method using the same for treating/preventing metabolic disorder, cardiovascular and kidney disease, mitochondrial disease, neurodegenerative disease, ocular disease, and muscle wasting disorder.",
      link: "https://patents.google.com/patent/US20240285597A1/en?oq=US+2024%2f0285597+A1",
    },
    {
      id: "9",
      company: "SLAP PHARMACEUTICALS LLC",
      dispalykey: "US 2024/0279213 A1",
      typical: "CC(C)C1=CC=C(NCC2=COC=C2)C(C2CCCCC2)=C1",
      redata:
        "Provided herein are compounds of Formula (I), or pharmaceutically acceptable salts thereof, pharmaceutical compositions that include a compound described herein (including pharmaceutically acceptable salts of a compound described herein) and methods of synthesizing the same.",
      link: "https://patents.google.com/patent/US20240279213A1/en?oq=US+2024%2f0279213+A1",
    },
    {
      id: "10",
      company: "SLAP PHARMACEUTICALS LLC",
      dispalykey: "US 12054479 B1",
      typical: "CC1=CC=CC2=C1N=C(CSC1=NC=CC=N1)NC2=O",
      redata:
        "Provided herein are compounds of Formula (I), or pharmaceutically acceptable salts thereof, pharmaceutical compositions that include a compound described herein (including pharmaceutically acceptable salts of a compound described herein) and methods of synthesizing the same. ",
      link: "https://patents.google.com/patent/US12054479B1/en?oq=US+12054479+B1",
    },
  ];

  const columns = [
    {
      title: "Patent Number",
      render: (_: any, record: PatentData) => (
        <div className="flex flex-col gap-1 h-32 justify-center">
          <div className="font-bold text-[15px] text-[#2563eb] break-words">
            <a href={record.link} target="_blank" rel="noopener noreferrer">
              {record.dispalykey}
            </a>
          </div>
        </div>
      ),
      width: 40,
      fixed: "left" as const,
    },
    {
      title: "Company",
      render: (_: any, record: PatentData) => (
        <div className="flex flex-col gap-1 h-32 justify-center">
          <div className="font-medium text-[15px] text-[#374151] leading-tight break-words">
            {record.company}
          </div>
        </div>
      ),
      width: 80,
    },
    {
      title: "Typical Compounds",
      render: (_: any, record: PatentData) => (
        <div className="flex flex-col gap-1 h-32 justify-center items-center">
          {record.typical && (
            <div className="flex justify-center">
              <Mol2D
                smiles={record.typical}
                width={250}
                height={120}
                className=""
              />
            </div>
          )}
        </div>
      ),
      width: 90,
    },
    {
      title: "Related Data",
      render: (_: any, record: PatentData) => (
        <div className="flex flex-col gap-2 h-32 justify-center items-center">
          <div className="text-[14px] text-[#1e1e1e] line-clamp-6 overflow-hidden">
            {record.redata}
          </div>
        </div>
      ),
      width: 120,
    },
  ];

  return (
    <div className="shadow-card mb-4">
      <div className="card-title mb-6">Patent Applications Table</div>
      <Table
        pagination={false}
        scroll={{ x: 1200, y: 600 }}
        columns={columns}
        dataSource={patentData}
        rowKey="id"
        className="patent-table"
        size="middle"
        bordered
      />
    </div>
  );
};

export default PatentTable;
