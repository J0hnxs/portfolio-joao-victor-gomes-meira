import React from 'react';

interface ControlProps {
  label: string;
  val: number;
  min: number;
  max: number;
  step?: number;
  set: (val: number) => void;
}

export const Control: React.FC<ControlProps> = ({ label, val, min, max, step = 1, set }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
          {label}
        </label>
        <span className="text-xs font-mono text-slate-400">{val}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={val}
        onChange={(e) => set(Number(e.target.value))}
        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#001f3f]"
      />
    </div>
  );
};
