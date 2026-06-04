"use client";

import { useEffect, useState } from "react";
import { copy } from "@/lib/copy";

export function UspBar() {
  const { usp } = copy;
  const [active, setActive] = useState(0);

  const items = [
    { title: usp.setup, desc: usp.setupDesc },
    { title: usp.skills, desc: usp.skillsDesc },
    { title: usp.autonomous, desc: usp.autonomousDesc },
    { title: usp.faster, desc: usp.fasterDesc },
  ];

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % items.length), 4000);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <>
      <div className="hidden flex-wrap items-center justify-center gap-x-12 gap-y-6 text-center sm:flex">
        <div>
          <p className="text-2xl font-bold text-foreground">{items[0].title}</p>
          <p className="text-sm text-muted">{items[0].desc}</p>
        </div>
        <div className="h-8 w-px bg-border-subtle" aria-hidden />
        <div>
          <p className="text-2xl font-bold text-foreground">{items[1].title}</p>
          <p className="text-sm text-muted">{items[1].desc}</p>
        </div>
        <div className="h-8 w-px bg-border-subtle" aria-hidden />
        <div>
          <p className="text-2xl font-bold text-foreground">{items[2].title}</p>
          <p className="text-sm text-muted">{items[2].desc}</p>
        </div>
        <div className="h-8 w-px bg-border-subtle" aria-hidden />
        <div>
          <p className="text-2xl font-bold text-foreground">{items[3].title}</p>
          <p className="text-sm text-muted">{items[3].desc}</p>
        </div>
      </div>

      <div className="w-full sm:hidden">
        <div className="mx-auto max-w-sm text-center">
          <p className="text-2xl font-bold text-foreground">{items[active].title}</p>
          <p className="mt-1 text-sm text-muted">{items[active].desc}</p>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.desc}
              type="button"
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-violet-500" : "w-2 bg-fill-muted"}`}
              aria-label={item.desc}
              aria-current={i === active ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </>
  );
}
