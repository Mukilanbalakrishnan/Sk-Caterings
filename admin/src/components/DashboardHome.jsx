import React from 'react';
import { Users, FileText, Layers, TrendingUp, Eye, Search, Filter, MoreHorizontal, Mail, Phone, Calendar } from 'lucide-react';

const DashboardHome = () => {
  return (
    <div className="space-y-8 animate-fade-in pb-10">
      
      {/* --- WELCOME HEADER --- */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif text-white font-bold">Admin Dashboard</h1>
          <p className="text-gray-400 mt-1 text-sm">Overview of website traffic and customer enquiries.</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 uppercase tracking-widest">Today's Date</p>
          <p className="text-white font-mono">Oct 24, 2024</p>
        </div>
      </div>

      {/* --- KEY METRICS (STATS) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Visitors Stat */}
        <StatCard 
          title="Total Visitors" 
          value="12,450" 
          trend="+15%" 
          icon={<Eye size={24} />} 
          color="text-blue-400" 
          bg="bg-blue-500/10"
          border="border-blue-500/20"
        />
        
        {/* Enquiries Stat */}
        <StatCard 
          title="Total Enquiries" 
          value="84" 
          trend="+8%" 
          icon={<FileText size={24} />} 
          color="text-amber-400" 
          bg="bg-amber-500/10" 
          border="border-amber-500/20"
        />

        {/* Services Stat */}
        <StatCard 
          title="Active Services" 
          value="05" 
          trend="Stable" 
          icon={<Layers size={24} />} 
          color="text-emerald-400" 
          bg="bg-emerald-500/10" 
          border="border-emerald-500/20"
        />
      </div>

      {/* --- ENQUIRY DETAILS SECTION --- */}
      <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
        
        {/* Table Header Controls */}
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <h3 className="text-lg font-bold text-white">Recent Enquiry Submissions</h3>
          
          <div className="flex gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search name..." 
                className="bg-[#1a1a1a] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500/50 w-64"
              />
            </div>
            <button className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#222] text-gray-300 px-4 py-2 rounded-lg border border-white/10 text-sm transition-colors">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider border-b border-white/5">
                <th className="p-5 font-medium">Customer Name</th>
                <th className="p-5 font-medium">Service Interest</th>
                <th className="p-5 font-medium">Event Date</th>
                <th className="p-5 font-medium">Contact Info</th>
                <th className="p-5 font-medium">Guest Count</th>
                <th className="p-5 font-medium">Status</th>
                <th className="p-5 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm text-gray-300">
              {/* Dummy Data Rows */}
              {[
                { name: "Rahul Verma", service: "Royal Wedding", date: "12 Nov, 2024", email: "rahul@gmail.com", phone: "+91 98765 43210", count: 500, status: "New" },
                { name: "Sneha Kapoor", service: "Birthday Bash", date: "05 Dec, 2024", email: "sneha.k@yahoo.com", phone: "+91 91234 56789", count: 100, status: "Reviewing" },
                { name: "Tech Solutions", service: "Corporate Gala", date: "20 Jan, 2025", email: "contact@techsol.io", phone: "+91 88888 99999", count: 250, status: "Quoted" },
                { name: "Anita Desai", service: "Private Party", date: "14 Feb, 2025", email: "anita.d@gmail.com", phone: "+91 77777 11111", count: 50, status: "Completed" },
                { name: "Vikram Singh", service: "Wedding Grandeur", date: "01 Mar, 2025", email: "vikram99@gmail.com", phone: "+91 99999 00000", count: 800, status: "New" },
              ].map((row, index) => (
                <tr key={index} className="hover:bg-white/5 transition-colors group">
                  <td className="p-5 font-medium text-white">
                    {row.name}
                  </td>
                  <td className="p-5">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      {row.service}
                    </span>
                  </td>
                  <td className="p-5 text-gray-400">{row.date}</td>
                  <td className="p-5">
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1.5 text-xs text-gray-400"><Mail size={10} /> {row.email}</span>
                      <span className="flex items-center gap-1.5 text-xs text-gray-400"><Phone size={10} /> {row.phone}</span>
                    </div>
                  </td>
                  <td className="p-5">{row.count} Pax</td>
                  <td className="p-5">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="p-5 text-right">
                    <button className="text-gray-500 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 border-t border-white/5 flex justify-center">
          <button className="text-xs text-amber-500 hover:text-amber-400 font-bold uppercase tracking-widest transition-colors">
            View All Enquiries
          </button>
        </div>
      </div>

    </div>
  );
};

// --- HELPER COMPONENTS ---

const StatCard = ({ title, value, trend, icon, color, bg, border }) => (
  <div className={`p-6 rounded-2xl bg-[#111] border border-white/5 hover:border-amber-500/30 transition-all group relative overflow-hidden`}>
    <div className={`absolute top-0 right-0 p-4 rounded-bl-2xl border-b border-l border-white/5 ${bg}`}>
      <span className={color}>{icon}</span>
    </div>
    
    <p className="text-gray-400 text-xs uppercase tracking-widest mb-3 font-semibold opacity-70">{title}</p>
    <div className="flex items-end gap-3">
      <h3 className="text-4xl font-serif text-white">{value}</h3>
      <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full mb-1 ${bg} ${color} ${border} border`}>
        <TrendingUp size={10} /> {trend}
      </div>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    'New': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'Reviewing': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Quoted': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'Completed': 'bg-green-500/10 text-green-400 border-green-500/20',
  };

  const defaultStyle = 'bg-gray-500/10 text-gray-400 border-gray-500/20';

  return (
    <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${styles[status] || defaultStyle}`}>
      {status}
    </span>
  );
};

export default DashboardHome;