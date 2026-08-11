import { useState } from "react";
import { Loader2, Plus, Trash2, Save, X, ChevronDown, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "../lib/cn";
import {
  useGetAdminChecklistItemsQuery,
  useCreateAdminChecklistItemMutation,
  useUpdateAdminChecklistItemMutation,
  useDeleteAdminChecklistItemMutation,
} from "../store/api/Admin/admin.api";
import { RESOURCE_STEPS } from "../store/api/Admin/admin.type";
import { useConfirmDialog } from "../hooks/useConfirmDialog";

export default function AdminChecklistItemsPage() {
  const [stepFilter, setStepFilter] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState<{
    step: string;
    title: string;
    description: string;
    sortOrder: number;
  }>({
    step: RESOURCE_STEPS[0],
    title: "",
    description: "",
    sortOrder: 1,
  });
  const [editForm, setEditForm] = useState<{
    id: string;
    title: string;
    description: string;
    sortOrder: number;
  } | null>(null);
  const [createError, setCreateError] = useState("");
  const { openConfirm, confirmDialog, showAlert, alertDialog } = useConfirmDialog();

  const { data, isLoading, isError, refetch } = useGetAdminChecklistItemsQuery({
    step: stepFilter || undefined,
  });
  const [createItem, { isLoading: isCreating }] = useCreateAdminChecklistItemMutation();
  const [updateItem, { isLoading: isUpdating }] = useUpdateAdminChecklistItemMutation();
  const [deleteItem, { isLoading: isDeleting }] = useDeleteAdminChecklistItemMutation();

  const items = data?.checklistItems ?? [];

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError("");
    if (!createForm.title.trim()) {
      setCreateError("Title is required.");
      return;
    }
    try {
      await createItem({
        step: createForm.step,
        title: createForm.title.trim(),
        description: createForm.description.trim() || undefined,
        sortOrder: createForm.sortOrder,
      }).unwrap();
      setShowCreate(false);
      setCreateForm({ step: RESOURCE_STEPS[0], title: "", description: "", sortOrder: 1 });
    } catch (err) {
      console.error("Failed to create checklist item:", err);
      setCreateError("Failed to create checklist item.");
    }
  };

  const handleUpdate = async () => {
    if (!editForm) return;
    if (!editForm.title.trim()) {
      showAlert({ title: "Title Required", message: "A title is required for the checklist item.", type: "info" });
      return;
    }
    try {
      await updateItem({
        id: editForm.id,
        title: editForm.title.trim(),
        description: editForm.description.trim() || undefined,
        sortOrder: editForm.sortOrder,
      }).unwrap();
      setEditForm(null);
    } catch (err) {
      console.error("Failed to update checklist item:", err);
      showAlert({ title: "Error", message: "Failed to update checklist item.", type: "error" });
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      await updateItem({ id, isActive: !isActive }).unwrap();
    } catch (err) {
      console.error("Failed to toggle checklist item:", err);
      showAlert({ title: "Error", message: "Failed to update checklist item.", type: "error" });
    }
  };

  const handleDelete = (id: string) => {
    openConfirm(
      {
        title: "Delete Checklist Item",
        message: "Delete this checklist item? Items with completion history are deactivated instead.",
        confirmText: "Yes, delete",
      },
      async () => {
        try {
          await deleteItem(id).unwrap();
        } catch (err) {
          console.error("Failed to delete checklist item:", err);
          showAlert({ title: "Error", message: "Failed to delete checklist item.", type: "error" });
        }
      }
    );
  };

  return (
    <div className="flex flex-col space-y-6 flex-1">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Checklist Items</h2>
          <p className="text-slate-500 text-sm mt-1">
            Manage the launch checklist templates riders work through.
          </p>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a56ff] text-white font-medium hover:bg-blue-700 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      {/* Step Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => setStepFilter("")}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
            !stepFilter ? "bg-[#1a56ff] text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          )}
        >
          All
        </button>
        {RESOURCE_STEPS.map((s) => (
          <button
            key={s}
            onClick={() => setStepFilter(s)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
              stepFilter === s ? "bg-[#1a56ff] text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            )}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Create Form */}
      {showCreate && (
        <form
          onSubmit={handleCreate}
          className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex items-center justify-between md:col-span-2">
            <h3 className="text-lg font-bold text-slate-800">New Checklist Item</h3>
            <button type="button" onClick={() => setShowCreate(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          {createError && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 md:col-span-2">
              {createError}
            </div>
          )}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-600">Step</label>
            <div className="relative">
              <select
                value={createForm.step}
                onChange={(e) => setCreateForm((prev) => ({ ...prev, step: e.target.value }))}
                className="w-full px-4 py-2.5 appearance-none rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-slate-800 bg-white"
              >
                {RESOURCE_STEPS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-600">Sort Order</label>
            <input
              type="number"
              value={createForm.sortOrder}
              onChange={(e) => setCreateForm((prev) => ({ ...prev, sortOrder: Number(e.target.value) }))}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-slate-800"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-slate-600">Title *</label>
            <input
              type="text"
              value={createForm.title}
              onChange={(e) => setCreateForm((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-slate-800"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-slate-600">Description</label>
            <textarea
              value={createForm.description}
              onChange={(e) => setCreateForm((prev) => ({ ...prev, description: e.target.value }))}
              rows={2}
              className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-slate-800 resize-none"
            />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={isCreating}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1a56ff] text-white font-medium hover:bg-blue-700 transition-colors text-sm disabled:opacity-50"
            >
              {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Create Item
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col">
        <div className="p-6 border-b border-slate-50">
          <h3 className="text-lg font-bold text-slate-800">
            {stepFilter || "All"} Checklist Items
          </h3>
        </div>

        <div className="p-6 pt-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 text-[#1a56ff] animate-spin" />
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <p className="text-sm text-slate-500">Failed to load checklist items.</p>
              <button onClick={refetch} className="px-4 py-2 rounded-lg bg-[#1a56ff] text-white text-sm font-medium hover:bg-blue-700">
                Retry
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-sm text-slate-400">No checklist items found.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className={cn(
                  "border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                  item.isActive ? "border-slate-100 bg-white" : "border-slate-100 bg-slate-50 opacity-70"
                )}>
                  {editForm?.id === item.id ? (
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={(e) => setEditForm((prev) => prev ? { ...prev, title: e.target.value } : prev)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-slate-800"
                      />
                      <input
                        type="number"
                        value={editForm.sortOrder}
                        onChange={(e) => setEditForm((prev) => prev ? { ...prev, sortOrder: Number(e.target.value) } : prev)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-slate-800"
                      />
                      <div className="md:col-span-2">
                        <textarea
                          value={editForm.description}
                          onChange={(e) => setEditForm((prev) => prev ? { ...prev, description: e.target.value } : prev)}
                          rows={2}
                          className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-slate-800 resize-none"
                        />
                      </div>
                      <div className="md:col-span-2 flex justify-end gap-2">
                        <button
                          onClick={() => setEditForm(null)}
                          className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 text-sm font-medium hover:bg-slate-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleUpdate}
                          disabled={isUpdating}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a56ff] text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                        >
                          {isUpdating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={cn(
                            "font-semibold text-slate-800 text-sm",
                            !item.isActive && "line-through text-slate-400"
                          )}>
                            {item.title}
                          </span>
                          <span className="text-xs text-slate-400">{item.step}</span>
                          <span className="text-xs text-slate-400">#{item.sortOrder}</span>
                        </div>
                        {item.description && (
                          <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => setEditForm({
                            id: item.id,
                            title: item.title,
                            description: item.description || "",
                            sortOrder: item.sortOrder,
                          })}
                          className="text-[#1a56ff] hover:text-blue-700 transition-colors text-xs font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleToggleActive(item.id, item.isActive)}
                          disabled={isUpdating}
                          className="text-slate-500 hover:text-slate-700 transition-colors disabled:opacity-50"
                          title={item.isActive ? "Deactivate" : "Activate"}
                        >
                          {item.isActive ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-slate-400" />}
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={isDeleting}
                          className="text-red-400 hover:text-red-500 transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sweet-alert style modals */}
      {confirmDialog}
      {alertDialog}
    </div>
  );
}
