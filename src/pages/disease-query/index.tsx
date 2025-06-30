import { SearchOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function DiseaseQuery() {
  const navigate = useNavigate();

  const [searchType, setSearchType] = useState("disease");

  const getRecommendList = () => {
    return searchType === "disease" ? recommendDiseases : recommendTargets;
  };

  // 获取推荐列表的标题
  const getRecommendTitle = () => {
    return searchType === "disease" ? "Popular Diseases:" : "Popular Targets:";
  };
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [recommendDiseases] = useState<string[]>([
    "Alzheimer's Disease",
    "Breast Cancer",
    "Type 2 Diabetes",
    "Parkinson's Disease",
    "Lung Cancer",
  ]);

  // 添加推荐靶点数据
  const [recommendTargets] = useState<string[]>([
    "PD-1/PD-L1",
    "EGFR",
    "HER2",
    "VEGFR",
    "CDK4/6",
  ]);
  // 加载步骤
  const loadingSteps = [
    "Warming up the knowledge engine…",
    "Evaluating unmet needs and commercial potential…",
    "Identifying approved drugs and ongoing trials…",
    "Compiling results into a structured format…",
  ];
  const getLoadingContent = () => {
    if (searchType === "disease") {
      return {
        title: "Analyzing Disease Data",
        description:
          "Please wait while we gather comprehensive disease insights...",
      };
    } else {
      return {
        title: "Analyzing Target Data",
        description:
          "Please wait while we gather comprehensive target insights...",
      };
    }
  };

  // 处理搜索点击
  const handleSearch = () => {
    setIsLoading(true);
    setCurrentStep(0);
    setProgress(0);
  };

  // 加载进度控制
  useEffect(() => {
    if (!isLoading) return;

    const totalDuration = 6000; // 3秒总时长
    const progressInterval = 50; // 进度更新间隔

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / (totalDuration / progressInterval);

        // 更新当前步骤
        const newStep = Math.floor(newProgress / 25);
        if (newStep !== currentStep && newStep < loadingSteps.length) {
          setCurrentStep(newStep);
        }

        // 达到100%时跳转
        if (newProgress >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => {
            navigate("/detail");
          }, 200);
          return 100;
        }

        return newProgress;
      });
    }, progressInterval);

    return () => clearInterval(progressTimer);
  }, [isLoading, currentStep, navigate]);

  if (isLoading) {
    const loadingContent = getLoadingContent();
    return (
      <div className="fixed inset-0 z-50">
        {/* 模糊背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 backdrop-blur-sm"></div>

        {/* 加载内容 */}
        <div className="relative flex justify-center items-center h-full px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-100">
            {/* 加载图标 */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm">🔬</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 标题 */}
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {loadingContent.title}
              </h3>
              <p className="text-sm text-gray-500">
                {loadingContent.description}
              </p>
            </div>

            {/* 进度条 */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-500">Progress</span>
                <span className="text-xs text-blue-600 font-medium">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* 步骤指示器 */}
            <div className="space-y-3">
              {loadingSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 transition-all duration-300 ${
                    index <= currentStep ? "opacity-100" : "opacity-40"
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full flex-shrink-0 transition-all duration-300 ${
                      index < currentStep
                        ? "bg-green-500"
                        : index === currentStep
                        ? "bg-blue-500 animate-pulse"
                        : "bg-gray-300"
                    }`}
                  ></div>
                  <span
                    className={`text-sm transition-all duration-300 ${
                      index <= currentStep
                        ? "text-gray-700 font-medium"
                        : "text-gray-400"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              ))}
            </div>

            {/* 底部提示 */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-xs text-center text-gray-400">
                Powered by DP Prometheus Disease Intelligence
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center flex-col h-screen px-[20vw] bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* 搜索容器 */}
      <div className="w-full flex justify-center border border-gray-200 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 flex-col relative overflow-hidden">
        {/* 搜索栏容器 */}
        <div className="flex items-center bg-gray-50 rounded-t-2xl pl-4">
          {/* 左侧下拉菜单 */}
          <div className="border-r border-gray-200">
            <Dropdown
              menu={{
                items: [
                  {
                    key: "disease",
                    label: (
                      <div className="flex items-center gap-2 px-2 py-1">
                        <span className="text-blue-600">🔬</span>
                        <span>Disease Search</span>
                      </div>
                    ),
                  },
                  {
                    key: "target",
                    label: (
                      <div className="flex items-center gap-2 px-2 py-1">
                        <span className="text-green-600">🎯</span>
                        <span>Drug Target Search</span>
                      </div>
                    ),
                  },
                ],
                onClick: (e) => {
                  setSearchType(e.key);
                },
              }}
            >
              <div className="cursor-pointer px-4 py-3 h-full flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 rounded-tl-2xl">
                <span className="text-sm">
                  {searchType === "disease" ? "🔬" : "🎯"}
                </span>
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {searchType === "disease" ? "Disease" : "Target"}
                </span>
                <span className="text-xs text-gray-400">▼</span>
              </div>
            </Dropdown>
          </div>

          {/* 搜索输入框 */}
          <div className="flex-1 relative">
            <Input
              onPressEnter={handleSearch}
              className="!border-none !shadow-none !outline-none !bg-transparent text-base px-4 py-3"
              placeholder={
                searchType === "disease"
                  ? "Enter disease name to search..."
                  : "Enter drug target to search..."
              }
              style={{
                fontSize: "16px",
                backgroundColor: "transparent",
              }}
            />
          </div>

          {/* 搜索按钮 */}
          <div className="px-4 py-2">
            <Button
              onClick={handleSearch}
              type="primary"
              size="large"
              icon={<SearchOutlined className="text-lg" />}
              className="!bg-gradient-to-r !from-blue-500 !to-blue-600 !border-none !h-12 !w-12 !rounded-xl hover:!from-blue-600 hover:!to-blue-700 !shadow-lg hover:!shadow-xl transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* 推荐搜索标签 */}
      <div className="flex flex-wrap justify-center items-center gap-3 mt-8">
        <div className="text-sm text-gray-500 font-medium mb-2 w-full text-center">
          {getRecommendTitle()}
        </div>
        {getRecommendList().map((item, index) => {
          const colors = [
            "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 hover:from-blue-200 hover:to-blue-300",
            "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 hover:from-purple-200 hover:to-purple-300",
            "bg-gradient-to-r from-green-100 to-green-200 text-green-700 hover:from-green-200 hover:to-green-300",
            "bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 hover:from-orange-200 hover:to-orange-300",
            "bg-gradient-to-r from-red-100 to-red-200 text-red-700 hover:from-red-200 hover:to-red-300",
          ];

          return (
            <div
              key={index}
              className={`px-4 py-2 rounded-full cursor-pointer transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md transform hover:scale-105 ${
                colors[index % colors.length]
              }`}
              onClick={handleSearch}
            >
              {item}
            </div>
          );
        })}
      </div>

      {/* 底部装饰 */}
      <div className="absolute bottom-10 text-center">
        <div className="text-xs text-gray-400">
          Powered by DP Prometheus Disease Intelligence
        </div>
      </div>
    </div>
  );
}

export default DiseaseQuery;
