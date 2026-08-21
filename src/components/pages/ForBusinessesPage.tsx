import React, { useState } from 'react';
import { useQueue } from '../../context/QueueContext';
import { Building2, CheckCircle2 } from 'lucide-react';

export const ForBusinessesPage: React.FC = () => {
  const { addToast, setPageView } = useQueue();
  const [bizName, setBizName] = useState('');
  const [bizType, setBizType] = useState('cafe');
  const [bizEmail, setBizEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bizName || !bizEmail) {
      addToast('Missing Info', 'Please provide your business name and email.', 'warning');
      return;
    }
    setSubmitted(true);
    addToast(
      'Demo Request Sent',
      `Thanks! Our team will contact ${bizEmail} with access credentials for QueueLess Business Hub.`,
      'success'
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full mb-3">
          <Building2 className="w-4 h-4 text-blue-600" />
          <span className="font-heading text-xs font-bold text-blue-600 uppercase tracking-wider">
            QueueLess For Enterprise & Small Business
          </span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
          Turn Waiting Chaos Into Customer Loyalty
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-4 leading-relaxed">
          Eliminate crowded lobbies, cut customer churn, and dispatch counter traffic with an intelligent cloud queue management system.
        </p>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 text-center">
          <div className="font-heading font-extrabold text-3xl sm:text-4xl text-blue-600 mb-2">+42%</div>
          <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 mb-1">
            Higher Customer Retention
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Customers explore nearby shops instead of walking away from physical lines.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 text-center">
          <div className="font-heading font-extrabold text-3xl sm:text-4xl text-blue-600 mb-2">-65%</div>
          <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 mb-1">
            Staff Lobby Stress
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Automated SMS call-ups prevent counter crowding and repetitive &quot;how much longer&quot; inquiries.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 text-center">
          <div className="font-heading font-extrabold text-3xl sm:text-4xl text-blue-600 mb-2">5 Mins</div>
          <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 mb-1">
            Zero-Hardware Setup
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Runs in browser on existing iPad, phone, or desktop. Print QR codes in 1 click.
          </p>
        </div>
      </div>

      {/* Interactive Business Onboarding Form */}
      <div className="max-w-xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="font-heading font-extrabold text-2xl text-slate-900">
                Request Business Pilot Access
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Start managing your queues remotely today.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Business / Clinic / Salon Name
              </label>
              <input
                type="text"
                value={bizName}
                onChange={(e) => setBizName(e.target.value)}
                placeholder="e.g. Apex Barber Lounge"
                className="w-full bg-slate-50 text-sm px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:bg-white focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Industry Category
              </label>
              <select
                value={bizType}
                onChange={(e) => setBizType(e.target.value)}
                className="w-full bg-slate-50 text-sm px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:bg-white focus:outline-none transition-colors"
              >
                <option value="cafe">Cafe / Specialty Restaurant</option>
                <option value="clinic">Urgent Care / Medical Clinic</option>
                <option value="salon">Salon / Barbershop / Spa</option>
                <option value="banking">Financial Institution / Bank</option>
                <option value="dmv">Government / DMV Center</option>
                <option value="retail">Tech Repair / Retail Store</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Work Email Address
              </label>
              <input
                type="email"
                value={bizEmail}
                onChange={(e) => setBizEmail(e.target.value)}
                placeholder="manager@business.com"
                className="w-full bg-slate-50 text-sm px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:bg-white focus:outline-none transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-heading font-bold text-sm hover:bg-blue-700 transition-all shadow-xs text-center cursor-pointer"
            >
              Get Free Business Portal Access →
            </button>
          </form>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-heading font-extrabold text-xl text-slate-900 mb-2">
              Request Received!
            </h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              We&apos;ve sent pilot setup instructions to <strong>{bizEmail}</strong>. In the meantime, you can explore the consumer queue experience.
            </p>
            <button
              onClick={() => setPageView('discover')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-heading font-bold text-xs hover:bg-blue-700 cursor-pointer"
            >
              Back to Discover Places
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
