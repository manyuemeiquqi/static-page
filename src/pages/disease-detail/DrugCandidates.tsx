import { Table, Button, Space } from "antd";
import { BarChartOutlined, TableOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";

function DrugCandidates() {
  const [viewMode, setViewMode] = useState<"table" | "chart">("table");
  const pieChartRef = useRef<SVGSVGElement>(null);

  const clinicalTrialsData = [
    {
      trial: "Preclinical",
      company: "University of Milan",
      modality: "Nanoparticles / Nanocarriers",
      id: "N/A",
      target: "",
      ref: "https://arxiv.org/abs/1911.05378?utm_source=chatgpt.com",
    },
    {
      trial: "Preclinical",
      company: "Stanford University School of Medicine",
      modality: "Combination therapy",
      id: "N/A",
      target: "",
      ref: "https://arxiv.org/abs/0808.2070?utm_source=chatgpt.com",
    },
    {
      trial: "Phase I",
      company: "Lyell Immunopharma, Inc",
      modality: "CAR-T Cell Therapies",
      id: "NCT05274451",
      target: "ROR1",
      ref: "https://clinicaltrials.gov/study/NCT05274451",
    },
    {
      trial: "Phase I",
      company: "Washington University School of Medicine",
      modality: "DNA / Gene Therapies",
      id: "NCT02348320",
      target: "",
      ref: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9947792/#:~:text=The clinical trial%2C identified as,being evaluated in the trial.",
    },
    {
      trial: "Phase I",
      company: "MERIT Consortium",
      modality: "mRNA",
      id: "NCT02316457",
      target: "",
      ref: "https://cdek.pharmacy.purdue.edu/trial/NCT02316457/",
    },
    {
      trial: "Phase I/II",
      company: "Moderna",
      modality: "mRNA",
      id: "mRNA-4359-P101",
      target: "IDO1, PD‑L1",
      ref: "https://trials.modernatx.com/study/?id=mRNA-4359-P101",
    },
    {
      trial: "Phase II",
      company: "BioNTech SE",
      modality: "Bispecific Antibodies",
      id: "BNT327-02",
      target: "PD‑L1, VEGF‑A",
      ref: "https://clinicaltrials.biontech.com/trials/BNT327-02",
    },
    {
      trial: "Phase II",
      company: "MedSIR/Roche",
      modality: "Combination therapy",
      id: "NCT04408118",
      target: "PD-L1, VEGF-A",
      ref: "https://aacrjournals.org/cancerres/article/84/9_Supplement/PS16-02/743813/Abstract-PS16-02-Efficacy-and-safety-of-first-line",
    },
    {
      trial: "Phase II",
      company: "Gilead Sciences/Merck",
      modality: "ADCs",
      id: "NCT04230109",
      target: "",
      ref: "https://www.cancernetwork.com/view/sacituzumab-govitecan-combo-shows-pathologic-responses-in-early-stage-tnbc",
    },
    {
      trial: "Phase III",
      company: "Gilead Sciences/Merck",
      modality: "ADCs",
      id: "ASCENT-05",
      target: "Trop‑2",
      ref: "https://www.breastcancer.org/treatment/clinical-trials/triple-negative-breast-cancer",
    },
    {
      trial: "Phase III",
      company: "Gilead Sciences",
      modality: "ADCs",
      id: "NCT02574455",
      target: "Trop‑2",
      ref: "https://www.mycancergenome.org/content/clinical_trials/NCT02574455/#:~:text=Table_title:%20Details%20Table_content:%20header:%20%7C%20Phase:%20%7C,Sponsor:%20%7C%20Phase%203:%20Immunomedics%2C%20Inc.%20%7C",
    },
    {
      trial: "Phase III",
      company: "Hoffmann-La Roche",
      modality: "mAbs",
      id: "NCT02425891",
      target: "PD-L1",
      ref: "https://www.mycancergenome.org/content/clinical_trials/NCT02425891/",
    },
  ];

  // 统计模态数据
  const modalityData = useMemo(() => {
    const modalityCount = clinicalTrialsData.reduce((acc, item) => {
      // 合并相关的纳米载体类型
      let modality = item.modality;
      if (
        modality.includes("Nanocarriers") ||
        modality.includes("Nanoparticles")
      ) {
        modality = "Nano carriers";
      }

      acc[modality] = (acc[modality] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const colors = [
      "#EF4444", // 红色
      "#3B82F6", // 蓝色
      "#10B981", // 绿色
      "#F59E0B", // 橙色
      "#8B5CF6", // 紫色
      "#EC4899", // 粉色
    ];

    return Object.entries(modalityCount)
      .map(([modality, count], index) => ({
        modality,
        count,
        percentage: ((count / clinicalTrialsData.length) * 100).toFixed(1),
        color: colors[index % colors.length],
      }))
      .sort((a, b) => b.count - a.count);
  }, [clinicalTrialsData]);

  useEffect(() => {
    if (!pieChartRef.current || viewMode !== "chart") return;

    // 清除之前的图表
    d3.select(pieChartRef.current).selectAll("*").remove();

    const svg = d3.select(pieChartRef.current);
    const width = 500;
    const height = 400;
    const margin = 20;
    const radius = Math.min(width - margin * 4, height - margin * 2) / 2 - 40;

    // 添加定义区域用于阴影效果
    const defs = svg.append("defs");

    // 创建阴影滤镜
    const filter = defs
      .append("filter")
      .attr("id", "dropshadow")
      .attr("x", "-50%")
      .attr("y", "-50%")
      .attr("width", "200%")
      .attr("height", "200%");

    filter
      .append("feDropShadow")
      .attr("dx", 2)
      .attr("dy", 2)
      .attr("stdDeviation", 3)
      .attr("flood-color", "#00000020");

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2 - 80}, ${height / 2})`);

    // 创建饼图生成器
    const pie = d3
      .pie<any>()
      .value((d: any) => d.count)
      .sort(null)
      .padAngle(0.02); // 添加扇形之间的间距

    // 创建弧生成器 - 使用更精确的角度处理
    const arc = d3
      .arc<any>()
      .innerRadius(0)
      .outerRadius(radius)
      .cornerRadius(2); // 添加圆角

    // 创建标签弧生成器
    const labelArc = d3
      .arc<any>()
      .innerRadius(radius * 0.7)
      .outerRadius(radius * 0.7);

    // 绘制饼图切片
    const arcs = g
      .selectAll(".arc")
      .data(pie(modalityData))
      .enter()
      .append("g")
      .attr("class", "arc");

    // 添加路径（饼图切片）
    const paths = arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d: any) => d.data.color)
      .attr("stroke", "white")
      .attr("stroke-width", 3) // 增加边框宽度
      .attr("stroke-linejoin", "round") // 圆角连接
      .attr("stroke-linecap", "round") // 圆角端点
      .style("opacity", 0.9)
      .style("filter", "url(#dropshadow)")
      .style("shape-rendering", "geometricPrecision") // 提高渲染精度
      .on("mouseover", function (_, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("transform", function () {
            const centroid = arc.centroid(d);
            return `translate(${centroid[0] * 0.1}, ${centroid[1] * 0.1})`;
          })
          .style("opacity", 1);
      })
      .on("mouseout", function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("transform", "translate(0,0)")
          .style("opacity", 0.9);
      });

    // 动画效果
    paths
      .transition()
      .duration(1000)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      .attrTween("d", function (d: any) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function (t: number) {
          return arc(interpolate(t));
        };
      });

    // 添加百分比标签
    const labels = arcs
      .append("text")
      .attr("transform", (d: any) => `translate(${labelArc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style("font-size", "12px")
      .style("font-weight", "600")
      .style("fill", "white")
      .style("text-shadow", "1px 1px 2px rgba(0,0,0,0.5)")
      .style("pointer-events", "none")
      .text((d: any) => `${d.data.percentage}%`)
      .style("opacity", 0);

    // 标签动画
    labels.transition().delay(1000).duration(500).style("opacity", 1);

    // 创建图例 - 优化样式
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - 100}, 40)`);

    const legendItems = legend
      .selectAll(".legend-item")
      .data(modalityData)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (_, i: number) => `translate(0, ${i * 28})`)
      .style("cursor", "pointer");

    // 图例背景
    legendItems
      .append("rect")
      .attr("x", -5)
      .attr("y", -2)
      .attr("width", 160)
      .attr("height", 20)
      .attr("rx", 10)
      .attr("fill", "transparent")
      .on("mouseover", function () {
        d3.select(this).attr("fill", "#f8fafc");
      })
      .on("mouseout", function () {
        d3.select(this).attr("fill", "transparent");
      });

    // 图例颜色块
    legendItems
      .append("circle")
      .attr("cx", 6)
      .attr("cy", 6)
      .attr("r", 6)
      .attr("fill", (d: any) => d.color)
      .attr("stroke", "white")
      .attr("stroke-width", 2);

    // 图例文字
    legendItems
      .append("text")
      .attr("x", 18)
      .attr("y", 6)
      .attr("dy", "0.35em")
      .style("font-size", "13px")
      .style("font-weight", "500")
      .style("fill", "#374151")
      .text((d: any) => `${d.modality} (${d.count})`);
  }, [modalityData, viewMode]);
  return (
    <div className="shadow-card mt-4">
      <div className="flex justify-between items-center mb-4">
        <div className="card-title">
          Competitive Landscape - Drug Candidates
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
          scroll={{ x: 1600, y: 400 }}
          columns={[
            {
              title: "Trial Phase",
              dataIndex: "trial",
              render: (text) => {
                const getPhaseColor = (phase: string) => {
                  switch (phase) {
                    case "Preclinical":
                      return "bg-[#f3f4f6] text-[#374151]";
                    case "Phase I":
                      return "bg-[#fef3e2] text-[#D97706]";
                    case "Phase I/II":
                      return "bg-[#fef3e2] text-[#D97706]";
                    case "Phase II":
                      return "bg-[#edf5ff] text-[#1E40AF]";
                    case "Phase III":
                      return "bg-[#e2fbe8] text-[#166534]";
                    default:
                      return "bg-[#f1f2f4] text-[#1F2937]";
                  }
                };

                return (
                  <div className={`app-tag !px-2 !py-1 ${getPhaseColor(text)}`}>
                    {text}
                  </div>
                );
              },
              width: 120,
            },
            {
              title: "Company",
              dataIndex: "company",
              render: (text) => (
                <div className="text-[14px] text-[#6B7280] font-[500]">
                  {text}
                </div>
              ),
              width: 250,
            },
            {
              title: "Modality",
              dataIndex: "modality",
              render: (text) => {
                const getModalityColor = (modality: string) => {
                  switch (modality) {
                    case "mRNA":
                      return "bg-[#f0f9ff] text-[#0369a1]";
                    case "ADCs":
                      return "bg-[#fef3e2] text-[#D97706]";
                    case "mAb + small molecule":
                      return "bg-[#e2fbe8] text-[#166534]";
                    case "Bispecific Antibodies":
                      return "bg-[#f9f4ff] text-[#6B21A8]";
                    case "DNA / Gene Therapies":
                      return "bg-[#fee2e2] text-[#DC2626]";
                    case "Nanoparticles / Nanocarriers":
                    case "Nanocarriers + small molecule":
                      return "bg-[#f1f5f9] text-[#475569]";
                    default:
                      return "bg-[#f1f2f4] text-[#1F2937]";
                  }
                };

                return (
                  <div
                    className={`app-tag !px-2 !py-1 text-xs ${getModalityColor(
                      text
                    )}`}
                  >
                    {text}
                  </div>
                );
              },
              width: 200,
            },
            {
              title: "Trial ID",
              dataIndex: "id",
              render: (text) => (
                <div className="text-[14px] text-[#9CA3AF] font-mono">
                  {text || "N/A"}
                </div>
              ),
              width: 140,
            },
            {
              title: "Target",
              dataIndex: "target",
              render: (text) => (
                <div className="text-[14px] text-green-600 font-[500]">
                  {text || "undisclosed"}
                </div>
              ),
              width: 150,
            },
            {
              title: "Reference",
              dataIndex: "ref",
              render: (text) =>
                text ? (
                  <a
                    href={text}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-[14px] break-all"
                  >
                    {text.length > 35 ? `${text.substring(0, 35)}...` : text}
                  </a>
                ) : (
                  <span className="text-[#9CA3AF] text-[14px]">N/A</span>
                ),
              width: 250,
            },
          ]}
          dataSource={clinicalTrialsData}
        />
      ) : (
        <div className="bg-white rounded-lg p-4" style={{ height: "450px" }}>
          <svg
            ref={pieChartRef}
            width="100%"
            height="100%"
            viewBox="0 0 500 400"
          />
        </div>
      )}
    </div>
  );
}

export default DrugCandidates;
