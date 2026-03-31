import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-16 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <Link href="#" className="text-2xl font-black tracking-tighter font-headline uppercase text-primary-fixed">
          DESIGNER.UX
        </Link>
        <p className="font-mono text-xs text-surface/20 text-center tracking-widest">
          © {new Date().getFullYear()} AMELI NIMBUS — ALL RIGHTS RESERVED
        </p>
        <div className="flex gap-8">
          {["Twitter", "Instagram", "LinkedIn"].map((s) => (
            <a key={s} href="#" className="text-surface/30 hover:text-primary-fixed transition-colors font-mono text-xs uppercase tracking-widest">
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
