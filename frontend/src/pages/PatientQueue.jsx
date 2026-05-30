import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button } from '../components/design-system';

export default function PatientQueue() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');

  // caselist matching the requested columns
  const patientData = [
    { id: 'liam-carter', name: 'Liam Carter', age: '4 Years', riskScore: 76, urgency: 'High Risk', specialist: 'Pediatric Neurologist', referralDate: 'May 25, 2026' },
    { id: 'lucas-davis', name: 'Lucas Davis', age: '4 Years', riskScore: 82, urgency: 'High Risk', specialist: 'Pediatric Neurologist', referralDate: 'May 29, 2026' },
    { id: 'noah-kline', name: 'Noah Kline', age: '3 Years', riskScore: 68, urgency: 'High Risk', specialist: 'Pediatric Neurologist', referralDate: 'May 26, 2026' },
    { id: 'oliver-thomas', name: 'Oliver Thomas', age: '3 Years', riskScore: 74, urgency: 'High Risk', specialist: 'Occupational Therapist', referralDate: 'May 29, 2026' },
    { id: 'emma-larson', name: 'Emma Larson', age: '6 Years', riskScore: 48, urgency: 'Medium Risk', specialist: 'Speech Therapist', referralDate: 'May 27, 2026' },
    { id: 'ava-wilson', name: 'Ava Wilson', age: '5 Years', riskScore: 55, urgency: 'Medium Risk', specialist: 'Occupational Therapist', referralDate: 'May 28, 2026' },
    { id: 'sophia-miller', name: 'Sophia Miller', age: '5 Years', riskScore: 28, urgency: 'Low Risk', specialist: 'Developmental Pediatrician', referralDate: 'May 28, 2026' },
  ];

  // Filtering logic
  const filteredPatients = patientData.filter((pat) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'High Risk') return pat.urgency === 'High Risk';
    if (activeFilter === 'Medium Risk') return pat.urgency === 'Medium Risk';
    if (activeFilter === 'Low Risk') return pat.urgency === 'Low Risk';
    return true;
  });

  const handlePatientClick = (patientId) => {
    // Navigate to Clinical Review page
    navigate(`/dashboard/clinical-review?patientId=${patientId}`);
  };

  const getUrgencyClass = (urgency) => {
    if (urgency === 'High Risk') return 'status-pill-warning';
    if (urgency === 'Medium Risk') return 'status-pill-info';
    return 'status-pill-success';
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-2xl font-semibold text-white">Patient Case Queue</h1>
        <p className="text-slate-400 mt-1">
          Review, triage, and manage diagnostic packages waiting for clinician signature.
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-white/5 pb-3">
        {['All', 'Low Risk', 'Medium Risk', 'High Risk'].map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all duration-300 ${
              activeFilter === filter
                ? 'border-[#00d4ff] bg-[#00d4ff]/10 text-[#00d4ff] shadow-[0_0_12px_rgba(0,212,255,0.08)]'
                : 'border-transparent text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {filter} ({filter === 'All' ? patientData.length : patientData.filter((p) => p.urgency === filter).length})
          </button>
        ))}
      </div>

      {/* Patients Table Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="!p-0 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 bg-white/[0.01] flex justify-between items-center">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Active Referrals List</span>
            <span className="text-[10px] text-slate-500 font-mono">Showing {filteredPatients.length} cases</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-300">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase text-slate-500 font-extrabold bg-white/[0.005]">
                  <th className="py-3.5 px-6">Patient Name</th>
                  <th>Risk Score</th>
                  <th>Urgency</th>
                  <th>Recommended Specialist</th>
                  <th>Referral Date</th>
                  <th className="text-right px-6">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <AnimatePresence mode="popLayout">
                  {filteredPatients.map((pat, idx) => (
                    <motion.tr
                      key={pat.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2, delay: idx * 0.03 }}
                      onClick={() => handlePatientClick(pat.id)}
                      className="hover:bg-white/[0.015] active:bg-white/[0.03] transition-colors cursor-pointer group"
                    >
                      <td className="py-4 px-6 font-semibold text-white group-hover:text-[#00d4ff] transition-colors">
                        {pat.name}{' '}
                        <span className="text-[10px] text-slate-500 font-normal">({pat.age})</span>
                      </td>
                      <td className="font-mono font-bold text-white">{pat.riskScore}</td>
                      <td>
                        <span className={`status-pill text-[9px] font-bold ${getUrgencyClass(pat.urgency)}`}>
                          {pat.urgency}
                        </span>
                      </td>
                      <td className="text-slate-400 font-medium">{pat.specialist}</td>
                      <td className="text-slate-400 font-mono">{pat.referralDate}</td>
                      <td className="text-right px-6">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-[10px] text-[#00d4ff] group-hover:bg-[#00d4ff]/10 group-hover:border-[#00d4ff]/20 transition-all"
                        >
                          Review Case
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
