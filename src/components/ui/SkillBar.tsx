interface SkillBarProps {
  label: string;
  percentage: number;
}

export default function SkillBar({ label, percentage }: SkillBarProps) {
  return (
    <div className="gsap-skill-item">
      <div className="flex justify-between items-end mb-4">
        <h4 className="font-headline font-bold text-2xl uppercase tracking-tighter">
          {label}
        </h4>
        <span className="font-body font-bold text-primary-fixed">
          {percentage}%
        </span>
      </div>
      <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
        <div
          className="gsap-skill-bar h-full bg-inverse-surface rounded-full"
          style={{ width: 0 }}
          data-width={`${percentage}%`}
        />
      </div>
    </div>
  );
}
