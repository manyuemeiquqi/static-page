import { Table, Button, Space } from "antd";
import { BarChartOutlined, TableOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";

function ApprovedDrugs() {
  const [viewMode, setViewMode] = useState<"table" | "chart">("table");
  const pieChartRef = useRef<SVGSVGElement>(null);

  const approvedDrugsData = [
    {
      drugName: "Pembrolizumab",
      rdCompany: "Merck & Co.",
      manufacturer: "Merck & Co.",
      modality: "mAbs",
      id: "MK-3475",
      target: "PD-1",
      ref: "https://seer.cancer.gov/oncologytoolbox/canmed/hcpcs/J9271/",
    },
    {
      drugName: "Sacituzumab govitecan",
      rdCompany: "Gilead Sciences",
      manufacturer: "Gilead Sciences",
      modality: "ADCs",
      id: "NCT04617522",
      target: "Trop-2",
      ref: "https://en.wikipedia.org/wiki/Sacituzumab_govitecan",
    },
    {
      drugName: "Olaparib",
      rdCompany: "AstraZeneca/Merck",
      manufacturer: "AstraZeneca",
      modality: "small molecule",
      id: "AZD2281",
      target: "PARP1 / BRCA2",
      ref: "https://en.wikipedia.org/wiki/Olaparib",
    },
    {
      drugName: "Atezolizumab",
      rdCompany: "Roche/Genentech",
      manufacturer: "Roche/Genentech",
      modality: "mAbs",
      id: "MPDL3280A",
      target: "PD-L1",
      ref: "https://en.wikipedia.org/wiki/Atezolizumab",
    },
    {
      drugName: "Talazoparib",
      rdCompany: "Pfizer",
      manufacturer: "Pfizer",
      modality: "small molecule",
      id: "BMN-673",
      target: "PARP",
      ref: "https://en.wikipedia.org/wiki/Talazoparib",
    },
    {
      drugName: "Capecitabine",
      rdCompany: "Genentech",
      manufacturer: "Roche",
      modality: "small molecule",
      id: "NCT00437294",
      target: "thymidylate synthase (TS)",
      ref: "https://en.wikipedia.org/wiki/Capecitabine",
    },
    {
      drugName: "Eribulin",
      rdCompany: "Eisai Co., Ltd.",
      manufacturer: "Eisai Co., Ltd.",
      modality: "small molecule",
      id: "E7389",
      target: "Microtubules",
      ref: "https://en.wikipedia.org/wiki/Eribulin",
    },
    {
      drugName: "Carboplatin",
      rdCompany: "Bristol-Myers Squibb",
      manufacturer: "Bristol-Myers Squibb",
      modality: "small molecule",
      id: "NSC-241240",
      target: "DNA",
      ref: "https://en.wikipedia.org/wiki/Carboplatin",
    },
    {
      drugName: "Cisplatin",
      rdCompany: "Bristol-Myers Squibb",
      manufacturer: "Bristol-Myers Squibb",
      modality: "small molecule",
      id: "NSC119875",
      target: "DNA",
      ref: "https://en.wikipedia.org/wiki/Cisplatin",
    },
    {
      drugName: "Gemcitabine",
      rdCompany: "Eli Lilly & Company",
      manufacturer: "CHEPLAPHARM",
      modality: "small molecule",
      id: "CHEMBL888",
      target: "DNA synthesis",
      ref: "https://en.wikipedia.org/wiki/Gemcitabine",
    },
  ];

  // 统计模态数据
  const modalityData = useMemo(() => {
    const modalityCount = approvedDrugsData.reduce((acc, item) => {
      // 统一ADC命名
      let modality = item.modality;
      if (modality === "ADC") {
        modality = "ADCs";
      }

      acc[modality] = (acc[modality] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const colors = [
      "#3B82F6", // 蓝色 - small molecule (最多)
      "#10B981", // 绿色 - mAbs
      "#F59E0B", // 橙色 - ADCs
      "#EF4444", // 红色
      "#8B5CF6", // 紫色
      "#EC4899", // 粉色
    ];

    return Object.entries(modalityCount)
      .map(([modality, count], index) => ({
        modality,
        count,
        percentage: ((count / approvedDrugsData.length) * 100).toFixed(1),
        color: colors[index % colors.length],
      }))
      .sort((a, b) => b.count - a.count);
  }, [approvedDrugsData]);

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
      .attr("id", "approved-dropshadow")
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

    // 创建弧生成器
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
      .attr("stroke-width", 3)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .style("opacity", 0.9)
      .style("filter", "url(#approved-dropshadow)")
      .style("shape-rendering", "geometricPrecision")
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
      .style("font-size", "14px")
      .style("font-weight", "600")
      .style("fill", "white")
      .style("text-shadow", "1px 1px 2px rgba(0,0,0,0.5)")
      .style("pointer-events", "none")
      .text((d: any) => `${d.data.percentage}%`)
      .style("opacity", 0);

    // 标签动画
    labels.transition().delay(1000).duration(500).style("opacity", 1);

    // 创建图例
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - 120}, 40)`);

    const legendItems = legend
      .selectAll(".legend-item")
      .data(modalityData)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (_, i: number) => `translate(0, ${i * 32})`)
      .style("cursor", "pointer");

    // 图例背景
    legendItems
      .append("rect")
      .attr("x", -5)
      .attr("y", -2)
      .attr("width", 140)
      .attr("height", 24)
      .attr("rx", 12)
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
      .attr("cx", 8)
      .attr("cy", 8)
      .attr("r", 7)
      .attr("fill", (d: any) => d.color)
      .attr("stroke", "white")
      .attr("stroke-width", 2);

    // 图例文字
    legendItems
      .append("text")
      .attr("x", 20)
      .attr("y", 8)
      .attr("dy", "0.35em")
      .style("font-size", "13px")
      .style("font-weight", "500")
      .style("fill", "#374151")
      .text((d: any) => `${d.modality} (${d.count})`);
  }, [modalityData, viewMode]);

  return (
    <div className="shadow-card mt-4">
      <div className="flex justify-between items-center mb-4">
        <div className="card-title">Competitive Landscape – Approved Drugs</div>
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
                  <a
                    href={record.ref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-bold text-[15px]"
                  >
                    {record.drugName}
                  </a>
                  <div className="text-xs text-[#9CA3AF]">
                    ID: {record.id || "N/A"}
                  </div>
                </div>
              ),
              width: 180,
            },
            {
              title: "R&D Company",
              dataIndex: "rdCompany",
              render: (text) => (
                <div className="text-[14px] text-[#6B7280]">{text}</div>
              ),
              width: 150,
            },
            {
              title: "Manufacturer",
              dataIndex: "manufacturer",
              render: (text) => (
                <div className="text-[14px] text-[#6B7280]">{text}</div>
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
              width: 120,
            },
            {
              title: "Target",
              dataIndex: "target",
              render: (text) => (
                <div className="text-green-600 font-[500] text-[14px]">
                  {text || "-"}
                </div>
              ),
              width: 180,
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
                    {text.length > 30 ? `${text.substring(0, 30)}...` : text}
                  </a>
                ) : (
                  <span className="text-[#9CA3AF] text-[14px]">N/A</span>
                ),
              width: 200,
            },
          ]}
          dataSource={approvedDrugsData}
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

export default ApprovedDrugs;
