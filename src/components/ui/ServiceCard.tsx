interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="service-card glass p-10 rounded-2xl group hover:border-primary-fixed/40 hover:shadow-gold transition-all duration-500 cursor-pointer">
      <div className="w-12 h-12 rounded-xl bg-primary-fixed/10 flex items-center justify-center mb-8 group-hover:bg-primary-fixed/20 transition-colors">
        <span className="material-symbols-outlined text-primary-fixed text-2xl">{icon}</span>
      </div>
      <h3 className="font-headline font-bold text-2xl mb-4 text-surface group-hover:text-primary-fixed transition-colors">
        {title}
      </h3>
      <p className="font-body text-surface/50 leading-relaxed text-sm">{description}</p>
    </div>
  );
}
