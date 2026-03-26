interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="gsap-service-card bg-surface p-12 rounded-xl group hover:bg-inverse-surface transition-colors duration-500 cursor-pointer">
      <span className="material-symbols-outlined text-5xl text-primary-fixed mb-8 block">
        {icon}
      </span>
      <h3 className="font-headline font-bold text-3xl mb-4 group-hover:text-surface transition-colors duration-500">
        {title}
      </h3>
      <p className="font-body text-secondary group-hover:text-surface-variant leading-relaxed transition-colors duration-500">
        {description}
      </p>
    </div>
  );
}
