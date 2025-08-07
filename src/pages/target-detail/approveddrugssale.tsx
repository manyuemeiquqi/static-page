import { Table, Button, Space } from "antd";
import { BarChartOutlined, TableOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

function Approveddrugssales() {
  const [viewMode, setViewMode] = useState<"table" | "chart">("table");
  const pieChartRef = useRef<SVGSVGElement>(null);

  const approvedDrugssaleData = [
    {
      name: "Olaparib(Lynparza)",
      owner: "KuDOS Pharmaceuticals (UK) (acquired)",
      mcompany: "AstraZeneca and Merck & Co. (MSD) (co-marketing, U.S.)",
      gsales: 4000000000,
      year: 2027,
    },
    {
      name: "Niraparib (Zejula)",
      owner: "Tesaro (U.S.)",
      mcompany: "GSK (GlaxoSmithKline) — acquired Tesaro in 2019",
      gsales: 1500000000,
      year: 2027,
    },
    {
      name: "Rucaparib (Rubraca)",
      owner: "Clovis Oncology",
      mcompany:
        "Clovis Oncology (filed bankruptcy in 2022); rights sold to Pharma&, Fresenius Kabi in some regions",
      gsales: 3600000000,
      year: 2032,
    },
    {
      name: "Talazoparib (Talzenna)",
      owner: "BioMarin (discovery stage)",
      mcompany: "Pfizer (acquired from Medivation in 2016)",
      gsales: 929000000,
      year: 2030,
    },
    {
      name: "Pamiparib",
      owner: "BeiGene (China)",
      mcompany: "BeiGene (NMPA-approved in China)",
      gsales: 70000000,
      year: 2027,
    },
    {
      name: "Fluzoparib",
      owner: "Jiangsu Hengrui Pharma (China)",
      mcompany: "Hengrui (marketed in China)",
      gsales: 150000000,
      year: 2027,
    },
    {
      name: "Senaparib",
      owner: "IMPACT Therapeutics(China)",
      mcompany:
        "Hangzhou Zhongmei Huadong Pharmaceutical Co., Ltd(marketed in China)",
      gsales: NaN,
      year: NaN,
    },
  ];

  useEffect(() => {
    if (!pieChartRef.current || viewMode !== "chart") return;

    // 清除之前的图表
    d3.select(pieChartRef.current).selectAll("*").remove();

    const svg = d3.select(pieChartRef.current);
    const width = 600;
    const height = 400;
    const margin = { top: 40, right: 40, bottom: 60, left: 80 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // 过滤掉没有销售数据的药物
    const validData = approvedDrugssaleData.filter(
      (d) => !isNaN(d.gsales) && d.year
    );

    // 创建比例尺
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(validData, (d) => d.year) as [number, number])
      .range([0, chartWidth])
      .nice();

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(validData, (d) => d.gsales) || 0])
      .range([chartHeight, 0])
      .nice();

    // 颜色比例尺
    const colorScale = d3
      .scaleOrdinal()
      .domain(validData.map((d) => d.name))
      .range([
        "#8B5CF6",
        "#3B82F6",
        "#10B981",
        "#F59E0B",
        "#EF4444",
        "#EC4899",
        "#14B8A6",
      ]);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // 添加网格线
    const xGrid = g
      .append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickSize(-chartHeight)
          .tickFormat(() => "")
      );

    xGrid
      .selectAll("line")
      .style("stroke", "#E5E7EB")
      .style("stroke-dasharray", "2,2")
      .style("opacity", 0.5);

    const yGrid = g
      .append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-chartWidth)
          .tickFormat(() => "")
      );

    yGrid
      .selectAll("line")
      .style("stroke", "#E5E7EB")
      .style("stroke-dasharray", "2,2")
      .style("opacity", 0.5);

    // 添加散点
    const dots = g
      .selectAll(".dot")
      .data(validData)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d.year))
      .attr("cy", (d) => yScale(d.gsales))
      .attr("r", 0)
      .style("fill", (d) => colorScale(d.name) as string)
      .style("stroke", "white")
      .style("stroke-width", 2)
      .style("opacity", 0.8)
      .style("cursor", "pointer");

    // 散点动画
    dots
      .transition()
      .duration(800)
      .delay((_, i) => i * 100)
      .attr("r", 8);

    // 添加hover效果
    dots
      .on("mouseover", function (event, d) {
        // 放大圆点
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 12)
          .style("opacity", 1);

        // 显示tooltip
        const tooltip = d3
          .select("body")
          .append("div")
          .attr("class", "drug-tooltip")
          .style("position", "absolute")
          .style("background", "rgba(0, 0, 0, 0.9)")
          .style("color", "white")
          .style("padding", "12px 16px")
          .style("border-radius", "8px")
          .style("font-size", "12px")
          .style("pointer-events", "none")
          .style("opacity", 0)
          .style("z-index", "1000")
          .style("box-shadow", "0 4px 20px rgba(0,0,0,0.3)")
          .style("max-width", "300px");

        tooltip
          .html(
            `
            <div style="font-weight: 700; margin-bottom: 8px; color: #60A5FA;">${
              d.name
            }</div>
            <div style="margin-bottom: 4px;"><strong>Owner:</strong> ${
              d.owner
            }</div>
            <div style="margin-bottom: 4px;"><strong>Marketing Company:</strong> ${
              d.mcompany
            }</div>
            <div style="margin-bottom: 4px;"><strong>Sales:</strong> $${(
              d.gsales / 1000000000
            ).toFixed(2)}B</div>
            <div><strong>Year:</strong> ${d.year}</div>
          `
          )
          .style("left", event.pageX + 15 + "px")
          .style("top", event.pageY - 15 + "px")
          .transition()
          .duration(200)
          .style("opacity", 1);
      })
      .on("mouseout", function () {
        // 恢复圆点大小
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 8)
          .style("opacity", 0.8);

        // 移除tooltip
        d3.selectAll(".drug-tooltip").remove();
      });

    // 添加X轴
    const xAxis = g
      .append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

    xAxis.selectAll("text").style("font-size", "12px").style("fill", "#6B7280");

    // 添加Y轴
    const yAxis = g
      .append("g")
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat((d) => `$${((d as number) / 1000000000).toFixed(1)}B`)
      );

    yAxis.selectAll("text").style("font-size", "12px").style("fill", "#6B7280");

    // 添加轴标签
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - chartHeight / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "600")
      .style("fill", "#374151")
      .text("Global Sales (Billions USD)");

    g.append("text")
      .attr(
        "transform",
        `translate(${chartWidth / 2}, ${chartHeight + margin.bottom - 10})`
      )
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "600")
      .style("fill", "#374151")
      .text("Year");

    // 添加图例
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - 200}, 50)`);

    const legendItems = legend
      .selectAll(".legend-item")
      .data(validData)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (_, i) => `translate(0, ${i * 20})`);

    legendItems
      .append("circle")
      .attr("cx", 8)
      .attr("cy", 8)
      .attr("r", 6)
      .style("fill", (d) => colorScale(d.name) as string)
      .style("stroke", "white")
      .style("stroke-width", 1);

    legendItems
      .append("text")
      .attr("x", 20)
      .attr("y", 8)
      .attr("dy", "0.35em")
      .style("font-size", "10px")
      .style("font-weight", "500")
      .style("fill", "#374151")
      .text((d) =>
        d.name.length > 15 ? d.name.substring(0, 15) + "..." : d.name
      );

    // 清理函数
    return () => {
      d3.selectAll(".drug-tooltip").remove();
    };
  }, [approvedDrugssaleData, viewMode]);

  return (
    <div className="shadow-card mt-4">
      <div className="flex justify-between items-center mb-4">
        <div className="card-title">
          Competitive Landscape - Approved drugs(Sales info)
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
              dataIndex: "name",
              render: (text) => (
                <div className="text-primary font-bold text-[15px]">{text}</div>
              ),
              width: 180,
            },
            {
              title: "Owner",
              dataIndex: "owner",
              render: (text) => (
                <div className="font-medium text-[14px] text-[#6B7280]">
                  {text}
                </div>
              ),
              width: 200,
            },
            {
              title: "Marketing Company",
              dataIndex: "mcompany",
              render: (text) => (
                <div className="font-medium text-[14px] text-[#6B7280]">
                  {text}
                </div>
              ),
              width: 250,
            },
            {
              title: "Global Sales",
              dataIndex: "gsales",
              render: (value) => (
                <div className="font-bold text-[15px] text-[#059669]">
                  {isNaN(value)
                    ? "N/A"
                    : `$${(value / 1000000000).toFixed(2)}B`}
                </div>
              ),
              width: 120,
            },
          ]}
          dataSource={approvedDrugssaleData.map((item, index) => ({
            ...item,
            key: index,
          }))}
        />
      ) : (
        <div className="bg-white rounded-lg p-4" style={{ height: "450px" }}>
          <svg
            ref={pieChartRef}
            width="100%"
            height="100%"
            viewBox="0 0 600 400"
          />
        </div>
      )}
    </div>
  );
}

export default Approveddrugssales;
