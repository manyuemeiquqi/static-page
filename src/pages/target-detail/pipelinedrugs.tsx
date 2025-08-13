import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { Table, Button, Space, Modal } from "antd";
import { BarChartOutlined, TableOutlined } from "@ant-design/icons";

function PipelineDrugs() {
  const pdrugsChartRef = useRef<SVGSVGElement>(null);
  const [viewMode, setViewMode] = useState<"table" | "chart">("table");
  const [chartType, setChartType] = useState<"stage" | "company">("stage");

  interface DrugData {
    name: string;
    company: string;
    stage: string;
    modality: string;
    novelty: string;
    indication: string;
  }

  const [selectedDrug, setSelectedDrug] = useState<DrugData | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [clickedCard, setClickedCard] = useState<string | null>(null);

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

  // 处理数据，按研发阶段分组
  const stageData = useMemo(() => {
    const stageMap = new Map();

    pdrugsData.forEach((drug: DrugData) => {
      const stage = drug.stage;
      if (!stageMap.has(stage)) {
        stageMap.set(stage, {
          stage,
          count: 0,
          drugs: [],
        });
      }
      const stageInfo = stageMap.get(stage);
      stageInfo.count += 1;
      stageInfo.drugs.push(drug);
    });

    return Array.from(stageMap.values()).sort((a: any, b: any) => {
      const stageOrder: { [key: string]: number } = {
        Preclinical: 1,
        "Phase I": 2,
        "Phase I/II": 3,
        "Phase II": 4,
        "Phase I/III": 5,
        "Phase III": 6,
        "Early clinical": 7,
      };
      return (stageOrder[a.stage] || 999) - (stageOrder[b.stage] || 999);
    });
  }, [pdrugsData]);

  // 处理数据，按公司分组
  const companyData = useMemo(() => {
    const companyMap = new Map();

    pdrugsData.forEach((drug: DrugData) => {
      const company = drug.company;
      if (!companyMap.has(company)) {
        companyMap.set(company, {
          company,
          count: 0,
          drugs: [],
        });
      }
      const companyInfo = companyMap.get(company);
      companyInfo.count += 1;
      companyInfo.drugs.push(drug);
    });

    return Array.from(companyMap.values()).sort(
      (a: any, b: any) => b.count - a.count
    );
  }, [pdrugsData]);

  // 根据图表类型获取当前数据
  const currentData = chartType === "stage" ? stageData : companyData;

  // 当视图模式或图表类型改变时清理选中状态
  useEffect(() => {
    setSelectedDrug(null);
    setIsModalVisible(false);
    setClickedCard(null);
  }, [viewMode, chartType]);

  // 处理卡片点击
  const handleCardClick = (drug: DrugData) => {
    setSelectedDrug(drug);
    setIsModalVisible(true);
  };

  // 关闭模态框
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedDrug(null);
  };

  useEffect(() => {
    if (!pdrugsChartRef.current || viewMode !== "chart") return;

    // 清除之前的图表
    d3.select(pdrugsChartRef.current).selectAll("*").remove();

    const svg = d3.select(pdrugsChartRef.current);
    const width = 800; // 从900减少到800
    const height = 400; // 从450减少到400
    const margin = { top: 8, right: 20, bottom: 8, left: 100 }; // 调整margin，top从10减少到8，left从120减少到100

    svg.attr("width", width).attr("height", height);

    // 创建阶段颜色映射 - 与项目整体配色相似
    const stageColors: { [key: string]: string } = {
      Preclinical: "#8B5CF6", // 紫色
      "Phase I": "#EC4899", // 粉色
      "Phase I/II": "#3B82F6", // 蓝色
      "Phase II": "#10B981", // 绿色
      "Phase I/III": "#F59E0B", // 橙色
      "Phase III": "#6B7280", // 灰色
      "Early clinical": "#06B6D4", // 青色
    };

    // 创建公司颜色映射
    const companyColors: { [key: string]: string } = {
      AstraZeneca: "#3B82F6",
      "Hengrui → Merck": "#10B981",
      "Nerviano → Merck (option)": "#F59E0B",
      "Impact / Eikon": "#EF4444",
      "Impact Therapeutics": "#8B5CF6",
      "Acerand Therapeutics": "#06B6D4",
      "Allarity Therapeutics / Eisai": "#84CC16",
      AbbVie: "#EC4899",
      Teva: "#F97316",
      Eisai: "#6366F1",
      "Jiangsu Hengrui": "#14B8A6",
    };

    // 根据图表类型选择颜色映射和渲染方式
    const colorMapping = chartType === "stage" ? stageColors : companyColors;
    const groupKey = chartType === "stage" ? "stage" : "company";

    if (chartType === "stage") {
      // 甘特图渲染逻辑 - 横坐标为stage，纵坐标为药物名称
      const ganttG = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // 定义阶段顺序和位置（横坐标）
      const stageOrder = [
        "Preclinical",
        "Phase I",
        "Phase I/II",
        "Phase II",
        "Phase I/III",
        "Phase III",
        "Early clinical",
      ];

      // 获取所有药物名称（纵坐标）
      const allDrugs = pdrugsData.map((drug) => drug.name);

      const stageWidth = 70; // 从100减少到70
      const drugHeight = 28; // 从35减少到28
      const stageSpacing = 10; // 从15减少到10
      const drugSpacing = 3; // 从5减少到3

      // 计算图表尺寸
      const chartWidth = stageOrder.length * (stageWidth + stageSpacing);
      const chartHeight = allDrugs.length * (drugHeight + drugSpacing);

      // 绘制阶段标签（横坐标）- 放在表格顶端
      stageOrder.forEach((stage, stageIndex) => {
        const x = stageIndex * (stageWidth + stageSpacing);

        // 绘制阶段背景
        ganttG
          .append("rect")
          .attr("x", x)
          .attr("y", 0)
          .attr("width", stageWidth)
          .attr("height", 20) // 从25减少到20
          .attr("fill", colorMapping[stage])
          .attr("stroke", "white")
          .attr("stroke-width", 1)
          .attr("rx", 4);

        // 绘制阶段标签
        ganttG
          .append("text")
          .attr("x", x + stageWidth / 2)
          .attr("y", 10) // 从12减少到10
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "middle")
          .style("font-size", "10px") // 从11px减少到10px
          .style("font-weight", "600")
          .style("fill", "white")
          .text(stage);
      });

      // 添加阶段行标题
      ganttG
        .append("text")
        .attr("x", -10)
        .attr("y", 10) // 从12减少到10
        .attr("text-anchor", "end")
        .attr("dominant-baseline", "middle")
        .style("font-size", "10px") // 从11px减少到10px
        .style("font-weight", "600")
        .style("fill", "#374151")
        .text("Stage:");

      // 绘制药物名称标签（纵坐标）- 只保留药品名称
      allDrugs.forEach((drugName, drugIndex) => {
        const y = drugIndex * (drugHeight + drugSpacing) + 25; // 从30减少到25

        // 药物名称标签
        ganttG
          .append("text")
          .attr("x", -10)
          .attr("y", y + drugHeight / 2)
          .attr("text-anchor", "end")
          .attr("dominant-baseline", "middle")
          .style("font-size", "11px") // 从12px减少到11px
          .style("font-weight", "600")
          .style("fill", "#374151")
          .text(drugName);
      });

      // 绘制药物在对应阶段的条形
      pdrugsData.forEach((drug) => {
        const drugIndex = allDrugs.indexOf(drug.name);
        const stageIndex = stageOrder.indexOf(drug.stage);

        if (drugIndex !== -1 && stageIndex !== -1) {
          const x = stageIndex * (stageWidth + stageSpacing);
          const y = drugIndex * (drugHeight + drugSpacing) + 25; // 从30减少到25

          // 绘制药物条形
          const drugBar = ganttG
            .append("g")
            .attr("class", "drug-bar")
            .style("cursor", "pointer")
            .on("click", () => handleCardClick(drug));

          drugBar
            .append("rect")
            .attr("x", x + 2) // 从3减少到2
            .attr("y", y + 2) // 从3减少到2
            .attr("width", stageWidth - 4) // 从6减少到4
            .attr("height", drugHeight - 4) // 从6减少到4
            .attr("fill", colorMapping[drug.stage])
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .attr("rx", 3) // 从4减少到3
            .style("transition", "all 0.3s ease");

          // 药物名称（在条形内）- 文字居中
          drugBar
            .append("text")
            .attr("x", x + stageWidth / 2)
            .attr("y", y + drugHeight / 2)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .style("font-size", "9px") // 从11px减少到9px
            .style("font-weight", "600")
            .style("fill", "white")
            .style("pointer-events", "none")
            .text(drug.name);

          // 添加公司信息提示
          drugBar
            .append("title")
            .text(
              `${drug.name}\nCompany: ${drug.company}\nIndication: ${drug.indication}`
            );
        }
      });

      // 绘制网格线
      // 垂直网格线（阶段分隔）
      stageOrder.forEach((_, stageIndex) => {
        const x = stageIndex * (stageWidth + stageSpacing) + stageWidth;
        ganttG
          .append("line")
          .attr("x1", x)
          .attr("y1", 0)
          .attr("x2", x)
          .attr("y2", chartHeight + 25) // 从30减少到25
          .attr("stroke", "#E2E8F0")
          .attr("stroke-width", "1")
          .attr("stroke-dasharray", "2,2");
      });

      // 水平网格线（药物分隔）
      allDrugs.forEach((_, drugIndex) => {
        const y = drugIndex * (drugHeight + drugSpacing) + drugHeight + 25; // 从30减少到25
        ganttG
          .append("line")
          .attr("x1", -10)
          .attr("y1", y)
          .attr("x2", chartWidth)
          .attr("y2", y)
          .attr("stroke", "#F1F5F9")
          .attr("stroke-width", "1");
      });
    } else {
      // 原有的树状图渲染逻辑（按公司分组）
      // 准备树状图数据
      const hierarchyData = {
        name: "Pipeline Drugs",
        children: currentData.map((group: any) => ({
          name: group[groupKey],
          children: group.drugs.map((drug: DrugData) => ({
            name: drug.name,
            company: drug.company,
            stage: drug.stage,
            indication: drug.indication,
            novelty: drug.novelty,
            modality: drug.modality,
            value: 1,
          })),
        })),
      };

      // 创建层次结构
      const root = d3
        .hierarchy(hierarchyData)
        .sum((d: any) => d.value || 0)
        .sort((a, b) => (b.value || 0) - (a.value || 0));

      // 创建树状图布局
      const treemap = d3
        .treemap<any>()
        .size([
          width - margin.left - margin.right,
          height - margin.top - margin.bottom,
        ])
        .padding(2)
        .round(true);

      treemap(root);

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // 创建叶子节点（药物）
      const leaf = g
        .selectAll(".leaf")
        .data(root.leaves())
        .enter()
        .append("g")
        .attr("class", "leaf")
        .attr("transform", (d: any) => `translate(${d.x0},${d.y0})`);

      // 添加矩形
      leaf
        .append("rect")
        .attr("width", (d: any) => d.x1 - d.x0)
        .attr("height", (d: any) => d.y1 - d.y0)
        .attr("fill", (d: any) => colorMapping[d.data[groupKey]] || "#E2E8F0")
        .attr("stroke", "white")
        .attr("stroke-width", 1)
        .attr("rx", 3)
        .style("cursor", "pointer")
        .style("transition", "all 0.2s ease");

      // 为整个叶子节点组添加点击事件处理
      leaf
        .on("click", function (event, d: any) {
          const drugName = d.data.name;

          // 如果点击的是已经放大的卡片，则恢复原状并打开模态框
          if (clickedCard === drugName) {
            setClickedCard(null);
            handleCardClick(d.data);
            return;
          }

          // 重置所有卡片的缩放
          leaf.attr(
            "transform",
            (d: any) => `translate(${d.x0},${d.y0}) scale(1)`
          );

          // 设置当前点击的卡片
          setClickedCard(drugName);

          // 放大当前点击的卡片 - 应用到整个组而不是矩形
          d3.select(this)
            .transition()
            .duration(200)
            .attr("transform", `translate(${d.x0},${d.y0}) scale(1.1)`);
        })
        .style("cursor", "pointer");

      // 添加分组标签（阶段或公司）
      leaf
        .append("text")
        .attr("x", 4)
        .attr("y", 14)
        .style("font-size", "10px")
        .style("font-weight", "bold")
        .style("fill", "#2D3748")
        .style("pointer-events", "none")
        .text((d: any) => {
          const text = d.data[groupKey];
          return text.length > 12 ? text.substring(0, 12) + "..." : text;
        });

      // 添加公司名称
      leaf
        .append("text")
        .attr("x", 4)
        .attr("y", 28)
        .style("font-size", "9px")
        .style("fill", "#4A5568")
        .style("pointer-events", "none")
        .text((d: any) => {
          const company = d.data.company;
          return company.length > 15
            ? company.substring(0, 15) + "..."
            : company;
        });

      // 添加药物名称
      leaf
        .append("text")
        .attr("x", 4)
        .attr("y", 42)
        .style("font-size", "8px")
        .style("font-weight", "600")
        .style("fill", "#1A202C")
        .style("pointer-events", "none")
        .text((d: any) => {
          const name = d.data.name;
          return name.length > 12 ? name.substring(0, 12) + "..." : name;
        });
    }

    // 移除图例，简化图表

    // 清理函数
    return () => {
      setClickedCard(null);
    };
  }, [currentData, viewMode, chartType, clickedCard]);

  return (
    <div className="shadow-card mt-4">
      <div className="flex justify-between items-center mb-4">
        <div className="card-title">
          Competitive Landscape - Pipeline Drugs(information)
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
          {viewMode === "chart" && (
            <Space.Compact size="small">
              <Button
                type={chartType === "stage" ? "primary" : "default"}
                onClick={() => setChartType("stage")}
              >
                By Stage
              </Button>
              <Button
                type={chartType === "company" ? "primary" : "default"}
                onClick={() => setChartType("company")}
              >
                By Company
              </Button>
            </Space.Compact>
          )}
        </Space>
      </div>

      {viewMode === "table" ? (
        <div>
          <Table
            pagination={false}
            scroll={{ x: 1400, y: 400 }}
            columns={[
              {
                title: "Drug Name",
                render: (_, record) => (
                  <div className="flex flex-col gap-1">
                    <div
                      className={`font-bold text-[15px] ${
                        record.name.includes("(failed)")
                          ? "text-gray-600"
                          : "text-green-600"
                      }`}
                    >
                      {record.name}
                    </div>
                  </div>
                ),
                width: 80,
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
                width: 100,
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
                width: 60,
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
                      className={`app-tag !px-2 !py-1 ${getModalityColor(
                        text
                      )}`}
                    >
                      {text}
                    </div>
                  );
                },
                width: 80,
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
        </div>
      ) : (
        <div
          className="bg-white rounded-lg p-4 flex justify-center"
          style={{ height: "420px" }} // 从480px减少到420px
        >
          <svg
            ref={pdrugsChartRef}
            width="800" // 从900减少到800
            height="400" // 从450减少到400
            viewBox="0 0 800 400" // 从900 450减少到800 400
          />
        </div>
      )}

      <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-[18px] font-semibold text-[#374151] mb-4">
          Conclusions
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Key Players Section */}
          <div className="space-y-3">
            <h4 className="text-[16px] font-semibold text-[#1F2937] flex items-center gap-2">
              <span className="text-[#3B82F6]">🎯</span>
              Key Players/Companies
            </h4>
            <div className="space-y-2 text-[14px] text-[#4B5563] leading-relaxed">
              <p>
                • <strong>AstraZeneca & Merck & Co. (MSD):</strong> Leading the
                PARP inhibitor market with multiple approved drugs and advanced
                pipeline candidates
              </p>
              <p>
                • <strong>GlaxoSmithKline (GSK):</strong> Established presence
                with niraparib across multiple cancer types
              </p>
              <p>
                • <strong>Pfizer:</strong> Strong position with talazoparib,
                particularly in breast cancer
              </p>
            </div>
          </div>

          {/* Emerging Players Section */}
          <div className="space-y-3">
            <h4 className="text-[16px] font-semibold text-[#1F2937] flex items-center gap-2">
              <span className="text-[#8B5CF6]">🔬</span>
              Emerging Players (Pipeline)
            </h4>
            <div className="space-y-2 text-[14px] text-[#4B5563] leading-relaxed">
              <p>
                • <strong>Impact Therapeutics:</strong> Developing novel PARP
                inhibitors with unique chemical scaffolds
              </p>
              <p>
                • <strong>Allarity Therapeutics / Eisai:</strong> Advancing
                dual-target inhibitors for broader therapeutic applications
              </p>
              <p>
                • <strong>Acerand Therapeutics:</strong> Exploring novel
                indications beyond traditional cancer types
              </p>
            </div>
          </div>

          {/* China-Focused Players Section */}
          <div className="space-y-3">
            <h4 className="text-[16px] font-semibold text-[#1F2937] flex items-center gap-2">
              <span className="text-[#10B981]">🌏</span>
              China-Focused Players
            </h4>
            <div className="space-y-2 text-[14px] text-[#4B5563] leading-relaxed">
              <p>
                • <strong>BeiGene:</strong> Developing pamiparib with regional
                cost-effective strategies
              </p>
              <p>
                • <strong>Jiangsu Hengrui Pharma:</strong> Advancing fluzoparib
                and HRS-1167 with strong IP protection
              </p>
            </div>
          </div>

          {/* Mechanism Diversity Section */}
          <div className="space-y-3">
            <h4 className="text-[16px] font-semibold text-[#1F2937] flex items-center gap-2">
              <span className="text-[#F59E0B]">⚡</span>
              Mechanism Diversity
            </h4>
            <div className="space-y-2 text-[14px] text-[#4B5563] leading-relaxed">
              <p>
                • <strong>PARP1-Selective Inhibitors:</strong> Next-generation
                agents like AZD5305 and HRS-1167 offering improved selectivity
              </p>
              <p>
                • <strong>Dual-Target Inhibitors:</strong> Stenoparib combining
                PARP inhibition with other mechanisms
              </p>
              <p>
                • <strong>Brain-Penetrant Inhibitors:</strong> NMS-293
                addressing central nervous system malignancies
              </p>
              <p>
                • <strong>Biomarker-Agnostic Approaches:</strong> Expanding
                patient populations beyond BRCA mutations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PipelineDrugs;
