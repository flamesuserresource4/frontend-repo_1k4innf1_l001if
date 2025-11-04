import { useState } from 'react';
import { Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';

function Input({ label, type = 'text', icon: Icon, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">{label}</span>
      <div className="mt-1 relative">
        <div className="absolute inset-y-0 left-3 flex items-center text-neutral-400">
          {Icon ? <Icon className="h-4 w-4" /> : null}
        </div>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
        />
      </div>
    </label>
  );
}

export default function AuthPanel() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [message, setMessage] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    // For now, we only simulate feedback.
    if (mode === 'forgot') {
      setMessage('If an account exists, a reset link has been sent.');
    } else if (mode === 'signup') {
      setMessage('Account created locally. Connect backend to enable real auth.');
    } else {
      setMessage('Signed in locally. Connect backend to enable sessions.');
    }
  };

  return (
    <section id="auth" className="py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 items-start">
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-sm bg-white dark:bg-neutral-900">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
              {mode === 'login' && 'Welcome back'}
              {mode === 'signup' && 'Create your account'}
              {mode === 'forgot' && 'Reset your password'}
            </h2>
            <div className="flex items-center gap-2 text-sm">
              {mode !== 'login' && (
                <button onClick={() => setMode('login')} className="inline-flex items-center gap-1 text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300">
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
              )}
            </div>
          </div>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            {mode === 'signup' && (
              <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Alex Doe" />
            )}
            <Input label="Email" type="email" icon={Mail} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
            {mode !== 'forgot' && (
              <Input label="Password" type="password" icon={Lock} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" />
            )}
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 py-2.5 font-medium shadow hover:shadow-md transition">
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
          {message && (
            <p className="mt-4 text-sm text-green-600 dark:text-green-400">{message}</p>
          )}
          <div className="mt-6 text-sm text-neutral-600 dark:text-neutral-300">
            {mode === 'login' && (
              <div className="flex items-center justify-between">
                <button onClick={() => setMode('forgot')} className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300">Forgot password?</button>
                <button onClick={() => setMode('signup')} className="text-neutral-700 dark:text-neutral-200 hover:underline">Create an account</button>
              </div>
            )}
            {mode === 'signup' && (
              <p>
                Already have an account?{' '}
                <button onClick={() => setMode('login')} className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300">Sign in</button>
              </p>
            )}
            {mode === 'forgot' && (
              <p>
                Remembered your password?{' '}
                <button onClick={() => setMode('login')} className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300">Back to login</button>
              </p>
            )}
          </div>
        </div>
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-sm bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Design principles</h3>
          <ul className="mt-4 space-y-3 text-neutral-600 dark:text-neutral-300">
            <li>• Clear hierarchy and readable typography.</li>
            <li>• Smooth, subtle animations for focus and feedback.</li>
            <li>• Consistent 8px radii, soft shadows, ample white space.</li>
            <li>• Distinct category colors and accessible contrast.</li>
          </ul>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl p-4 border border-neutral-200 dark:border-neutral-800">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Priority</p>
              <div className="mt-2 flex gap-2">
                <span className="px-2 py-1 rounded-lg text-xs bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">Primary</span>
                <span className="px-2 py-1 rounded-lg text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">Secondary</span>
              </div>
            </div>
            <div className="rounded-xl p-4 border border-neutral-200 dark:border-neutral-800">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Difficulty</p>
              <div className="mt-2 flex gap-2">
                <span className="px-2 py-1 rounded-lg text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">Easy</span>
                <span className="px-2 py-1 rounded-lg text-xs bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">Medium</span>
                <span className="px-2 py-1 rounded-lg text-xs bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">Hard</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
