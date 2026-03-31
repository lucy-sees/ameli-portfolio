interface SkillBarProps {
  label: string;
  percentage: number;
}

export default function SkillBar({ label, percentage }: SkillBarProps) {
  return (
    <div className="gsap-skill-item">
      <div className="flex justify-between items-end mb-3">
        <h4 className="font-headline font-bold text-xl uppercase tracking-tighter text-surface">
          {label}
        </h4>
        <span className="font-mono text-sm font-bold text-primary-fixed">
          {percentage}%
        </span>
      </div>
      <div className="w-full h-px bg-white/10 rounded-full overflow-hidden">
        <div
          className="gsap-skill-bar h-full bg-gradient-to-r from-primary-fixed to-primary-fixed/60 rounded-full"
          style={{ width: 0 }}
          data-width={`${percentage}%`}
        />
      </div>
    </div>
  );
}
