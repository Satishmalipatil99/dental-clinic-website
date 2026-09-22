import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Phone, 
  Mail, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Download, 
  Trash2, 
  RefreshCw,
  Search,
  MessageCircle,
  ShieldCheck,
  Filter,
  Send,
  Eye,
  Check
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { getStoredAppointments, updateAppointmentStatus, clearAllAppointments } from '../utils/storage';
import { AppointmentRecord } from '../types';
import { clinicConfig, getWhatsAppUrl } from '../config/clinic';
import { 
  sendStaffConfirmationNotifications, 
  MultiChannelDispatchResult, 
  buildWhatsAppConfirmationMessage 
} from '../utils/notificationService';

export const AdminDashboardPage: React.FC = () => {
  const [records, setRecords] = useState<AppointmentRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
  const [processingConfirmId, setProcessingConfirmId] = useState<string | null>(null);
  const [recentDispatch, setRecentDispatch] = useState<{
    appointment: AppointmentRecord;
    result: MultiChannelDispatchResult;
  } | null>(null);
  const [selectedPreview, setSelectedPreview] = useState<{
    appointment: AppointmentRecord;
    tab: 'email' | 'sms' | 'whatsapp';
  } | null>(null);

  const loadData = () => {
    setRecords(getStoredAppointments());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = (id: string, status: 'pending' | 'confirmed' | 'cancelled') => {
    updateAppointmentStatus(id, status);
    loadData();
  };

  const handleConfirmAppointment = async (record: AppointmentRecord) => {
    setProcessingConfirmId(record.id);
    try {
      const result = await sendStaffConfirmationNotifications(record);
      const notifications = {
        emailSent: result.notifications.email.status === 'sent',
        emailSentAt: result.notifications.email.sentAt,
        smsSent: result.notifications.sms.status === 'sent',
        smsSentAt: result.notifications.sms.sentAt,
        whatsappSent: result.notifications.whatsapp.status === 'sent',
        whatsappSentAt: result.notifications.whatsapp.sentAt,
      };

      updateAppointmentStatus(record.id, 'confirmed', notifications);
      loadData();

      setRecentDispatch({
        appointment: { ...record, status: 'confirmed', notifications },
        result,
      });
    } catch (err) {
      console.error('Failed to dispatch multi-channel confirmation', err);
      updateAppointmentStatus(record.id, 'confirmed');
      loadData();
    } finally {
      setProcessingConfirmId(null);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all appointment test records from local storage?')) {
      clearAllAppointments();
      loadData();
    }
  };

  const exportCSV = () => {
    if (records.length === 0) return;
    const headers = ['ID', 'Full Name', 'Phone', 'Email', 'Date', 'Time', 'Treatment', 'Status', 'Submitted At'];
    const rows = records.map(r => [
      r.id,
      `"${r.fullName}"`,
      `"${r.phoneNumber}"`,
      `"${r.email || ''}"`,
      r.preferredDate,
      `"${r.preferredTime}"`,
      `"${r.treatmentReason}"`,
      r.status,
      r.createdAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `dental_appointments_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRecords = records.filter(r => {
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchesSearch = 
      r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phoneNumber.includes(searchTerm) ||
      r.treatmentReason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <>
      <SEOHead
        title="Clinic Staff Portal – Appointment Inquiries Management"
        description="Internal clinic staff administration dashboard for tracking and managing patient appointment requests."
        canonicalPath="/admin"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Breadcrumbs items={[{ label: 'Staff Management Portal' }]} />

        {/* Dashboard Header */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 my-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                Staff Office Desk
              </span>
              <span className="text-xs text-slate-400">Local Browser Storage Persistence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0f2b48] mt-2">
              Appointment Requests Manager
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              View, confirm, and export patient enquiries submitted through the clinic website.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={loadData}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>

            <button
              onClick={exportCSV}
              disabled={records.length === 0}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold transition-colors disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleClearAll}
              disabled={records.length === 0}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-red-200 hover:bg-red-50 text-red-600 text-xs font-semibold transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-semibold uppercase">Total Inquiries</span>
            <div className="text-2xl font-bold text-[#0f2b48] mt-1">{records.length}</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs text-amber-600 font-semibold uppercase">Pending Review</span>
            <div className="text-2xl font-bold text-amber-600 mt-1">
              {records.filter(r => r.status === 'pending').length}
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs text-emerald-600 font-semibold uppercase">Confirmed Slots</span>
            <div className="text-2xl font-bold text-emerald-600 mt-1">
              {records.filter(r => r.status === 'confirmed').length}
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-400 font-semibold uppercase">Cancelled</span>
            <div className="text-2xl font-bold text-slate-400 mt-1">
              {records.filter(r => r.status === 'cancelled').length}
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, phone, or service..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="flex items-center gap-1 self-start sm:self-auto">
            <span className="text-xs text-slate-400 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {(['all', 'pending', 'confirmed', 'cancelled'] as const).map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                  statusFilter === status
                    ? 'bg-[#0f2b48] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Multi-Channel Dispatch Alert Banner */}
        {recentDispatch && (
          <div className="mb-6 bg-emerald-50/90 border border-emerald-200 rounded-2xl p-5 shadow-xs transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-950">
                    Appointment Confirmed & Multi-Channel Notifications Dispatched!
                  </h4>
                  <p className="text-xs text-emerald-800">
                    Patient <strong>{recentDispatch.appointment.fullName}</strong> ({recentDispatch.appointment.id}) was automatically notified on <strong>Email</strong>, <strong>SMS</strong>, and <strong>WhatsApp</strong>.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setSelectedPreview({ appointment: recentDispatch.appointment, tab: 'email' })}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer inline-flex items-center gap-1 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Messages</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRecentDispatch(null)}
                  className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold px-2 py-1 cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>

            {/* 3 Channel Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3">
              {/* Email Card */}
              <div className="bg-white p-3 rounded-xl border border-emerald-100 text-xs space-y-1.5 shadow-2xs">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span className="flex items-center gap-1.5 text-teal-700">
                    <Mail className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Email Confirmation</span>
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 font-bold uppercase">
                    {recentDispatch.result.notifications.email.status}
                  </span>
                </div>
                <div className="text-slate-600 truncate text-[11px]">
                  <strong>To:</strong> {recentDispatch.result.notifications.email.recipient}
                </div>
                <div className="text-[11px] text-slate-500 truncate">
                  {recentDispatch.result.notifications.email.subject}
                </div>
              </div>

              {/* SMS Card */}
              <div className="bg-white p-3 rounded-xl border border-emerald-100 text-xs space-y-1.5 shadow-2xs">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span className="flex items-center gap-1.5 text-blue-700">
                    <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Phone Number SMS</span>
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-bold uppercase">
                    {recentDispatch.result.notifications.sms.status}
                  </span>
                </div>
                <div className="text-slate-600 truncate text-[11px]">
                  <strong>To:</strong> {recentDispatch.result.notifications.sms.recipient}
                </div>
                <div className="text-[10px] text-slate-500 line-clamp-2 italic bg-slate-50 p-1.5 rounded border border-slate-100">
                  "{recentDispatch.result.notifications.sms.text}"
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="bg-white p-3 rounded-xl border border-emerald-100 text-xs space-y-1.5 shadow-2xs">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span className="flex items-center gap-1.5 text-emerald-700">
                    <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>WhatsApp Message</span>
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold uppercase">
                    {recentDispatch.result.notifications.whatsapp.status}
                  </span>
                </div>
                <div className="text-slate-600 truncate text-[11px]">
                  <strong>To:</strong> {recentDispatch.result.notifications.whatsapp.recipient}
                </div>
                <div className="pt-0.5">
                  <a
                    href={recentDispatch.result.notifications.whatsapp.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 underline"
                  >
                    <span>Open Patient Chat in WhatsApp</span> &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Records Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {filteredRecords.length === 0 ? (
            <div className="text-center py-16 px-4 space-y-2">
              <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">No appointment requests found</p>
              <p className="text-xs text-slate-400">
                Submit an appointment using the website form to test this queue.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Ref / Date</th>
                    <th className="py-3 px-4">Patient Details</th>
                    <th className="py-3 px-4">Treatment</th>
                    <th className="py-3 px-4">Target Slot</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRecords.map(r => (
                    <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-mono font-bold text-slate-700">{r.id}</div>
                        <div className="text-[10px] text-slate-400">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 space-y-0.5">
                        <div className="font-bold text-[#0f2b48]">{r.fullName}</div>
                        <div className="text-slate-500 flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{r.phoneNumber}</span>
                        </div>
                        {r.email && (
                          <div className="text-slate-400 flex items-center gap-1 text-[11px]">
                            <Mail className="w-3 h-3 text-slate-400" />
                            <span>{r.email}</span>
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-block px-2 py-0.5 rounded bg-teal-50 text-teal-800 font-semibold text-[11px]">
                          {r.treatmentReason}
                        </span>
                        {r.additionalNotes && (
                          <div className="text-[11px] text-slate-500 mt-1 line-clamp-1 italic">
                            "{r.additionalNotes}"
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800">{r.preferredDate}</div>
                        <div className="text-slate-500 text-[11px]">{r.preferredTime}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wide ${
                          r.status === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : r.status === 'cancelled'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {r.status}
                        </span>

                        {/* Delivery channel indicator chips for confirmed appointments */}
                        {r.status === 'confirmed' && (
                          <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                            <button
                              type="button"
                              onClick={() => setSelectedPreview({ appointment: r, tab: 'email' })}
                              title="Confirmation Email Dispatched (Click to view)"
                              className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 px-1.5 py-0.5 rounded border border-teal-200 cursor-pointer transition-colors"
                            >
                              <Mail className="w-2.5 h-2.5" />
                              <span>Email</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedPreview({ appointment: r, tab: 'sms' })}
                              title="Phone SMS Dispatched (Click to view)"
                              className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 px-1.5 py-0.5 rounded border border-blue-200 cursor-pointer transition-colors"
                            >
                              <Phone className="w-2.5 h-2.5" />
                              <span>SMS</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedPreview({ appointment: r, tab: 'whatsapp' })}
                              title="WhatsApp Message Dispatched (Click to view)"
                              className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-200 cursor-pointer transition-colors"
                            >
                              <MessageCircle className="w-2.5 h-2.5" />
                              <span>WA</span>
                            </button>
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right space-x-1 whitespace-nowrap">
                        {r.status !== 'confirmed' ? (
                          <button
                            type="button"
                            onClick={() => handleConfirmAppointment(r)}
                            disabled={processingConfirmId === r.id}
                            title="Confirm Appointment (Automatically dispatches Email, SMS & WhatsApp to patient)"
                            className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors cursor-pointer disabled:opacity-50 inline-flex items-center"
                          >
                            {processingConfirmId === r.id ? (
                              <RefreshCw className="w-4 h-4 animate-spin text-emerald-700" />
                            ) : (
                              <CheckCircle className="w-4 h-4" />
                            )}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleConfirmAppointment(r)}
                            disabled={processingConfirmId === r.id}
                            title="Resend Confirmation (Email, SMS & WhatsApp)"
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer disabled:opacity-50 inline-flex items-center"
                          >
                            <RefreshCw className={`w-4 h-4 ${processingConfirmId === r.id ? 'animate-spin' : ''}`} />
                          </button>
                        )}
                        {r.status !== 'cancelled' && (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(r.id, 'cancelled')}
                            title="Mark Cancelled"
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors cursor-pointer"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                        <a
                          href={getWhatsAppUrl(buildWhatsAppConfirmationMessage(r), r.phoneNumber)}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Message Patient on WhatsApp with Confirmed Details"
                          className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white inline-flex transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal for Previewing Sent Multi-Channel Messages */}
        {selectedPreview && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Patient Confirmation Messages
                  </h3>
                  <p className="text-xs text-slate-500">
                    Ref: <strong>{selectedPreview.appointment.id}</strong> • {selectedPreview.appointment.fullName}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPreview(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-slate-200 px-4 pt-2 gap-2 bg-slate-50/50">
                <button
                  type="button"
                  onClick={() => setSelectedPreview({ ...selectedPreview, tab: 'email' })}
                  className={`pb-2.5 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 cursor-pointer transition-colors ${
                    selectedPreview.tab === 'email'
                      ? 'border-teal-600 text-teal-700'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Copy</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPreview({ ...selectedPreview, tab: 'sms' })}
                  className={`pb-2.5 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 cursor-pointer transition-colors ${
                    selectedPreview.tab === 'sms'
                      ? 'border-blue-600 text-blue-700'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>SMS Copy</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPreview({ ...selectedPreview, tab: 'whatsapp' })}
                  className={`pb-2.5 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 cursor-pointer transition-colors ${
                    selectedPreview.tab === 'whatsapp'
                      ? 'border-emerald-600 text-emerald-700'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Copy</span>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-5 overflow-y-auto space-y-3 text-xs text-slate-700">
                {selectedPreview.tab === 'email' && (
                  <div className="space-y-2">
                    <div className="bg-slate-100 p-2.5 rounded-lg text-[11px] font-mono space-y-0.5">
                      <div><strong>To:</strong> {selectedPreview.appointment.email || 'patient@example.com'}</div>
                      <div><strong>Subject:</strong> ✅ Appointment Confirmed: {clinicConfig.clinicName} (Ref: {selectedPreview.appointment.id})</div>
                      <div><strong>From:</strong> {clinicConfig.clinicName} &lt;no-reply@dentalclinic.com&gt;</div>
                    </div>
                    <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 max-h-72 overflow-y-auto space-y-3">
                      <div className="text-center pb-3 border-b border-slate-200">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          ✓ STATUS: CONFIRMED BY CLINIC STAFF
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm mt-1">Your Dental Appointment is Confirmed!</h4>
                      </div>
                      <p>Dear <strong>{selectedPreview.appointment.fullName}</strong>,</p>
                      <p>Great news! Our clinical staff has reviewed the doctor's schedule and <strong>officially confirmed</strong> your appointment.</p>
                      <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                        <div><strong>Reference:</strong> {selectedPreview.appointment.id}</div>
                        <div><strong>Date:</strong> {selectedPreview.appointment.preferredDate}</div>
                        <div><strong>Time Slot:</strong> {selectedPreview.appointment.preferredTime}</div>
                        <div><strong>Treatment:</strong> {selectedPreview.appointment.treatmentReason}</div>
                        <div><strong>Doctor:</strong> {clinicConfig.doctorName} ({clinicConfig.specialization})</div>
                        <div><strong>Clinic Address:</strong> {clinicConfig.address.street}, {clinicConfig.address.city}</div>
                      </div>
                      <p className="text-[11px] text-slate-500 italic">
                        Please arrive 10 minutes prior to your allocated slot. If you need to reschedule, call {clinicConfig.phoneDisplay}.
                      </p>
                    </div>
                  </div>
                )}

                {selectedPreview.tab === 'sms' && (
                  <div className="space-y-2">
                    <div className="bg-slate-100 p-2.5 rounded-lg text-[11px] font-mono space-y-0.5">
                      <div><strong>To:</strong> {selectedPreview.appointment.phoneNumber}</div>
                      <div><strong>Channel:</strong> GSM / SMS Gateway</div>
                    </div>
                    <div className="border border-blue-200 bg-blue-50/50 rounded-xl p-4 text-xs font-mono leading-relaxed text-slate-800 shadow-inner">
                      CONFIRMED: Dear {selectedPreview.appointment.fullName}, your dental appointment at {clinicConfig.clinicName} for {selectedPreview.appointment.treatmentReason} is CONFIRMED for {selectedPreview.appointment.preferredDate} at {selectedPreview.appointment.preferredTime}. Ref: {selectedPreview.appointment.id}. Doctor: {clinicConfig.doctorName}. Clinic: {clinicConfig.phoneDisplay}, {clinicConfig.address.area}. Please arrive 10m early.
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Standard transactional SMS format dispatched immediately to patient mobile network upon staff confirmation.
                    </p>
                  </div>
                )}

                {selectedPreview.tab === 'whatsapp' && (
                  <div className="space-y-3">
                    <div className="bg-slate-100 p-2.5 rounded-lg text-[11px] font-mono space-y-0.5">
                      <div><strong>To:</strong> {selectedPreview.appointment.phoneNumber}</div>
                      <div><strong>Channel:</strong> WhatsApp Business Direct API</div>
                    </div>
                    <div className="border border-emerald-200 bg-emerald-50/60 rounded-xl p-4 text-xs whitespace-pre-line leading-relaxed text-slate-800 shadow-inner font-sans">
                      {buildWhatsAppConfirmationMessage(selectedPreview.appointment)}
                    </div>
                    <div className="pt-1 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">Ready for instant two-way chat</span>
                      <a
                        href={getWhatsAppUrl(buildWhatsAppConfirmationMessage(selectedPreview.appointment), selectedPreview.appointment.phoneNumber)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-1 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Open WhatsApp Chat</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedPreview(null)}
                  className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </>
  );
};
