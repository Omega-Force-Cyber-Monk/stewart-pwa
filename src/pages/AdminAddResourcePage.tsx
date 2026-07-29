import { UploadCloud, ChevronDown, Bold, Italic, Underline, List, ListOrdered, Heading1, Heading2, Heading3 } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminAddResourcePage() {
  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Top Header Bar */}
      <div className="bg-white px-6 py-4 rounded-xl border border-slate-100 shadow-sm flex-shrink-0">
        <h2 className="text-lg font-bold text-slate-800">Add New Resources</h2>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm max-w-4xl flex-1 flex flex-col min-h-0">
        <div className="p-6 md:p-8 border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-800">Upload Resources</h3>
        </div>

        <div className="p-6 md:p-8 flex-1 overflow-y-auto space-y-6">
          {/* Resource Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Resources Name</label>
            <input 
              type="text" 
              defaultValue="AFH (Adult Family Homes)"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-700"
            />
          </div>

          {/* Description with Rich Text Editor mock */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Description</label>
            <div className="border border-slate-200 rounded-lg overflow-hidden flex flex-col focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-colors">
              {/* Toolbar */}
              <div className="bg-slate-100 px-4 py-2 flex flex-wrap items-center gap-1 border-b border-slate-200">
                <div className="flex items-center gap-1 border-r border-slate-300 pr-2 mr-1">
                  <button className="p-1.5 text-slate-500 hover:bg-slate-200 hover:text-slate-800 rounded transition-colors"><Heading1 className="w-4 h-4" /></button>
                  <button className="p-1.5 text-slate-500 hover:bg-slate-200 hover:text-slate-800 rounded transition-colors"><Heading2 className="w-4 h-4" /></button>
                  <button className="p-1.5 text-slate-500 hover:bg-slate-200 hover:text-slate-800 rounded transition-colors"><Heading3 className="w-4 h-4" /></button>
                </div>
                <div className="flex items-center gap-1 border-r border-slate-300 pr-2 mr-1">
                  <button className="p-1.5 text-slate-500 hover:bg-slate-200 hover:text-slate-800 rounded transition-colors"><Bold className="w-4 h-4" /></button>
                  <button className="p-1.5 text-slate-500 hover:bg-slate-200 hover:text-slate-800 rounded transition-colors"><Italic className="w-4 h-4" /></button>
                  <button className="p-1.5 text-slate-500 hover:bg-slate-200 hover:text-slate-800 rounded transition-colors"><Underline className="w-4 h-4" /></button>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-slate-500 hover:bg-slate-200 hover:text-slate-800 rounded transition-colors"><List className="w-4 h-4" /></button>
                  <button className="p-1.5 text-slate-500 hover:bg-slate-200 hover:text-slate-800 rounded transition-colors"><ListOrdered className="w-4 h-4" /></button>
                </div>
              </div>
              {/* Text Area */}
              <textarea 
                className="w-full p-4 h-32 resize-none focus:outline-none text-slate-600 text-sm leading-relaxed"
                defaultValue="A clear, foundational overview of what Adult Family Homes are, who they serve, and why they exist in Washington State. A clear, foundational overview of what Adult Family Homes are, who they serve, and why they exist in Washington State."
              ></textarea>
            </div>
          </div>

          {/* Resource Type */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Resource Type</label>
            <div className="relative">
              <select className="w-full px-4 py-3 appearance-none rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-700 bg-white">
                <option>PDF Documents</option>
                <option>Word Documents</option>
                <option>Spreadsheets</option>
                <option>Images</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Upload File */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Upload File</label>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:text-blue-500 group-hover:bg-blue-50 mb-4 transition-colors">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-slate-600 font-medium mb-1">Click to upload or drag and drop</p>
              <p className="text-slate-400 text-xs">Any file up to 100MB</p>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="p-6 md:p-8 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-4">
          <Link to="/admin/resources" className="w-full sm:w-1/2 flex justify-center py-3 px-6 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors text-center">
            Cancel
          </Link>
          <button className="w-full sm:w-1/2 py-3 px-6 rounded-lg bg-[#1a56ff] hover:bg-blue-700 text-white font-semibold shadow-sm transition-colors">
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
