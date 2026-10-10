import React, { useState, useMemo } from 'react';
import { Footballer, PlayerPosition, PlayerStatus } from '../types';
import { 
  Users, 
  Search, 
  Filter, 
  Trash2, 
  Eye, 
  Download, 
  RefreshCw, 
  Sparkles, 
  ChevronDown, 
  UserPlus, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  LayoutGrid, 
  Table as TableIcon,
  Phone,
  Mail,
  ArrowUpDown,
  FileSpreadsheet
} from 'lucide-react';

interface AdminDashboardProps {
  footballers: Footballer[];
  isFirebaseLive: boolean;
  onUpdateStatus: (id: string, newStatus: PlayerStatus) => Promise<void>;
  onDeletePlayer: (id: string) => Promise<void>;
  onSelectPlayer: (player: Footballer) => void;
  onOpenRegister: () => void;
  onResetSampleData: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  footballers,
  isFirebaseLive,
  onUpdateStatus,
  onDeletePlayer,
  onSelectPlayer,
  onOpenRegister,
  onResetSampleData,
}) => {
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [positionFilter, setPositionFilter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'name' | 'height'>('newest');

  // Deletion prompt modal state
  const [playerToDelete, setPlayerToDelete] = useState<Footballer | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Status updating inline tracking
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Summary Metrics calculations
  const totalRegistered = footballers.length;
  const pendingTrials = useMemo(
    () => footballers.filter((f) => f.status === 'Pending Trial').length,
    [footballers]
  );
  const activeMembers = useMemo(
    () => footballers.filter((f) => f.status === 'Active Academy Member').length,
    [footballers]
  );
  const acceptedCount = useMemo(
    () => footballers.filter((f) => f.status === 'Accepted').length,
    [footballers]
  );
  const declinedCount = useMemo(
    () => footballers.filter((f) => f.status === 'Declined').length,
    [footballers]
  );

  // Filtered & Sorted footballers
  const filteredFootballers = useMemo(() => {
    return footballers
      .filter((p) => {
        // Status filter
        if (statusFilter !== 'All' && p.status !== statusFilter) return false;
        // Position filter
        if (positionFilter !== 'All' && p.position !== positionFilter) return false;
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.fullName.toLowerCase().includes(q);
          const matchEmail = p.email.toLowerCase().includes(q);
          const matchPhone = p.phone.toLowerCase().includes(q);
          const matchBio = (p.bio || '').toLowerCase().includes(q);
          const matchId = p.id.toLowerCase().includes(q);
          if (!matchName && !matchEmail && !matchPhone && !matchBio && !matchId) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.fullName.localeCompare(b.fullName);
        if (sortBy === 'height') return b.height - a.height;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [footballers, searchQuery, statusFilter, positionFilter, sortBy]);

  // Handle direct status change
  const handleStatusChange = async (id: string, newStatus: PlayerStatus) => {
    try {
      setUpdatingId(id);
      await onUpdateStatus(id, newStatus);
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (!playerToDelete) return;
    setIsDeleting(true);
    try {
      await onDeletePlayer(playerToDelete.id);
      setPlayerToDelete(null);
    } catch (err) {
      console.error('Failed to delete player:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (footballers.length === 0) return;
    const headers = [
      'ID',
      'Full Name',
      'DOB',
      'Age',
      'Position',
      'Preferred Foot',
      'Height (cm)',
      'Phone',
      'Email',
      'Emergency Contact Name',
      'Emergency Contact Phone',
      'Emergency Relation',
      'Status',
      'Registration Date',
      'Bio'
    ];

    const rows = filteredFootballers.map((p) => [
      `"${p.id}"`,
      `"${p.fullName}"`,
      `"${p.dob}"`,
      p.age || '',
      `"${p.position}"`,
      `"${p.preferredFoot}"`,
      p.height,
      `"${p.phone}"`,
      `"${p.email}"`,
      `"${p.emergencyContactName}"`,
      `"${p.emergencyContactPhone}"`,
      `"${p.emergencyContactRelation}"`,
      `"${p.status}"`,
      `"${p.createdAt}"`,
      `"${(p.bio || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `superstar_academy_squad_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadgeStyle = (status: PlayerStatus) => {
    switch (status) {
      case 'Active Academy Member':
        return 'bg-emerald-500/20 text-[#00F59B] border-emerald-500/40';
      case 'Accepted':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'Pending Trial':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Declined':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      default:
        return 'bg-emerald-950 text-emerald-300 border-emerald-500/30';
    }
  };

  return (
    <div className="py-8 lg:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Top Title & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-3xl font-extrabold text-white font-display">
              Academy Management Dashboard
            </h2>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
              isFirebaseLive 
                ? 'bg-emerald-950 text-[#00F59B] border-emerald-400' 
                : 'bg-emerald-950 text-emerald-300 border-emerald-500/30'
            }`}>
              {isFirebaseLive ? 'LIVE FIRESTORE' : 'SYNCED REPOSITORY'}
            </span>
          </div>
          <p className="text-xs text-emerald-300/80 mt-1">
            Real-time talent tracking, Abuja trial assessment approvals, and national squad roster registry.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            title="Download CSV roster"
            className="px-3.5 py-2.5 rounded-xl text-xs font-semibold glass-panel text-emerald-200 hover:text-white hover:bg-emerald-950/60 border-emerald-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#00F59B]" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <button
            onClick={onOpenRegister}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#00F59B] text-[#041912] hover:bg-[#34f8ac] transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Trialist</span>
          </button>
        </div>
      </div>

      {/* SUMMARY COUNTER METRICS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        
        {/* Metric 1: Total Registered */}
        <div className="glass-panel p-5 rounded-2xl border-emerald-500/25 relative overflow-hidden group hover:border-[#00F59B]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-emerald-300 uppercase">
              Total Registered
            </span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-display mt-2">
            {totalRegistered}
          </div>
          <p className="text-[11px] text-emerald-400/80 mt-1">
            Talent dossiers on file
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />
        </div>

        {/* Metric 2: Pending Trials */}
        <div className="glass-panel p-5 rounded-2xl border-amber-500/30 bg-amber-950/10 relative overflow-hidden group hover:border-amber-400/60 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-amber-300 uppercase">
              Pending Trials
            </span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-amber-200 font-display mt-2">
            {pendingTrials}
          </div>
          <p className="text-[11px] text-amber-300/80 mt-1">
            Awaiting coach assessment
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-400" />
        </div>

        {/* Metric 3: Active Members */}
        <div className="glass-panel p-5 rounded-2xl border-[#00F59B]/30 bg-emerald-950/20 relative overflow-hidden group hover:border-[#00F59B]/60 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-[#00F59B] uppercase">
              Active Members
            </span>
            <CheckCircle2 className="w-4 h-4 text-[#00F59B]" />
          </div>
          <div className="text-3xl font-extrabold text-[#00F59B] font-display mt-2">
            {activeMembers}
          </div>
          <p className="text-[11px] text-emerald-300/80 mt-1">
            Contracted academy squad
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00F59B]" />
        </div>

        {/* Metric 4: Accepted Trials */}
        <div className="glass-panel p-5 rounded-2xl border-cyan-500/30 relative overflow-hidden group hover:border-cyan-400/60 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-cyan-300 uppercase">
              Accepted / Next Round
            </span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-cyan-200 font-display mt-2">
            {acceptedCount}
          </div>
          <p className="text-[11px] text-cyan-300/80 mt-1">
            Advanced to phase 2
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-400" />
        </div>

      </div>

      {/* FILTER & SEARCH CONTROLS */}
      <div className="glass-panel p-4 sm:p-5 rounded-2xl border-emerald-500/25 mb-6 space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by player name, phone, email, notes, or position..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm placeholder-emerald-700 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-emerald-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Status Filter */}
            <div className="flex items-center gap-1.5 bg-[#041a12] px-3 py-1.5 rounded-xl border border-emerald-500/20 text-xs">
              <span className="text-emerald-400 font-medium">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-white font-semibold outline-none cursor-pointer"
              >
                <option value="All" className="bg-[#041912]">All Statuses ({totalRegistered})</option>
                <option value="Pending Trial" className="bg-[#041912]">Pending Trial ({pendingTrials})</option>
                <option value="Accepted" className="bg-[#041912]">Accepted ({acceptedCount})</option>
                <option value="Active Academy Member" className="bg-[#041912]">Active Member ({activeMembers})</option>
                <option value="Declined" className="bg-[#041912]">Declined ({declinedCount})</option>
              </select>
            </div>

            {/* Position Filter */}
            <div className="flex items-center gap-1.5 bg-[#041a12] px-3 py-1.5 rounded-xl border border-emerald-500/20 text-xs">
              <span className="text-emerald-400 font-medium">Pos:</span>
              <select
                value={positionFilter}
                onChange={(e) => setPositionFilter(e.target.value)}
                className="bg-transparent text-white font-semibold outline-none cursor-pointer"
              >
                <option value="All" className="bg-[#041912]">All Positions</option>
                <option value="Striker" className="bg-[#041912]">Striker</option>
                <option value="Midfielder" className="bg-[#041912]">Midfielder</option>
                <option value="Defender" className="bg-[#041912]">Defender</option>
                <option value="Goalkeeper" className="bg-[#041912]">Goalkeeper</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div className="flex items-center gap-1.5 bg-[#041a12] px-3 py-1.5 rounded-xl border border-emerald-500/20 text-xs">
              <ArrowUpDown className="w-3 h-3 text-emerald-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-white font-semibold outline-none cursor-pointer"
              >
                <option value="newest" className="bg-[#041912]">Newest Registration</option>
                <option value="name" className="bg-[#041912]">Name (A-Z)</option>
                <option value="height" className="bg-[#041912]">Height (Tallest)</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#041a12] p-1 rounded-xl border border-emerald-500/20">
              <button
                onClick={() => setViewMode('grid')}
                title="Grid view"
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-[#00F59B] text-[#041912]' : 'text-emerald-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                title="Table view"
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'table' ? 'bg-[#00F59B] text-[#041912]' : 'text-emerald-400 hover:text-white'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

        {/* Active Filter Chips */}
        <div className="flex items-center justify-between text-xs text-emerald-300/80 pt-2 border-t border-emerald-900/40">
          <div>
            Showing <span className="font-bold text-white">{filteredFootballers.length}</span> of {totalRegistered} footballers
          </div>

          {footballers.length === 0 && (
            <button
              onClick={onResetSampleData}
              className="text-[#00F59B] hover:underline font-bold flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              Seed Demo Academy Players
            </button>
          )}
        </div>
      </div>

      {/* NO PLAYERS EMPTY STATE */}
      {filteredFootballers.length === 0 && (
        <div className="glass-panel rounded-3xl p-12 text-center border-dashed border-emerald-500/30">
          <Users className="w-12 h-12 text-emerald-500/50 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white font-display">No footballers match your filter</h3>
          <p className="text-xs text-emerald-300/80 mt-1 max-w-md mx-auto">
            Try adjusting your search query, or seed sample player records to preview the full admin capabilities.
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('All');
                setPositionFilter('All');
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold glass-panel text-emerald-200"
            >
              Clear Filters
            </button>
            <button
              onClick={onResetSampleData}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#00F59B] text-[#041912]"
            >
              Seed Sample Academy Squad
            </button>
          </div>
        </div>
      )}

      {/* GRID VIEW */}
      {viewMode === 'grid' && filteredFootballers.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredFootballers.map((player) => {
            const isUpdating = updatingId === player.id;
            return (
              <div
                key={player.id}
                className="glass-panel p-5 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Position & Status Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30 text-[#00F59B]">
                      {player.position} &bull; {player.preferredFoot} Foot
                    </span>
                    
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeStyle(player.status)}`}>
                      {player.status}
                    </span>
                  </div>

                  {/* Player Identity */}
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#042016] border border-emerald-500/30 flex items-center justify-center font-display font-extrabold text-white text-base shrink-0 group-hover:border-[#00F59B] transition-colors">
                      {player.squadNumber || player.fullName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white font-display group-hover:text-[#00F59B] transition-colors">
                        {player.fullName}
                      </h4>
                      <p className="text-xs text-emerald-300/80 font-mono">
                        {player.age} yrs &bull; {player.height} cm
                      </p>
                    </div>
                  </div>

                  {/* Contact Snippets */}
                  <div className="mt-4 space-y-1.5 text-xs text-emerald-200/80">
                    <div className="flex items-center gap-2 truncate">
                      <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{player.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 truncate">
                      <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{player.email}</span>
                    </div>
                  </div>

                  {/* Bio snippet */}
                  {player.bio && (
                    <p className="mt-3 text-xs text-emerald-100/70 line-clamp-2 leading-relaxed bg-[#031910] p-2.5 rounded-xl border border-emerald-950">
                      "{player.bio}"
                    </p>
                  )}
                </div>

                {/* Card Actions & Status Dropdown */}
                <div className="mt-5 pt-3.5 border-t border-emerald-900/40">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase">STATUS UPDATE:</span>
                    {isUpdating && (
                      <span className="text-[10px] text-[#00F59B] animate-pulse">Saving...</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Status selector */}
                    <select
                      value={player.status}
                      disabled={isUpdating}
                      onChange={(e) => handleStatusChange(player.id, e.target.value as PlayerStatus)}
                      className="flex-1 py-1.5 px-2.5 rounded-xl text-xs font-semibold glass-input bg-[#041912] text-white cursor-pointer"
                    >
                      <option value="Pending Trial">Pending Trial</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Active Academy Member">Active Academy Member</option>
                      <option value="Declined">Declined</option>
                    </select>

                    {/* View Dossier */}
                    <button
                      onClick={() => onSelectPlayer(player)}
                      title="View full scout dossier"
                      className="p-2 rounded-xl glass-panel text-emerald-300 hover:text-white hover:border-[#00F59B] transition-colors cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {/* Delete Player */}
                    <button
                      onClick={() => setPlayerToDelete(player)}
                      title="Delete record"
                      className="p-2 rounded-xl bg-rose-950/40 text-rose-300 hover:text-white hover:bg-rose-900/60 border border-rose-500/20 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === 'table' && filteredFootballers.length > 0 && (
        <div className="glass-panel rounded-2xl border border-emerald-500/20 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#03170f] text-emerald-300 font-mono uppercase text-[10px] border-b border-emerald-900/60">
                <tr>
                  <th className="py-3 px-4">Player</th>
                  <th className="py-3 px-4">Position</th>
                  <th className="py-3 px-4">Foot</th>
                  <th className="py-3 px-4">Height</th>
                  <th className="py-3 px-4">Age</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-900/30">
                {filteredFootballers.map((player) => (
                  <tr key={player.id} className="hover:bg-emerald-950/30 transition-colors">
                    {/* Player Name & ID */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-white">{player.fullName}</div>
                      <div className="text-[10px] text-emerald-400 font-mono">{player.id}</div>
                    </td>

                    {/* Position */}
                    <td className="py-3 px-4 font-semibold text-emerald-200">
                      {player.position}
                    </td>

                    {/* Preferred Foot */}
                    <td className="py-3 px-4 text-emerald-300">
                      {player.preferredFoot}
                    </td>

                    {/* Height */}
                    <td className="py-3 px-4 font-mono text-emerald-200">
                      {player.height} cm
                    </td>

                    {/* Age */}
                    <td className="py-3 px-4 text-emerald-300">
                      {player.age} yrs
                    </td>

                    {/* Contacts */}
                    <td className="py-3 px-4">
                      <div className="text-emerald-200">{player.phone}</div>
                      <div className="text-[11px] text-emerald-400/80 truncate max-w-[150px]">{player.email}</div>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3 px-4">
                      <select
                        value={player.status}
                        onChange={(e) => handleStatusChange(player.id, e.target.value as PlayerStatus)}
                        className={`py-1 px-2 rounded-lg text-[11px] font-bold border outline-none cursor-pointer ${getStatusBadgeStyle(player.status)}`}
                      >
                        <option value="Pending Trial" className="bg-[#041912] text-amber-300">Pending Trial</option>
                        <option value="Accepted" className="bg-[#041912] text-cyan-300">Accepted</option>
                        <option value="Active Academy Member" className="bg-[#041912] text-[#00F59B]">Active Member</option>
                        <option value="Declined" className="bg-[#041912] text-rose-300">Declined</option>
                      </select>
                    </td>

                    {/* Action buttons */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onSelectPlayer(player)}
                          title="View Dossier"
                          className="p-1.5 rounded-lg glass-panel text-emerald-300 hover:text-white hover:border-[#00F59B]"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setPlayerToDelete(player)}
                          title="Delete Record"
                          className="p-1.5 rounded-lg bg-rose-950/40 text-rose-400 hover:text-rose-200 hover:bg-rose-900 border border-rose-500/20"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION PROMPT MODAL */}
      {playerToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel-glow max-w-md w-full rounded-3xl p-6 border-2 border-rose-500/40 text-center shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-rose-950/80 border border-rose-500 text-rose-400 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-white font-display">
              Confirm Player Removal
            </h3>

            <p className="text-xs text-rose-200/90 mt-2 leading-relaxed">
              Are you sure you want to delete <strong className="text-white">{playerToDelete.fullName}</strong> ({playerToDelete.position}) from the Firestore database? 
              This action cannot be undone.
            </p>

            <div className="mt-4 p-3 rounded-xl bg-black/40 border border-emerald-950 font-mono text-[11px] text-emerald-300 text-left">
              <div>ID: {playerToDelete.id}</div>
              <div>Status: {playerToDelete.status}</div>
              <div>Email: {playerToDelete.email}</div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setPlayerToDelete(null)}
                className="w-1/2 py-2.5 rounded-xl text-xs font-semibold glass-panel text-emerald-200 hover:bg-emerald-950/60"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="w-1/2 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/60 transition-all"
              >
                {isDeleting ? 'Deleting...' : 'Delete Record'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
