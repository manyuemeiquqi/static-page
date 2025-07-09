import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
function PrevalenceCard() {
  const chartRef = useRef<SVGSVGElement>(null);

  const tnbcTrendData = useMemo(
    () => [
      {
        year: 2021,
        globalCases: 20643637,
        prevalence: 0.26,
        incidence: 0.03,
        newCases: 2121564,
        tnbcCases: 2198547,
      },
      {
        year: 2022,
        globalCases: 21161122,
        prevalence: 0.27,
        incidence: 0.03,
        newCases: 2173514,
        tnbcCases: 2253659,
      },
      {
        year: 2023,
        globalCases: 21691580,
        prevalence: 0.27,
        incidence: 0.03,
        newCases: 2226737,
        tnbcCases: 2310153,
      },
      {
        year: 2024,
        globalCases: 22235335,
        prevalence: 0.27,
        incidence: 0.03,
        newCases: 2281263,
        tnbcCases: 2368063,
      },
      {
        year: 2025,
        globalCases: 22792720,
        prevalence: 0.28,
        incidence: 0.03,
        newCases: 2337124,
        tnbcCases: 2427425,
      },
      {
        year: 2026,
        globalCases: 23364078,
        prevalence: 0.28,
        incidence: 0.03,
        newCases: 2394352,
        tnbcCases: 2488274,
      },
      {
        year: 2027,
        globalCases: 23949758,
        prevalence: 0.29,
        incidence: 0.03,
        newCases: 2452983,
        tnbcCases: 2550649,
      },
      {
        year: 2028,
        globalCases: 24550120,
        prevalence: 0.29,
        incidence: 0.03,
        newCases: 2513048,
        tnbcCases: 2614588,
      },
      {
        year: 2029,
        globalCases: 25165531,
        prevalence: 0.3,
        incidence: 0.03,
        newCases: 2574585,
        tnbcCases: 2680129,
      },
      {
        year: 2030,
        globalCases: 25796369,
        prevalence: 0.3,
        incidence: 0.03,
        newCases: 2637629,
        tnbcCases: 2747313,
      },
    ],
    []
  );

  useEffect(() => {
    if (!chartRef.current) return;

    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 40, right: 40, bottom: 60, left: 80 };
    const width = 600 - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    // 创建渐变和滤镜定义
    const defs = svg.append("defs");

    // 柱状图渐变
    const barGradient = defs
      .append("linearGradient")
      .attr("id", "prevalenceBarGradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    barGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#8B5CF6")
      .attr("stop-opacity", 0.9);

    barGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#3B82F6")
      .attr("stop-opacity", 0.6);

    // 悬停渐变
    const hoverGradient = defs
      .append("linearGradient")
      .attr("id", "prevalenceHoverGradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    hoverGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#A855F7")
      .attr("stop-opacity", 1);

    hoverGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#6366F1")
      .attr("stop-opacity", 0.8);

    // 发光滤镜
    const glowFilter = defs
      .append("filter")
      .attr("id", "prevalenceGlow")
      .attr("width", "300%")
      .attr("height", "300%")
      .attr("x", "-100%")
      .attr("y", "-100%");

    glowFilter
      .append("feGaussianBlur")
      .attr("stdDeviation", "3")
      .attr("result", "coloredBlur");

    const feMerge = glowFilter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // 创建比例尺
    const xScale = d3
      .scaleBand()
      .domain(tnbcTrendData.map((d) => d.year.toString()))
      .range([0, width])
      .padding(0.25);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(tnbcTrendData, (d) => d.tnbcCases) || 0])
      .nice()
      .range([height, 0]);

    // 添加背景网格
    const yTicks = yScale.ticks(6);
    g.selectAll(".grid-line")
      .data(yTicks)
      .enter()
      .append("line")
      .attr("class", "grid-line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", (d) => yScale(d))
      .attr("y2", (d) => yScale(d))
      .style("stroke", "#F1F5F9")
      .style("stroke-width", 1)
      .style("opacity", 0.6);

    // 创建柱状图容器
    const bars = g
      .selectAll(".bar")
      .data(tnbcTrendData)
      .enter()
      .append("g")
      .attr("class", "bar")
      .attr("transform", (d) => `translate(${xScale(d.year.toString())},0)`);

    // 柱状图阴影
    bars
      .append("rect")
      .attr("x", 2)
      .attr("y", (d) => yScale(d.tnbcCases) + 2)
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.tnbcCases))
      .attr("rx", 6)
      .style("fill", "#000000")
      .style("opacity", 0.1);

    // 主柱状图
    const mainBars = bars
      .append("rect")
      .attr("x", 0)
      .attr("y", height)
      .attr("width", xScale.bandwidth())
      .attr("height", 0)
      .attr("rx", 6)
      .style("fill", "url(#prevalenceBarGradient)")
      .style("cursor", "pointer")
      .style("filter", "url(#prevalenceGlow)");

    // 柱状图动画
    mainBars
      .transition()
      .duration(1200)
      .delay((_, i) => i * 120)
      .ease(d3.easeCubicOut)
      .attr("y", (d) => yScale(d.tnbcCases))
      .attr("height", (d) => height - yScale(d.tnbcCases));
    // 数值标签 - 使用条件判断
    const labels = bars
      .append("text")
      .attr("x", xScale.bandwidth() / 2)
      .attr("y", height)
      .attr("text-anchor", "middle")
      .style("font-size", "11px")
      .style("font-weight", "600")
      .style("fill", "#374151")
      .style("opacity", 0);

    // 标签动画 - 只对第一个和最后一个显示
    labels
      .filter((_, i) => i === 0 || i === tnbcTrendData.length - 1)
      .transition()
      .duration(1200)
      .delay((_, i) => (i === 0 ? 600 : (tnbcTrendData.length - 1) * 120 + 600))
      .attr("y", (d) => yScale(d.tnbcCases) - 8)
      .style("opacity", 1)
      .text((d) => `${(d.tnbcCases / 1000000).toFixed(1)}M`);

    // X轴
    const xAxis = g
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .style("font-size", "12px")
      .style("color", "#6B7280");

    // 美化X轴
    xAxis.select(".domain").remove();
    xAxis.selectAll(".tick line").remove();
    xAxis
      .selectAll("text")
      .style("fill", "#6B7280")
      .style("font-weight", "500");

    // Y轴
    const yAxis = g
      .append("g")
      .call(
        d3
          .axisLeft(yScale)
          .ticks(6)
          .tickFormat((d) => `${((d as number) / 1000000).toFixed(1)}M`)
          .tickSize(-width)
      )
      .style("font-size", "12px")
      .style("color", "#6B7280");

    // 美化Y轴
    yAxis.select(".domain").remove();
    yAxis
      .selectAll(".tick line")
      .style("stroke", "#E2E8F0")
      .style("stroke-dasharray", "2,2")
      .style("opacity", 0.5);

    yAxis
      .selectAll("text")
      .style("fill", "#6B7280")
      .style("font-weight", "500");

    // 轴标签
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "13px")
      .style("font-weight", "600")
      .style("fill", "#374151")
      .text("TNBC Cases (Millions)");

    g.append("text")
      .attr(
        "transform",
        `translate(${width / 2}, ${height + margin.bottom - 10})`
      )
      .style("text-anchor", "middle")
      .style("font-size", "13px")
      .style("font-weight", "600")
      .style("fill", "#374151")
      .text("Year");

    // 交互效果
    bars
      .on("mouseenter", function (event, d) {
        d3.select(this)
          .select("rect:nth-child(2)")
          .transition()
          .duration(200)
          .style("fill", "url(#prevalenceHoverGradient)")
          .style("filter", "url(#prevalenceGlow) brightness(1.1)");

        // 显示详细信息
        const tooltip = d3
          .select("body")
          .append("div")
          .attr("class", "prevalence-tooltip")
          .style("position", "absolute")
          .style(
            "background",
            "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)"
          )
          .style("color", "white")
          .style("padding", "12px 16px")
          .style("border-radius", "12px")
          .style("font-size", "13px")
          .style("pointer-events", "none")
          .style("opacity", 0)
          .style("z-index", "1000")
          .style("box-shadow", "0 8px 32px rgba(0,0,0,0.3)")
          .style("backdrop-filter", "blur(10px)");

        tooltip
          .html(
            `
          <div style="font-weight: 700; margin-bottom: 6px;">${d.year}</div>
          <div style="margin-bottom: 4px;"><strong>TNBC Cases:</strong> ${(
            d.tnbcCases / 1000000
          ).toFixed(2)}M</div>
     
  
        `
          )
          .style("left", event.pageX + 15 + "px")
          .style("top", event.pageY - 15 + "px")
          .transition()
          .duration(200)
          .style("opacity", 1);
      })
      .on("mouseleave", function () {
        d3.select(this)
          .select("rect:nth-child(2)")
          .transition()
          .duration(200)
          .style("fill", "url(#prevalenceBarGradient)")
          .style("filter", "url(#prevalenceGlow)");

        d3.selectAll(".prevalence-tooltip").remove();
      });

    // 添加趋势线
    const line = d3
      .line<(typeof tnbcTrendData)[0]>()
      .x((d) => xScale(d.year.toString())! + xScale.bandwidth() / 2)
      .y((d) => yScale(d.tnbcCases))
      .curve(d3.curveCardinal);

    g.append("path")
      .datum(tnbcTrendData)
      .attr("fill", "none")
      .attr("stroke", "#F59E0B")
      .attr("stroke-width", 3)
      .attr("stroke-dasharray", "6,3")
      .attr("opacity", 0.8)
      .attr("d", line);

    // 趋势线上的点
    g.selectAll(".trend-dot")
      .data(tnbcTrendData)
      .enter()
      .append("circle")
      .attr("class", "trend-dot")
      .attr("cx", (d) => xScale(d.year.toString())! + xScale.bandwidth() / 2)
      .attr("cy", (d) => yScale(d.tnbcCases))
      .attr("r", 3)
      .style("fill", "#F59E0B")
      .style("stroke", "white")
      .style("stroke-width", 2);

    // 清理函数
    return () => {
      d3.selectAll(".prevalence-tooltip").remove();
    };
  }, [tnbcTrendData]);
  return (
    <div className="bg-[#f8f9fa] rounded-lg p-4 mb-4">
      <div className="text-[16px] font-[500] text-[#374151] mb-2">
        Prevalence
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-5 bg-[#f8f9fa] gap-3">
        <div
          className="lg:col-span-3 order-2 lg:order-1 rounded-lg p-3 text-[14px] text-[#6B7280] leading-relaxed
                        lg:block
                        md:hidden sm:hidden
                        xl:col-span-3
                        2xl:col-span-3"
        >
          <div className="mb-2">
            There were an estimated{" "}
            <span className="font-bold text-primary">2.3 million</span> new
            female breast cancer cases worldwide in 2022, and{" "}
            <span className="font-bold text-red-600">670,000</span> breast
            cancer– related deaths. Breast cancer was the top 2 most commonly
            diagnosed cancer in 183 of 185 countries.
          </div>
          <div>
            TNBC (HR⁻/HER2⁻) accounts for{" "}
            <span className="font-bold text-primary">
              10.65% of all breast cancers
            </span>{" "}
            (13.9 cases per 100,000 women annually).
          </div>
        </div>

        {/* 小屏幕简化文字版本 */}
        <div className="lg:hidden order-2 rounded-lg p-2 text-[12px] text-[#6B7280] leading-relaxed">
          <div className="text-center">
            <span className="font-bold text-primary">2.3M</span> new cases
            worldwide (2022) • TNBC accounts for{" "}
            <span className="font-bold text-primary">10.65%</span> of breast
            cancers
          </div>
        </div>

        <div
          className="lg:col-span-2 order-1 lg:order-2 
                        flex justify-center items-center
                        min-w-0 overflow-hidden"
        >
          <svg
            ref={chartRef}
            width="100%"
            height="350"
            className="overflow-visible max-w-full"
            style={{ background: "transparent" }}
            viewBox="0 0 600 350"
            preserveAspectRatio="xMidYMid meet"
          />
        </div>
      </div>
    </div>
  );
}
export default PrevalenceCard;
