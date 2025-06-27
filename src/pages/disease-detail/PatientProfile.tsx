import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
function PatientProfile() {
  const ageChartRef = useRef<SVGSVGElement>(null);
  const pieChartRef = useRef<SVGSVGElement>(null);
  const raceEthnicData = useMemo(
    () => [
      { race: "Non-Hispanic Black", percentage: 34.6, color: "#EF4444" },
      { race: "Hispanics", percentage: 17.6, color: "#3B82F6" },
      { race: "Non-Hispanic White", percentage: 16.63, color: "#10B981" },
      {
        race: "Non-Hispanic American Indian / Alaska Native",
        percentage: 16.48,
        color: "#F59E0B",
      },
      {
        race: "Non-Hispanic Asians and Pacific Islanders",
        percentage: 14.69,
        color: "#8B5CF6",
      },
    ],
    []
  );
  const ageDistributionData = useMemo(
    () => [
      { age: "<40", percentage: 32.94, color: "#EF4444" },
      { age: "40-49", percentage: 19.82, color: "#F59E0B" },
      { age: "50-59", percentage: 18.27, color: "#10B981" },
      { age: "60-69", percentage: 14.98, color: "#3B82F6" },
      { age: ">=70", percentage: 14.0, color: "#8B5CF6" },
    ],
    []
  );

  useEffect(() => {
    if (!ageChartRef.current) return;

    // 清除之前的图表
    d3.select(ageChartRef.current).selectAll("*").remove();

    const svg = d3.select(ageChartRef.current);
    const width = 280;
    const height = 280;
    const margin = 10;
    const radius = Math.min(width - margin * 2, height - margin * 2) / 2 - 20;

    // 添加定义区域用于阴影效果
    const defs = svg.append("defs");

    // 创建阴影滤镜
    const filter = defs
      .append("filter")
      .attr("id", "age-dropshadow")
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
      .attr("transform", `translate(${width / 2 - 40}, ${height / 2})`);

    // 创建饼图生成器
    const pie = d3
      .pie<any>()
      .value((d: any) => d.percentage)
      .sort(null)
      .padAngle(0.015); // 添加扇形之间的间距

    // 创建弧生成器
    const arc = d3
      .arc<any>()
      .innerRadius(0)
      .outerRadius(radius)
      .cornerRadius(1); // 添加圆角

    // 创建标签弧生成器
    const labelArc = d3
      .arc<any>()
      .innerRadius(radius * 0.6)
      .outerRadius(radius * 0.6);

    // 绘制饼图切片
    const arcs = g
      .selectAll(".arc")
      .data(pie(ageDistributionData))
      .enter()
      .append("g")
      .attr("class", "arc");

    // 添加路径（饼图切片）
    const paths = arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d: any) => d.data.color)
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .style("opacity", 0.85)
      .style("filter", "url(#age-dropshadow)")
      .style("shape-rendering", "geometricPrecision")
      .on("mouseover", function (_, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("transform", function () {
            const centroid = arc.centroid(d);
            return `translate(${centroid[0] * 0.08}, ${centroid[1] * 0.08})`;
          })
          .style("opacity", 1);
      })
      .on("mouseout", function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("transform", "translate(0,0)")
          .style("opacity", 0.85);
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
      .text((d: any) => `${d.data.percentage.toFixed(1)}%`)
      .style("opacity", 0);

    // 标签动画
    labels.transition().delay(1000).duration(500).style("opacity", 1);

    // 创建图例
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - 10}, 30)`);

    const legendItems = legend
      .selectAll(".legend-item")
      .data(ageDistributionData)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (_, i: number) => `translate(0, ${i * 22})`)
      .style("cursor", "pointer");

    // 图例背景
    legendItems
      .append("rect")
      .attr("x", -3)
      .attr("y", -2)
      .attr("width", 80)
      .attr("height", 18)
      .attr("rx", 9)
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
      .attr("r", 5)
      .attr("fill", (d: any) => d.color)
      .attr("stroke", "white")
      .attr("stroke-width", 1);

    // 图例文字
    legendItems
      .append("text")
      .attr("x", 16)
      .attr("y", 6)
      .attr("dy", "0.35em")
      .style("font-size", "13px")
      .style("font-weight", "500")
      .style("fill", "#374151")
      .text((d: any) => d.age);

    // 添加标题
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .style("font-size", "15px")
      .style("font-weight", "600")
      .style("fill", "#374151")
      .text("TNBC Age Distribution");
  }, [ageDistributionData]);

  useEffect(() => {
    if (!pieChartRef.current) return;

    // 清除之前的图表
    d3.select(pieChartRef.current).selectAll("*").remove();

    const svg = d3.select(pieChartRef.current);
    const width = 280;
    const height = 280;
    const margin = 10;
    const radius = Math.min(width - margin * 2, height - margin * 2) / 2 - 20;

    // 添加定义区域用于阴影效果
    const defs = svg.append("defs");

    // 创建阴影滤镜
    const filter = defs
      .append("filter")
      .attr("id", "race-dropshadow")
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
      .attr("transform", `translate(${width / 2 - 40}, ${height / 2})`);

    // 创建饼图生成器
    const pie = d3
      .pie<any>()
      .value((d: any) => d.percentage)
      .sort(null)
      .padAngle(0.015); // 添加扇形之间的间距

    // 创建弧生成器
    const arc = d3
      .arc<any>()
      .innerRadius(0)
      .outerRadius(radius)
      .cornerRadius(1); // 添加圆角

    // 创建标签弧生成器
    const labelArc = d3
      .arc<any>()
      .innerRadius(radius * 0.6)
      .outerRadius(radius * 0.6);

    // 绘制饼图切片
    const arcs = g
      .selectAll(".arc")
      .data(pie(raceEthnicData))
      .enter()
      .append("g")
      .attr("class", "arc");

    // 添加路径（饼图切片）
    const paths = arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d: any) => d.data.color)
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .style("opacity", 0.85)
      .style("filter", "url(#race-dropshadow)")
      .style("shape-rendering", "geometricPrecision")
      .on("mouseover", function (_, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("transform", function () {
            const centroid = arc.centroid(d);
            return `translate(${centroid[0] * 0.08}, ${centroid[1] * 0.08})`;
          })
          .style("opacity", 1);
      })
      .on("mouseout", function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("transform", "translate(0,0)")
          .style("opacity", 0.85);
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
      .style("font-size", "11px")
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
      .attr("transform", `translate(${width - 10}, 20)`);

    const legendItems = legend
      .selectAll(".legend-item")
      .data(raceEthnicData)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (_, i: number) => `translate(0, ${i * 25})`)
      .style("cursor", "pointer");

    // 图例背景
    legendItems
      .append("rect")
      .attr("x", -3)
      .attr("y", -2)
      .attr("width", 120)
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
      .attr("r", 5)
      .attr("fill", (d: any) => d.color)
      .attr("stroke", "white")
      .attr("stroke-width", 1);

    // 图例文字
    legendItems
      .append("text")
      .attr("x", 16)
      .attr("y", 6)
      .attr("dy", "0.35em")
      .style("font-size", "11px")
      .style("font-weight", "500")
      .style("fill", "#374151")
      .text((d: any) => {
        // 缩短长标签文字
        const raceMap: { [key: string]: string } = {
          "Non-Hispanic Black": "NH Black",
          Hispanics: "Hispanic",
          "Non-Hispanic White": "NH White",
          "Non-Hispanic American Indian / Alaska Native": "NH AI/AN",
          "Non-Hispanic Asians and Pacific Islanders": "NH API",
        };
        return raceMap[d.race] || d.race;
      });
    // 添加标题
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .style("font-size", "15px")
      .style("font-weight", "600")
      .style("fill", "#374151")
      .text("TNBC Racial/Ethnic Distribution");
  }, [raceEthnicData]);

  return (
    <div className="mt-4 bg-[#f8f9fa] rounded-lg p-4">
      <div className="text-[16px] font-[400] text-[#374151] mb-3">
        Patient Profile
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <svg
          ref={ageChartRef}
          width="100%"
          height="280"
          viewBox="0 0 280 280"
        />
        <svg
          ref={pieChartRef}
          width="100%"
          height="280"
          viewBox="0 0 280 280"
        />
      </div>
    </div>
  );
}

export default PatientProfile;
