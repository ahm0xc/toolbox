import Link from "next/link";
import React from "react";
import { getTools } from "~/lib/tools";
import { toProperCase } from "~/lib/utils";

export default async function Header() {
  const tools = await getTools();
  console.log(tools);
  return (
    <header>
      <div className="max-w-7xl h-16 flex items-center justify-between bg-neutral-100 border-b mx-auto rounded-b-lg px-16">
        <div>
          <h2 className="text-xl font-semibold">Toolbox</h2>
        </div>
        <div>
          <nav className="flex gap-5 items-center ">
            {tools.map((tool) => {
              return (
                <Link
                  key={tool}
                  href={`/${tool}`}
                  className="text-sm font-medium text-neutral-600 hover:text-neutral-800"
                >
                  {toProperCase(tool)}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
