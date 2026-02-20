"use client";

import { useState, useMemo } from "react";
import programs from "../../../data/programs.json";
import partners from "../../../data/partners.json";
import bonuses from "../../../data/bonuses.json";

const programMap = programs.reduce((acc, p) => ({ ...acc, [p.id]: p }), {} as Record<string, typeof programs[0]>);
const partnerMap = partners.reduce((acc, p) => ({ ...acc, [p.id]: p }), {} as Record<string, typeof partners[0]>);

export default function LiveBonusesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [selectedPartner, setSelectedPartner] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredBonuses = useMemo(() => {
    return bonuses
      .filter((bonus) => {
        const matchesSearch = 
          searchQuery === "" ||
          bonus.program_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bonus.partner_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          programMap[bonus.program_id]?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          partnerMap[bonus.partner_id]?.name.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesProgram = selectedProgram === "all" || bonus.program_id === selectedProgram;
        const matchesPartner = selectedPartner === "all" || bonus.partner_id === selectedPartner;
        const matchesStatus = selectedStatus === "all" || bonus.status === selectedStatus;

        return matchesSearch && matchesProgram && matchesPartner && matchesStatus;
      })
      .sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());
  }, [searchQuery, selectedProgram, selectedPartner, selectedStatus]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <header className="sticky top-0 z-20 border-b border-[#E2E8F0] bg-white/95 backdrop-blur">
         <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-xl font-semibold tracking-tight text-[#1D4ED8]">TransferPoints</div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-[#475569] md:flex">
            <a href="/" className="hover:text-[#2563EB]">Home</a>
            <a href="/bonuses" className="text-[#2563EB]">Live Bonuses</a>
            <a href="/history" className="hover:text-[#2563EB]">History</a>
             <a href="/programs" className="hover:text-[#2563EB]">Programs</a>
            <a href="/partners" className="hover:text-[#2563EB]">Airlines & Hotels</a>
             <a href="/matrix" className="hover:text-[#2563EB]">Matrix</a>
          </nav>
           <div className="flex items-center gap-3">
            <button className="rounded-full bg-[#2563EB] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8]">
              Set Alerts
            </button>
          </div>
        </div>
      </header>
      
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0F172A]">All Transfer Bonuses</h1>
            <p className="mt-2 text-[#64748B]">View all current, upcoming, and past transfer bonuses.</p>
        </div>

        <div className="mb-8 space-y-4 rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
             <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                  <label className="mb-1 block text-xs font-semibold uppercase text-[#64748B]">Search</label>
                  <input 
                    type="text" 
                    placeholder="Search banks, airlines..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 text-sm text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
                  />
                </div>
                <div>
                   <label className="mb-1 block text-xs font-semibold uppercase text-[#64748B]">Program</label>
                   <select 
                      value={selectedProgram}
                      onChange={(e) => setSelectedProgram(e.target.value)}
                      className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 text-sm text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
                   >
                      <option value="all">All Programs</option>
                      {programs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                   </select>
                </div>
                <div>
                   <label className="mb-1 block text-xs font-semibold uppercase text-[#64748B]">Partner</label>
                   <select 
                      value={selectedPartner}
                      onChange={(e) => setSelectedPartner(e.target.value)}
                      className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 text-sm text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
                   >
                      <option value="all">All Partners</option>
                       {partners.sort((a,b) => a.name.localeCompare(b.name)).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                   </select>
                </div>
                <div>
                   <label className="mb-1 block text-xs font-semibold uppercase text-[#64748B]">Status</label>
                   <select 
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 text-sm text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
                   >
                      <option value="all">Any Status</option>
                      <option value="live">Live</option>
                      <option value="upcoming">Upcoming</option>
                      <option value="expired">Expired</option>
                   </select>
                </div>
             </div>
             
             <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-4">
                <span className="text-sm font-medium text-[#64748B]">Showing {filteredBonuses.length} results</span>
                {(searchQuery || selectedProgram !== "all" || selectedPartner !== "all" || selectedStatus !== "all") && (
                  <button 
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedProgram("all");
                      setSelectedPartner("all");
                      setSelectedStatus("all");
                    }}
                    className="text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8]"
                  >
                    Clear Filters
                  </button>
                )}
             </div>
        </div>

        {filteredBonuses.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#E2E8F0] bg-white py-20 text-center">
             <div className="rounded-full bg-[#F1F5F9] p-4">
                <svg className="h-8 w-8 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
             </div>
             <h3 className="mt-4 text-lg font-semibold text-[#0F172A]">No bonuses found</h3>
             <p className="mt-2 text-[#64748B]">Try adjusting your search or filters to find what you're looking for.</p>
             <button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedProgram("all");
                  setSelectedPartner("all");
                  setSelectedStatus("all");
                }}
                className="mt-6 rounded-xl bg-[#EFF6FF] px-6 py-2.5 text-sm font-semibold text-[#2563EB] hover:bg-[#DBEAFE] transition"
             >
               Clear Filters
             </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
             {filteredBonuses.map((bonus) => (
              <article key={bonus.id} className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#2563EB] hover:shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                   <div className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide inline-flex items-center gap-1.5 ${
                      bonus.status === 'live' ? 'bg-[#ECFDF5] text-[#065F46] ring-1 ring-[#065F46]/10' :
                      bonus.status === 'expired' ? 'bg-[#FEF2F2] text-[#991B1B] ring-1 ring-[#991B1B]/10' :
                      'bg-[#EFF6FF] text-[#1E40AF] ring-1 ring-[#1E40AF]/10'
                    }`}>
                      {bonus.status === 'live' && <span className="relative flex h-2 w-2 mr-1"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>}
                      {bonus.status}
                    </div>
                  {bonus.targeted && (
                    <span className="rounded-full bg-[#F1F5F9] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#64748B] border border-[#E2E8F0]">Targeted</span>
                  )}
                </div>
                
                <div className="flex items-center gap-3 mb-1">
                   {programMap[bonus.program_id] && (
                       <img src={programMap[bonus.program_id].logo_url} alt={programMap[bonus.program_id].name} className="h-10 w-10 rounded-full bg-white object-contain border border-gray-100 p-0.5 shadow-sm" />
                   )}
                   <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                   {partnerMap[bonus.partner_id] && (
                       <img src={partnerMap[bonus.partner_id].logo_url} alt={partnerMap[bonus.partner_id].name} className="h-10 w-10 rounded-full bg-white object-contain border border-gray-100 p-0.5 shadow-sm" />
                   )}
                </div>

                <div className="text-sm font-medium text-[#64748B] mb-2 truncate">
                  {programMap[bonus.program_id]?.name || bonus.program_id} → {partnerMap[bonus.partner_id]?.name || bonus.partner_id}
                </div>
                
                <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-black text-[#F59E0B] tracking-tight">+{bonus.bonus_pct}%</span>
                    <span className="text-sm font-medium text-[#F59E0B] uppercase tracking-wide">Bonus</span>
                </div>
                
                <div className="flex items-center gap-2 text-xs font-medium text-[#64748B] bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  {new Date(bonus.start_date).toLocaleDateString(undefined, {month:'short', day:'numeric'})} – {bonus.end_date ? new Date(bonus.end_date).toLocaleDateString(undefined, {month:'short', day:'numeric'}) : "TBD"}
                  {bonus.status === 'live' && bonus.end_date && (
                     <span className={`ml-auto font-bold ${new Date(bonus.end_date).getTime() - Date.now() < 7 * 86400000 ? "text-orange-600" : "text-emerald-600"}`}>
                        {Math.ceil((new Date(bonus.end_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days left
                     </span>
                  )}
                </div>
                
                <div className="mt-6 flex gap-3">
                  <a href={bonus.source_url} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-semibold text-[#334155] shadow-sm hover:bg-slate-50 transition">
                    Details
                  </a>
                  {programMap[bonus.program_id]?.bank && (
                      <button className="flex-1 rounded-xl bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-[#1D4ED8] transition">
                        Transfer
                      </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
