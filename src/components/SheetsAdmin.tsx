import React, { useState, useEffect } from "react";
import { googleSignIn, logout, initAuth } from "../lib/firebaseAuth";
import { User as FirebaseUser } from "firebase/auth";
import { 
  Database, 
  FileSpreadsheet, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  LogOut, 
  PlusCircle, 
  ExternalLink,
  Shield,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  createdAt: string;
  synced: boolean;
}

interface StatusData {
  spreadsheetId: string | null;
  spreadsheetName: string | null;
  hasToken: boolean;
  totalLeads: number;
  unsyncedLeads: number;
  leads: Lead[];
}

export const SheetsAdmin: React.FC = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [creating, setCreating] = useState(false);
  
  // Status loaded from Express server
  const [status, setStatus] = useState<StatusData>({
    spreadsheetId: null,
    spreadsheetName: null,
    hasToken: false,
    totalLeads: 0,
    unsyncedLeads: 0,
    leads: []
  });

  // Fetch status from server
  const fetchStatus = async () => {
    try {
      const res = await fetch("/api/sheets/status");
      if (res.ok) {
        const data = await res.json();
        setStatus(data);
      }
    } catch (e) {
      console.error("Failed to fetch sheets status:", e);
    }
  };

  // Listen for Firebase authentication
  useEffect(() => {
    const unsubscribe = initAuth(
      async (firebaseUser, token) => {
        setUser(firebaseUser);
        setAccessToken(token);
        
        // Push fresh access token to server
        try {
          await fetch("/api/sheets/token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ accessToken: token })
          });
        } catch (err) {
          console.error("Failed to propagate token to server:", err);
        }
        
        fetchStatus();
      },
      () => {
        setUser(null);
        setAccessToken(null);
        fetchStatus();
      }
    );

    fetchStatus();
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setAccessToken(result.accessToken);
        
        // Push token to server
        await fetch("/api/sheets/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken: result.accessToken })
        });
        
        await fetchStatus();
      }
    } catch (err) {
      console.error("Sign-in failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
      setAccessToken(null);
      await fetchStatus();
    } catch (err) {
      console.error("Sign-out failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSheet = async () => {
    if (!accessToken) return;
    setCreating(true);
    try {
      const res = await fetch("/api/sheets/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken })
      });
      if (res.ok) {
        await fetchStatus();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to create Google Sheet");
      }
    } catch (e) {
      console.error(e);
      alert("Error creating spreadsheet");
    } finally {
      setCreating(false);
    }
  };

  const handleForceSync = async () => {
    if (!accessToken) {
      alert("You must sign in with Google to synchronize local leads with Google Sheets.");
      return;
    }
    setSyncing(true);
    try {
      const res = await fetch("/api/sheets/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken })
      });
      if (res.ok) {
        await fetchStatus();
      } else {
        const err = await res.json();
        alert(err.error || "Sync failed");
      }
    } catch (e) {
      console.error(e);
      alert("Sync error");
    } finally {
      setSyncing(false);
    }
  };

  return (
    <section id="sheets-admin" className="py-20 relative overflow-hidden bg-[#0A0A0A] border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.03),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">Integrations Hub</span>
              <div className="h-[1px] w-12 bg-[#D4AF37]/40"></div>
            </div>
            <h2 className="text-2xl md:text-4xl font-display font-extrabold uppercase tracking-tighter text-white">
              Google Sheets <span className="text-stroke">Leads Manager</span>
            </h2>
            <p className="mt-2 text-white/50 text-xs md:text-sm max-w-2xl uppercase tracking-widest leading-relaxed">
              Connect your Google Workspace. Submitted briefs are automatically appended to a secure spreadsheet in real-time.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {!user ? (
              <button
                onClick={handleLogin}
                disabled={loading}
                className="gsi-material-button scale-95 border border-white/15 hover:border-[#D4AF37] transition-all cursor-pointer"
                id="google-signin-btn"
              >
                <div className="gsi-material-button-state"></div>
                <div className="gsi-material-button-content-wrapper">
                  <div className="gsi-material-button-icon">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: "block" }}>
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                      <path fill="none" d="M0 0h48v48H0z"></path>
                    </svg>
                  </div>
                  <span className="gsi-material-button-contents font-mono text-[11px] uppercase tracking-wider">Connect Google Account</span>
                </div>
              </button>
            ) : (
              <div className="flex items-center gap-3 bg-black/60 border border-white/10 p-2 pl-4 pr-3">
                <div className="flex flex-col text-right">
                  <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest">AUTHORIZED BY</span>
                  <span className="text-xs text-white font-mono font-bold">{user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 bg-white/5 hover:bg-red-500/10 text-white/50 hover:text-red-400 border border-white/10 hover:border-red-500/20 transition-all cursor-pointer"
                  title="Disconnect account"
                  id="google-signout-btn"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Status Panel */}
          <div className="lg:col-span-5 bg-black/40 border border-white/10 p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
                Sheet Link Status
              </h3>

              <div className="space-y-4">
                {/* Active Sheet Row */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 border border-white/10 text-[#D4AF37]">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Connected spreadsheet</h4>
                    {status.spreadsheetId ? (
                      <div className="mt-1 flex flex-col">
                        <span className="text-sm font-sans font-bold text-white flex items-center gap-2">
                          {status.spreadsheetName}
                          <a
                            href={`https://docs.google.com/spreadsheets/d/${status.spreadsheetId}`}
                            target="_blank"
                            referrerPolicy="no-referrer"
                            rel="noopener noreferrer"
                            className="text-[#D4AF37] hover:text-white transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </span>
                        <span className="text-[10px] font-mono text-white/30 truncate max-w-[280px]">
                          ID: {status.spreadsheetId}
                        </span>
                      </div>
                    ) : (
                      <div className="mt-1.5">
                        <span className="text-xs font-mono text-white/30 uppercase italic">
                          No Sheet configured.
                        </span>
                        {user ? (
                          <button
                            onClick={handleCreateSheet}
                            disabled={creating}
                            className="mt-3 flex items-center gap-2 text-[10px] font-mono text-[#D4AF37] hover:text-white border border-[#D4AF37]/30 hover:border-white px-3 py-1.5 bg-[#D4AF37]/5 transition-all uppercase tracking-widest cursor-pointer"
                          >
                            {creating ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <PlusCircle className="w-3.5 h-3.5" />
                            )}
                            Create "DLOn.io Contact Leads"
                          </button>
                        ) : (
                          <p className="text-[11px] text-white/40 mt-1 leading-relaxed">
                            Sign in with Google to create and link a dedicated spreadsheet on your Google Drive.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Synchronization Row */}
                <div className="flex items-start gap-4">
                  <div className={`p-3 bg-white/5 border border-white/10 ${status.unsyncedLeads > 0 ? "text-amber-400" : "text-emerald-400"}`}>
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Database Sync</h4>
                    <p className="text-sm font-sans font-bold text-white mt-1">
                      {status.totalLeads} Total Leads Saved Locally
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`inline-block w-2 h-2 rounded-full ${status.unsyncedLeads > 0 ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}`} />
                      <span className="text-xs font-mono text-white/50 uppercase tracking-wider">
                        {status.unsyncedLeads} leads pending sheets sync
                      </span>
                    </div>

                    {status.unsyncedLeads > 0 && (
                      <button
                        onClick={handleForceSync}
                        disabled={syncing || !user}
                        className="mt-3.5 flex items-center gap-2 text-[10px] font-mono bg-white text-black hover:bg-[#D4AF37] hover:text-black px-4 py-2 transition-all uppercase tracking-widest font-bold cursor-pointer disabled:bg-white/10 disabled:text-white/30"
                      >
                        {syncing ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <RefreshCw className="w-3.5 h-3.5" />
                        )}
                        Force Sync Now ({status.unsyncedLeads})
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center gap-2.5">
              <Shield className="w-3.5 h-3.5 text-white/40" />
              <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest leading-relaxed">
                OAuth connections are end-to-end sandbox isolated. Your data is never sold or exposed.
              </span>
            </div>
          </div>

          {/* Leads Viewer / Log Table */}
          <div className="lg:col-span-7 bg-black/40 border border-white/10 p-6 md:p-8 flex flex-col justify-between overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
                  Recent Activity Logs
                </h3>
                <span className="text-[10px] font-mono text-white/40 uppercase">
                  {status.leads.length} Records
                </span>
              </div>

              <div className="overflow-y-auto max-h-[300px] space-y-3 scrollbar-thin scrollbar-thumb-white/10 pr-2">
                {status.leads.length === 0 ? (
                  <div className="py-12 text-center border border-dashed border-white/15 bg-black/10">
                    <Database className="w-8 h-8 text-white/20 mx-auto mb-3" />
                    <p className="text-xs font-mono text-white/40 uppercase tracking-wider">
                      No briefs cataloged yet
                    </p>
                  </div>
                ) : (
                  [...status.leads].reverse().map((lead) => (
                    <div
                      key={lead.id}
                      className="p-4 bg-black/20 border border-white/5 flex items-start justify-between gap-4 transition-all hover:border-white/10"
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xs font-sans font-bold text-white truncate">
                            {lead.name}
                          </span>
                          <span className="text-[9px] font-mono text-white/40 uppercase">
                            ({lead.company})
                          </span>
                        </div>
                        <p className="text-[11px] font-mono text-white/50 truncate">
                          {lead.email}
                        </p>
                        <p className="text-[11px] font-sans text-white/40 line-clamp-2 leading-relaxed">
                          {lead.message || (lead.proposalData ? `Blueprint Proposal: ${lead.proposalData.architectureSummary}` : "No message detail.")}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <span className="text-[9px] font-mono text-white/30 uppercase">
                          {new Date(lead.createdAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </span>
                        {lead.synced ? (
                          <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-mono uppercase tracking-wider">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Synced</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-mono uppercase tracking-wider">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>Local</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
