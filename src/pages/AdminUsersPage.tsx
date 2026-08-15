import { useState } from "react";
import { Loader2, Plus, Trash2, Search, X, Save, ShieldCheck } from "lucide-react";
import { cn } from "../lib/cn";
import {
  useGetAdminUsersQuery,
  useCreateAdminUserMutation,
  useUpdateAdminUserMutation,
  useDeleteAdminUserMutation,
} from "../store/api/Admin/admin.api";
import type { AdminUser } from "../store/api/Admin/admin.type";
import { useConfirmDialog } from "../hooks/useConfirmDialog";

const statusStyles: Record<string, string> = {
  active: "bg-green-50 text-green-600",
  pending: "bg-yellow-50 text-yellow-600",
  suspended: "bg-red-50 text-red-600",
};

const formatDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
};

/** Extract a user-facing message from an RTK Query / API error (handles string[] and nested shapes). */
const getApiErrorMessage = (err: unknown, fallback: string): string => {
  if (err && typeof err === "object" && "data" in err) {
    const data = (err as { data?: unknown }).data;
    if (data && typeof data === "object") {
      const message = (data as { message?: unknown }).message;
      if (Array.isArray(message)) {
        return message.join(", ");
      }
      if (typeof message === "string") {
        return message;
      }
      if (message && typeof message === "object") {
        const nested = (message as { message?: unknown }).message;
        if (typeof nested === "string") return nested;
        if (Array.isArray(nested)) return nested.join(", ");
      }
    }
  }
  return fallback;
};

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "rider",
    status: "active",
  });
  const [createError, setCreateError] = useState("");
  const { openConfirm, confirmDialog, showAlert, alertDialog } = useConfirmDialog();

  const { data, isLoading, isError, refetch } = useGetAdminUsersQuery();
  const [createUser, { isLoading: isCreating }] = useCreateAdminUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateAdminUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteAdminUserMutation();

  const users = data?.users ?? [];

  const filtered = search
    ? users.filter(
        (u) =>
          (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      )
    : users;

  const handleToggleStatus = (user: AdminUser) => {
    const next = user.status === "suspended" ? "active" : "suspended";
    openConfirm(
      {
        title: "Change Account Status",
        message: `Change ${user.email} to "${next}"?`,
        confirmText: "Yes, change it",
      },
      async () => {
        try {
          await updateUser({ id: user.id, status: next }).unwrap();
        } catch (err) {
          console.error("Failed to update user:", err);
          showAlert({ title: "Error", message: getApiErrorMessage(err, "Failed to update user status."), type: "error" });
        }
      }
    );
  };

  const handleDelete = (user: AdminUser) => {
    openConfirm(
      {
        title: "Delete User",
        message: `Delete user ${user.email}? This cannot be undone.`,
        confirmText: "Yes, delete",
      },
      async () => {
        try {
          await deleteUser(user.id).unwrap();
        } catch (err) {
          console.error("Failed to delete user:", err);
          showAlert({ title: "Error", message: getApiErrorMessage(err, "Failed to delete user."), type: "error" });
        }
      }
    );
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError("");
    if (!createForm.email.trim() || !createForm.password) {
      setCreateError("Email and password are required.");
      return;
    }
    try {
      await createUser({
        email: createForm.email.trim(),
        password: createForm.password,
        role: createForm.role,
        status: createForm.status,
        name: createForm.name.trim() || undefined,
        phone: createForm.phone.trim() || undefined,
      }).unwrap();
      setShowCreate(false);
      setCreateForm({ name: "", email: "", phone: "", password: "", role: "rider", status: "active" });
      showAlert({ title: "Success", message: "User created successfully.", type: "success" });
    } catch (err) {
      console.error("Failed to create user:", err);
      // Backend returns { message: string[] } — surface the actual reason
      setCreateError(getApiErrorMessage(err, "Failed to create user."));
    }
  };

  return (
    <div className="flex flex-col space-y-6 flex-1">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">User Management</h2>
          <p className="text-slate-500 text-sm mt-1">
            Manage driver and admin accounts on the platform.
          </p>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a56ff] text-white font-medium hover:bg-blue-700 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Create User
        </button>
      </div>

      {/* Create User Form */}
      {showCreate && (
        <form
          onSubmit={handleCreate}
          className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex items-center justify-between md:col-span-2">
            <h3 className="text-lg font-bold text-slate-800">Create New User</h3>
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
            <label className="block text-sm font-medium text-slate-600">Name</label>
            <input
              type="text"
              value={createForm.name}
              onChange={(e) => setCreateForm((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-slate-800"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-600">Email *</label>
            <input
              type="email"
              value={createForm.email}
              onChange={(e) => setCreateForm((prev) => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-slate-800"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-600">Phone</label>
            <input
              type="text"
              value={createForm.phone}
              onChange={(e) => setCreateForm((prev) => ({ ...prev, phone: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-slate-800"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-600">Password *</label>
            <input
              type="password"
              value={createForm.password}
              onChange={(e) => setCreateForm((prev) => ({ ...prev, password: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-slate-800"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-600">Role</label>
            <select
              value={createForm.role}
              onChange={(e) => setCreateForm((prev) => ({ ...prev, role: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-slate-800"
            >
              <option value="rider">Driver</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-600">Status</label>
            <select
              value={createForm.status}
              onChange={(e) => setCreateForm((prev) => ({ ...prev, status: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-slate-800"
            >
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={isCreating}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1a56ff] text-white font-medium hover:bg-blue-700 transition-colors text-sm disabled:opacity-50"
            >
              {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Create User
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 p-6 border-b border-slate-50">
          <h3 className="text-lg font-bold text-slate-800">All Users</h3>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm w-full sm:w-56"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto flex-1 p-6 pt-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 text-[#1a56ff] animate-spin" />
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <p className="text-sm text-slate-500">Failed to load users.</p>
              <button onClick={refetch} className="px-4 py-2 rounded-lg bg-[#1a56ff] text-white text-sm font-medium hover:bg-blue-700">
                Retry
              </button>
            </div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-[#1a56ff] bg-[#f0f4ff] font-medium">
                <tr>
                  <th className="px-6 py-4 rounded-tl-lg">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Business</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Created</th>
                  <th className="px-6 py-4 text-center rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-10 text-center text-slate-400 text-sm">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((user) => (
                    <tr key={user.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-[#f0f4ff] text-[#1a56ff] flex items-center justify-center text-xs font-bold">
                            {(user.name || user.email || "?").slice(0, 2).toUpperCase()}
                          </span>
                          <span className="font-medium text-slate-800">{user.name || "—"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{user.email}</td>
                      <td className="px-6 py-4 text-slate-600">{user.phone || "—"}</td>
                      <td className="px-6 py-4">
                        <span className="capitalize text-slate-600">{user.role}</span>
                        {user.role === "admin" && <ShieldCheck className="w-4 h-4 text-[#1a56ff] inline ml-1" />}
                      </td>
                      <td className="px-6 py-4 text-slate-600">{user.business?.businessName || "—"}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize",
                          statusStyles[user.status] || "bg-slate-50 text-slate-600"
                        )}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{formatDate(user.createdAt)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => handleToggleStatus(user)}
                            disabled={isUpdating}
                            className="text-[#1a56ff] hover:text-blue-700 transition-colors text-xs font-medium disabled:opacity-50"
                            title={user.status === "suspended" ? "Activate" : "Suspend"}
                          >
                            {user.status === "suspended" ? "Activate" : "Suspend"}
                          </button>
                          <button
                            onClick={() => handleDelete(user)}
                            disabled={isDeleting}
                            className="text-red-400 hover:text-red-500 transition-colors disabled:opacity-50"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Sweet-alert style modals */}
      {confirmDialog}
      {alertDialog}
    </div>
  );
}
