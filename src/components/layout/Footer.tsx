import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-inverse-surface text-surface py-16 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <Link
          href="#"
          className="text-2xl font-black tracking-tighter font-headline uppercase text-primary-fixed"
        >
          DESIGNER.UX
        </Link>
        <p className="font-body text-sm text-inverse-on-surface text-center">
          © {new Date().getFullYear()} Ameli Nimbus. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["twitter", "instagram", "linkedin"].map((social) => (
            <a
              key={social}
              href="#"
              className="text-inverse-on-surface hover:text-primary-fixed transition-colors capitalize font-label font-bold uppercase tracking-widest text-sm"
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
