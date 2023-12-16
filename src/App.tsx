import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { SignInPage, NotFoundPage, HomePage } from "./pages";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
