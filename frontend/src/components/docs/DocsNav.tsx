import { DOCS } from "../../constants/docs";
import DocsLink from "./DocsLink";

export default function DocsNav() {
  return (
    <aside className="bg-white shadow-primaryBig sm:rounded-t-xl flex flex-col self-stretch">
      <div className="flex items-center gap-4 px-[8vw] py-8 sm:pl-8 border-b-[1px] border-[rgba(#1E134F,0.1)] sm:pr-16">
        <h2 className="text-xl md:text-2xl font-medium">
          Polityka bez<span className="text-primary">CV</span>
        </h2>
      </div>
      <nav className="pl-[8vw] sm:pl-8 py-8 flex flex-col gap-2">
        {DOCS.map((page) => (
          <DocsLink to={`/docs/${page.name}`} key={page.name}>
            {page.title}
          </DocsLink>
        ))}
      </nav>
    </aside>
  );
}
