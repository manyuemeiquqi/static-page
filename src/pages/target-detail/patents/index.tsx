import React from "react";
import PatentActivity from "./Patentactivity";
import PatentTrend from "./Trend";
import CompanyDistribution from "./Companydisb";
import PatentTable from "./Table";

const Patents: React.FC = () => {
  return (
    <div className="mt-4 bg-white rounded-lg p-6 shadow-sm">
      <div className="space-y-6">
        <div className="text-2xl font-bold text-[#374151] mb-2">
          Patent Analysis
        </div>

        {/* First Row - Recent Patents */}
        <PatentActivity />

        {/* Second Row - Charts side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PatentTrend />
          <CompanyDistribution />
        </div>
        <PatentTable />
      </div>
    </div>
  );
};

export default Patents;
