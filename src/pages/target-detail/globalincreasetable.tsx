import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
function Growingtrend() {
  const chartRef = useRef<SVGSVGElement>(null);

  const parp1trending = useMemo(
    () => [
      {
        year: 2025,
        glrevenue: 8803264600,
      },
      {
        year: 2026,
        glrevenue: 9938885730,
      },
      {
        year: 2027,
        glrevenue: 11221002000,
      },
      {
        year: 2028,
        glrevenue: 12668511300,
      },
      {
        year: 2029,
        glrevenue: 14302749200,
      },
      {
        year: 2030,
        glrevenue: 16147803800,
      },
      {
        year: 2031,
        glrevenue: 18230870500,
      },
      {
        year: 2032,
        glrevenue: 20582652800,
      },
      {
        year: 2033,
        glrevenue: 23237815100,
      },
      {
        year: 2034,
        glrevenue: 26235493200,
      },
      {
        year: 2035,
        glrevenue: 29619871800,
      },
    ],
    []
  );

  const globalsize = useMemo(
    () => [
      {
        year: 2025,
        value: 4377600000,
      },
      {
        year: 2026,
        value: 5042995200,
      },
      {
        year: 2027,
        value: 5809530470,
      },
      {
        year: 2028,
        value: 6692579102,
      },
      {
        year: 2029,
        value: 7709851125,
      },
      {
        year: 2030,
        value: 8881748496,
      },
      {
        year: 2031,
        value: 10231774270,
      },
      {
        year: 2032,
        value: 11787003960,
      },
      {
        year: 2033,
        value: 13578628560,
      },
      {
        year: 2034,
        value: 15642580100,
      },
      {
        year: 2035,
        value: 18020252270,
      },
    ],
    []
  );

  useEffect(() => {
    if (!chartRef.current) return;

    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 40, left: 50 };
    const width = 450 - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom;

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
      .domain(parp1trending.map((d) => d.year.toString()))
      .range([0, width])
      .padding(0.25);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(parp1trending, (d) => d.glrevenue) || 0])
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
      .data(parp1trending)
      .enter()
      .append("g")
      .attr("class", "bar")
      .attr("transform", (d) => `translate(${xScale(d.year.toString())},0)`);

    // 柱状图阴影
    bars
      .append("rect")
      .attr("x", 2)
      .attr("y", (d) => yScale(d.glrevenue) + 2)
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.glrevenue))
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
      .attr("y", (d) => yScale(d.glrevenue))
      .attr("height", (d) => height - yScale(d.glrevenue));

    // 数值标签
    const labels = bars
      .append("text")
      .attr("x", xScale.bandwidth() / 2)
      .attr("y", height)
      .attr("text-anchor", "middle")
      .style("font-size", "8px")
      .style("font-weight", "600")
      .style("fill", "#374151")
      .style("opacity", 0);

    // 标签动画
    labels
      .transition()
      .duration(1200)
      .delay((_, i) => i * 120 + 600)
      .attr("y", (d) => yScale(d.glrevenue) - 8)
      .style("opacity", 1)
      .text((d) => `${(d.glrevenue / 1000000000).toFixed(1)}B`);

    // X轴
    const xAxis = g
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .style("font-size", "9px")
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
          .ticks(4)
          .tickFormat((d) => `${((d as number) / 1000000000).toFixed(1)}B`)
          .tickSize(-width)
      )
      .style("font-size", "9px")
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
      .style("font-size", "10px")
      .style("font-weight", "600")
      .style("fill", "#374151")
      .text("Revenue (B)");

    g.append("text")
      .attr(
        "transform",
        `translate(${width / 2}, ${height + margin.bottom - 5})`
      )
      .style("text-anchor", "middle")
      .style("font-size", "10px")
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
          <div style="margin-bottom: 4px;"><strong>Revenue:</strong> $${(
            d.glrevenue / 1000000000
          ).toFixed(2)}B</div>
     
  
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

    // 添加折线图
    const line = d3
      .line<(typeof globalsize)[0]>()
      .x((d) => xScale(d.year.toString())! + xScale.bandwidth() / 2)
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // 绘制折线
    g.append("path")
      .datum(globalsize)
      .attr("fill", "none")
      .attr("stroke", "#F59E0B")
      .attr("stroke-width", 2)
      .attr("opacity", 0.9)
      .attr("d", line)
      .style("filter", "drop-shadow(0 2px 4px rgba(245, 158, 11, 0.3))");

    // 折线上的数据点
    g.selectAll(".line-dot")
      .data(globalsize)
      .enter()
      .append("circle")
      .attr("class", "line-dot")
      .attr("cx", (d) => xScale(d.year.toString())! + xScale.bandwidth() / 2)
      .attr("cy", (d) => yScale(d.value))
      .attr("r", 4)
      .style("fill", "#F59E0B")
      .style("stroke", "white")
      .style("stroke-width", 2)
      .style("cursor", "pointer")
      .style("filter", "drop-shadow(0 2px 4px rgba(245, 158, 11, 0.4))")
      .on("mouseenter", function (event, d) {
        // 放大圆点
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 6)
          .style("fill", "#F97316");

        // 显示折线图的tooltip
        const lineTooltip = d3
          .select("body")
          .append("div")
          .attr("class", "line-tooltip")
          .style("position", "absolute")
          .style(
            "background",
            "linear-gradient(135deg, #F59E0B 0%, #F97316 100%)"
          )
          .style("color", "white")
          .style("padding", "10px 14px")
          .style("border-radius", "8px")
          .style("font-size", "12px")
          .style("pointer-events", "none")
          .style("opacity", 0)
          .style("z-index", "1001")
          .style("box-shadow", "0 4px 20px rgba(245, 158, 11, 0.4)");

        lineTooltip
          .html(
            `
            <div style="font-weight: 600; margin-bottom: 4px;">${d.year}</div>
            <div><strong>Revenue:</strong> $${(
              d.value / 1000000000
            ).toFixed(2)}B</div>
            `
          )
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px")
          .transition()
          .duration(200)
          .style("opacity", 1);
      })
      .on("mouseleave", function () {
        // 恢复圆点大小
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 4)
          .style("fill", "#F59E0B");

        d3.selectAll(".line-tooltip").remove();
      });

    // 清理函数
    return () => {
      d3.selectAll(".prevalence-tooltip").remove();
      d3.selectAll(".line-tooltip").remove();
    };
  }, [parp1trending, globalsize]);
  return (
    <div className="bg-[#f8f9fa] rounded-lg p-4 mb-4">
      <div className="grid grid-cols-5 bg-[#f8f9fa]  gap-3">
        <svg
          ref={chartRef}
          width="400"
          height="200"
          viewBox="0 0 400 200"
          className="overflow-visible"
          style={{ background: "transparent" }}
        />
      </div>
    </div>
  );
}
export default Growingtrend;
