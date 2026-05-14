import { RecoilRoot } from "recoil";

import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <RecoilRoot>
      <AppRoutes />
    </RecoilRoot>
  );
}

export default App;