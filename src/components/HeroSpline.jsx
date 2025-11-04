import Spline from '@splinetool/react-spline';

export default function HeroSpline() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16 grid lg:grid-cols-2 gap-8 items-center">
        <div className="order-2 lg:order-1">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Organize tasks. Level up your day.
          </h1>
          <p className="mt-4 text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Plan by category, prioritize with clarity, and earn XP as you complete tasks. Collaborate with your team and stay motivated with a clean, focused workspace.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#auth" className="px-5 py-3 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-medium shadow hover:shadow-md transition">
              Get Started
            </a>
            <a href="#dashboard" className="px-5 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition font-medium">
              Preview Dashboard
            </a>
          </div>
        </div>
        <div className="order-1 lg:order-2 h-[320px] sm:h-[420px] lg:h-[520px] rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm relative">
          <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/20 dark:from-neutral-900/60 dark:to-neutral-900/20" />
        </div>
      </div>
    </section>
  );
}
