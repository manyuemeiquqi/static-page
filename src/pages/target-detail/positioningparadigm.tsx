import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

// 添加自定义样式
const customStyles = `
  .tree-node {
    cursor: pointer;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }

  .tree-node:hover {
    opacity: 0.9;
  }

  .tree-node:hover .node-background {
    filter: brightness(1.05);
    transform: scale(1.01);
  }

  .tree-node .node-background {
    cursor: default;
  }

  .tree-text {
    font-size: 13px;
    font-weight: 500;
    text-anchor: middle;
    pointer-events: none;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  

  .tree-node.selected {
    stroke-width: 3;
    stroke: #000;
  }

  .tree-link {
    fill: none;
    stroke: #e5e7eb;
    stroke-width: 1.5;
    opacity: 0.7;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .tree-text {
    font-size: 13px;
    font-weight: 500;
    text-anchor: middle;
    pointer-events: none;
  }

  .tree-details-panel {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 12px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    animation: slideIn 0.3s ease-out;
  }

  .tree-details-branch {
    position: absolute;
    background: white;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    border: 2px solid #e5e7eb;
    z-index: 1000;
    max-width: 400px;
    animation: branchSlideIn 0.3s ease-out;
    pointer-events: auto;
  }

  @keyframes branchSlideIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .tree-details-branch::before {
    content: '';
    position: absolute;
    left: -8px;
    top: 20px;
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-right: 8px solid #e5e7eb;
  }

  .tree-details-branch::after {
    content: '';
    position: absolute;
    left: -6px;
    top: 20px;
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-right: 8px solid white;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  .tree-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    animation: fadeIn 0.3s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .tree-zoom-controls {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    gap: 8px;
  }

  .tree-zoom-btn {
    width: 32px;
    height: 32px;
    border: 1px solid #ddd;
    background: white;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    transition: all 0.2s ease;
  }

  .tree-zoom-btn:hover {
    background: #f5f5f5;
    border-color: #999;
  }
`;

interface TreatmentItem {
  type: string;
  details: string;
  examples: string;
}

interface TreatmentCategory {
  category: string;
  items: TreatmentItem[];
  color: string;
  bgColor: string;
  borderColor: string;
}

interface TreeNode {
  id: string;
  name: string;
  category: string;
  details: string;
  examples: string;
  color: string;
  children?: TreeNode[];
  parent?: TreeNode;
  isDetail?: boolean;
  fullText?: string;
}

