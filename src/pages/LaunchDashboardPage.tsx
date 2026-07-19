import { useState, useRef } from "react";
import { Edit, Image as ImageIcon, ChevronDown, Plane, X, Scan, Car, Download, ShieldCheck, Phone, Globe, QrCode, FolderSearch, FileText, Printer, MailOpen, Mail, FileSpreadsheet, FileUp, CheckCircle2, User, LayoutTemplate, MessageCircleQuestion, Smartphone, Lightbulb, Building2, IdCard, Users, Shield, Calendar, XCircle, MapPin, BookOpen, CreditCard } from "lucide-react";
import { LaunchProgressStepper } from "../components/dashboard/LaunchProgressStepper";
import referralCardBg from "../assets/referralCardBg.png";
import autocarLogo from "../assets/autocarLogo.png";

export default function LaunchDashboardPage() {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Step 1 State
  const [buyerData, setBuyerData] = useState({
    fullName: "Eleanor Pena",
    email: "eleanorpena@gmail.com",
    phone: "0000 123 1923",
  });

  // Step 2 State
  const [businessData, setBusinessData] = useState({
    businessName: "",
    email: "",
    phone: "",
    businessInfo: "",
  });
  
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Step 3 State
  const [serviceData, setServiceData] = useState({
    cityArea: "",
  });
  const [airportInput, setAirportInput] = useState("");
  const [airports, setAirports] = useState<string[]>(["Serving Miami", "FL"]);

  // Handlers for Step 1
  const handleBuyerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBuyerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving Buyer Data:", buyerData);
    setCurrentStep(2);
  };

  // Handlers for Step 2
  const handleBusinessChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBusinessData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving Business Data:", businessData);
    if (logoFile) {
      console.log("With Logo File:", logoFile.name);
    }
    // Proceed to Step 3
    setCurrentStep(3);
  };

  // Handlers for Step 3
  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setServiceData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAirportKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (airportInput.trim() !== "") {
        setAirports([...airports, airportInput.trim()]);
        setAirportInput("");
      }
    }
  };

  const removeAirport = (indexToRemove: number) => {
    setAirports(airports.filter((_, index) => index !== indexToRemove));
  };

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving Service Data:", { ...serviceData, airports });
    // Proceed to Step 4
    setCurrentStep(4);
  };

  // Handlers for Step 4
  const handleStep4Submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Proceeding from Referral Card step");
    // Proceed to Step 5
    setCurrentStep(5);
  };

  // Handlers for Step 5
  const handleStep5Submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Proceeding from Customer Acquisition step");
    // Proceed to Step 6
    setCurrentStep(6);
  };

  // Handlers for Step 6
  const handleStep6Submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Proceeding from Brand & Trust step");
    // Proceed to Step 7
    setCurrentStep(7);
  };

  // Handlers for Step 7
  const handleStep7Submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Proceeding to Final Confirm step");
    // Proceed to Step 8
    setCurrentStep(8);
  };

  // Handlers for Step 8
  const handleStep8Submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Launch Completed!");
    // Navigate away or show success state
    alert("Launch Complete! Redirecting to Dashboard...");
  };

  // Progress Ring Calculation (dynamic)
  const progressPercentage = 98;
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight mb-2">
          Launch Dashboard™
        </h1>
        <p className="text-slate-500 text-[15px]">
          Complete your business setup to launch your direct booking website.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
        {/* Pass the dynamic currentStep to the stepper */}
        <LaunchProgressStepper showFooter={false} currentStep={currentStep} />

        <div className="px-4 md:px-8 pb-8 pt-4">
          
          {/* ================= STEP 1 ================= */}
          {currentStep === 1 && (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-[22px] font-bold text-slate-900 mb-1">
                    Buyer Information
                  </h2>
                  <p className="text-sm text-slate-500">
                    Please enter your personal details
                  </p>
                </div>
                <button
                  type="button"
                  className="bg-green-50 p-3 rounded-xl hover:bg-green-100 transition-colors"
                  aria-label="Edit information"
                >
                  <Edit className="w-5 h-5 text-green-500" />
                </button>
              </div>

              <form onSubmit={handleStep1Submit} className="border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="fullName" className="text-sm font-semibold text-slate-700">
                    Full Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={buyerData.fullName}
                    onChange={handleBuyerChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="buyerEmail" className="text-sm font-semibold text-slate-700">
                    Email Address<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="buyerEmail"
                    name="email"
                    value={buyerData.email}
                    onChange={handleBuyerChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="buyerPhone" className="text-sm font-semibold text-slate-700">
                    Phone Number<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="buyerPhone"
                    name="phone"
                    value={buyerData.phone}
                    onChange={handleBuyerChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <button type="submit" className="bg-[#22c55e] hover:bg-[#1ea951] text-white px-8 py-3 rounded-lg font-bold transition-colors">
                    Save & Continue
                  </button>
                </div>
              </form>
            </>
          )}

          {/* ================= STEP 2 ================= */}
          {currentStep === 2 && (
            <>
              <div className="mb-8">
                <h2 className="text-[22px] font-bold text-slate-900 mb-1">
                  Business Information
                </h2>
                <p className="text-sm text-slate-500">
                  Provide your business details to personalize your website and business assets.
                </p>
              </div>

              <form onSubmit={handleStep2Submit} className="border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col gap-8">
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="businessName" className="text-sm font-semibold text-slate-700">
                        Business Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        placeholder="Enter your business name"
                        value={businessData.businessName}
                        onChange={handleBusinessChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label htmlFor="businessEmail" className="text-sm font-semibold text-slate-700">
                        Email Address<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="businessEmail"
                        name="email"
                        placeholder="Business Email Address"
                        value={businessData.email}
                        onChange={handleBusinessChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2 flex-1">
                      <label htmlFor="businessInfo" className="text-sm font-semibold text-slate-700">
                        Business Information<span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="businessInfo"
                        name="businessInfo"
                        placeholder="Tell us about your business or provide any important information."
                        value={businessData.businessInfo}
                        onChange={handleBusinessChange}
                        className="w-full h-full min-h-[140px] px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="businessPhone" className="text-sm font-semibold text-slate-700">
                        Phone Number<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="businessPhone"
                        name="phone"
                        placeholder="Business Phone Number"
                        value={businessData.phone}
                        onChange={handleBusinessChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2 flex-1">
                      <label className="text-sm font-semibold text-slate-700">
                        Upload Business Logo <span className="text-slate-400 font-normal">(optional)</span>
                      </label>
                      
                      <div className="flex-1 min-h-[140px] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-[#fafafa] relative hover:bg-slate-50 transition-colors">
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          onChange={handleFileSelect}
                          accept="image/png, image/jpeg, image/svg+xml"
                          className="hidden" 
                        />
                        
                        {logoFile ? (
                          <div className="flex flex-col items-center gap-2 p-4 text-center">
                            <ImageIcon className="w-8 h-8 text-green-500" />
                            <span className="text-sm font-semibold text-slate-700 truncate max-w-full px-4">{logoFile.name}</span>
                            <button 
                              type="button" 
                              onClick={() => setLogoFile(null)}
                              className="text-xs text-red-500 font-medium hover:underline mt-1"
                            >
                              Remove file
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-3">
                            <div className="bg-green-100 p-3 rounded-xl">
                              <ImageIcon className="w-6 h-6 text-green-600" />
                            </div>
                            <span className="text-[11px] font-semibold text-slate-400">Accepted file types: PNG, JPG, SVG</span>
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="bg-[#22c55e] hover:bg-[#1ea951] text-white px-6 py-2 rounded-lg text-sm font-bold transition-colors mt-1"
                            >
                              Browse files
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-4 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <button 
                    type="button" 
                    onClick={() => setCurrentStep(1)}
                    className="bg-white border border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300 px-8 py-3 rounded-lg font-bold transition-all"
                  >
                    Back
                  </button>
                  <button 
                    type="submit" 
                    className="bg-[#22c55e] hover:bg-[#1ea951] text-white px-8 py-3 rounded-lg font-bold transition-colors"
                  >
                    Save & Continue
                  </button>
                </div>
              </form>
            </>
          )}

          {/* ================= STEP 3 ================= */}
          {currentStep === 3 && (
            <>
              <div className="mb-8">
                <h2 className="text-[22px] font-bold text-slate-900 mb-1">
                  Service Area
                </h2>
                <p className="text-sm text-slate-500">
                  Tell us where you provide transportation services so customer's know where you're available
                </p>
              </div>

              <form onSubmit={handleStep3Submit} className="border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col gap-8">
                <div className="flex flex-col gap-6 max-w-3xl">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="cityArea" className="text-sm font-semibold text-slate-700">
                      City or Metro Area<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="cityArea"
                      name="cityArea"
                      placeholder="Enter the city or metro area you serve"
                      value={serviceData.cityArea}
                      onChange={handleServiceChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="airports" className="text-sm font-semibold text-slate-700">
                      Airports Served<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="airports"
                        placeholder="Select or enter the airport(s) you serve"
                        value={airportInput}
                        onChange={(e) => setAirportInput(e.target.value)}
                        onKeyDown={handleAirportKeyDown}
                        className="w-full px-4 py-3 pr-10 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                    </div>

                    {/* Selected Tags */}
                    {airports.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {airports.map((airport, index) => (
                          <div 
                            key={index}
                            className="flex items-center gap-2 bg-[#f8f9fa] border border-slate-200 text-slate-700 px-3 py-2 rounded-lg text-sm font-medium"
                          >
                            <Plane className="w-4 h-4 text-slate-500" />
                            {airport}
                            <button 
                              type="button" 
                              onClick={() => removeAirport(index)}
                              className="text-slate-400 hover:text-slate-600 transition-colors ml-1"
                              aria-label={`Remove ${airport}`}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-4 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <button 
                    type="button" 
                    onClick={() => setCurrentStep(2)}
                    className="bg-white border border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300 px-8 py-3 rounded-lg font-bold transition-all"
                  >
                    Back
                  </button>
                  <button 
                    type="submit" 
                    className="bg-[#22c55e] hover:bg-[#1ea951] text-white px-8 py-3 rounded-lg font-bold transition-colors"
                  >
                    Save & Continue
                  </button>
                </div>
              </form>
            </>
          )}

          {/* ================= STEP 4 ================= */}
          {currentStep === 4 && (
            <>
              <div className="mb-8">
                <h2 className="text-[22px] font-bold text-slate-900 mb-1">
                  Referral Card
                </h2>
                <p className="text-sm text-slate-500">
                  Your referral card has been created using your business information. Share it with customers to encourage repeat bookings.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                
                {/* Left Column: Card Mockup & Action Buttons */}
                <div className="flex-[2] flex flex-col gap-6">
                  {/* Card UI Wrapper */}
                  <div className="border border-slate-200 rounded-3xl p-4 sm:p-6 lg:p-8 bg-white shadow-sm flex items-center justify-center min-h-[480px]">
                    
                    {/* The Referral Card */}
                    <div className="relative w-full max-w-[600px] h-[320px] rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between bg-white">
                      
                      {/* Background Image Area (Right Side) */}
                      <div className="absolute top-0 right-0 w-1/2 h-full">
                        <img 
                          src={referralCardBg} 
                          alt="Car driving" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
                      </div>

                      {/* Foreground Content */}
                      <div className="relative z-10 flex flex-col h-full justify-between p-8">
                        <div>
                          <h3 className="text-[32px] sm:text-[40px] font-bold leading-tight text-slate-900 mb-3">
                            Book Direct<br />Next Time
                          </h3>
                          <p className="text-sm text-slate-600 max-w-[200px]">
                            Private airport transportation you can actually afford.
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="bg-slate-900 rounded-full p-2.5 flex items-center justify-center">
                            <Scan className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-sm font-semibold text-slate-800">
                            Scan to book your<br />next ride.
                          </span>
                        </div>
                      </div>
                      
                      {/* Black Footer Banner */}
                      <div className="relative z-10 bg-[#111] text-white py-3 px-6 rounded-tr-3xl flex items-center gap-3 w-[70%]">
                        <Car className="w-5 h-5" />
                        <span className="font-bold text-sm tracking-wide">Your Driver. Your Best Price</span>
                      </div>

                      {/* Mock QR Code Overlay */}
                      <div className="absolute top-1/2 right-12 -translate-y-1/2 z-20 bg-white p-2.5 rounded-xl shadow-lg border border-slate-100">
                        <div className="border border-slate-200 rounded-lg p-2 bg-slate-50">
                           <QrCode className="w-20 h-20 text-slate-900" />
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Action Buttons Row */}
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <button type="button" className="flex items-center justify-center gap-2 flex-1 w-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 px-4 py-3 rounded-xl font-bold transition-all text-sm">
                      <Scan className="w-4 h-4" />
                      View QR Code
                    </button>
                    <button type="button" className="flex items-center justify-center gap-2 flex-1 w-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 px-4 py-3 rounded-xl font-bold transition-all text-sm">
                      <Download className="w-4 h-4" />
                      <span className="flex flex-col items-start leading-tight">
                        Download QR Code
                        <span className="text-[10px] text-slate-400 font-normal">PNG format</span>
                      </span>
                    </button>
                    <button type="button" className="flex items-center justify-center gap-2 flex-1 w-full bg-[#22c55e] hover:bg-[#1ea951] text-white px-4 py-3 rounded-xl font-bold transition-all text-sm">
                      <Download className="w-4 h-4" />
                      Download Print-Ready Card
                    </button>
                  </div>
                </div>

                {/* Right Column: Info Cards */}
                <div className="flex-1 flex flex-col gap-6">
                  {/* Included Card */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">What's included?</h3>
                    <div className="flex flex-col gap-5">
                      <div className="flex items-start gap-4">
                        <ShieldCheck className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-bold text-slate-900">Your business branding</div>
                          <div className="text-[13px] text-slate-500">Logo and business name</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Phone className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-bold text-slate-900">Your contact information</div>
                          <div className="text-[13px] text-slate-500">Phone number and website</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Scan className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-bold text-slate-900">QR code</div>
                          <div className="text-[13px] text-slate-500">Linked to your booking website</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Globe className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-bold text-slate-900">Direct booking access</div>
                          <div className="text-[13px] text-slate-500">Customer can book instantly</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* How to Use Card */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">How to Use Your Card</h3>
                    <div className="flex flex-col gap-6">
                      <div className="flex items-start gap-4">
                        <div className="w-6 h-6 shrink-0 bg-green-600 text-white rounded-full flex items-center justify-center text-[13px] font-bold mt-0.5">1</div>
                        <div>
                          <div className="text-sm font-bold text-slate-900 mb-1 leading-tight">Hand it to every customer</div>
                          <div className="text-xs text-slate-500 leading-snug">Give your referral card to each passenger after every completed ride.</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-6 h-6 shrink-0 bg-green-600 text-white rounded-full flex items-center justify-center text-[13px] font-bold mt-0.5">2</div>
                        <div>
                          <div className="text-sm font-bold text-slate-900 mb-1 leading-tight">Ask customers to scan the QR code</div>
                          <div className="text-xs text-slate-500 leading-snug">Encourage customers to scan the QR code to access your website and save it for future bookings.</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-6 h-6 shrink-0 bg-green-600 text-white rounded-full flex items-center justify-center text-[13px] font-bold mt-0.5">3</div>
                        <div>
                          <div className="text-sm font-bold text-slate-900 mb-1 leading-tight">Encourage repeat bookings</div>
                          <div className="text-xs text-slate-500 leading-snug">Let customers know they can book directly with you for their next trip.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Actions */}
              <form onSubmit={handleStep4Submit} className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <button 
                  type="button" 
                  onClick={() => setCurrentStep(3)}
                  className="bg-white border border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300 px-8 py-3 rounded-lg font-bold transition-all"
                >
                  Back
                </button>
                <button 
                  type="submit" 
                  className="bg-[#22c55e] hover:bg-[#1ea951] text-white px-8 py-3 rounded-lg font-bold transition-colors"
                >
                  Save & Continue
                </button>
              </form>
            </>
          )}

          {/* ================= STEP 5 ================= */}
          {currentStep === 5 && (
            <>
              <div className="mb-8">
                <h2 className="text-[22px] font-bold text-slate-900 mb-1">
                  Customer Acquisition
                </h2>
                <p className="text-sm text-slate-500">
                  Grow your business by building relationships with hotels, local businesses, and referral partners.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                
                {/* Left Column: Resource Cards */}
                <div className="flex-[2] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-200">
                  
                  {/* Card 1: Hotel Kit */}
                  <div className="bg-white border-2 border-blue-100 rounded-2xl p-5 text-center flex flex-col items-center shadow-sm">
                    <FolderSearch className="w-10 h-10 text-blue-500 mb-4" strokeWidth={1.5} />
                    <h3 className="text-[15px] font-bold text-slate-900 mb-3 leading-tight">Hotel & Local Partner<br />Outreach Kit</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed px-1">
                      Everything you need to confidently approach hotels, medical offices, and local businesses for referral partnerships.
                    </p>
                  </div>

                  {/* Card 2: Partner List Worksheet */}
                  <div className="bg-white border-2 border-green-100 rounded-2xl p-5 text-center flex flex-col items-center shadow-sm">
                    <FileText className="w-10 h-10 text-green-500 mb-4" strokeWidth={1.5} />
                    <h3 className="text-[15px] font-bold text-slate-900 mb-3 leading-tight">Partner List<br />Worksheet</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed px-1">
                      Organize and track potential referral partners in your area with an easy-to-use planning worksheet.
                    </p>
                  </div>

                  {/* Card 3: Front Desk Script */}
                  <div className="bg-[#faf5ff] border-2 border-purple-200 rounded-2xl p-5 text-center flex flex-col items-center shadow-sm">
                    <Printer className="w-10 h-10 text-purple-600 mb-4" strokeWidth={1.5} />
                    <h3 className="text-[15px] font-bold text-slate-900 mb-3 leading-tight">Front Desk<br />Script</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed px-1">
                      Use this ready-made conversation script to confidently introduce your services to hotel front desk staff.
                    </p>
                  </div>

                  {/* Card 4: Hotel Manager Email */}
                  <div className="bg-[#fffdf0] border-2 border-yellow-200 rounded-2xl p-5 text-center flex flex-col items-center shadow-sm">
                    <MailOpen className="w-10 h-10 text-yellow-500 mb-4" strokeWidth={1.5} />
                    <h3 className="text-[15px] font-bold text-slate-900 mb-3 leading-tight">Hotel Manager<br />Email</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed px-1">
                      A professional email template for introducing your transportation services to hotel managers.
                    </p>
                  </div>

                  {/* Card 5: Local Partner Email */}
                  <div className="bg-[#f0fdfa] border-2 border-teal-200 rounded-2xl p-5 text-center flex flex-col items-center shadow-sm">
                    <Mail className="w-10 h-10 text-teal-500 mb-4" strokeWidth={1.5} />
                    <h3 className="text-[15px] font-bold text-slate-900 mb-3 leading-tight">Local Partner<br />Email</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed px-1">
                      Reach out to local businesses with a ready-to-use partnership email template.
                    </p>
                  </div>

                  {/* Card 6: One-Page Partner Flyer */}
                  <div className="bg-[#f5f3ff] border-2 border-indigo-200 rounded-2xl p-5 text-center flex flex-col items-center shadow-sm">
                    <FileText className="w-10 h-10 text-indigo-500 mb-4" strokeWidth={1.5} />
                    <h3 className="text-[15px] font-bold text-slate-900 mb-3 leading-tight">One-Page Partner<br />Flyer</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed px-1">
                      A printable one-page flyer that highlights your services and encourages referral partnerships.
                    </p>
                  </div>

                  {/* Card 7: Partner Tracking Sheet */}
                  <div className="bg-white border-2 border-cyan-100 rounded-2xl p-5 text-center flex flex-col items-center shadow-sm">
                    <FileSpreadsheet className="w-10 h-10 text-cyan-500 mb-4" strokeWidth={1.5} />
                    <h3 className="text-[15px] font-bold text-slate-900 mb-3 leading-tight">Partner Tracking<br />Sheet</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed px-1">
                      Track visits, follow-ups, referrals, and partner relationships in one organized place.
                    </p>
                  </div>

                  {/* Card 8: Referral Thank-You */}
                  <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 text-center flex flex-col items-center shadow-sm">
                    <FileUp className="w-10 h-10 text-slate-600 mb-4" strokeWidth={1.5} />
                    <h3 className="text-[15px] font-bold text-slate-900 mb-3 leading-tight">Referral Thank-You<br />System</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed px-1">
                      Send personalized thank-you messages to strengthen relationships and encourage more referrals.
                    </p>
                  </div>

                </div>

                {/* Right Column: Launch Checklist Guide */}
                <div className="flex-1 flex flex-col gap-6">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 h-full">
                    <h3 className="text-[17px] font-bold text-slate-900 mb-8">Launch Checklist Guide</h3>
                    <div className="flex flex-col gap-8">
                      
                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-[#22c55e] fill-green-100 shrink-0" strokeWidth={2} />
                        <div>
                          <div className="text-sm font-bold text-slate-900 mb-1 leading-tight">Build your partner list</div>
                          <div className="text-xs text-slate-500 leading-snug">Create a list of hotels, medical offices, and local businesses you want to connect with.</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-[#22c55e] fill-green-100 shrink-0" strokeWidth={2} />
                        <div>
                          <div className="text-sm font-bold text-slate-900 mb-1 leading-tight">Print Your Referral Cards</div>
                          <div className="text-xs text-slate-500 leading-snug">Print plenty of referral cards and keep them with you for every ride.</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-[#22c55e] fill-green-100 shrink-0" strokeWidth={2} />
                        <div>
                          <div className="text-sm font-bold text-slate-900 mb-1 leading-tight">Visit 5 Hotels or Local Businesses</div>
                          <div className="text-xs text-slate-500 leading-snug">Introduce yourself, leave your referral cards, and explain your services.</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-[#22c55e] fill-green-100 shrink-0" strokeWidth={2} />
                        <div>
                          <div className="text-sm font-bold text-slate-900 mb-1 leading-tight">Send Follow-Up Emails</div>
                          <div className="text-xs text-slate-500 leading-snug">Follow up within 24-48 hours to stay top of mind and build relationships.</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-[#22c55e] fill-green-100 shrink-0" strokeWidth={2} />
                        <div>
                          <div className="text-sm font-bold text-slate-900 mb-1 leading-tight">Track Every Contact</div>
                          <div className="text-xs text-slate-500 leading-snug">Record every visit, email, and conversation to monitor your partnership progress.</div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Actions */}
              <form onSubmit={handleStep5Submit} className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <button 
                  type="button" 
                  onClick={() => setCurrentStep(4)}
                  className="bg-white border border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300 px-8 py-3 rounded-lg font-bold transition-all"
                >
                  Back
                </button>
                <button 
                  type="submit" 
                  className="bg-[#22c55e] hover:bg-[#1ea951] text-white px-8 py-3 rounded-lg font-bold transition-colors"
                >
                  Save & Continue
                </button>
              </form>
            </>
          )}

          {/* ================= STEP 6 ================= */}
          {currentStep === 6 && (
            <>
              <div className="mb-8">
                <h2 className="text-[22px] font-bold text-slate-900 mb-1">
                  Brand & Trust
                </h2>
                <p className="text-sm text-slate-500">
                  Build customer confidence with professionally crafted trust resources designed to increase bookings and conversions.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                
                {/* Left Column: Resource Cards */}
                <div className="flex-[2] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8 bg-slate-50 rounded-3xl border border-slate-200">
                  
                  {/* Card 1: Four Customer Fears */}
                  <div className="bg-white border-2 border-blue-100 rounded-2xl p-6 text-center flex flex-col items-center justify-between shadow-sm min-h-[260px]">
                    <div className="flex flex-col items-center">
                      <User className="w-10 h-10 text-blue-500 mb-5" strokeWidth={1.5} />
                      <h3 className="text-[16px] font-bold text-slate-900 mb-3 leading-tight">Four Customer Fears</h3>
                      <p className="text-[12px] text-slate-500 leading-relaxed mb-6">
                        Understand what stops customers from booking—and learn how to overcome each concern with trust-focused messaging.
                      </p>
                    </div>
                    <button type="button" className="w-full py-2.5 rounded-lg font-bold text-[13px] transition-all bg-white border border-blue-100 text-slate-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700">
                      View Guide
                    </button>
                  </div>

                  {/* Card 2: Website Copy Blocks */}
                  <div className="bg-white border-2 border-green-100 rounded-2xl p-6 text-center flex flex-col items-center justify-between shadow-sm min-h-[260px]">
                    <div className="flex flex-col items-center">
                      <LayoutTemplate className="w-10 h-10 text-green-500 mb-5" strokeWidth={1.5} />
                      <h3 className="text-[16px] font-bold text-slate-900 mb-3 leading-tight">Website Copy Blocks</h3>
                      <p className="text-[12px] text-slate-500 leading-relaxed mb-6">
                        Ready-to-use website copy that helps communicate professionalism, reliability, and trust across your business website.
                      </p>
                    </div>
                    <button type="button" className="w-full py-2.5 rounded-lg font-bold text-[13px] transition-all bg-[#f0fdf4] border border-green-100 text-slate-700 hover:bg-green-100 hover:text-green-800">
                      Open Resource
                    </button>
                  </div>

                  {/* Card 3: FAQ Section */}
                  <div className="bg-white border-2 border-pink-100 rounded-2xl p-6 text-center flex flex-col items-center justify-between shadow-sm min-h-[260px]">
                    <div className="flex flex-col items-center">
                      <MessageCircleQuestion className="w-10 h-10 text-pink-500 mb-5" strokeWidth={1.5} />
                      <h3 className="text-[16px] font-bold text-slate-900 mb-3 leading-tight">FAQ Section</h3>
                      <p className="text-[12px] text-slate-500 leading-relaxed mb-6">
                        Pre-written answers to the questions customers ask most before booking your services.
                      </p>
                    </div>
                    <button type="button" className="w-full py-2.5 rounded-lg font-bold text-[13px] transition-all bg-[#fdf2f8] border border-pink-100 text-slate-700 hover:bg-pink-100 hover:text-pink-800">
                      Preview FAQs
                    </button>
                  </div>

                  {/* Card 4: Trust Badge Library */}
                  <div className="bg-white border-2 border-teal-100 rounded-2xl p-6 text-center flex flex-col items-center justify-between shadow-sm min-h-[260px]">
                    <div className="flex flex-col items-center">
                      <ShieldCheck className="w-10 h-10 text-teal-400 mb-5" strokeWidth={1.5} />
                      <h3 className="text-[16px] font-bold text-slate-900 mb-3 leading-tight">Trust Badge Library</h3>
                      <p className="text-[12px] text-slate-500 leading-relaxed mb-6">
                        Professionally designed trust badges to strengthen credibility and reassure visitors throughout your website.
                      </p>
                    </div>
                    <button type="button" className="w-full py-2.5 rounded-lg font-bold text-[13px] transition-all bg-[#f0fdfa] border border-teal-100 text-slate-700 hover:bg-teal-100 hover:text-teal-800">
                      View Badges
                    </button>
                  </div>

                  {/* Card 5: Social Media Captions */}
                  <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 text-center flex flex-col items-center justify-between shadow-sm min-h-[260px]">
                    <div className="flex flex-col items-center">
                      <Smartphone className="w-10 h-10 text-purple-500 mb-5" strokeWidth={1.5} />
                      <h3 className="text-[16px] font-bold text-slate-900 mb-3 leading-tight">Social Media Captions</h3>
                      <p className="text-[12px] text-slate-500 leading-relaxed mb-6">
                        Ready-made captions that help promote your services while reinforcing trust and professionalism.
                      </p>
                    </div>
                    <button type="button" className="w-full py-2.5 rounded-lg font-bold text-[13px] transition-all bg-white border border-purple-100 text-slate-700 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700">
                      Open Library
                    </button>
                  </div>

                  {/* Card 6: Putting It All Together */}
                  <div className="bg-white border-2 border-slate-100 rounded-2xl p-6 text-center flex flex-col items-center justify-between shadow-sm min-h-[260px]">
                    <div className="flex flex-col items-center">
                      <Lightbulb className="w-10 h-10 text-slate-400 mb-5" strokeWidth={1.5} />
                      <h3 className="text-[16px] font-bold text-slate-900 mb-3 leading-tight">Putting It All Together</h3>
                      <p className="text-[12px] text-slate-500 leading-relaxed mb-6">
                        Follow a simple step-by-step guide to combine every trust element into a complete, high-converting customer experience.
                      </p>
                    </div>
                    <button type="button" className="w-full py-2.5 rounded-lg font-bold text-[13px] transition-all bg-[#f8f9fa] border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                      View Guide
                    </button>
                  </div>

                </div>

                {/* Right Column: Trust Checklist */}
                <div className="flex-1 flex flex-col gap-6">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 h-full">
                    <h3 className="text-[17px] font-bold text-slate-900 mb-8">Trust Checklist</h3>
                    <div className="flex flex-col gap-8">
                      
                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-[#22c55e] fill-green-100 shrink-0" strokeWidth={2} />
                        <div>
                          <div className="text-sm font-bold text-slate-900 mb-1 leading-tight">Website Copy Added</div>
                          <div className="text-xs text-slate-500 leading-snug">Your website clearly communicates professionalism and builds customer confidence.</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-[#22c55e] fill-green-100 shrink-0" strokeWidth={2} />
                        <div>
                          <div className="text-sm font-bold text-slate-900 mb-1 leading-tight">FAQ Ready</div>
                          <div className="text-xs text-slate-500 leading-snug">Common customer questions are answered before they need to ask.</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-[#22c55e] fill-green-100 shrink-0" strokeWidth={2} />
                        <div>
                          <div className="text-sm font-bold text-slate-900 mb-1 leading-tight">Trust Badges Ready</div>
                          <div className="text-xs text-slate-500 leading-snug">Trust indicators are displayed across your website.</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-[#22c55e] fill-green-100 shrink-0" strokeWidth={2} />
                        <div>
                          <div className="text-sm font-bold text-slate-900 mb-1 leading-tight">Social Captions Ready</div>
                          <div className="text-xs text-slate-500 leading-snug">Your promotional content is prepared for launch.</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-[#22c55e] fill-green-100 shrink-0" strokeWidth={2} />
                        <div>
                          <div className="text-sm font-bold text-slate-900 mb-1 leading-tight">Review Everything</div>
                          <div className="text-xs text-slate-500 leading-snug">Complete a final review to ensure all trust assets are published before launch.</div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Actions */}
              <form onSubmit={handleStep6Submit} className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <button 
                  type="button" 
                  onClick={() => setCurrentStep(5)}
                  className="bg-white border border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300 px-8 py-3 rounded-lg font-bold transition-all"
                >
                  Back
                </button>
                <button 
                  type="submit" 
                  className="bg-[#22c55e] hover:bg-[#1ea951] text-white px-8 py-3 rounded-lg font-bold transition-colors"
                >
                  Save & Continue
                </button>
              </form>
            </>
          )}

          {/* ================= STEP 7 ================= */}
          {currentStep === 7 && (
            <>
              <div className="mb-8">
                <h2 className="text-[22px] font-bold text-slate-900 mb-1">
                  Launch Ready
                </h2>
                <p className="text-sm text-slate-500">
                  Congratulations! Your business is almost ready to go live. Complete the final checklist below before publishing and start attracting customers with confidence.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                
                {/* Left Column: Final Checklist */}
                <div className="flex-[2] bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col gap-0 shadow-sm">
                  
                  {/* Item 1 */}
                  <div className="flex items-center justify-between py-5 border-b border-slate-100 last:border-0">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                        <Building2 className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <h4 className="text-[15px] font-bold text-slate-900">Business Setup</h4>
                        <p className="text-[12px] text-slate-500 mt-0.5">Business information has been completed and verified.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-green-600">Complete</span>
                      <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-100" />
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-center justify-between py-5 border-b border-slate-100 last:border-0">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                        <Globe className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <h4 className="text-[15px] font-bold text-slate-900">Website</h4>
                        <p className="text-[12px] text-slate-500 mt-0.5">Your website pages are published and ready for visitors.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-green-600">Complete</span>
                      <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-100" />
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-center justify-between py-5 border-b border-slate-100 last:border-0">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                        <IdCard className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <h4 className="text-[15px] font-bold text-slate-900">Referral Card</h4>
                        <p className="text-[12px] text-slate-500 mt-0.5">Your referral card has been generated and is ready to share with customers.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-green-600">Complete</span>
                      <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-100" />
                    </div>
                  </div>

                  {/* Item 4 */}
                  <div className="flex items-center justify-between py-5 border-b border-slate-100 last:border-0">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                        <QrCode className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <h4 className="text-[15px] font-bold text-slate-900">QR Code</h4>
                        <p className="text-[12px] text-slate-500 mt-0.5">Your branded QR code has been created and is ready to use online and offline.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-green-600">Complete</span>
                      <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-100" />
                    </div>
                  </div>

                  {/* Item 5 */}
                  <div className="flex items-center justify-between py-5 border-b border-slate-100 last:border-0">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                        <Users className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <h4 className="text-[15px] font-bold text-slate-900">Customer Acquisition</h4>
                        <p className="text-[12px] text-slate-500 mt-0.5">Your marketing materials and customer acquisition resources are prepared.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-green-600">Complete</span>
                      <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-100" />
                    </div>
                  </div>

                  {/* Item 6 */}
                  <div className="flex items-center justify-between py-5 border-b border-slate-100 last:border-0">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                        <Shield className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <h4 className="text-[15px] font-bold text-slate-900">Trust Resources</h4>
                        <p className="text-[12px] text-slate-500 mt-0.5">Your trust-building assets are ready to help convert visitors into customers.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-green-600">Complete</span>
                      <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-100" />
                    </div>
                  </div>

                  {/* Item 7 */}
                  <div className="flex items-center justify-between py-5 border-b border-slate-100 last:border-0">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                        <Calendar className="w-6 h-6 text-orange-500" />
                      </div>
                      <div>
                        <h4 className="text-[15px] font-bold text-orange-500">Booking System</h4>
                        <p className="text-[12px] text-orange-400 mt-0.5">Connect your preferred booking platform so customers can book your services online.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-orange-500">Not Connected</span>
                      <XCircle className="w-5 h-5 text-orange-500" />
                    </div>
                  </div>

                </div>

                {/* Right Column: Launch Progress */}
                <div className="flex-1">
                  <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center shadow-sm h-full text-center">
                    <h3 className="text-[18px] font-bold text-slate-900 mb-8">Your Launch Progress</h3>
                    
                    {/* SVG Progress Ring */}
                    <div className="relative w-56 h-56 mb-8 flex items-center justify-center">
                      <svg
                        className="w-full h-full transform -rotate-90"
                        viewBox="0 0 200 200"
                      >
                        {/* Background track */}
                        <circle
                          cx="100"
                          cy="100"
                          r={radius}
                          fill="transparent"
                          stroke="#f1f5f9"
                          strokeWidth="12"
                        />
                        {/* Progress ring */}
                        <circle
                          cx="100"
                          cy="100"
                          r={radius}
                          fill="transparent"
                          stroke="#22c55e"
                          strokeWidth="12"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      {/* Text inside ring */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[20px] font-bold text-green-600">
                          {progressPercentage}% Complete
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center max-w-[260px]">
                      <h4 className="text-[16px] font-bold text-slate-900 mb-2">Almost Ready! 🚀</h4>
                      <p className="text-[12px] text-slate-500 leading-relaxed">
                        You're just one final step away from launching your business. Connect your booking system now, or launch without it and add it later.
                      </p>
                    </div>

                  </div>
                </div>

              </div>

              {/* Bottom Actions */}
              <form onSubmit={handleStep7Submit} className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <button 
                  type="button" 
                  onClick={() => setCurrentStep(6)}
                  className="bg-white border border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300 px-8 py-3 rounded-lg font-bold transition-all"
                >
                  Back
                </button>
                <button 
                  type="submit" 
                  className="bg-[#22c55e] hover:bg-[#1ea951] text-white px-8 py-3 rounded-lg font-bold transition-colors"
                >
                  Continue to final review
                </button>
              </form>
            </>
          )}

          {/* ================= STEP 8 ================= */}
          {currentStep === 8 && (
            <>
              <div className="mb-8">
                <h2 className="text-[22px] font-bold text-slate-900 mb-1">
                  Final Review
                </h2>
                <p className="text-sm text-slate-500">
                  Review your business details and generated assets one last time before launching your direct booking website.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                
                {/* Left Column: Business Information */}
                <div className="flex-[1] bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col shadow-sm relative">
                  
                  {/* Edit Button */}
                  <button className="absolute top-6 right-6 w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 hover:bg-green-100 transition-colors">
                    <Edit className="w-5 h-5" />
                  </button>

                  <h3 className="text-[17px] font-bold text-slate-900 mb-8">Business Information</h3>
                  
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      <Building2 className="w-5 h-5 text-slate-400 shrink-0" />
                      <div className="w-[120px] text-[13px] text-slate-500 font-medium">Business Name</div>
                      <div className="text-[14px] text-slate-900 font-semibold">Autocar</div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Phone className="w-5 h-5 text-slate-400 shrink-0" />
                      <div className="w-[120px] text-[13px] text-slate-500 font-medium">Business Phone</div>
                      <div className="text-[14px] text-slate-900 font-semibold">(305) 555-1234</div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Mail className="w-5 h-5 text-slate-400 shrink-0" />
                      <div className="w-[120px] text-[13px] text-slate-500 font-medium">Business Email</div>
                      <div className="text-[14px] text-slate-900 font-semibold">autocar@gmail.com</div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                      <div className="w-[120px] text-[13px] text-slate-500 font-medium pt-0.5">Service Area</div>
                      <div className="text-[14px] text-slate-900 font-semibold leading-snug">Serving Miami, FL and Surrounding areas</div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Plane className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                      <div className="w-[120px] text-[13px] text-slate-500 font-medium pt-0.5">Airport Served</div>
                      <div className="text-[14px] text-slate-900 font-semibold leading-snug">Serving Miami, FL and Surrounding areas</div>
                    </div>
                    
                    <div className="flex items-start gap-4 mt-2">
                      <ImageIcon className="w-5 h-5 text-slate-400 shrink-0 mt-1" />
                      <div className="w-[120px] text-[13px] text-slate-500 font-medium pt-1">Business Logo</div>
                      <div className="overflow-hidden rounded-xl border border-slate-200">
                        <img src={autocarLogo} alt="Autocar Logo" className="w-[160px] h-[80px] object-cover" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Generated Assets */}
                <div className="flex-[1] bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
                  <h3 className="text-[17px] font-bold text-slate-900 mb-8">Generated Assets</h3>
                  
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* List of Assets */}
                    <div className="flex-1 flex flex-col gap-6">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                          <Globe className="w-4 h-4 text-green-500" />
                        </div>
                        <div>
                          <div className="text-[14px] font-bold text-slate-900 mb-0.5">Driver Website</div>
                          <div className="text-[12px] text-slate-500 leading-snug">Your direct booking website is ready to receive customers.</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                          <CreditCard className="w-4 h-4 text-green-500" />
                        </div>
                        <div>
                          <div className="text-[14px] font-bold text-slate-900 mb-0.5">Referral Card</div>
                          <div className="text-[12px] text-slate-500 leading-snug">Your branded referral card has been generated and is ready to share.</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                          <QrCode className="w-4 h-4 text-green-500" />
                        </div>
                        <div>
                          <div className="text-[14px] font-bold text-slate-900 mb-0.5">QR Code</div>
                          <div className="text-[12px] text-slate-500 leading-snug">Your QR code is linked to your booking website and ready for print or digital use.</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                          <LayoutTemplate className="w-4 h-4 text-green-500" />
                        </div>
                        <div>
                          <div className="text-[14px] font-bold text-slate-900 mb-0.5">Selling Page</div>
                          <div className="text-[12px] text-slate-500 leading-snug">Your shareable landing page is ready to promote your services.</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                          <BookOpen className="w-4 h-4 text-green-500" />
                        </div>
                        <div>
                          <div className="text-[14px] font-bold text-slate-900 mb-0.5">Resources & Guides</div>
                          <div className="text-[12px] text-slate-500 leading-snug">Marketing resources, trust guides, and launch materials are available to help grow your business.</div>
                        </div>
                      </div>
                    </div>

                    {/* Booking System Upsell */}
                    <div className="w-full lg:w-[220px] shrink-0 h-[240px] border-2 border-orange-200 bg-orange-50/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                      <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center mb-4 shadow-sm">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-[15px] font-bold text-slate-900 mb-1">Booking System</h4>
                      <p className="text-[11px] text-slate-500 mb-4">Direct Booking system</p>
                      
                      <div className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-[11px] font-bold mb-4">
                        Not Included
                      </div>
                      
                      <p className="text-[11px] text-slate-500 leading-relaxed px-2">
                        To enable, purchase the booking system
                      </p>
                    </div>
                  </div>

                </div>

              </div>

              {/* Bottom Actions */}
              <form onSubmit={handleStep8Submit} className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <button 
                  type="button" 
                  onClick={() => setCurrentStep(7)}
                  className="bg-white border border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300 px-8 py-3 rounded-lg font-bold transition-all"
                >
                  Back
                </button>
                <button 
                  type="submit" 
                  className="bg-[#22c55e] hover:bg-[#1ea951] text-white px-8 py-3 rounded-lg font-bold transition-colors shadow-sm"
                >
                  Complete Launch
                </button>
              </form>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
