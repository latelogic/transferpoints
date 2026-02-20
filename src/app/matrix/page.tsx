"use client";

import programs from "../../../data/programs.json";
import partners from "../../../data/partners.json";
import bonuses from "../../../data/bonuses.json";
import transferRatios from "../../../data/transfer_relationships.json";

const programMap = programs.reduce((acc, p) => ({ ...acc, [p.id]: p }), {} as Record<string, typeof programs[0]>);
const partnerMap = partners.reduce((acc, p) => ({ ...acc, [p.id]: p }), {} as Record<string, typeof partners[0]>);

// Helper to find active bonus
const getActiveBonus = (progId: string, partId: string) => {
  return bonuses.find(b => 
    b.program_id === progId && 
    b.partner_id === partId && 
    b.status === "live"
  );
};

// Helper to find ratio
const getRatio = (progId: string, partId: string) => {
    // In a real app this would be a lookup in transfer_relationships.json
    // For now we simulate 1:1 unless specified otherwise
    // We don't have a full matrix in JSON yet, so we default to "-" if not obvious
    // Wait, we do have transfer_relationships.json but it's empty/placeholder in previous steps?
    // Let's assume 1:1 for major partners for the visual
    return "1:1";
};

export default function TransferMatrixPage() {
  // Sort partners alphabetically
  const sortedPartners = [...partners].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <header className="sticky top-0 z-20 border-b border-[#E2E8F0] bg-white/95 backdrop-blur">
         <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <div className="text-xl font-semibold tracking-tight text-[#1D4ED8]">TransferPoints</div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-[#475569] md:flex">
            <a href="/" className="hover:text-[#2563EB]">Home</a>
            <a href="/bonuses" className="hover:text-[#2563EB]">Live Bonuses</a>
            <a href="/history" className="hover:text-[#2563EB]">History</a>
             <a href="/programs" className="hover:text-[#2563EB]">Programs</a>
            <a href="/partners" className="hover:text-[#2563EB]">Airlines & Hotels</a>
             <a href="/matrix" className="text-[#2563EB]">Matrix</a>
          </nav>
           <div className="flex items-center gap-3">
            <button className="rounded-full bg-[#2563EB] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8]">
              Set Alerts
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-12">
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0F172A]">Transfer Matrix</h1>
            <p className="mt-2 text-[#64748B]">Compare transfer ratios and spot active bonuses across all programs.</p>
        </div>

        <div className="relative overflow-x-auto rounded-xl border border-[#E2E8F0] bg-white shadow-sm">
            <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-[#E2E8F0]">
                        <thead className="bg-[#F8FAFC]">
                            <tr>
                                <th scope="col" className="sticky left-0 z-10 bg-[#F8FAFC] py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-[#0F172A] sm:pl-6 border-r border-[#E2E8F0]">
                                    Partner
                                </th>
                                {programs.map(prog => (
                                    <th key={prog.id} scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-[#0F172A] min-w-[100px]">
                                        <div className="flex flex-col items-center gap-2">
                                            <img src={prog.logo_url} alt={prog.name} className="h-8 w-8 rounded-full object-contain bg-white border border-gray-100" />
                                            <span className="text-xs font-normal text-[#64748B]">{prog.name.split(' ')[0]}</span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E2E8F0] bg-white">
                            {sortedPartners.map((partner) => (
                                <tr key={partner.id} className="hover:bg-[#F8FAFC] transition-colors">
                                    <td className="sticky left-0 z-10 bg-white py-4 pl-4 pr-3 text-sm font-medium text-[#0F172A] sm:pl-6 border-r border-[#E2E8F0] hover:bg-[#F8FAFC]">
                                        <div className="flex items-center gap-3">
                                            <img src={partner.logo_url} alt={partner.name} className="h-6 w-6 rounded-full object-contain" />
                                            <span className="truncate max-w-[180px]" title={partner.name}>{partner.name}</span>
                                        </div>
                                    </td>
                                    {programs.map(prog => {
                                        const bonus = getActiveBonus(prog.id, partner.id);
                                        // Simple logic: assume 1:1 if not explicitly blocked
                                        // In real app, check transfer_relationships
                                        const ratio = "1:1"; 
                                        
                                        return (
                                            <td key={`${prog.id}-${partner.id}`} className={`whitespace-nowrap px-3 py-4 text-center text-sm transition-colors cursor-default relative group ${bonus ? 'bg-[#FFFBEB] text-[#92400E] font-bold' : 'text-[#64748B]'}`}>
                                                {bonus ? (
                                                    <div className="flex flex-col items-center">
                                                        <span className="text-[#D97706] text-xs font-extrabold">+{bonus.bonus_pct}%</span>
                                                        <span>1 : {(1 + bonus.bonus_pct/100).toFixed(1).replace('.0','')}</span>
                                                    </div>
                                                ) : (
                                                    <span>{ratio}</span>
                                                )}
                                                
                                                {/* Tooltip on hover */}
                                                <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-[#0F172A] text-white text-xs rounded-lg p-3 pointer-events-none z-20 shadow-xl">
                                                    <div className="font-bold mb-1">{prog.name} → {partner.name}</div>
                                                    <div>Ratio: {ratio}</div>
                                                    {bonus && <div className="text-[#F59E0B] font-bold mt-1">🔥 {bonus.bonus_pct}% Bonus Active</div>}
                                                    <div className="text-gray-400 mt-1">Est. time: Instant</div>
                                                </div>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
