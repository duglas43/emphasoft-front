import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { SignInPage, NotFoundPage, HomePage } from "./pages";
import { AppLayout, AuthProtect } from "./layouts";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/" element={<AuthProtect />}>
        <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Route>
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
