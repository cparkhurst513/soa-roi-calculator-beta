import React, { useMemo, useState } from "react";

const BRAND = {
  blue: "#2C8DCD",
  gold: "#F5B21A",
  black: "#000000",
  light: "#F6F8FB",
};

const defaultInputs = {
  annualHours: 6500,
  fuelBurnGph: 70,
  fuelPrice: 3.75,
  fuelSavingsPct: 5,
  oilChangeInterval: 500,
  oilVolumeGal: 82,
  oilCost: 25,
  laborHours: 4,
  laborRate: 60,
  oilChangeReductionPct: 25,
  productiveHourValue: 10000,
  downtimeHours: 4,
  soaUpgradeCost: 50000,
  rebuildInterval: 25000,
  noxReductionPct: 0,
  noxValuePerPercent: 0,
  pmReductionPct: 0,
  pmValuePerPercent: 0,
};

const currency = (value, digits = 0) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: digits,
  }).format(Number.isFinite(value) ? value : 0);

const number = (value, digits = 1) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
  }).format(Number.isFinite(value) ? value : 0);

function Field({ label, value, onChange, suffix, prefix, helper }) {
  const displayValue = value === null || value === undefined ? "" : String(value);

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <div className="relative">
        {prefix && <span className="absolute left-3 top-3 text-sm text-slate-500">{prefix}</span>}
        <input
          type="number"
          inputMode="decimal"
          value={displayValue}
          onChange={(e) => onChange(e.target.value === "" ? null : e.target.value)}
          className={`h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base shadow-sm outline-none transition focus:border-[#2C8DCD] focus:ring-2 focus:ring-[#2C8DCD]/20 ${prefix ? "pl-7" : ""} ${suffix ? "pr-16" : ""}`}
        />
        {suffix && <span className="absolute right-3 top-3 text-sm text-slate-500">{suffix}</span>}
      </div>
      {helper && <p className="text-xs leading-snug text-slate-500">{helper}</p>}
    </div>
  );
}

function TabButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-2 py-2 text-[11px] font-bold transition sm:text-sm ${
        active ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-800"
      }`}
    >
      {children}
    </button>
  );
}

function ResultCard({ symbol, title, value, subtitle, highlight }) {
  return (
    <div className={`rounded-2xl border bg-white p-4 shadow-sm ${highlight ? "border-[#F5B21A]" : "border-slate-200"}`}>
      <div className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg font-black"
          style={{ background: highlight ? BRAND.gold : "#E8F3FB", color: highlight ? "#000000" : BRAND.blue }}
        >
          {symbol}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-600">{title}</p>
          <p className="mt-1 text-2xl font-black tracking-tight text-slate-950">{value}</p>
          {subtitle && <p className="mt-1 text-xs leading-snug text-slate-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}

function LineItem({ label, value }) {
  return (
    <div className="flex justify-between gap-3 text-sm">
      <span className="text-slate-600">{label}</span>
      <span className="font-bold text-slate-900">{value}</span>
    </div>
  );
}

function Hero() {
  return (
    <div className="mb-4 overflow-hidden rounded-[24px] text-white shadow-xl" style={{ background: BRAND.black }}>
      <div className="px-5 py-5 sm:px-8 sm:py-6">
        <div className="h-[120px] w-full max-w-[560px] overflow-hidden sm:h-[145px] sm:max-w-[680px]">
          <img
            src="https://cdn.shopify.com/s/files/1/0681/4295/6773/files/Speed_of_Air_TT_2_black.png?v=1778284738"
            alt="Speed of Air Engine Technology"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="mt-3 h-1.5 w-28 rounded-full" style={{ background: BRAND.gold }} />
        <h1
          className="mt-3 text-3xl tracking-tight sm:text-4xl lg:text-5xl"
          style={{ fontFamily: "Orbitron, Eurostile, Arial, sans-serif", fontWeight: 700 }}
        >
          Engine Profitability Calculator
        </h1>
        <p className="mt-2 max-w-3xl text-base leading-7 text-white/90 sm:text-lg">
          Estimate fuel savings, maintenance savings, emissions value, recovered uptime, payback, and total value created over the engine rebuild interval.
        </p>
      </div>
    </div>
  );
}

export default function SoaMobileRoiSalesCalculator() {
  const [inputs, setInputs] = useState(defaultInputs);
  const [tab, setTab] = useState("operation");

  const set = (key) => (value) => setInputs((prev) => ({ ...prev, [key]: value }));
  const val = (key) => {
    const parsed = Number(inputs[key]);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const results = useMemo(() => {
    const annualHours = val("annualHours");
    const fuelBurnGph = val("fuelBurnGph");
    const fuelSavingsPct = val("fuelSavingsPct");
    const fuelPrice = val("fuelPrice");
    const oilChangeInterval = val("oilChangeInterval");
    const oilChangeReductionPct = val("oilChangeReductionPct");
    const oilVolumeGal = val("oilVolumeGal");
    const oilCost = val("oilCost");
    const laborHours = val("laborHours");
    const laborRate = val("laborRate");
    const downtimeHours = val("downtimeHours");
    const productiveHourValue = val("productiveHourValue");
    const rebuildInterval = val("rebuildInterval");
    const soaUpgradeCost = val("soaUpgradeCost");
    const noxReductionPct = val("noxReductionPct");
    const noxValuePerPercent = val("noxValuePerPercent");
    const pmReductionPct = val("pmReductionPct");
    const pmValuePerPercent = val("pmValuePerPercent");

    const annualFuelUse = annualHours * fuelBurnGph;
    const fuelSavedGal = annualFuelUse * (fuelSavingsPct / 100);
    const fuelSavings = fuelSavedGal * fuelPrice;

    const baselineServices = oilChangeInterval > 0 ? annualHours / oilChangeInterval : 0;
    const servicesAvoided = baselineServices * (oilChangeReductionPct / 100);
    const oilSavedGal = servicesAvoided * oilVolumeGal;
    const oilSavings = oilSavedGal * oilCost;
    const laborSavings = servicesAvoided * laborHours * laborRate;
    const recoveredHours = servicesAvoided * downtimeHours;
    const recoveredProductionValue = recoveredHours * productiveHourValue;

    const noxComplianceValue = noxReductionPct * noxValuePerPercent;
    const pmComplianceValue = pmReductionPct * pmValuePerPercent;
    const emissionsComplianceValue = noxComplianceValue + pmComplianceValue;

    const annualBenefit = fuelSavings + oilSavings + laborSavings + recoveredProductionValue + emissionsComplianceValue;
    const assetLifeYears = annualHours > 0 ? rebuildInterval / annualHours : 0;
    const assetLifeValue = annualBenefit * assetLifeYears;
    const assetLifeRoi = soaUpgradeCost > 0 ? assetLifeValue / soaUpgradeCost : 0;
    const paybackYears = annualBenefit > 0 ? soaUpgradeCost / annualBenefit : 0;
    const paybackMonths = paybackYears * 12;

    return {
      fuelSavings,
      oilSavings,
      laborSavings,
      recoveredProductionValue,
      noxComplianceValue,
      pmComplianceValue,
      emissionsComplianceValue,
      annualBenefit,
      assetLifeYears,
      assetLifeValue,
      assetLifeRoi,
      paybackYears,
      paybackMonths,
    };
  }, [inputs]);

  const reset = () => setInputs(defaultInputs);

  const shareSummary = async () => {
    const summary = `Speed of Air ROI estimate\nAnnual benefit: ${currency(results.annualBenefit)}\nValue over engine life: ${currency(results.assetLifeValue)}\nReturn over engine life: ${number(results.assetLifeRoi, 1)}x\nPayback: ${number(results.paybackMonths, 1)} months`;
    if (navigator.share) {
      await navigator.share({ title: "Speed of Air ROI Estimate", text: summary });
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(summary);
      alert("ROI summary copied to clipboard.");
    } else {
      alert(summary);
    }
  };

  return (
    <div className="min-h-screen px-4 py-5 text-slate-950 sm:px-6 lg:px-8" style={{ background: BRAND.light }}>
      <div className="mx-auto max-w-5xl">
        <Hero />

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="grid grid-cols-4 rounded-2xl bg-slate-100 p-1">
              <TabButton active={tab === "operation"} onClick={() => setTab("operation")}>Operation</TabButton>
              <TabButton active={tab === "service"} onClick={() => setTab("service")}>Service</TabButton>
              <TabButton active={tab === "emissions"} onClick={() => setTab("emissions")}>Emissions</TabButton>
              <TabButton active={tab === "investment"} onClick={() => setTab("investment")}>Investment</TabButton>
            </div>

            {tab === "operation" && (
              <div className="mt-5 space-y-4">
                <Field label="Hours per year" value={inputs.annualHours} onChange={set("annualHours")} suffix="hrs" helper="Total annual engine runtime." />
                <Field label="Fuel burn rate" value={inputs.fuelBurnGph} onChange={set("fuelBurnGph")} suffix="gal/hr" />
                <Field label="Fuel cost" value={inputs.fuelPrice} onChange={set("fuelPrice")} prefix="$" suffix="/gal" />
                <Field label="Fuel reduction with SoA" value={inputs.fuelSavingsPct} onChange={set("fuelSavingsPct")} suffix="%" />
                <Field label="Revenue per operating hour" value={inputs.productiveHourValue} onChange={set("productiveHourValue")} prefix="$" suffix="/hr" helper="Economic value of keeping the asset in production." />
              </div>
            )}

            {tab === "service" && (
              <div className="mt-5 space-y-4">
                <Field label="Oil change interval" value={inputs.oilChangeInterval} onChange={set("oilChangeInterval")} suffix="hrs" />
                <Field label="Oil per service" value={inputs.oilVolumeGal} onChange={set("oilVolumeGal")} suffix="gal" />
                <Field label="Oil cost" value={inputs.oilCost} onChange={set("oilCost")} prefix="$" suffix="/gal" />
                <Field label="Labor per service" value={inputs.laborHours} onChange={set("laborHours")} suffix="hrs" />
                <Field label="Labor rate" value={inputs.laborRate} onChange={set("laborRate")} prefix="$" suffix="/hr" />
                <Field label="Fewer oil changes with SoA" value={inputs.oilChangeReductionPct} onChange={set("oilChangeReductionPct")} suffix="%" />
                <Field label="Downtime per service" value={inputs.downtimeHours} onChange={set("downtimeHours")} suffix="hrs" />
              </div>
            )}

            {tab === "emissions" && (
              <div className="mt-5 space-y-4">
                <Field label="NOx reduction" value={inputs.noxReductionPct} onChange={set("noxReductionPct")} suffix="%" helper="Actual or expected percentage reduction in nitrogen oxides emissions." />
                <Field label="NOx value per 1% reduction" value={inputs.noxValuePerPercent} onChange={set("noxValuePerPercent")} prefix="$" suffix="/yr" helper="Annual dollar value assigned to each 1% reduction in NOx." />
                <Field label="Particulate matter reduction" value={inputs.pmReductionPct} onChange={set("pmReductionPct")} suffix="%" helper="Actual or expected percentage reduction in PM / soot emissions." />
                <Field label="PM value per 1% reduction" value={inputs.pmValuePerPercent} onChange={set("pmValuePerPercent")} prefix="$" suffix="/yr" helper="Annual dollar value assigned to each 1% reduction in particulate matter." />
                <div className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
                  <LineItem label="NOx compliance value" value={currency(results.noxComplianceValue)} />
                  <div className="mt-2"><LineItem label="PM compliance value" value={currency(results.pmComplianceValue)} /></div>
                  <div className="mt-3 border-t border-slate-300 pt-3"><LineItem label="Total emissions value" value={currency(results.emissionsComplianceValue)} /></div>
                </div>
              </div>
            )}

            {tab === "investment" && (
              <div className="mt-5 space-y-4">
                <Field label="SoA upgrade cost" value={inputs.soaUpgradeCost} onChange={set("soaUpgradeCost")} prefix="$" helper="Incremental premium at rebuild or overhaul." />
                <Field label="Engine life between rebuilds" value={inputs.rebuildInterval} onChange={set("rebuildInterval")} suffix="hrs" helper="Asset-life ROI is calculated over this operating interval." />
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button type="button" className="h-11 rounded-xl border border-slate-200 bg-white font-bold text-slate-700 shadow-sm" onClick={reset}>Reset</button>
                  <button type="button" className="h-11 rounded-xl font-black text-black shadow-sm" style={{ background: BRAND.gold }} onClick={shareSummary}>Share Summary</button>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <ResultCard symbol="$" title="Total value over engine life" value={currency(results.assetLifeValue)} subtitle={`${number(results.assetLifeYears, 1)} years at current utilization`} highlight />
            <ResultCard symbol="×" title="Return over engine life" value={`${number(results.assetLifeRoi, 1)}x`} subtitle="Total asset-life value divided by SoA upgrade cost" />
            <ResultCard symbol="⌁" title="Payback period" value={`${number(results.paybackMonths, 1)} months`} subtitle={`${number(results.paybackYears, 2)} years`} />
            <ResultCard symbol="+" title="Annual economic benefit" value={currency(results.annualBenefit)} subtitle="Fuel, service, labor, emissions, and recovered uptime" />

            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <h2 className="mb-3 text-base font-black">Value Breakdown</h2>
              <div className="space-y-3">
                <LineItem label="Fuel savings" value={currency(results.fuelSavings)} />
                <LineItem label="Oil savings" value={currency(results.oilSavings)} />
                <LineItem label="Labor savings" value={currency(results.laborSavings)} />
                <LineItem label="Recovered uptime value" value={currency(results.recoveredProductionValue)} />
                <LineItem label="Emissions value" value={currency(results.emissionsComplianceValue)} />
              </div>
            </div>

            <button type="button" className="w-full rounded-2xl py-4 text-base font-black text-black shadow-sm" style={{ background: BRAND.gold }}>
              Request Quote
            </button>

            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <p className="text-xs leading-5 text-slate-500">
                This calculator is an estimate for sales discussion purposes. Actual results vary by duty cycle, fuel quality, load factor, maintenance practices, emissions program valuation, and engine condition.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
