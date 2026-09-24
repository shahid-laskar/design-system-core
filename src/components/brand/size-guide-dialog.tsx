import { MoveHorizontal, MoveVertical, Ruler } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const measurements = [
  { size: "S", bust: 36, waist: 32, hip: 38, kurta: 44, pant: 38 },
  { size: "M", bust: 38, waist: 34, hip: 40, kurta: 44, pant: 38 },
  { size: "L", bust: 40, waist: 36, hip: 42, kurta: 45, pant: 39 },
  { size: "XL", bust: 42, waist: 38, hip: 44, kurta: 45, pant: 39 },
  { size: "XXL", bust: 44, waist: 40, hip: 46, kurta: 46, pant: 40 },
] as const;

type Unit = "in" | "cm";

function formatMeasurement(value: number, unit: Unit) {
  return unit === "in" ? `${value}\u2033` : `${(value * 2.54).toFixed(1)} cm`;
}

function MeasurementTable({ unit }: { unit: Unit }) {
  return (
    <div className="overflow-x-auto rounded-sm border border-border">
      <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
        <caption className="sr-only">
          Women&apos;s salwar suit and kurta measurements in {unit === "in" ? "inches" : "centimeters"}
        </caption>
        <thead className="bg-secondary/55 text-xs font-semibold text-foreground">
          <tr>
            <th className="px-4 py-3" scope="col">Size</th>
            <th className="px-4 py-3" scope="col">Bust</th>
            <th className="px-4 py-3" scope="col">Waist</th>
            <th className="px-4 py-3" scope="col">Hip</th>
            <th className="px-4 py-3" scope="col">Kurta length</th>
            <th className="px-4 py-3" scope="col">Pant length</th>
          </tr>
        </thead>
        <tbody>
          {measurements.map((row) => (
            <tr key={row.size} className="border-t border-border">
              <th className="px-4 py-3 font-semibold" scope="row">{row.size}</th>
              <td className="px-4 py-3 text-muted-foreground">{formatMeasurement(row.bust, unit)}</td>
              <td className="px-4 py-3 text-muted-foreground">{formatMeasurement(row.waist, unit)}</td>
              <td className="px-4 py-3 text-muted-foreground">{formatMeasurement(row.hip, unit)}</td>
              <td className="px-4 py-3 text-muted-foreground">{formatMeasurement(row.kurta, unit)}</td>
              <td className="px-4 py-3 text-muted-foreground">{formatMeasurement(row.pant, unit)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const measureSteps = [
  { label: "Bust", copy: "Measure around the fullest part, keeping the tape level.", icon: MoveHorizontal },
  { label: "Waist", copy: "Measure around your natural waist without pulling tight.", icon: MoveHorizontal },
  { label: "Length", copy: "Measure from the high shoulder point to the kurta hem.", icon: MoveVertical },
  { label: "Sleeve", copy: "Measure from the shoulder seam to your preferred cuff.", icon: Ruler },
] as const;

export function SizeGuideDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="min-h-0 text-xs sm:text-sm">
          <Ruler /> Size &amp; Fit Guide
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[92vh] max-w-4xl overflow-y-auto p-5 sm:p-8">
        <DialogHeader className="pr-8 text-left">
          <DialogTitle className="font-display text-3xl font-medium">Size &amp; Measurement Guide</DialogTitle>
          <DialogDescription>
            Women&apos;s salwar suits and kurtas. Garment measurements may vary by up to half an inch.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="inches" className="mt-2">
          <TabsList className="grid w-full grid-cols-2 sm:w-72">
            <TabsTrigger value="inches">Inches</TabsTrigger>
            <TabsTrigger value="centimeters">Centimeters</TabsTrigger>
          </TabsList>
          <TabsContent value="inches" className="mt-4">
            <MeasurementTable unit="in" />
          </TabsContent>
          <TabsContent value="centimeters" className="mt-4">
            <MeasurementTable unit="cm" />
          </TabsContent>
        </Tabs>

        <section className="border-t border-border pt-5" aria-labelledby="measure-title">
          <h3 id="measure-title" className="font-display text-2xl">How to measure</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {measureSteps.map(({ label, copy, icon: Icon }, index) => (
              <div key={label} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 border border-border bg-card p-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{index + 1}. {label}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="border-l-2 border-primary bg-secondary/45 px-4 py-3 text-sm leading-6">
          <strong>Fit note:</strong> Regular comfortable fit. If you prefer a relaxed fit, we suggest
          ordering one size up. Includes 1.5-inch inner alteration margin.
        </div>
      </DialogContent>
    </Dialog>
  );
}