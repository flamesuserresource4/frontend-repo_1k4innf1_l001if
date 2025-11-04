import { useMemo, useState } from 'react';
import { Plus, CheckCircle2, Star, Share2, Mail } from 'lucide-react';

const difficultyXP = { Easy: 10, Medium: 20, Hard: 35 };

function ProgressBar({ xp, level }) {
  const needed = level * 100;
  const pct = Math.min(100, Math.round((xp % needed) / needed * 100));
  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">Level {level}</h4>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">{xp} XP total</p>
        </div>
        <Star className="h-5 w-5 text-amber-500" />
      </div>
      <div className="mt-3 h-3 w-full rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-1 text-right text-xs text-neutral-500 dark:text-neutral-400">{pct}% to next level</p>
    </div>
  );
}

function CategoryPill({ name, color }) {
  return (
    <span className={`px-2 py-1 rounded-lg text-xs font-medium`} style={{ backgroundColor: `${color}22`, color }}>
      {name}
    </span>
  );
}

function TaskRow({ task, onComplete }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <div className="flex items-center gap-3 min-w-0">
        <button onClick={() => onComplete(task)} className="shrink-0 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">
          <CheckCircle2 className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <p className="truncate font-medium text-neutral-900 dark:text-white">{task.title}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
            <CategoryPill name={task.category.name} color={task.category.color} />
            <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">{task.priority}</span>
            <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">{task.difficulty}</span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs text-neutral-500 dark:text-neutral-400">+{difficultyXP[task.difficulty]} XP</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [xp, setXp] = useState(120);
  const [level, setLevel] = useState(2);
  const [avatar, setAvatar] = useState(null);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteMsg, setInviteMsg] = useState('');

  const categories = [
    { name: 'Work', color: '#0ea5e9' },
    { name: 'Personal', color: '#22c55e' },
    { name: 'Study', color: '#a78bfa' },
  ];

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Prepare sprint report', priority: 'Primary', difficulty: 'Medium', category: categories[0] },
    { id: 2, title: 'Book dentist appointment', priority: 'Secondary', difficulty: 'Easy', category: categories[1] },
    { id: 3, title: 'Revise algorithms', priority: 'Primary', difficulty: 'Hard', category: categories[2] },
  ]);

  const onComplete = (task) => {
    const gain = difficultyXP[task.difficulty] || 0;
    const newXp = xp + gain;
    let newLevel = level;
    if (newXp >= level * 100) {
      newLevel = level + 1;
    }
    setXp(newXp);
    setLevel(newLevel);
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  const onInvite = (e) => {
    e.preventDefault();
    if (!inviteEmail || !inviteEmail.includes('@')) {
      setInviteMsg('Enter a valid email.');
      return;
    }
    setInviteMsg('Invite sent! Collaborator will receive an email.');
    setInviteEmail('');
  };

  const onUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatar(url);
  };

  const totalXPToNext = useMemo(() => level * 100, [level]);

  return (
    <section id="dashboard" className="py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 bg-white dark:bg-neutral-900 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Tasks</h3>
              <button className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-sm">
                <Plus className="h-4 w-4" /> New Task
              </button>
            </div>
            <div className="mt-4 grid gap-3">
              {tasks.map((t) => (
                <TaskRow key={t.id} task={t} onComplete={onComplete} />
              ))}
              {tasks.length === 0 && (
                <p className="text-sm text-neutral-500 dark:text-neutral-400">All caught up! Add a new task to continue earning XP.</p>
              )}
            </div>
          </div>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 bg-white dark:bg-neutral-900 shadow-sm">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Categories</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map((c) => (
                <CategoryPill key={c.name} name={c.name} color={c.color} />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 bg-white dark:bg-neutral-900 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16">
                <img
                  src={avatar || 'https://api.dicebear.com/7.x/identicon/svg?seed=vibetasks'}
                  alt="Profile"
                  className="h-16 w-16 rounded-2xl object-cover border border-neutral-200 dark:border-neutral-800"
                />
                <label className="absolute -bottom-2 -right-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-xl px-2 py-1 text-xs cursor-pointer shadow">
                  Upload
                  <input type="file" accept="image/*" onChange={onUpload} className="hidden" />
                </label>
              </div>
              <div className="flex-1">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Progress</p>
                <ProgressBar xp={xp} level={level} />
              </div>
            </div>
            <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">{totalXPToNext - (xp % totalXPToNext)} XP to next level</p>
          </div>

          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 bg-white dark:bg-neutral-900 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Collaborate</h3>
              <Share2 className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
            </div>
            <form onSubmit={onInvite} className="mt-4 flex gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-3 flex items-center text-neutral-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="teammate@company.com"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                />
              </div>
              <button className="px-4 py-2 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-medium shadow hover:shadow-md transition">
                Invite
              </button>
            </form>
            {inviteMsg && <p className="mt-3 text-sm text-green-600 dark:text-green-400">{inviteMsg}</p>}
            <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Share tasks and categories with teammates via email.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
