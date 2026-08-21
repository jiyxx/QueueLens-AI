import React, { useState } from 'react';
import { useQueue } from '../../context/QueueContext';
import { ServiceItem } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { ArrowLeft, Clock, Check, Sparkles, Smartphone, User, FileText } from 'lucide-react';
import { motion } from 'motion/react';

export const JoinQueuePage: React.FC = () => {
  const {
    businesses,
    selectedBusiness,
    prefillJoinBusiness,
    setPageView,
    joinQueue,
  } = useQueue();

  const activeBiz = prefillJoinBusiness || selectedBusiness || businesses[0];

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedService, setSelectedService] = useState<ServiceItem>(
    activeBiz.services[0] || {
      id: 'default-srv',
      name: 'General Service',
      description: 'Standard queue assistance',
      durationMinutes: 10,
    }
  );
  const [partySize, setPartySize] = useState<number>(1);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [smsConsent, setSmsConsent] = useState<boolean>(true);
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string }>({});

  const estimatedWait = Math.max(
    4,
    Math.round((activeBiz.peopleInQueue + 1) * (activeBiz.averageWaitPerPersonMins || 4))
  );

  const handleServiceSelect = (srv: ServiceItem) => {
    setSelectedService(srv);
  };

  const handleNextStep1 = () => {
    setCurrentStep(2);
  };

  const handleNextStep2 = () => {
    const errors: { name?: string; phone?: string } = {};
    if (!customerName.trim()) {
      errors.name = 'Please enter your name';
    }
    if (!customerPhone.trim() || customerPhone.length < 7) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setCurrentStep(3);
  };

  const handleFinalSubmit = () => {
    joinQueue(activeBiz, selectedService, {
      name: customerName,
      phone: customerPhone,
      partySize,
      notes: specialNotes,
    });
    setPageView('live-queue');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Back button */}
      <button
        onClick={() => {
          if (currentStep > 1) {
            setCurrentStep((s) => (s - 1) as any);
          } else {
            setPageView('discover');
          }
        }}
        className="inline-flex items-center gap-2 text-sm font-heading font-bold text-slate-600 hover:text-blue-600 mb-6 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{currentStep === 1 ? 'Back to Discover' : 'Back to Previous Step'}</span>
      </button>

      {/* Main Container Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        {/* Business Header Overview */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
              <img
                src={activeBiz.imageUrl}
                alt={activeBiz.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Joining Virtual Queue
              </span>
              <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900">
                {activeBiz.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                {activeBiz.branch} • {activeBiz.address}
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-3 shrink-0">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Estimated Wait
              </span>
              <span className="font-heading font-extrabold text-xl text-blue-600">
                ~{estimatedWait} mins
              </span>
            </div>
            <StatusBadge status={activeBiz.status} size="sm" />
          </div>
        </div>

        {/* Step Indicator */}
        <div className="my-8">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-heading font-bold text-xs transition-all ${
                  currentStep >= 1
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {currentStep > 1 ? <Check className="w-4 h-4" /> : '1'}
              </div>
              <span className="text-xs font-bold text-slate-800">Service</span>
            </div>

            <div
              className={`flex-1 h-0.5 mx-3 rounded-full transition-all ${
                currentStep >= 2 ? 'bg-blue-600' : 'bg-slate-200'
              }`}
            />

            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-heading font-bold text-xs transition-all ${
                  currentStep >= 2
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {currentStep > 2 ? <Check className="w-4 h-4" /> : '2'}
              </div>
              <span className="text-xs font-bold text-slate-800">Details</span>
            </div>

            <div
              className={`flex-1 h-0.5 mx-3 rounded-full transition-all ${
                currentStep >= 3 ? 'bg-blue-600' : 'bg-slate-200'
              }`}
            />

            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-heading font-bold text-xs transition-all ${
                  currentStep >= 3
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                3
              </div>
              <span className="text-xs font-bold text-slate-800">Confirm</span>
            </div>
          </div>
        </div>

        {/* Step 1: Select Service & Party Size */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="font-heading font-bold text-lg text-slate-900 mb-1">
                Select Your Service
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Choose the primary service you require at {activeBiz.name}.
              </p>
            </div>

            {/* Service Options List */}
            <div className="space-y-3">
              {activeBiz.services.map((srv) => {
                const isSelected = selectedService.id === srv.id;
                return (
                  <div
                    key={srv.id}
                    onClick={() => handleServiceSelect(srv)}
                    className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-blue-600 bg-blue-600'
                            : 'border-slate-400 bg-white'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                          {srv.name}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">{srv.description}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-blue-600 flex items-center gap-1 justify-end">
                        <Clock className="w-3 h-3" />
                        ~{srv.durationMinutes}m
                      </span>
                      {srv.price !== undefined && (
                        <span className="text-xs text-slate-400 block mt-0.5">
                          {srv.price === 0 ? 'Free' : `$${srv.price.toFixed(2)}`}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Party Size Selector */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <h4 className="font-heading font-bold text-sm text-slate-900">
                  Number of Guests / Party Size
                </h4>
                <p className="text-xs text-slate-500">
                  How many people are arriving for this service?
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPartySize((p) => Math.max(1, p - 1))}
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 font-bold text-base hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="font-heading font-bold text-base w-6 text-center text-slate-900">
                  {partySize}
                </span>
                <button
                  type="button"
                  onClick={() => setPartySize((p) => Math.min(8, p + 1))}
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 font-bold text-base hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleNextStep1}
              className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-heading font-bold text-sm hover:bg-blue-700 transition-all shadow-sm text-center cursor-pointer"
            >
              Continue to Customer Details →
            </button>
          </motion.div>
        )}

        {/* Step 2: Contact Information & Notes */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="font-heading font-bold text-lg text-slate-900 mb-1">
                Customer & Notification Info
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                We use this to notify you when your turn is approaching.
              </p>
            </div>

            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Your Full Name <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      if (formErrors.name) setFormErrors((err) => ({ ...err, name: undefined }));
                    }}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-slate-50 focus:bg-white text-sm pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:outline-none transition-colors text-slate-900"
                  />
                </div>
                {formErrors.name && (
                  <span className="text-xs text-rose-600 mt-1 block">{formErrors.name}</span>
                )}
              </div>

              {/* Mobile Phone Number */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Mobile Phone Number <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => {
                      setCustomerPhone(e.target.value);
                      if (formErrors.phone) setFormErrors((err) => ({ ...err, phone: undefined }));
                    }}
                    placeholder="(555) 000-0000"
                    className="w-full bg-slate-50 focus:bg-white text-sm pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:outline-none transition-colors text-slate-900"
                  />
                </div>
                {formErrors.phone && (
                  <span className="text-xs text-rose-600 mt-1 block">{formErrors.phone}</span>
                )}
                <span className="text-[11px] text-slate-400 mt-1 block">
                  You&apos;ll receive an automated SMS when you are 2 spots away.
                </span>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Special Notes or Requests (Optional)
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                  <textarea
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    rows={2}
                    placeholder="e.g. Need wheelchair accessible counter"
                    className="w-full bg-slate-50 focus:bg-white text-sm pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:outline-none transition-colors text-slate-900"
                  />
                </div>
              </div>

              {/* SMS Notification Toggle */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <input
                  type="checkbox"
                  id="smsConsent"
                  checked={smsConsent}
                  onChange={(e) => setSmsConsent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="smsConsent" className="text-xs text-slate-600 cursor-pointer">
                  Send real-time SMS progress updates & queue buzzer when my turn is up.
                </label>
              </div>
            </div>

            <button
              onClick={handleNextStep2}
              className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-heading font-bold text-sm hover:bg-blue-700 transition-all shadow-sm text-center cursor-pointer"
            >
              Review & Generate Digital Token →
            </button>
          </motion.div>
        )}

        {/* Step 3: Final Review & Generate Token */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center max-w-md mx-auto">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3 border border-blue-200">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="font-heading font-extrabold text-xl text-slate-900">
                Ready to Join Queue
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Please verify your details below before taking your place in line.
              </p>
            </div>

            {/* Summary Ticket Preview */}
            <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200 space-y-3.5">
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <span className="text-xs text-slate-500">Location:</span>
                <span className="font-heading font-bold text-sm text-slate-900">
                  {activeBiz.name} ({activeBiz.branch})
                </span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <span className="text-xs text-slate-500">Selected Service:</span>
                <span className="font-heading font-bold text-sm text-blue-600">
                  {selectedService.name} (~{selectedService.durationMinutes}m)
                </span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <span className="text-xs text-slate-500">Guest / Customer:</span>
                <span className="text-sm font-semibold text-slate-900">
                  {customerName} ({partySize} {partySize === 1 ? 'person' : 'people'})
                </span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <span className="text-xs text-slate-500">SMS Contact:</span>
                <span className="text-sm font-semibold text-slate-900">{customerPhone}</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div>
                  <span className="text-xs text-slate-500 block">Your Position in Line</span>
                  <span className="font-heading font-extrabold text-2xl text-slate-900">
                    #{activeBiz.peopleInQueue + 1}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Estimated Wait</span>
                  <span className="font-heading font-extrabold text-2xl text-blue-600">
                    ~{estimatedWait} mins
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleFinalSubmit}
              className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-heading font-bold text-base hover:bg-blue-700 transition-all shadow-sm text-center flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              <span>Confirm & Generate Digital Token</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
