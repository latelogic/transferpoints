import programs from "../../data/programs.json";
import partners from "../../data/partners.json";
import bonuses from "../../data/bonuses.json";

const heroStats = [
  { label: "Active Bonuses", value: bonuses.filter((b) => b.status === "live").length },
  { label: "Programs Tracked", value: programs.length },
  { label: "Transfer Partners", value: partners.length },
  { label: "Last Updated", value: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }) },
];

const topBonuses = bonuses
  .filter((bonus) => bonus.status === "live")
  .sort((a, b) => b.bonus_pct - a.bonus_pct)
  .slice(0, 6);

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <header className="sticky top-0 z-20 border-b border-[#E2E8F0] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-xl font-semibold tracking-tight text-[#1D4ED8]">TransferPoints</div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-[#475569] md:flex">
            <a href="#live" className="hover:text-[#2563EB]">
              Live Bonuses
            </a>
            <a href="#history" className="hover:text-[#2563EB]">
              History
            </a>
            <a href="#programs" className="hover:text-[#2563EB]">
              Programs
            </a>
            <a href="#partners" className="hover:text-[#2563EB]">
              Airlines & Hotels
            </a>
            <a href="#matrix" className="hover:text-[#2563EB]">
              Matrix
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="hidden items-center rounded-full border border-[#E2E8F0] px-4 py-2 text-sm font-semibold text-[#2563EB] md:flex">
              Search
            </button>
            <button className="rounded-full bg-[#2563EB] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8]">
              Set Alerts
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <section className="rounded-3xl bg-white p-10 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">Live Tracker</p>
          <h1 className="mt-4 text-4xl font-bold text-[#0F172A] sm:text-5xl">
            Never Miss a Transfer Bonus Again
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[#475569]">
            Monitor every credit card rewards currency, airline, and hotel partner in one premium dashboard modeled after
            your favorite travel tools.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white px-4 py-3 shadow-inner">
              <span className="text-[#94A3B8]">Search</span>
              <input
                type="text"
                placeholder="Program, airline, or partner"
                className="w-full border-none bg-transparent text-base text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none"
              />
            </div>
            <button className="flex items-center justify-center rounded-2xl bg-[#2563EB] px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-[#1D4ED8]">
              View Live Bonuses
            </button>
          </div>
        </section>

        <section className="mt-8 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white">
          <div className="animate-marquee flex gap-6 whitespace-nowrap bg-[#EFF6FF] px-6 py-3 text-sm text-[#0F172A]">
            {topBonuses.map((bonus) => (
              <div key={`${bonus.program_id}-${bonus.partner_id}`} className="flex items-center gap-2">
                <span className="text-[#2563EB] font-semibold">{bonus.program_id.toUpperCase()}</span>
                <span className="text-[#94A3B8]">→</span>
                <span className="font-medium">{bonus.partner_id.replace(/-/g, " ")}</span>
                <span className="rounded-full bg-[#FFFBEB] px-2 py-0.5 text-xs font-semibold text-[#92400E]">
                  +{bonus.bonus_pct}%
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid grid-cols-2 gap-4 rounded-3xl bg-white p-6 text-center shadow-sm sm:grid-cols-4">
          {heroStats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-[#E2E8F0] px-4 py-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">{stat.label}</p>
              <p className="mt-3 text-2xl font-bold text-[#0F172A]">{stat.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-12" id="live">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#94A3B8]">Featured Bonuses</p>
              <h2 className="text-3xl font-bold text-[#0F172A]">Top Live Offers</h2>
            </div>
            <button className="text-sm font-semibold text-[#2563EB]">View all</button>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topBonuses.map((bonus) => (
              <article key={`${bonus.id}`} className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#2563EB] hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#ECFDF5] px-3 py-1 text-xs font-semibold text-[#065F46]">Live</span>
                  {bonus.targeted && (
                    <span className="rounded-full bg-[#F1F5F9] px-3 py-1 text-xs font-semibold text-[#475569]">Targeted</span>
                  )}
                </div>
                <div className="mt-4 text-sm font-semibold text-[#475569]">
                  {bonus.program_id} → {bonus.partner_id}
                </div>
                <div className="mt-4 text-4xl font-black text-[#F59E0B]">+{bonus.bonus_pct}%</div>
                <p className="mt-3 text-sm text-[#475569]">
                  {bonus.start_date} – {bonus.end_date || "TBD"}
                </p>
                <div className="mt-6 flex gap-3">
                  <button className="flex-1 rounded-2xl border border-[#E2E8F0] px-4 py-2 text-sm font-semibold text-[#2563EB]">
                    Details
                  </button>
                  <button className="flex-1 rounded-2xl bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white">
                    Transfer Now
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12" id="programs">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#94A3B8]">Programs</p>
              <h2 className="text-3xl font-bold text-[#0F172A]">Credit Card Points</h2>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {programs.map((program) => (
              <div key={program.id} className="min-w-[280px] flex-shrink-0 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm hover:border-[#2563EB] transition cursor-pointer">
                <div className="flex items-center gap-4">
                  <img src={program.logo_url} alt={program.name} className="h-10 w-10 rounded-full object-contain bg-white border border-gray-100" />
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-sm">{program.name}</h3>
                    <p className="text-xs text-[#64748B]">{program.bank}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-[#64748B]">{program.key_cards.length} Cards</span>
                  {bonuses.filter(b => b.program_id === program.id && b.status === "live").length > 0 && (
                     <span className="rounded-full bg-[#EFF6FF] px-2 py-1 text-xs font-semibold text-[#1D4ED8]">
                       {bonuses.filter(b => b.program_id === program.id && b.status === "live").length} Active Bonuses
                     </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12" id="partners">
           <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#94A3B8]">Partners</p>
              <h2 className="text-3xl font-bold text-[#0F172A]">Airlines & Hotels</h2>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {partners.map((partner) => (
              <div key={partner.id} className="min-w-[240px] flex-shrink-0 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm hover:border-[#2563EB] transition cursor-pointer">
                 <div className="flex items-center gap-4">
                  <img src={partner.logo_url} alt={partner.name} className="h-10 w-10 rounded-full object-contain bg-white border border-gray-100" />
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-sm truncate max-w-[140px]">{partner.name}</h3>
                    <p className="text-xs text-[#64748B]">{partner.alliance === "independent" ? "Independent" : partner.alliance}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

         <section className="mt-12 mb-12">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Recent Activity</h2>
             <div className="space-y-4">
              {bonuses.slice(0, 5).map((bonus, i) => (
                <div key={i} className="flex items-center gap-4 rounded-xl border border-[#E2E8F0] bg-white p-4">
                    <div className="h-2 w-2 rounded-full bg-[#2563EB]"></div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-[#0F172A]">
                            <span className="font-bold">{bonus.program_id}</span> added a <span className="font-bold text-[#F59E0B]">{bonus.bonus_pct}% transfer bonus</span> to {bonus.partner_id}
                        </p>
                        <p className="text-xs text-[#64748B]">Updated {bonus.start_date}</p>
                    </div>
                </div>
              ))}
             </div>
        </section>
      </main>
    </div>
  );
}
