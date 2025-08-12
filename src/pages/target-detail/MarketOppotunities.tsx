import Growingtrend from "./globalincreasetable.tsx";
import Companyshare from "./Marketshare.tsx";
import GlobalMap from "./globalmap.tsx";

function MarketOpportunities() {
  return (
    <div className="shadow-card mb-4">
      <div className="card-title mb-4">Market Opportunities</div>

      <div className="mb-4">
        <div className="grid grid-cols-6 gap-3">
          <div className="col-span-3 bg-[#f8f9fa] rounded-lg p-3">
            <div style={{ fontFamily: "sans-serif", textAlign: "center" }}>
              <div className="text-[16px] font-[500] text-[#374151] mb-3">
                Market Size forecast(2025-2035)
              </div>
              <Growingtrend />
            </div>
          </div>
          <div className="col-span-3 bg-[#f8f9fa] rounded-lg p-4">
            <div className="text-[16px] font-[500] text-[#374151] mb-3">
              Global distribution map
            </div>
            {/*global map*/}
            <GlobalMap />
          </div>
        </div>
      </div>

      <div className="col-span-3 bg-[#f8f9fa] rounded-lg p-4">
        <Companyshare />
      </div>
      {/* Patient Profile */}
      {/* Prevalence */}
    </div>
  );
}

export default MarketOpportunities;
