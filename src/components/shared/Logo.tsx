import * as React from "react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
        PM
      </div>

      <div>
        <h2 className="text-lg font-bold">
          Portfolio Manager
        </h2>

        <p className="text-xs text-slate-500">
          Organize Your Projects
        </p>
      </div>
    </div>
  );
}