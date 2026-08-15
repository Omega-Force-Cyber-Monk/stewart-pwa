import { formatCategory } from "../lib/formatCategory";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Loader2, XCircle, ShieldCheck, ShieldOff, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { cn } from "../lib/cn";
import {
  useGetAdminDriverQuery,
  useUpdateDriverVerificationMutation,
  useUpdateDriverAccountStatusMutation,
  useDeleteDriverMutation,
} from "../store/api/Admin/admin.api";
import { useConfirmDialog } from "../hooks/useConfirmDialog";

const formatDate = (iso: string | null | undefined) => {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
};


export default function AdminDriverDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [rejectionOpen, setRejectionOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const { data, isLoading, isError, refetch } = useGetAdminDriverQuery(id ?? "", {
    skip: !id,
  });
  const [updateVerification, { isLoading: isVerifying }] = useUpdateDriverVerificationMutation();
  const [updateAccountStatus, { isLoading: isUpdatingStatus }] = useUpdateDriverAccountStatusMutation();
  const [deleteDriver, { isLoading: isDeleting }] = useDeleteDriverMutation();
  const { openConfirm, confirmDialog, showAlert, alertDialog } = useConfirmDialog();

  const driver = data?.driver;

  const handleApprove = async () => {
    if (!driver) return;
    try {
      await updateVerification({ id: driver.id, status: "APPROVED" }).unwrap();
    } catch (err) {
      console.error("Failed to approve driver:", err);
      showAlert({ title: "Error", message: "Failed to approve driver.", type: "error" });
    }
  };

  const handleReject = async () => {
    if (!driver) return;
    if (!rejectionReason.trim()) {
      showAlert({ title: "Rejection Reason Required", message: "Please provide a reason for rejecting this driver.", type: "info" });
      return;
    }
    try {
      await updateVerification({ id: driver.id, status: "REJECTED", reason: rejectionReason.trim() }).unwrap();
      setRejectionOpen(false);
      setRejectionReason("");
    } catch (err) {
      console.error("Failed to reject driver:", err);
      showAlert({ title: "Error", message: "Failed to reject driver.", type: "error" });
    }
  };

  const handleToggleStatus = () => {
    if (!driver) return;
    const next = driver.user.status === "suspended" ? "active" : "suspended";
    openConfirm(
      {
        title: "Change Account Status",
        message: `Change this driver's account status to "${next}"?`,
        confirmText: "Yes, change it",
      },
      async () => {
        try {
          await updateAccountStatus({ id: driver.id, status: next }).unwrap();
        } catch (err) {
          console.error("Failed to update account status:", err);
          showAlert({ title: "Error", message: "Failed to update account status.", type: "error" });
        }
      }
    );
  };

  const handleDelete = () => {
    if (!driver) return;
    openConfirm(
      {
        title: "Delete Driver",
        message: "Are you sure you want to permanently delete this driver account?",
        confirmText: "Yes, delete",
      },
      async () => {
        try {
          await deleteDriver(driver.id).unwrap();
          navigate("/admin/drivers");
        } catch (err) {
          console.error("Failed to delete driver:", err);
          showAlert({ title: "Error", message: "Failed to delete driver.", type: "error" });
        }
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#1a56ff] animate-spin" />
      </div>
    );
  }

  if (isError || !driver) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
        <p className="text-slate-500 text-sm">Driver not found or failed to load.</p>
        <button onClick={refetch} className="px-4 py-2 rounded-lg bg-[#1a56ff] text-white text-sm font-medium hover:bg-blue-700">
          Retry
        </button>
      </div>
    );
  }

  const verified = driver.verificationStatus === "APPROVED";

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Link to="/admin/drivers" className="text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-baseline gap-2">
            <h2 className="text-xl font-bold text-slate-800">{driver.user.name || driver.user.email}</h2>
            <span className="text-sm font-medium text-slate-400">#{driver.driverCode}</span>
          </div>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold",
            verified
              ? "bg-green-50 text-green-600 border border-green-100"
              : driver.verificationStatus === "REJECTED"
                ? "bg-red-50 text-red-600 border border-red-100"
                : "bg-yellow-50 text-yellow-600 border border-yellow-100"
          )}
        >
          {verified ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
          {driver.verificationStatus}
        </span>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Driver Information Card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Driver Information</h3>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start">
            {driver.avatarUrl ? (
              <img
                src={driver.avatarUrl}
                alt={driver.user.name || "Driver"}
                className="w-32 h-32 rounded-full object-cover border-4 border-slate-50 shadow-sm flex-shrink-0"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-[#f0f4ff] text-[#1a56ff] flex items-center justify-center text-4xl font-bold border-4 border-slate-50 shadow-sm flex-shrink-0">
                {(driver.user.name || driver.user.email || "?").slice(0, 2).toUpperCase()}
              </div>
            )}

            <div className="flex-1 w-full space-y-4">
              <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                <span className="text-sm text-slate-500">Full name</span>
                <span className="text-sm font-medium text-slate-800 text-right">{driver.user.name || "—"}</span>
              </div>
              <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                <span className="text-sm text-slate-500">Driver ID</span>
                <span className="text-sm font-medium text-slate-800 text-right">#{driver.driverCode}</span>
              </div>
              <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                <span className="text-sm text-slate-500">Email address</span>
                <span className="text-sm font-medium text-slate-800 text-right">{driver.user.email}</span>
              </div>
              <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                <span className="text-sm text-slate-500">Phone number</span>
                <span className="text-sm font-medium text-slate-800 text-right">{driver.user.phone || "—"}</span>
              </div>
              <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                <span className="text-sm text-slate-500">Driver Category</span>
                <span className="text-sm font-medium text-slate-800 text-right">{formatCategory(driver.category)}</span>
              </div>
              <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                <span className="text-sm text-slate-500">Account Status</span>
                <span className="text-sm font-medium text-slate-800 text-right capitalize">{driver.user.status}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm text-slate-500">Joined Date</span>
                <span className="text-sm font-medium text-slate-800 text-right">{formatDate(driver.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Business Information Card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Business Information</h3>

          {driver.business ? (
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start">
              {driver.business.logoUrl ? (
                <img
                  src={driver.business.logoUrl}
                  alt={driver.business.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-slate-50 shadow-sm flex-shrink-0"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-[#f0f4ff] text-[#1a56ff] flex items-center justify-center text-4xl font-bold border-4 border-slate-50 shadow-sm flex-shrink-0">
                  {driver.business.name.slice(0, 2).toUpperCase()}
                </div>
              )}

              <div className="flex-1 w-full space-y-4">
                <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                  <span className="text-sm text-slate-500">Business name</span>
                  <span className="text-sm font-medium text-slate-800 text-right">{driver.business.name}</span>
                </div>
                <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                  <span className="text-sm text-slate-500">Business status</span>
                  <span className="text-sm font-medium text-slate-800 text-right">{driver.business.status}</span>
                </div>
                <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                  <span className="text-sm text-slate-500">Email address</span>
                  <span className="text-sm font-medium text-slate-800 text-right">{driver.business.email || "—"}</span>
                </div>
                <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                  <span className="text-sm text-slate-500">Phone number</span>
                  <span className="text-sm font-medium text-slate-800 text-right">{driver.business.phone || "—"}</span>
                </div>
                <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                  <span className="text-sm text-slate-500">Service area</span>
                  <span className="text-sm font-medium text-slate-800 text-right">{driver.serviceArea?.cityArea || "—"}</span>
                </div>
                <div className="flex justify-between items-start pt-1">
                  <span className="text-sm text-slate-500 flex-shrink-0 mr-4">Airports served</span>
                  <span className="text-sm font-medium text-slate-800 text-right leading-relaxed">
                    {driver.serviceArea?.airports?.length ? driver.serviceArea.airports.join(", ") : "—"}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-sm text-slate-400">
              No business associated with this driver yet.
            </div>
          )}
        </div>
      </div>

      {/* Setup Progress */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-slate-800">Launch Setup Progress</h3>
          <span className="text-sm font-semibold text-[#1a56ff]">{driver.setup?.percentage ?? 0}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5">
          <div
            className="bg-[#1a56ff] h-2.5 rounded-full transition-all"
            style={{ width: `${driver.setup?.percentage ?? 0}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Current step {driver.setup?.currentStep ?? 1} of 8 · {driver.setup?.completedSteps?.length ?? 0} steps completed
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end items-center gap-4 pt-4 flex-wrap">
        {!rejectionOpen ? (
          <>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-6 py-2.5 rounded-lg border border-red-200 text-red-500 font-medium hover:bg-red-50 transition-colors text-sm disabled:opacity-50 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Driver
            </button>
            {driver.verificationStatus !== "APPROVED" && (
              <button
                onClick={handleApprove}
                disabled={isVerifying}
                className="px-6 py-2.5 rounded-lg bg-[#22c55e] hover:bg-[#16a34a] text-white font-medium shadow-sm shadow-green-500/20 transition-colors text-sm disabled:opacity-50 flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                Approve Driver
              </button>
            )}
            {driver.verificationStatus !== "REJECTED" && (
              <button
                onClick={() => setRejectionOpen(true)}
                disabled={isVerifying}
                className="px-6 py-2.5 rounded-lg border border-red-200 text-red-500 font-medium hover:bg-red-50 transition-colors text-sm disabled:opacity-50 flex items-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                Reject Driver
              </button>
            )}
            <button
              onClick={handleToggleStatus}
              disabled={isUpdatingStatus}
              className="px-6 py-2.5 rounded-lg bg-[#111315] hover:bg-black text-white font-medium shadow-sm transition-colors text-sm disabled:opacity-50 flex items-center gap-2"
            >
              {driver.user.status === "suspended" ? <ShieldCheck className="w-4 h-4" /> : <ShieldOff className="w-4 h-4" />}
              {driver.user.status === "suspended" ? "Activate Account" : "Suspend Account"}
            </button>
          </>
        ) : (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Rejection reason (required)"
              className="flex-1 px-4 py-2.5 rounded-lg border border-red-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-sm min-w-[280px]"
              rows={2}
            />
            <div className="flex gap-2">
              <button
                onClick={() => setRejectionOpen(false)}
                className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-600 font-medium hover:bg-slate-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={isVerifying}
                className="px-4 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors text-sm disabled:opacity-50"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sweet-alert style modals */}
      {confirmDialog}
      {alertDialog}
    </div>
  );
}
