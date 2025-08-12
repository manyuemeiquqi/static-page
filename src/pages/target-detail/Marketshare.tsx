import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";

function Companyshare() {
  const nameChartRef = useRef<SVGSVGElement>(null);
  const cancerChartRef = useRef<SVGSVGElement>(null);
  const gmarketChartRef = useRef<SVGSVGElement>(null);

  const companyshareData = useMemo(
    () => [
      {
        name: "Merck",
        percentage: 18,
        color: "#8B5CF6",
      },
      {
        name: "Thermo Fisher Scientific",
        percentage: 15,
        color: "#3B82F6",
      },
      {
        name: "Bio-Rad",
        percentage: 10,
        color: "#10B981",
      },
      {
        name: "Abcam",
        percentage: 8,
        color: "#06B6D4",
      },
      {
        name: "Cell Signaling Technology",
        percentage: 7,
        color: "#7C3AED",
      },
      {
        name: "Others",
        percentage: 39,
        color: "#6B7280",
      },
    ],
    []
  );

  const cancershareData = useMemo(
    () => [
      {
        type: "Ovarian",
        percentage: 50,
        color: "#8B5CF6",
      },
      {
        type: "Breast",
        percentage: 28,
        color: "#EC4899",
      },
      {
        type: "Prostate",
        percentage: 12,
        color: "#3B82F6",
      },
      {
        type: "Lung",
        percentage: 6,
        color: "#10B981",
      },
      {
        type: "Pancreatic",
        percentage: 2,
        color: "#F59E0B",
      },
      {
        type: "Other",
        percentage: 2,
        color: "#6B7280",
      },
    ],
    []
  );

  const gmarketData = useMemo(
    () => [
      {
        name: "Olaparib",
        percentage: 25,
        color: "#8B5CF6",
      },
      {
        name: "Rucaparib",
        percentage: 23,
        color: "#3B82F6",
      },
      {
        name: "Niraparib",
        percentage: 20,
        color: "#10B981",
      },
      {
        name: "Talazoparib",
        percentage: 17,
        color: "#F59E0B",
      },
      {
        name: "Others",
        percentage: 15,
        color: "#6B7280",
      },
    ],
    []
  );

  useEffect(() => {
    if (!nameChartRef.current) return;

    // 清除之前的图表
    d3.select(nameChartRef.current).selectAll("*").remove();

    const svg = d3.select(nameChartRef.current);
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
      .data(pie(companyshareData))
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
      .style("cursor", "pointer")
      .on("mouseover", function (event, d) {
        // 放大效果
        d3.select(this)
          .transition()
          .duration(200)
          .attr("transform", function () {
            const centroid = arc.centroid(d);
            return `translate(${centroid[0] * 0.08}, ${centroid[1] * 0.08})`;
          })
          .style("opacity", 1);

        // 显示tooltip
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
            <div style="font-weight: 600; margin-bottom: 2px;">${d.data.name}</div>
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
        // 恢复原状
        d3.select(this)
          .transition()
          .duration(200)
          .attr("transform", "translate(0,0)")
          .style("opacity", 0.85);

        // 移除tooltip
        d3.selectAll(".company-tooltip").remove();
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
      .attr("transform", `translate(${width - 10}, 30)`);

    const legendItems = legend
      .selectAll(".legend-item")
      .data(companyshareData)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (_, i: number) => {
        const col = Math.floor(i / 10); // 每列10个项目
        const row = i % 10;
        return `translate(${col * 90}, ${row * 24})`;
      })
      .style("cursor", "pointer");

    // 图例背景
    legendItems
      .append("rect")
      .attr("x", -3)
      .attr("y", -2)
      .attr("width", 88)
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
      .attr("cy", 7)
      .attr("r", 4)
      .attr("fill", (d: any) => d.color)
      .attr("stroke", "white")
      .attr("stroke-width", 1);

    // 图例文字 - 支持双行显示
    legendItems.each(function (d: any) {
      const textElement = d3.select(this);
      const name = d.name;

      if (name.length > 15) {
        // 长名称分两行显示
        const words = name.split(" ");
        let firstLine = "";
        let secondLine = "";

        // 智能分割单词
        for (let i = 0; i < words.length; i++) {
          if (firstLine.length + words[i].length + 1 <= 15) {
            firstLine += (firstLine ? " " : "") + words[i];
          } else {
            secondLine += (secondLine ? " " : "") + words[i];
          }
        }

        // 第一行文字
        textElement
          .append("text")
          .attr("x", 16)
          .attr("y", 2)
          .attr("dy", "0.35em")
          .style("font-size", "9px")
          .style("font-weight", "500")
          .style("fill", "#374151")
          .text(firstLine);

        // 第二行文字
        textElement
          .append("text")
          .attr("x", 16)
          .attr("y", 12)
          .attr("dy", "0.35em")
          .style("font-size", "9px")
          .style("font-weight", "500")
          .style("fill", "#374151")
          .text(secondLine);
      } else {
        // 短名称单行显示
        textElement
          .append("text")
          .attr("x", 16)
          .attr("y", 6)
          .attr("dy", "0.35em")
          .style("font-size", "10px")
          .style("font-weight", "500")
          .style("fill", "#374151")
          .text(name);
      }
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
      .text("Company Market Share");
    // 清理函数
    return () => {
      d3.selectAll(".company-tooltip").remove();
    };
  }, [companyshareData]);

  useEffect(() => {
    if (!cancerChartRef.current) return;

    // 清除之前的图表
    d3.select(cancerChartRef.current).selectAll("*").remove();

    const svg = d3.select(cancerChartRef.current);
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
      .data(pie(cancershareData))
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
      .style("cursor", "pointer")
      .on("mouseover", function (event, d) {
        // 放大效果
        d3.select(this)
          .transition()
          .duration(200)
          .attr("transform", function () {
            const centroid = arc.centroid(d);
            return `translate(${centroid[0] * 0.08}, ${centroid[1] * 0.08})`;
          })
          .style("opacity", 1);

        // 显示tooltip
        const tooltip = d3
          .select("body")
          .append("div")
          .attr("class", "cancer-tooltip")
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
            <div style="font-weight: 600; margin-bottom: 2px;">${d.data.type}</div>
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
        // 恢复原状
        d3.select(this)
          .transition()
          .duration(200)
          .attr("transform", "translate(0,0)")
          .style("opacity", 0.85);

        // 移除tooltip
        d3.selectAll(".cancer-tooltip").remove();
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
      .data(cancershareData)
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
      .style("font-size", "10px")
      .style("font-weight", "500")
      .style("fill", "#374151")
      .text((d: any) => d.type);

    // 添加标题
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .style("font-size", "15px")
      .style("font-weight", "600")
      .style("fill", "#374151")
      .text("Cancer Type Distribution");

    // 清理函数
    return () => {
      d3.selectAll(".cancer-tooltip").remove();
    };
  }, [cancershareData]);

  useEffect(() => {
    if (!gmarketChartRef.current) return;

    // 清除之前的图表
    d3.select(gmarketChartRef.current).selectAll("*").remove();

    const svg = d3.select(gmarketChartRef.current);
    const width = 280;
    const height = 280;
    const margin = 10;
    const radius = Math.min(width - margin * 2, height - margin * 2) / 2 - 20;

    // 添加定义区域用于阴影效果
    const defs = svg.append("defs");

    // 创建阴影滤镜
    const filter = defs
      .append("filter")
      .attr("id", "gmarket-dropshadow")
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
      .data(pie(gmarketData))
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
      .style("filter", "url(#gmarket-dropshadow)")
      .style("shape-rendering", "geometricPrecision")
      .style("cursor", "pointer")
      .on("mouseover", function (event, d) {
        // 放大效果
        d3.select(this)
          .transition()
          .duration(200)
          .attr("transform", function () {
            const centroid = arc.centroid(d);
            return `translate(${centroid[0] * 0.08}, ${centroid[1] * 0.08})`;
          })
          .style("opacity", 1);

        // 显示tooltip
        const tooltip = d3
          .select("body")
          .append("div")
          .attr("class", "gmarket-tooltip")
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
            <div style="font-weight: 600; margin-bottom: 2px;">${d.data.name}</div>
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
        // 恢复原状
        d3.select(this)
          .transition()
          .duration(200)
          .attr("transform", "translate(0,0)")
          .style("opacity", 0.85);

        // 移除tooltip
        d3.selectAll(".gmarket-tooltip").remove();
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
      .data(gmarketData)
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
      .style("font-size", "10px")
      .style("font-weight", "500")
      .style("fill", "#374151")
      .text((d: any) => d.name);

    // 添加标题
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .style("font-size", "15px")
      .style("font-weight", "600")
      .style("fill", "#374151")
      .text("Global Market Share");

    // 清理函数
    return () => {
      d3.selectAll(".gmarket-tooltip").remove();
    };
  }, [gmarketData]);

  return (
    <div className="mt-4 bg-[#f8f9fa] rounded-lg p-4">
      <div className="text-[16px] font-[400] text-[#374151] mb-3">
        Market Share Analysis
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        <svg
          ref={nameChartRef}
          width="100%"
          height="280"
          viewBox="0 0 280 280"
        />
        <svg
          ref={cancerChartRef}
          width="100%"
          height="280"
          viewBox="0 0 280 280"
        />
        <svg
          ref={gmarketChartRef}
          width="100%"
          height="280"
          viewBox="0 0 280 280"
        />
      </div>
    </div>
  );
}

export default Companyshare;
