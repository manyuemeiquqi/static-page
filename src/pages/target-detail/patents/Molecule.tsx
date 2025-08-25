import { useEffect, useState } from "react";

interface Mol2DProps {
  smiles: string;
  width?: number;
  height?: number;
  className?: string;
}

function Mol2D({
  smiles,
  width = 300,
  height = 300,
  className = "",
}: Mol2DProps) {
  const [svgContent, setSvgContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderMolecule = async () => {
      if (!smiles) return;

      try {
        setLoading(true);
        setError(null);
        setSvgContent("");

        // 检查RDKit是否已加载
        if (typeof (window as any).RDKit === "undefined") {
          throw new Error("RDKit未加载");
        }

        // 从SMILES创建分子
        const mol = (window as any).RDKit.get_mol(smiles);
        if (!mol) {
          throw new Error("无效的SMILES字符串");
        }

        // 生成分子的SVG
        const svg = mol.get_svg(width, height);
        setSvgContent(svg);

        // 清理分子对象
        mol.delete();
        setLoading(false);
      } catch (err) {
        console.error("分子渲染失败:", err);
        setError(err instanceof Error ? err.message : "渲染失败");
        setLoading(false);
      }
    };

    renderMolecule();
  }, [smiles, width, height]);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-red-50 border border-red-200 rounded-lg ${className}`}
        style={{ width, height }}
      >
        <div className="text-center text-red-600">
          <div className="text-sm font-medium">渲染失败</div>
          <div className="text-xs mt-1">{error}</div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg ${className}`}
        style={{ width, height }}
      >
        <div className="text-center text-gray-500">
          <div className="text-sm">加载中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative bg-white ">
        <div
          style={{ width: `${width}px`, height: `${height}px` }}
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      </div>
    </div>
  );
}

export default Mol2D;