function PositioningParadigm() {
  const svgRef = useRef<SVGSVGElement>(null);
  // 移除不需要的状态

  const treatmentData: TreatmentCategory[] = [
    {
      category: "First-Line Maintenance Therapy",
      color: "#3B82F6",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      items: [
        {
          type: "Ovarian Cancer",
          details:
            "PARP inhibitors are now standard first-line maintenance therapy after platinum-based chemotherapy in advanced ovarian cancer.",
          examples:
            "Rucaparib has shown significant improvement in progression-free survival (PFS) in both HR-deficient (HRd) and HR-proficient (HRp) patients when used as maintenance therapy in the first-line setting.",
        },
        {
          type: "Breast Cancer",
          details: "Some drugs work better than chemotherapy",
          examples:
            "Olaparib and talazoparib are approved for BRCA-mutated, HER2-negative breast cancer, both in early-stage (adjuvant) and metastatic settings.",
        },
        {
          type: "Endometrial Cancer",
          details: "PARP Inhibitors + Immune Checkpoint Inhibitors (ICIs)",
          examples:
            "Durvalumab + olaparib has shown improved PFS compared with ICI alone, especially in patients with abnormal p53 and functional mismatch repair (MMRp).",
        },
      ],
    },
    {
      category: "Combination Therapy",
      color: "#10B981",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      items: [
        {
          type: "Tumors with high PARP capture potential",
          details: "PARP Inhibitors + Alkylating Agents",
          examples:
            "Preclinical and early clinical data suggest that the combination of PARP inhibitors and temozolomide is synergistic in tumors with high PARP capture potential.",
        },
        {
          type: "AML, breast, and ovarian cancers",
          details: "PARP Inhibitors + DNA Methyltransferase Inhibitors (DNMTI)",
          examples:
            "Combining PARP inhibitors with DNMT inhibitors (e.g., azacytidine, decitabine) enhances PARP trapping and increases oxidative stress, leading to improved antitumor activity.",
        },
      ],
    },
    {
      category: "Emerging and Investigational Roles",
      color: "#8B5CF6",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      items: [
        {
          type: "Colon Cancer",
          details: "Metronomic PARP Inhibition + Immunotherapy",
          examples:
            "Low-dose (metronomic) PARP inhibition has been shown to modulate immunosuppressive cells (e.g., MDSCs) and enhance the efficacy of anti-PD-1 therapy, particularly in colon cancer models. This approach may expand the use of PARP inhibitors beyond BRCA-mutated tumors to immunotherapy-resistant cancers.",
        },
        {
          type: "Next-Generation PARP1-Selective Inhibitors",
          details:
            "These may allow for broader combination strategies and use in earlier lines of therapy.",
          examples:
            "Agents like AZD5305 and HRS-1167 are being developed to reduce hematologic toxicity and improve selectivity for PARP1 over PARP2.",
        },
      ],
    },
  ];

  // 转换数据为树状结构，只包含主要节点
  const createTreeData = (): TreeNode => {
    return {
      id: "root",
      name: "PARP Treatment Paradigm",
      category: "Root",
      details: "",
      examples: "",
      color: "#6B7280",
      children: treatmentData.map((category, categoryIndex) => ({
        id: `category-${categoryIndex}`,
        name: category.category,
        category: category.category,
        details: "",
        examples: "",
        color: category.color,
        children: category.items.map((item, itemIndex) => ({
          id: `${categoryIndex}-${itemIndex}`,
          name: item.type,
          category: category.category,
          details: "",
          examples: "",
          color: category.color,
        })),
      })),
    };
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 800; // 减少宽度使布局更紧凑
    const height = 500; // 减少高度使布局更紧凑
    const margin = { top: 30, right: 80, bottom: 30, left: 80 }; // 减少边距

    // 创建树状布局，调整大小使布局更紧凑
    const treeLayout = d3
      .tree<TreeNode>()
      .size([
        height - margin.top - margin.bottom,
        width - margin.left - margin.right,
      ])
      .separation((a, b) => {
        // 优化节点间的分离距离，使布局更紧凑
        if (a.parent === b.parent) {
          return 1.2; // 同级节点，减少间距
        }
        return 1.4; // 不同级节点，减少间距
      });

    // 创建层次结构
    const treeData = createTreeData();
    const root = d3.hierarchy(treeData);
    treeLayout(root);

    // 创建缩放行为，移除拖动限制
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 3.0]) // 扩大缩放范围
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // 使用D3的enter/exit/update模式实现平滑过渡
    // 处理连接线
    const links = g
      .selectAll<SVGPathElement, d3.HierarchyLink<TreeNode>>(".tree-link")
      .data(
        root.links(),
        (d: any) => d.source.data.id + "-" + d.target.data.id
      );

    // 移除不再需要的连接线
    links
      .exit()
      .transition()
      .duration(300)
      .ease(d3.easeCubicOut)
      .style("opacity", 0)
      .remove();

    // 添加新的连接线
    const linksEnter = links
      .enter()
      .append("path")
      .attr("class", "tree-link")
      .style("opacity", 0);

    // 合并enter和update的选择
    const linksUpdate = links.merge(linksEnter as any);

    // 为所有连接线添加平滑过渡
    linksUpdate
      .transition()
      .duration(500)
      .ease(d3.easeCubicOut)
      .style("opacity", 0.7)
      .attr("d", (d) => {
        const link = d3
          .linkHorizontal<
            d3.HierarchyLink<TreeNode>,
            d3.HierarchyNode<TreeNode>
          >()
          .x((d) => d.y || 0)
          .y((d) => d.x || 0);

        return link(d);
      });

    // 处理节点
    const nodes = g
      .selectAll<SVGGElement, d3.HierarchyNode<TreeNode>>(".tree-node")
      .data(root.descendants(), (d: any) => d.data.id);

    // 移除不再需要的节点
    nodes
      .exit()
      .transition()
      .duration(300)
      .ease(d3.easeCubicOut)
      .style("opacity", 0)
      .remove();

    // 添加新的节点
    const nodesEnter = nodes
      .enter()
      .append("g")
      .attr("class", "tree-node")
      .style("opacity", 0);

    // 合并enter和update的选择
    const nodesUpdate = nodes.merge(nodesEnter as any);

    // 计算文本宽度来动态调整节点大小
    const getTextWidth = (
      text: string,
      fontSize: string,
      fontWeight: string
    ) => {
      const temp = d3
        .select("body")
        .append("text")
        .style("font-size", fontSize)
        .style("font-weight", fontWeight)
        .style("visibility", "hidden")
        .text(text);
      const width = temp.node()?.getBoundingClientRect().width || 0;
      temp.remove();
      return width;
    };

    // 为所有节点添加平滑过渡动画
    nodesUpdate
      .transition()
      .duration(500)
      .ease(d3.easeCubicOut)
      .style("opacity", 1)
      .attr("transform", (d) => `translate(${d.y},${d.x})`);

    // 节点背景矩形（完全包裹文字）
    nodesUpdate
      .append("rect")
      .attr("class", "node-background")
      .attr("rx", 8) // 圆角
      .attr("ry", 8)
      .attr("x", (d) => {
        const fontSize =
          d.data.id === "root" ? "16px" : d.children ? "14px" : "13px";
        const fontWeight =
          d.data.id === "root" ? "600" : d.children ? "500" : "400";
        const textWidth = getTextWidth(d.data.name, fontSize, fontWeight);
        return -textWidth / 2 - 8; // 文字居中，左右各留8px padding
      })
      .attr("y", (d) => {
        const fontSize = d.data.id === "root" ? 16 : d.children ? 14 : 13;
        return -fontSize / 2 - 4; // 文字居中，上下各留4px padding
      })
      .attr("width", (d) => {
        const fontSize =
          d.data.id === "root" ? "16px" : d.children ? "14px" : "13px";
        const fontWeight =
          d.data.id === "root" ? "600" : d.children ? "500" : "400";
        const textWidth = getTextWidth(d.data.name, fontSize, fontWeight);
        return textWidth + 16; // 文字宽度 + 左右padding
      })
      .attr("height", (d) => {
        const fontSize = d.data.id === "root" ? 16 : d.children ? 14 : 13;
        return fontSize + 8; // 文字高度 + 上下padding
      })
      .attr("fill", (d) => d.data.color)
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .attr("opacity", 0.9);

    // 节点文本
    nodesUpdate
      .append("text")
      .attr("class", "tree-text")
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text((d) => d.data.name)
      .style("fill", "#fff") // 白色文字，在彩色背景上更清晰
      .style("font-size", (d) => {
        return d.data.id === "root" ? "16px" : d.children ? "14px" : "13px";
      })
      .style("font-weight", (d) => {
        return d.data.id === "root" ? "600" : d.children ? "500" : "400";
      })
      .style("pointer-events", "none");

    // 移除点击事件处理

    // 添加缩放控制按钮
    const zoomControls = svg.append("g").attr("class", "tree-zoom-controls");

    // 放大按钮
    zoomControls
      .append("g")
      .attr("class", "tree-zoom-btn")
      .attr("transform", "translate(0, 0)")
      .on("click", () => {
        svg.transition().duration(300).call(zoom.scaleBy, 1.3);
      })
      .append("text")
      .attr("x", 16)
      .attr("y", 20)
      .text("+");

    // 缩小按钮
    zoomControls
      .append("g")
      .attr("class", "tree-zoom-btn")
      .attr("transform", "translate(40, 0)")
      .on("click", () => {
        svg
          .transition()
          .duration(300)
          .call(zoom.scaleBy, 1 / 1.3);
      })
      .append("text")
      .attr("x", 16)
      .attr("y", 20)
      .text("−");

    // 重置按钮
    zoomControls
      .append("g")
      .attr("class", "tree-zoom-btn")
      .attr("transform", "translate(80, 0)")
      .on("click", () => {
        svg.transition().duration(300).call(zoom.transform, d3.zoomIdentity);
      })
      .append("text")
      .attr("x", 16)
      .attr("y", 20)
      .text("⌂");
  }, []); // 移除依赖，因为不再需要动态更新

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <div className="mt-4 bg-white rounded-lg p-6 shadow-sm">
        {/* 移除调试信息 */}
        <div className="text-[18px] font-semibold text-[#374151] mb-6">
          Positioning within Treatment Paradigm
        </div>

        {/* Tree Chart */}
        <div className="mb-6 relative">
          <svg
            ref={svgRef}
            width="800"
            height="500"
            className="w-full max-w-full border border-gray-200 rounded-lg"
          />
        </div>
      </div>
    </>
  );
}

export default PositioningParadigm;
