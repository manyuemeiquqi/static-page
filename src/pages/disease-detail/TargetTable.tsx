import { Table, Rate, Button, Space } from "antd";
import { BarChartOutlined, TableOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

function TargetTable() {
  const [viewType, setViewType] = useState<"List" | "Graph">("List");
  const graphRef = useRef<SVGSVGElement>(null);

  const targetData = [
    {
      targetName: "CXCR4",
      fullName: "POL6326",
      targeType: "GPCRs",
      rank: 1,
      patents: 17,
      LatestPhase: "Phase II",
      publications: 69,
      citations: 791,
    },
    {
      targetName: "PD-L1",
      fullName: "IMpassion130",
      targeType: "Immune Checkpoints / Targets",
      rank: 5,
      patents: 352,
      LatestPhase: "Commercial",
      publications: 1909,
      citations: 21972,
    },
    {
      targetName: "EGFR",
      fullName: "DB01269",
      targeType: "Kinases",
      rank: 4,
      patents: 262,
      LatestPhase: "Phase II",
      publications: 1631,
      citations: 13731,
    },
    {
      targetName: "BRCA2",
      fullName: "AZD2281",
      targeType: "DNA Damage Repair Proteins",
      rank: 5,
      patents: 105,
      LatestPhase: "Commercial",
      publications: 343,
      citations: 5021,
    },
    {
      targetName: "BCL2",
      fullName: "ABT-199",
      targeType: "Others / Unclassified",
      rank: 3,
      patents: 98,
      LatestPhase: "Preclinical",
      publications: 341,
      citations: 4962,
    },
    {
      targetName: "CD44",
      fullName: "RG7356",
      targeType: "Membrane Proteins (Non-GPCR)",
      rank: 2,
      patents: 88,
      LatestPhase: "Phase I",
      publications: 321,
      citations: 4529,
    },
    {
      targetName: "CDK4",
      fullName: "NCT03130439",
      targeType: "Kinases",
      rank: 4,
      patents: 45,
      LatestPhase: "Phase II",
      publications: 166,
      citations: 2967,
    },
    {
      targetName: "PARP1",
      fullName: "BMN 673",
      targeType: "DNA Damage Repair Proteins",
      rank: 5,
      patents: 43,
      LatestPhase: "Commercial",
      publications: 145,
      citations: 2692,
    },
    {
      targetName: "EZH2",
      fullName: "IHMT-337",
      targeType: "Epigenetic Regulators",
      rank: 2,
      patents: 36,
      LatestPhase: "Preclinical",
      publications: 82,
      citations: 1054,
    },
    {
      targetName: "AKT1",
      fullName: "GDC-0068",
      targeType: "Kinases",
      rank: 2,
      patents: 25,
      LatestPhase: "Phase II",
      publications: 80,
      citations: 942,
    },
    {
      targetName: "VEGF",
      fullName: "DB00112",
      targeType: "Immune Checkpoints / Targets",
      rank: 3, // *** 对应 rank 3
      patents: 51,
      LatestPhase: "Phase III",
      publications: 401,
      citations: 5680,
    },
    {
      targetName: "ROR1",
      fullName: "NBE-002",
      targeType: "Transcription Factors",
      rank: 2, // ** 对应 rank 2
      patents: 39,
      LatestPhase: "Phase I",
      publications: 227,
      citations: 2671,
    },
    // Trop‑2	Membrane Proteins (Non-GPCR)	894	10531	193	Phase III	NCT05374512
    {
      targetName: "Trop-2",
      fullName: "NCT05374512",
      targeType: "Membrane Proteins (Non-GPCR)",
      rank: 4, // ** 对应 rank 3
      patents: 193,
      LatestPhase: "Phase III",
      publications: 894,
      citations: 10531,
    },
  ];

  // 根据阶段获取颜色
  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "Commercial":
        return "#10B981"; // 绿色
      case "Phase III":
      case "Phase II/III":
        return "#3B82F6"; // 蓝色
      case "Phase II":
        return "#F59E0B"; // 橙色
      case "Phase I":
        return "#EF4444"; // 红色
      case "Preclinical":
        return "#8B5CF6"; // 紫色
      default:
        return "#6B7280"; // 灰色
    }
  };

  // 绘制图表
  useEffect(() => {
    if (viewType !== "Graph" || !graphRef.current) return;

    const svg = d3.select(graphRef.current);
    svg.selectAll("*").remove();

    const width = 1200;
    const height = 600;

    // 创建 tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "d3-tooltip-bubble")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "rgba(0, 0, 0, 0.9)")
      .style("color", "white")
      .style("padding", "12px 16px")
      .style("border-radius", "8px")
      .style("font-size", "13px")
      .style("line-height", "1.4")
      .style("box-shadow", "0 4px 12px rgba(0,0,0,0.15)")
      .style("pointer-events", "none")
      .style("z-index", "1000")
      .style("max-width", "300px");

    // 气泡大小比例尺 - 基于 researchActivity
    const radiusScale = d3
      .scaleSqrt()
      .domain([1, 5]) // researchActivity 范围是 1-5
      .range([20, 60]); // 气泡半径范围

    // 创建缩放功能
    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom as any);

    const g = svg.append("g");

    // 准备数据，为每个气泡添加位置
    const bubbleData = targetData.map((d) => ({
      ...d,
      radius: radiusScale(d.rank),
    }));
    const simulation = d3
      .forceSimulation(bubbleData as any)
      .force("charge", d3.forceManyBody().strength(5))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3.forceCollide().radius((d: any) => d.radius + 5)
      )
      .force("x", d3.forceX(width / 2).strength(0.1))
      .force("y", d3.forceY(height / 2).strength(0.1))
      .alpha(0.3) // 降低初始能量，加快收敛
      .alphaDecay(0.05); // 加快衰减速度

    // 创建气泡容器
    const bubbles = g
      .selectAll(".bubble")
      .data(bubbleData)
      .enter()
      .append("g")
      .attr("class", "bubble")
      .style("cursor", "pointer");

    // 气泡圆圈 - 立即显示，不等仿真结束
    const circles = bubbles
      .append("circle")
      .attr("r", (d) => d.radius) // 直接设置半径，不从0开始
      .style("fill", (d) => getPhaseColor(d.LatestPhase))
      .style("fill-opacity", 0.8)
      .style("stroke", "white")
      .style("stroke-width", 3)
      .style("filter", "drop-shadow(2px 2px 4px rgba(0,0,0,0.2))")
      .style("opacity", 0) // 从透明开始
      .on("mouseenter", function (event, d: any) {
        // 高亮当前气泡
        d3.select(this)
          .transition()
          .duration(200)
          .style("fill-opacity", 1)
          .style("stroke-width", 4)
          .style("transform", "scale(1.1)");

        // 显示 tooltip
        tooltip
          .html(
            `
            <div style="font-weight: 700; margin-bottom: 8px; color: #fff; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 8px;">
              ${d.targetName}
            </div>
            <div style="display: grid; gap: 4px;">
              <div><span style="color: #bbb;">Drug Representative:</span> <span style="color: #fff;">${
                d.fullName
              }</span></div>
              <div><span style="color: #bbb;">Type:</span> <span style="color: #fff;">${
                d.targeType
              }</span></div>
              <div><span style="color: #bbb;">Publication:</span> <span style="color: #fff;">${
                d.publications
              }</span></div>
              <div><span style="color: #bbb;">Citations:</span> <span style="color: #fff;">${d.citations.toLocaleString()}</span></div>
              <div><span style="color: #bbb;">Patents:</span> <span style="color: #fff;">${
                d.patents
              }</span></div>
              <div><span style="color: #bbb;">Most Advanced Drug Status:</span> <span style="color: ${getPhaseColor(
                d.LatestPhase
              )}; font-weight: 600;">${d.LatestPhase}</span></div>
            </div>
            `
          )
          .style("visibility", "visible")
          .style("left", event.pageX + 15 + "px")
          .style("top", event.pageY - 15 + "px")
          .transition()
          .duration(200)
          .style("opacity", 1);
      })
      .on("mouseleave", function () {
        // 恢复气泡状态
        d3.select(this)
          .transition()
          .duration(200)
          .style("fill-opacity", 0.8)
          .style("stroke-width", 3)
          .style("transform", "scale(1)");

        // 隐藏 tooltip
        tooltip
          .transition()
          .duration(200)
          .style("opacity", 0)
          .on("end", () => tooltip.style("visibility", "hidden"));
      })
      .on("mousemove", function (event) {
        // tooltip 跟随鼠标移动
        tooltip
          .style("left", event.pageX + 15 + "px")
          .style("top", event.pageY - 15 + "px");
      });

    // 气泡标签 - 立即显示
    const labels = bubbles
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .style("font-size", (d) => {
        return d.radius > 35 ? "14px" : "12px";
      })
      .style("font-weight", "600")
      .style("fill", "white")
      .style("text-shadow", "1px 1px 3px rgba(0,0,0,0.7)")
      .style("pointer-events", "none")
      .text((d) => d.targetName)
      .style("opacity", 0);

    // 立即开始透明度动画，不等仿真结束
    circles
      .transition()
      .duration(400) // 缩短动画时间
      .delay((_, i) => i * 20) // 减少延迟间隔
      .style("opacity", 1);

    labels
      .transition()
      .duration(400)
      .delay((_, i) => i * 20 + 200) // 标签稍微延后一点
      .style("opacity", 1);

    // 力仿真更新函数
    simulation.on("tick", () => {
      bubbles.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    // 仿真停止后开始动画
    simulation.on("end", () => {
      // 气泡大小动画
      circles
        .transition()
        .duration(800)
        .delay((_, i) => i * 50)
        .attr("r", (d) => d.radius);

      // 标签显示动画
      labels.transition().delay(1000).duration(500).style("opacity", 1);
    });

    // 创建阶段图例 - 只保留开发阶段图例
    const phaseLegend = svg
      .append("g")
      .attr("class", "phase-legend")
      .attr("transform", "translate(50, 60)");

    phaseLegend
      .append("text")
      .attr("x", 0)
      .attr("y", 0)
      .style("font-size", "14px")
      .style("font-weight", "600")
      .style("fill", "#374151")
      .text("Development Phase");

    const phaseColors = [
      { phase: "Commercial", color: "#10B981" },
      { phase: "Phase II/III", color: "#3B82F6" },
      { phase: "Phase II", color: "#F59E0B" },
      { phase: "Phase I", color: "#EF4444" },
      { phase: "Preclinical", color: "#8B5CF6" },
    ];

    const phaseItems = phaseLegend
      .selectAll(".phase-item")
      .data(phaseColors)
      .enter()
      .append("g")
      .attr("class", "phase-item")
      .attr("transform", (_, i) => `translate(0, ${i * 24 + 20})`);

    phaseItems
      .append("circle")
      .attr("r", 8)
      .style("fill", (d) => d.color);

    phaseItems
      .append("text")
      .attr("x", 20)
      .attr("y", 5)
      .style("font-size", "13px")
      .style("font-weight", "500")
      .style("fill", "#374151")
      .text((d) => d.phase);

    // 清理函数
    return () => {
      d3.selectAll(".d3-tooltip-bubble").remove();
    };
  }, [viewType]);

  // ...existing code...

  return (
    <div className="shadow-card mt-4">
      <div className="flex justify-between items-center mb-4">
        <div className="card-title">Associated Targets</div>
        <Space>
          <Button
            type={viewType === "List" ? "primary" : "default"}
            icon={<TableOutlined />}
            onClick={() => setViewType("List")}
            size="small"
          >
            List
          </Button>
          <Button
            type={viewType === "Graph" ? "primary" : "default"}
            icon={<BarChartOutlined />}
            onClick={() => setViewType("Graph")}
            size="small"
          >
            Graph
          </Button>
        </Space>
      </div>

      {viewType === "List" ? (
        <Table
          scroll={{ x: 1400, y: 400 }}
          pagination={false}
          columns={[
            {
              title: "Target",
              render: (_, record) => (
                <div className="flex flex-col gap-1 text-[16px]">
                  <div className="text-green-600 font-bold cursor-pointer">
                    {record.targetName}
                  </div>
                </div>
              ),
            },
            {
              title: "Drug Representative",
              render: (_, record) => (
                <div className="flex flex-col gap-1 text-[16px]">
                  <span className="text-[14px] text-[#6B7280]">
                    {record.fullName}
                  </span>
                </div>
              ),
            },
            {
              title: "Type",
              render: (_, record) => (
                <div className="text-[14px] text-[#6B7280]">
                  {record.targeType}
                </div>
              ),
            },
            {
              title: "Publication",
              render: (_, record) => (
                <div className="text-[14px] text-[#6B7280]">
                  {record.publications}
                </div>
              ),
            },
            {
              title: "Citations",
              render: (_, record) => (
                <div className="text-[14px] text-[#6B7280]">
                  {record.citations}
                </div>
              ),
            },
            {
              title: "Patents",
              render: (_, record) => (
                <div className="text-[14px] text-[#6B7280]">
                  {record.patents}
                </div>
              ),
            },
            {
              title: "Most Advanced Drug Status",
              dataIndex: "LatestPhase",
              key: "targetType",
              render: (_, record) => (
                <div className="app-tag bg-[#d6e7fc] !rounded text-[#1E40AF]">
                  {record.LatestPhase}
                </div>
              ),
            },
            {
              title: "Rank",
              render: (_, record) => (
                <div>
                  <Rate value={record.rank} disabled />
                </div>
              ),
            },
          ]}
          dataSource={targetData}
        />
      ) : (
        <div className="bg-white rounded-lg  border-gray-200 p-4">
          <svg
            ref={graphRef}
            width="100%"
            height="600"
            viewBox="0 0 1200 600"
            className=" rounded"
          />
        </div>
      )}
    </div>
  );
}

export default TargetTable;
