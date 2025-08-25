import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface PatentTrendData {
  year: number;
  applications: number;
  growthRate: number;
  totalCumulative: number;
}

const PatentTrend: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredPoint, setHoveredPoint] = useState<PatentTrendData | null>(
    null
  );
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [showTooltip, setShowTooltip] = useState(false);

  const trendData: PatentTrendData[] = [
    { year: 2004, applications: 3, growthRate: 0, totalCumulative: 3 },
    { year: 2005, applications: 2, growthRate: -33.3, totalCumulative: 5 },
    { year: 2006, applications: 8, growthRate: 300, totalCumulative: 13 },
    { year: 2007, applications: 9, growthRate: 12.5, totalCumulative: 22 },
    { year: 2008, applications: 19, growthRate: 111.1, totalCumulative: 41 },
    { year: 2009, applications: 14, growthRate: -26.3, totalCumulative: 55 },
    { year: 2010, applications: 15, growthRate: 7.1, totalCumulative: 70 },
    { year: 2011, applications: 21, growthRate: 40, totalCumulative: 91 },
    { year: 2012, applications: 56, growthRate: 166.7, totalCumulative: 147 },
    { year: 2013, applications: 76, growthRate: 35.7, totalCumulative: 223 },
    { year: 2014, applications: 91, growthRate: 19.7, totalCumulative: 314 },
    { year: 2015, applications: 156, growthRate: 71.4, totalCumulative: 470 },
    { year: 2016, applications: 200, growthRate: 28.2, totalCumulative: 670 },
    { year: 2017, applications: 222, growthRate: 11, totalCumulative: 892 },
    { year: 2018, applications: 251, growthRate: 13.1, totalCumulative: 1143 },
    { year: 2019, applications: 266, growthRate: 6, totalCumulative: 1409 },
    { year: 2020, applications: 228, growthRate: -14.3, totalCumulative: 1637 },
    { year: 2021, applications: 154, growthRate: -32.5, totalCumulative: 1791 },
    { year: 2022, applications: 128, growthRate: -16.9, totalCumulative: 1919 },
    { year: 2023, applications: 99, growthRate: -22.7, totalCumulative: 2018 },
    { year: 2024, applications: 17, growthRate: -82.8, totalCumulative: 2035 },
  ];

  const maxApplications = Math.max(...trendData.map((d) => d.applications));

  const getGrowthRateColor = (rate: number) => {
    if (rate > 0) return "text-green-600";
    if (rate < 0) return "text-red-600";
    return "text-gray-600";
  };

  const getGrowthRateIcon = (rate: number) => {
    if (rate > 0) return "↗️";
    if (rate < 0) return "↘️";
    return "→";
  };

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    // Set up dimensions - reduced size
    const margin = { top: 15, right: 20, bottom: 30, left: 50 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3.scaleLinear().domain([2004, 2024]).range([0, width]);

    const yScale = d3.scaleLinear().domain([0, 280]).range([height, 0]);

    // Line generator
    const line = d3
      .line<PatentTrendData>()
      .x((d) => xScale(d.year))
      .y((d) => yScale(d.applications))
      .curve(d3.curveMonotoneX);

    // Add grid lines first (behind everything)
    g.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickFormat(d3.format("d"))
          .tickSize(-height)
          .tickValues([2004, 2008, 2012, 2016, 2020, 2024])
      )
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .attr("stroke", "#e5e7eb")
          .attr("stroke-opacity", 0.3)
      )
      .call((g) => g.selectAll(".tick text").style("opacity", 0));

    g.append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-width)
          .tickValues([0, 50, 100, 150, 200, 250, 280])
      )
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .attr("stroke", "#e5e7eb")
          .attr("stroke-opacity", 0.3)
      )
      .call((g) => g.selectAll(".tick text").style("opacity", 0));

    // Add the line path
    g.append("path")
      .datum(trendData)
      .attr("fill", "none")
      .attr("stroke", "#2563eb")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Add hover line first
    const hoverLine = g
      .append("line")
      .attr("class", "hover-line")
      .attr("stroke", "#2563eb")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "2,2")
      .style("opacity", 0);

    // Add data points
    const dataPoints = g
      .selectAll(".data-point")
      .data(trendData)
      .enter()
      .append("circle")
      .attr("class", "data-point")
      .attr("cx", (d) => xScale(d.year))
      .attr("cy", (d) => yScale(d.applications))
      .attr("r", 5)
      .attr("fill", "white")
      .attr("stroke", "#2563eb")
      .attr("stroke-width", 2)
      .style("cursor", "pointer");

    // Add all event handlers to data points
    dataPoints
      .on("mouseenter", function (event, d) {
        console.log("Mouse enter triggered", d); // Debug log

        // Set hovered point data
        setHoveredPoint(d);
        setShowTooltip(true);

        // Enhance the point appearance
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 8)
          .attr("stroke-width", 3)
          .attr("fill", "#2563eb")
          .attr("stroke", "#ffffff");

        // Show hover line
        const [mouseX] = d3.pointer(event);
        hoverLine
          .transition()
          .duration(200)
          .style("opacity", 0.6)
          .attr("x1", mouseX)
          .attr("x2", mouseX)
          .attr("y1", 0)
          .attr("y2", height);

        // Update mouse position
        setMousePosition({
          x: event.clientX,
          y: event.clientY,
        });
      })
      .on("mousemove", function (event, d) {
        // Update mouse position for tooltip
        setMousePosition({
          x: event.clientX,
          y: event.clientY,
        });
      })
      .on("mouseleave", function () {
        console.log("Mouse leave triggered"); // Debug log

        // Reset state
        setHoveredPoint(null);
        setShowTooltip(false);

        // Restore original point appearance
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 5)
          .attr("stroke-width", 2)
          .attr("fill", "white")
          .attr("stroke", "#2563eb");

        // Hide hover line
        hoverLine.transition().duration(200).style("opacity", 0);
      });

    // Add axes with labels (on top of grid)
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickFormat(d3.format("d"))
          .tickValues([2004, 2008, 2012, 2016, 2020, 2024])
      )
      .style("font-size", "10px")
      .style("color", "#6b7280")
      .call((g) => g.select(".domain").remove())
      .call((g) => g.selectAll(".tick line").style("opacity", 0));

    g.append("g")
      .call(d3.axisLeft(yScale).tickValues([0, 50, 100, 150, 200, 250, 280]))
      .style("font-size", "10px")
      .style("color", "#6b7280")
      .call((g) => g.select(".domain").remove())
      .call((g) => g.selectAll(".tick line").style("opacity", 0));

    // Add axis labels
    g.append("text")
      .attr("transform", `translate(${width / 2}, ${height + 25})`)
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "#6b7280")
      .text("Application Year");

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "#6b7280")
      .text("Count of Patent");
  }, []);

  return (
    <div className="shadow-card mb-4">
      <div className="card-title mb-4">Patent Application Trends</div>

      <div className="relative">
        {/* D3 Chart */}
        <div className="flex justify-center">
          <svg ref={svgRef} className="w-full max-w-lg"></svg>
        </div>

        {/* Enhanced Hover tooltip */}
        {showTooltip && hoveredPoint && (
          <div
            className="fixed bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full"
            style={{
              left: mousePosition.x,
              top: mousePosition.y - 15,
              minWidth: "200px",
              backdropFilter: "blur(10px)",
              background: "rgba(255, 255, 255, 0.95)",
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
              <div className="w-3 h-3 rounded-full bg-[#2563eb]"></div>
              <div className="text-lg font-bold text-gray-900">
                {hoveredPoint.year}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Applications:</span>
                <span className="font-bold text-[#2563eb] text-lg">
                  {hoveredPoint.applications}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Growth Rate:</span>
                <div className="flex items-center gap-1">
                  <span className="text-lg">
                    {getGrowthRateIcon(hoveredPoint.growthRate)}
                  </span>
                  <span
                    className={`font-bold text-sm ${getGrowthRateColor(
                      hoveredPoint.growthRate
                    )}`}
                  >
                    {hoveredPoint.growthRate > 0 ? "+" : ""}
                    {hoveredPoint.growthRate.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Cumulative:</span>
                <span className="font-bold text-gray-900">
                  {hoveredPoint.totalCumulative.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Arrow pointer */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 w-0 h-0"
              style={{
                bottom: "-6px",
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: "6px solid rgba(255, 255, 255, 0.95)",
              }}
            ></div>
          </div>
        )}
      </div>

      {/* Chart legend and stats */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-[#2563eb]"></div>
            <span className="text-sm text-gray-600">Historical Data</span>
          </div>
        </div>

        <div className="flex gap-4 text-sm">
          <div className="text-center">
            <div className="text-lg font-bold text-[#2563eb]">
              {trendData[trendData.length - 1].applications}
            </div>
            <div className="text-gray-500">Latest</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">
              {maxApplications}
            </div>
            <div className="text-gray-500">Peak</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">
              {trendData[trendData.length - 1].totalCumulative}
            </div>
            <div className="text-gray-500">Total</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatentTrend;
