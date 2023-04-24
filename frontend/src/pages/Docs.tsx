import { Navigate, Route, Routes } from "react-router";
import { DOCS } from "../constants/docs";
import DocsNav from "../components/docs/DocsNav";

export default function Docs() {
  return (
    <section className="sm:px-[8vw] md:px-[12vw] 2xl:px-[18vw] pt-[1.2in] md:pt-[1.4in] 2xl:pt-[1.8in] flex flex-col gap-8 lg:grid grid-cols-[max-content_1fr] min-h-screen">
      <DocsNav />
      <Routes>
        <Route
          path="*"
          element={<Navigate to={`/docs/polityka-prywatnosci`} />}
        />
        {DOCS.map((page) => (
          <Route
            path={`/${page.name}`}
            element={page.document}
            key={page.name}
          />
        ))}
      </Routes>
    </section>
  );
}
