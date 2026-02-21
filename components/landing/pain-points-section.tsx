import { AlertCircle, Clock, TrendingDown } from 'lucide-react';

const PAIN_POINTS = [
  {
    icon: Clock,
    title: 'Hours Lost to Manual Work',
    description:
      'The average SMB employee spends 8+ hours per week on tasks that AI could handle in minutes — data entry, report building, scheduling, and follow-up emails.',
    stat: '8 hrs/week',
    statLabel: 'lost per employee',
  },
  {
    icon: TrendingDown,
    title: 'Slow Response = Lost Revenue',
    description:
      'Businesses that respond to inquiries after 4 hours lose 22% more deals than those that respond within the hour. Most SMBs are responding in 6–24 hours.',
    stat: '22% more',
    statLabel: 'deals lost',
  },
  {
    icon: AlertCircle,
    title: 'Siloed Systems Drain Productivity',
    description:
      'When your CRM, accounting software, and project tools do not talk to each other, your team becomes the bridge — manually copying data between systems all day.',
    stat: '15–25%',
    statLabel: 'productivity loss',
  },
];

export function PainPointsSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Sound Familiar?
        </h2>
        <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
          These are the three most common profit leaks we find in SMBs. Most owners know
          something is off — they just do not know exactly where to focus.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {PAIN_POINTS.map(({ icon: Icon, title, description, stat, statLabel }) => (
            <div key={title} className="text-center p-6 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-[#0F2847] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-[#0F2847] mb-1">{stat}</div>
              <div className="text-xs text-gray-400 mb-3">{statLabel}</div>
              <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
