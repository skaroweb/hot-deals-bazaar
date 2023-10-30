import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Homepage from "./pages/Homepage";
import Blog from "./pages/Blog";
import BlogSingle from "./pages/BlogSingle";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndCondition from "./pages/TermsAndCondition";
import Disclaimer from "./pages/Disclaimer";
import My404 from "./pages/My404";
import BackToTopButton from "./components/Util/BackToTopButton";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index exact element={<Homepage />} />
          <Route path="/blog" exact element={<Blog />} />
          <Route exact path="/blog/:id" element={<BlogSingle />} />
          <Route path="/privacy-policy" exact element={<PrivacyPolicy />} />
          <Route
            path="/terms-and-conditions"
            exact
            element={<TermsAndCondition />}
          />
          <Route path="/disclaimer" exact element={<Disclaimer />} />
        </Route>
        <Route path="*" status={404} element={<My404 />} />
      </Routes>
      <BackToTopButton />
    </div>
  );
}

export default App;
