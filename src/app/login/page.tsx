import { FrydaiLogoLink } from "@/components/brand/FrydaiLogo";
import { DemoLoginForm } from "@/components/auth/DemoLoginForm";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#08080f] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(124,58,237,0.15),transparent_55%)]"
        aria-hidden
      />
      <header className="relative z-10 flex justify-center border-b border-white/10 px-4 py-4 sm:px-6">
        <FrydaiLogoLink />
      </header>
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
        <DemoLoginForm />
      </main>
    </div>
  );
}
