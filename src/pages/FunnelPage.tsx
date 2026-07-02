import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Badge } from "../components/common/Badge";
import { Button } from "../components/common/Button";
import { Modal } from "../components/common/Modal";
import {
  completePurchase,
  setActiveFunnel,
  type FunnelType,
} from "../features/appFlow/appFlowSlice";
import { funnelContent } from "../features/funnel/funnelContent";
import { appCopy } from "../features/localization/copy";

type FunnelPageProps = {
  funnel: FunnelType;
};

const benefits = [
  "Front-end launch plan",
  "Niche positioning prompts",
  "DIY dashboard modules",
  "Optional DFY delivery path",
];

export default function FunnelPage({ funnel }: FunnelPageProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [hasDfyUpgrade, setHasDfyUpgrade] = useState(false);
  const locale = useAppSelector((state) => state.appFlow.locale);
  const content = funnelContent[funnel];

  useEffect(() => {
    dispatch(setActiveFunnel(funnel));
  }, [dispatch, funnel]);

  const handlePurchase = () => {
    dispatch(completePurchase({ hasDfyUpgrade }));
    setCheckoutOpen(false);
    navigate("/onboarding");
  };

  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
      <section className="flex flex-col justify-center">
        <Badge tone="accent">{content.eyebrow}</Badge>
        <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight tracking-normal md:text-6xl">
          {content.headline}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{content.description}</p>
        <p className="mt-3 text-sm font-medium text-slate-500">{content.audience}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button onClick={() => setCheckoutOpen(true)}>
            {appCopy[locale].checkout}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
          <Button onClick={() => navigate("/dashboard")} variant="secondary">
            View dashboard
          </Button>
        </div>
      </section>

      <aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-500">Launch system</p>
            <p className="mt-2 text-4xl font-bold">{content.price}</p>
          </div>
          <Sparkles aria-hidden="true" className="size-6 text-cyan-600" />
        </div>

        <div className="mt-8 space-y-4">
          {benefits.map((benefit) => (
            <div className="flex gap-3" key={benefit}>
              <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 text-emerald-600" />
              <span className="text-sm font-medium text-slate-700">{benefit}</span>
            </div>
          ))}
        </div>
      </aside>

      <Modal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        title="Mock checkout"
      >
        <div className="space-y-5">
          <div className="rounded-md bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-950">{content.headline}</p>
            <p className="mt-1 text-sm text-slate-600">{content.price} today, no real charge.</p>
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-md border border-slate-200 p-4">
            <input
              checked={hasDfyUpgrade}
              className="mt-1 size-4"
              onChange={(event) => setHasDfyUpgrade(event.target.checked)}
              type="checkbox"
            />
            <span>
              <span className="block text-sm font-semibold text-slate-950">Add DFY upgrade</span>
              <span className="mt-1 block text-sm text-slate-600">
                Switch dashboard to a delivery pipeline after onboarding.
              </span>
            </span>
          </label>

          <Button className="w-full" onClick={handlePurchase}>
            Complete mock purchase
          </Button>
        </div>
      </Modal>
    </main>
  );
}
