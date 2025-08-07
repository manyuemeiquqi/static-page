import DiseaseDetail from "../pages/disease-detail";
import TargetDetail from "../pages/target-detail";
import DiseaseQuery from "../pages/disease-query";
import { createBrowserRouter } from "react-router";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultRouterList: any[] = [
  {
    path: "/",
    element: <DiseaseQuery />,
  },
  {
    path: "/detail",
    element: <DiseaseDetail />,
  },
  {
    path: "/target-detail",
    element: <TargetDetail />,
  },
];

export const allRoutes = [...defaultRouterList];
const router = createBrowserRouter(allRoutes);

export default router;
