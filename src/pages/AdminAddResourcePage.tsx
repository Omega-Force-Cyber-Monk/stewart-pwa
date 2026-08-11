import { useState } from "react";
import { UploadCloud, ChevronDown, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateAdminResourceMutation,
  useGetAdminResourceCategoriesQuery,
} from "../store/api/Admin/admin.api";
import { RESOURCE_STEPS, RESOURCE_TYPES } from "../store/api/Admin/admin.type";

export default function AdminAddResourcePage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<string>(RESOURCE_TYPES[0]);
  const [step, setStep] = useState<string>(RESOURCE_STEPS[0]);
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [cardColor, setCardColor] = useState("#ECFDF5");
  const [iconKey, setIconKey] = useState("folder-search");
  const [sortOrder, setSortOrder] = useState(10);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const { data: categoriesData, isLoading: isLoadingCategories } = useGetAdminResourceCategoriesQuery({
    active: true,
  });
  const [createResource, { isLoading: isCreating }] = useCreateAdminResourceMutation();

  const categories = categoriesData?.categories ?? [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 10 * 1024 * 1024) {
      setError("Maximum file size is 10MB.");
      return;
    }
    setError("");
    setFile(f);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Resource name is required.");
      return;
    }
    if (!file) {
      setError("Please upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name.trim());
    if (description.trim()) formData.append("description", description.trim());
    formData.append("type", type);
    formData.append("step", step);
    if (categoryId) formData.append("categoryId", categoryId);
    if (title.trim()) formData.append("title", title.trim());
    formData.append("cardColor", cardColor);
    formData.append("iconKey", iconKey);
    formData.append("sortOrder", String(sortOrder));
    formData.append("file", file);

    try {
      await createResource(formData).unwrap();
      navigate("/admin/resources");
    } catch (err) {
      console.error("Failed to create resource:", err);
      setError("Failed to create resource. Check that the file type is supported (PDF, DOC, DOCX, PNG, JPG, WEBP).");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-6 flex-1">
      {/* Top Header Bar */}
      <div className="bg-white px-6 py-4 rounded-xl border border-slate-100 shadow-sm flex-shrink-0">
        <h2 className="text-lg font-bold text-slate-800">Add New Resources</h2>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm max-w-4xl flex flex-col min-h-0">
        <div className="p-6 md:p-8 border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-800">Upload Resources</h3>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-4">
              {error}
            </div>
          )}

          {/* Resource Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Resource Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-700"
            />
          </div>

          {/* Display Title */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Display Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Shown on the resource card (e.g. Hotel & Local Partner Outreach Kit)"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-700"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full p-4 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-600 text-sm leading-relaxed resize-none"
            />
          </div>

          {/* Resource Type + Step */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Resource Type</label>
              <div className="relative">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-3 appearance-none rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-700 bg-white"
                >
                  {RESOURCE_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Step</label>
              <div className="relative">
                <select
                  value={step}
                  onChange={(e) => setStep(e.target.value)}
                  className="w-full px-4 py-3 appearance-none rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-700 bg-white"
                >
                  {RESOURCE_STEPS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Category + Icon */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Category</label>
              <div className="relative">
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-4 py-3 appearance-none rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-700 bg-white"
                >
                  <option value="">No category</option>
                  {isLoadingCategories ? (
                    <option disabled>Loading categories...</option>
                  ) : (
                    categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))
                  )}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Icon Key</label>
              <input
                type="text"
                value={iconKey}
                onChange={(e) => setIconKey(e.target.value)}
                placeholder="folder-search, file-text, printer, mail..."
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-700"
              />
            </div>
          </div>

          {/* Card Color + Sort Order */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Card Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={cardColor}
                  onChange={(e) => setCardColor(e.target.value)}
                  className="w-12 h-10 rounded-lg border border-slate-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={cardColor}
                  onChange={(e) => setCardColor(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Sort Order</label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-700"
              />
            </div>
          </div>

          {/* Upload File */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Upload File *</label>
            <label className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:text-blue-500 group-hover:bg-blue-50 mb-4 transition-colors">
                <UploadCloud className="w-6 h-6" />
              </div>
              {file ? (
                <p className="text-slate-700 font-medium mb-1">{file.name}</p>
              ) : (
                <>
                  <p className="text-slate-600 font-medium mb-1">Click to upload or drag and drop</p>
                  <p className="text-slate-400 text-xs">PDF, DOC, DOCX, PNG, JPG, WEBP · up to 10MB</p>
                </>
              )}
              <input type="file" className="hidden" onChange={handleFileChange} />
            </label>
          </div>
        </div>

        {/* Form Actions */}
        <div className="p-6 md:p-8 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/admin/resources"
            className="w-full sm:w-1/2 flex justify-center py-3 px-6 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors text-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isCreating}
            className="w-full sm:w-1/2 flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-[#1a56ff] hover:bg-blue-700 text-white font-semibold shadow-sm transition-colors disabled:opacity-50"
          >
            {isCreating && <Loader2 className="w-4 h-4 animate-spin" />}
            Save changes
          </button>
        </div>
      </div>
    </form>
  );
}
