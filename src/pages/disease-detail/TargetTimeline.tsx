import { useEffect, useRef } from "react";
import * as d3 from "d3";

function TargetTimeline() {
  const timelineRef = useRef<SVGSVGElement>(null);

  // 靶点数据 - 去除分类
  const targetTimelineData = [
    {
      target: "Wnt/β-catenin",
      fullName: "Wingless/β-catenin signaling pathway",
      year: 1982,
    },
    {
      target: "TGF-β",
      fullName: "Transforming Growth Factor-β",
      year: 1987,
    },
    {
      target: "Notch",
      fullName: "Notch signaling pathway",
      year: 2000,
    },
    {
      target: "PI3K/AKT",
      fullName: "Phosphoinositide 3-kinase/AKT pathway",
      year: 2004,
    },
    {
      target: "JAK/STAT",
      fullName: "Janus kinase/Signal transducer and activator of transcription",
      year: 2008,
    },
    {
      target: "Hedgehog",
      fullName: "Hedgehog signaling pathway",
      year: 2009,
    },
    {
      target: "NF-κB",
      fullName: "Nuclear factor kappa B",
      year: 2012,
    },
    {
      target: "Metastasis",
      fullName: "Metastasis-related targets",
      year: 2013,
    },
    {
      target: "iNOS/NO",
      fullName: "Inducible nitric oxide synthase/Nitric oxide",
      year: 2014,
    },
  ];

  useEffect(() => {
    if (!timelineRef.current) return;

    const svg = d3.select(timelineRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 50, right: 40, bottom: 80, left: 60 };
    const width = 1000 - margin.left - margin.right;
    const height = 300 - margin.bottom - margin.top;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // 创建比例尺 - 延长到2025年
    const xScale = d3
      .scaleLinear()
      .domain([1980, 2025]) // 固定范围从1980到2025
      .range([0, width]);

    const yScale = d3
      .scaleBand()
      .domain(targetTimelineData.map((d) => d.target))
      .range([0, height])
      .padding(0.15);

    // 创建时间轴线（在底部）
    const timelineY = height + 20;
    g.append("line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", timelineY)
      .attr("y2", timelineY)
      .style("stroke", "#E5E7EB")
      .style("stroke-width", 2);

    // 添加年份刻度 - 每5年一个刻度
    const yearTicks = [];
    for (let year = 1980; year <= 2025; year += 5) {
      yearTicks.push(year);
    }

    g.selectAll(".year-tick")
      .data(yearTicks)
      .enter()
      .append("g")
      .attr("class", "year-tick")
      .attr("transform", (d) => `translate(${xScale(d)}, ${timelineY})`)
      .each(function (d) {
        const tick = d3.select(this);

        // 年份刻度线
        tick
          .append("line")
          .attr("y1", -5)
          .attr("y2", 5)
          .style("stroke", "#9CA3AF")
          .style("stroke-width", 1);

        // 年份标签
        tick
          .append("text")
          .attr("y", 20)
          .attr("text-anchor", "middle")
          .style("font-size", "14px")
          .style("fill", "#6B7280")
          .text(d);
      });

    // 添加当前年份指示线（2025）
    g.append("line")
      .attr("x1", xScale(2025))
      .attr("x2", xScale(2025))
      .attr("y1", 0)
      .attr("y2", timelineY)
      .style("stroke", "#EF4444")
      .style("stroke-width", 2)
      .style("stroke-dasharray", "5,5")
      .style("opacity", 0.7);

    // 添加当前年份标签
    g.append("text")
      .attr("x", xScale(2025))
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "600")
      .style("fill", "#EF4444")
      .text("Current");

    // 创建靶点节点
    const nodes = g
      .selectAll(".target-node")
      .data(targetTimelineData)
      .enter()
      .append("g")
      .attr("class", "target-node")
      .attr(
        "transform",
        (d) =>
          `translate(${xScale(d.year)}, ${
            yScale(d.target)! + yScale.bandwidth() / 2
          })`
      );

    // 引导线
    nodes
      .append("line")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", 0)
      .attr("y2", (d) => {
        const nodeY = yScale(d.target)! + yScale.bandwidth() / 2;
        const lineLength = timelineY - nodeY;
        return Math.max(0, lineLength);
      })
      .style("stroke", "#D1D5DB")
      .style("stroke-width", 1)
      .style("stroke-dasharray", "3,3");

    // 节点圆圈 - 统一颜色
    nodes
      .append("circle")
      .attr("r", 8)
      .style("fill", "#3B82F6") // 统一使用蓝色
      .style("stroke", "white")
      .style("stroke-width", 2)
      .style("cursor", "pointer");

    // 靶点名称标签
    nodes
      .append("text")
      .attr("x", 15)
      .attr("y", 0)
      .attr("dy", "0.35em")
      .style("font-size", "14px")
      .style("font-weight", "600")
      .style("fill", "#374151")
      .text((d) => d.target);

    // 添加标题

    // 鼠标悬停效果
    nodes
      .on("mouseenter", function (event, d) {
        d3.select(this)
          .select("circle")
          .transition()
          .duration(200)
          .attr("r", 12)
          .style("fill", "#1D4ED8"); // 悬停时变深蓝色

        // 显示tooltip
        const tooltip = d3
          .select("body")
          .append("div")
          .attr("class", "timeline-tooltip")
          .style("position", "absolute")
          .style("background", "rgba(0, 0, 0, 0.9)")
          .style("color", "white")
          .style("padding", "10px 12px")
          .style("border-radius", "6px")
          .style("font-size", "14px")
          .style("pointer-events", "none")
          .style("opacity", 0)
          .style("z-index", "1000")
          .style("max-width", "300px")
          .style("box-shadow", "0 4px 12px rgba(0, 0, 0, 0.3)");

        tooltip
          .html(
            `
            <div style="font-weight: 600; margin-bottom: 4px;">${d.target}</div>
            <div style="margin-bottom: 6px; font-size: 11px; color: #ccc; line-height: 1.3;">${d.fullName}</div>
            <div style="font-size: 11px;"><strong>Discovery Year:</strong> ${d.year}</div>
          `
          )
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px")
          .transition()
          .duration(200)
          .style("opacity", 1);
      })
      .on("mouseleave", function () {
        d3.select(this)
          .select("circle")
          .transition()
          .duration(200)
          .attr("r", 8)
          .style("fill", "#3B82F6"); // 恢复原色

        d3.selectAll(".timeline-tooltip").remove();
      });

    // 清理函数
    return () => {
      d3.selectAll(".timeline-tooltip").remove();
    };
  }, []);

  return (
    <div className="shadow-card mb-4">
      <div className="card-title mb-4">Target Discovery Timeline</div>
      <div className="text-[14px] text-[#6B7280] mb-4">
        Timeline showing key therapeutic targets discovered and applied in TNBC
        research from 1980 to present. Hover over points for detailed
        information.
      </div>
      <div className="bg-white rounded-lg p-4">
        <svg
          ref={timelineRef}
          width="100%"
          height="320"
          viewBox="0 0 1000 320"
          className="overflow-visible"
        />
      </div>
    </div>
  );
}

export default TargetTimeline;
