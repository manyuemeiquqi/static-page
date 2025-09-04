import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface CompanyData {
  company: string;
  percentage: number;
  color: string;
}

const CompanyDistribution: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredSlice, setHoveredSlice] = useState<CompanyData | null>(null);

  const companyData: CompanyData[] = [
    {
      company: "BROAD INST INC",
      percentage: 17.5,
      color: "#3b82f6", // 更亮的蓝色
    },
    {
      company: "MASSACHUSETTS INST TECHNOLOGY",
      percentage: 16.2,
      color: "#ef4444", // 更亮的红色
    },
    {
      company: "DANA FARBER CANCER INST INC",
      percentage: 12.8,
      color: "#10b981", // 更亮的绿色
    },
    {
      company: "GILEAD SCIENCES INC",
      percentage: 9.6,
      color: "#8b5cf6", // 更亮的紫色
    },
    {
      company: "IMMATICS BIOTECHNOLOGIES GMBH",
      percentage: 8.9,
      color: "#f59e0b", // 更亮的橙色
    },
    {
      company: "UNIV TEXAS",
      percentage: 8.8,
      color: "#06b6d4", // 更亮的青色
    },
    {
      company: "HARVARD COLLEGE",
      percentage: 7.5,
      color: "#ec4899", // 更亮的粉色
    },
    {
      company: "CARIBOU BIOSCIENCES INC",
      percentage: 6.6,
      color: "#84cc16", // 更亮的黄绿色
    },
    {
      company: "UNIV CALIFORNIA",
      percentage: 6.5,
      color: "#22c55e", // 更亮的绿色
    },
    {
      company: "EDITAS MEDICINE INC",
      percentage: 5.7,
      color: "#a855f7", // 更亮的紫色
    },
  ];

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current);
    const width = 400;
    const height = 400;
    const margin = 10;
    const radius = Math.min(width - margin * 2, height - margin * 2) / 2 - 40;

    // Add definitions for shadow effect
    const defs = svg.append("defs");

    // Create shadow filter
    const filter = defs
      .append("filter")
      .attr("id", "company-dropshadow")
      .attr("x", "-50%")
      .attr("y", "-50%")
      .attr("width", "200%")
      .attr("height", "200%");

    filter
      .append("feDropShadow")
      .attr("dx", 1)
      .attr("dy", 1)
      .attr("stdDeviation", 2)
      .attr("flood-color", "#00000015");

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Create pie generator
    const pie = d3
      .pie<CompanyData>()
      .value((d) => d.percentage)
      .sort(null)
      .padAngle(0.015); // Add spacing between slices

    // Create arc generator
    const arc = d3
      .arc<d3.PieArcDatum<CompanyData>>()
      .innerRadius(0)
      .outerRadius(radius)
      .cornerRadius(1); // Add rounded corners

    // Create label arc generator
    const labelArc = d3
      .arc<d3.PieArcDatum<CompanyData>>()
      .innerRadius(radius * 0.6)
      .outerRadius(radius * 0.6);

    // Generate pie data
    const pieData = pie(companyData);

    // Draw pie slices
    const arcs = g
      .selectAll(".arc")
      .data(pieData)
      .enter()
      .append("g")
      .attr("class", "arc");

    // Add paths (pie slices)
    const paths = arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => d.data.color)
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .style("opacity", 0.85)
      .style("filter", "url(#company-dropshadow)")
      .style("shape-rendering", "geometricPrecision")
      .style("cursor", "pointer")
      .on("mouseover", function (event, d) {
        // Scale effect
        d3.select(this)
          .transition()
          .duration(200)
          .attr("transform", function () {
            const centroid = arc.centroid(d);
            return `translate(${centroid[0] * 0.08}, ${centroid[1] * 0.08})`;
          })
          .style("opacity", 1);

        setHoveredSlice(d.data);

        // Show tooltip
        const tooltip = d3
          .select("body")
          .append("div")
          .attr("class", "company-tooltip")
          .style("position", "absolute")
          .style("background", "rgba(0, 0, 0, 0.8)")
          .style("color", "white")
          .style("padding", "8px 12px")
          .style("border-radius", "6px")
          .style("font-size", "12px")
          .style("pointer-events", "none")
          .style("opacity", 0)
          .style("z-index", "1000")
          .style("box-shadow", "0 4px 12px rgba(0,0,0,0.3)");

        tooltip
          .html(
            `
            <div style="font-weight: 600; margin-bottom: 2px;">${d.data.company}</div>
            <div>${d.data.percentage}%</div>
            `
          )
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px")
          .transition()
          .duration(200)
          .style("opacity", 1);
      })
      .on("mouseout", function () {
        // Restore original state
        d3.select(this)
          .transition()
          .duration(200)
          .attr("transform", "translate(0,0)")
          .style("opacity", 0.85);

        setHoveredSlice(null);

        // Remove tooltip
        d3.selectAll(".company-tooltip").remove();
      });

    // Animation effect
    paths
      .transition()
      .duration(1000)
      .attrTween("d", function (d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function (t) {
          return arc(interpolate(t))!;
        };
      });

    // Add percentage labels
    const labels = arcs
      .append("text")
      .attr("transform", (d) => `translate(${labelArc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style("font-size", "11px")
      .style("font-weight", "600")
      .style("fill", "white")
      .style("text-shadow", "1px 1px 2px rgba(0,0,0,0.5)")
      .style("pointer-events", "none")
      .text((d) => `${d.data.percentage}%`)
      .style("opacity", 0);

    // Label animation
    labels.transition().delay(1000).duration(500).style("opacity", 1);

    // Add title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 25)
      .style("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "600")
      .style("fill", "#374151")

    // Cleanup function
    return () => {
      d3.selectAll(".company-tooltip").remove();
    };
  }, []);

  return (
    <div className="shadow-card mb-4">
      <div className="card-title mb-4">
        Company Patent Application Distribution
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-center lg:items-start">
        {/* Top 5 Companies Legend */}
        <div className="flex flex-col gap-1 min-w-[150px]">
          {companyData.slice(0, 5).map((item, index) => (
            <div key={index} className="flex items-start gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-sm mt-0.5 flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1 min-w-0">
                <span className="text-xs text-gray-700 leading-tight break-words">
                  {item.company}
                </span>
                <span className="text-xs text-gray-500 block">
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* D3 Chart */}
        <div className="flex justify-center lg:flex-1">
          <svg
            ref={svgRef}
            width="450"
            height="450"
            viewBox="0 0 400 500"
            className="max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyDistribution;
