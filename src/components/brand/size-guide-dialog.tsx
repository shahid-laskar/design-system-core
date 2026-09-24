import { useState } from "react";
import { MoveHorizontal, MoveVertical, Ruler, ShieldCheck } from "lucide-react";

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
import { cn } from "@/lib/utils";

type Unit = "in" | "cm";
type Mode = "garment" | "body";
type Category = "women" | "men" | "children";

type SizeGuideDialogProps = {
  defaultCategory?: Category;
};

function formatVal(inches: number, unit: Unit): string {
  return unit === "in" ? `${inches}\u2033` : `${(inches * 2.54).toFixed(1)} cm`;
}

// WOMEN'S DATA
const womenGarmentData = [
  { size: "XS", bust: 34, waist: 30, hip: 36, kurta: 44, pant: 38 },
  { size: "S", bust: 36, waist: 32, hip: 38, kurta: 44, pant: 38 },
  { size: "M", bust: 38, waist: 34, hip: 40, kurta: 44, pant: 38 },
  { size: "L", bust: 40, waist: 36, hip: 42, kurta: 45, pant: 39 },
  { size: "XL", bust: 42, waist: 38, hip: 44, kurta: 45, pant: 39 },
  { size: "XXL", bust: 44, waist: 40, hip: 46, kurta: 46, pant: 40 },
  { size: "3XL", bust: 46, waist: 42, hip: 48, kurta: 46, pant: 40 },
] as const;

const womenBodyData = [
  { size: "XS", bodyBust: "30″ – 31″", bodyWaist: "26″ – 27″", bodyHip: "33″ – 34″", height: "5'0″ – 5'2″", ease: "+3″ to 4″ ease" },
  { size: "S", bodyBust: "32″ – 33″", bodyWaist: "28″ – 29″", bodyHip: "35″ – 36″", height: "5'2″ – 5'4″", ease: "+3″ to 4″ ease" },
  { size: "M", bodyBust: "34″ – 35″", bodyWaist: "30″ – 31″", bodyHip: "37″ – 38″", height: "5'3″ – 5'5″", ease: "+3″ to 4″ ease" },
  { size: "L", bodyBust: "36″ – 37″", bodyWaist: "32″ – 33″", bodyHip: "39″ – 40″", height: "5'4″ – 5'6″", ease: "+3″ to 4″ ease" },
  { size: "XL", bodyBust: "38″ – 39″", bodyWaist: "34″ – 35″", bodyHip: "41″ – 42″", height: "5'5″ – 5'7″", ease: "+3″ to 4″ ease" },
  { size: "XXL", bodyBust: "40″ – 41″", bodyWaist: "36″ – 37″", bodyHip: "43″ – 44″", height: "5'5″ – 5'8″", ease: "+3″ to 4″ ease" },
  { size: "3XL", bodyBust: "42″ – 43″", bodyWaist: "38″ – 39″", bodyHip: "45″ – 46″", height: "5'5″ – 5'8″", ease: "+3″ to 4″ ease" },
] as const;

// MEN'S DATA
const menGarmentData = [
  { size: "S", chest: 38, shoulder: 17.5, kurta: 42, sleeve: 24 },
  { size: "M", chest: 40, shoulder: 18.0, kurta: 42, sleeve: 24.5 },
  { size: "L", chest: 42, shoulder: 18.5, kurta: 43, sleeve: 25 },
  { size: "XL", chest: 44, shoulder: 19.0, kurta: 44, sleeve: 25.5 },
  { size: "XXL", chest: 46, shoulder: 19.5, kurta: 44, sleeve: 26 },
] as const;

const menBodyData = [
  { size: "S", bodyChest: "34″ – 35″", collar: "14.5″", height: "5'5″ – 5'7″", ease: "+4″ comfort ease" },
  { size: "M", bodyChest: "36″ – 37″", collar: "15.0″", height: "5'7″ – 5'9″", ease: "+4″ comfort ease" },
  { size: "L", bodyChest: "38″ – 39″", collar: "15.5″", height: "5'8″ – 5'11″", ease: "+4″ comfort ease" },
  { size: "XL", bodyChest: "40″ – 41″", collar: "16.0″", height: "5'10″ – 6'0″", ease: "+4″ comfort ease" },
  { size: "XXL", bodyChest: "42″ – 43″", collar: "16.5″", height: "5'11″ – 6'2″", ease: "+4″ comfort ease" },
] as const;

// CHILDREN'S DATA
const childrenData = [
  { age: "2–3 Years", heightCm: "92 – 98 cm", chest: 21, kurta: 22, bottom: 19, advice: "Comfortable easy-on fit" },
  { age: "4–5 Years", heightCm: "104 – 110 cm", chest: 23, kurta: 24, bottom: 22, advice: "Room for active movement" },
  { age: "6–7 Years", heightCm: "116 – 122 cm", chest: 25, kurta: 26, bottom: 25, advice: "Standard modest drape" },
  { age: "8–9 Years", heightCm: "128 – 134 cm", chest: 27, kurta: 28, bottom: 28, advice: "Elastic waistband with stay" },
  { age: "10–11 Years", heightCm: "140 – 146 cm", chest: 29, kurta: 31, bottom: 31, advice: "Classic festival fit" },
  { age: "12–13 Years", heightCm: "152 – 158 cm", chest: 31, kurta: 34, bottom: 34, advice: "Teenage transition cut" },
] as const;

const measureSteps = [
  { label: "Bust / Chest", copy: "Measure around the fullest part of your chest, keeping the measuring tape horizontal and relaxed.", icon: MoveHorizontal },
  { label: "Kurta Length", copy: "Measure from the high shoulder point straight down to your desired hemline (knee or below-knee).", icon: MoveVertical },
  { label: "Sleeve Length", copy: "Measure from the outer shoulder seam point down along your arm to the wrist joint for full coverage.", icon: Ruler },
  { label: "Modesty Ease Guideline", copy: "For traditional modest ease, the garment chest should measure 3 to 4 inches larger than your natural body circumference.", icon: ShieldCheck },
] as const;

export function SizeGuideDialog({ defaultCategory = "women" }: SizeGuideDialogProps) {
  const [category, setCategory] = useState<Category>(defaultCategory);
  const [mode, setMode] = useState<Mode>("garment");
  const [unit, setUnit] = useState<Unit>("in");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="min-h-0 text-xs sm:text-sm">
          <Ruler className="size-3.5" /> Size &amp; Fit Guide
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[92vh] max-w-4xl overflow-y-auto p-5 sm:p-8">
        <DialogHeader className="pr-8 text-left">
          <DialogTitle className="font-display text-3xl font-medium">Family Size &amp; Measurement Guide</DialogTitle>
          <DialogDescription>
            Comprehensive garment and body sizing for Women, Men, and Children. Handcrafted garments have a 0.5-inch artisan tolerance.
          </DialogDescription>
        </DialogHeader>

        {/* Category Pillars */}
        <Tabs value={category} onValueChange={(val) => setCategory(val as Category)} className="mt-2">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="women">Women&apos;s Ethnic</TabsTrigger>
            <TabsTrigger value="men">Men&apos;s Apparel</TabsTrigger>
            <TabsTrigger value="children">Children&apos;s Wear</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Mode & Unit Controls Row */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-y border-border py-3">
          {category !== "children" ? (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-foreground">View:</span>
              <div className="inline-flex rounded-sm border border-border bg-muted/40 p-0.5">
                <button
                  type="button"
                  onClick={() => setMode("garment")}
                  className={cn(
                    "rounded-sm px-2.5 py-1 text-xs font-medium transition-colors",
                    mode === "garment" ? "bg-background font-semibold text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Garment Dimensions
                </button>
                <button
                  type="button"
                  onClick={() => setMode("body")}
                  className={cn(
                    "rounded-sm px-2.5 py-1 text-xs font-medium transition-colors",
                    mode === "body" ? "bg-background font-semibold text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Body Size Recommender
                </button>
              </div>
            </div>
          ) : (
            <div className="text-xs text-muted-foreground">
              Sized by child&apos;s age and standard growth height.
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-foreground">Units:</span>
            <div className="inline-flex rounded-sm border border-border bg-muted/40 p-0.5">
              <button
                type="button"
                onClick={() => setUnit("in")}
                className={cn(
                  "rounded-sm px-2.5 py-1 text-xs font-medium transition-colors",
                  unit === "in" ? "bg-background font-semibold text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground",
                )}
              >
                Inches (in)
              </button>
              <button
                type="button"
                onClick={() => setUnit("cm")}
                className={cn(
                  "rounded-sm px-2.5 py-1 text-xs font-medium transition-colors",
                  unit === "cm" ? "bg-background font-semibold text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground",
                )}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Tables Based on Category & Mode */}
        <div className="mt-4">
          {category === "women" && mode === "garment" && (
            <div className="overflow-x-auto rounded-sm border border-border">
              <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
                <caption className="sr-only">Women&apos;s Garment Measurements</caption>
                <thead className="bg-secondary/55 text-xs font-semibold text-foreground">
                  <tr>
                    <th className="px-4 py-3" scope="col">Size</th>
                    <th className="px-4 py-3" scope="col">Kurta Bust</th>
                    <th className="px-4 py-3" scope="col">Waist</th>
                    <th className="px-4 py-3" scope="col">Hip</th>
                    <th className="px-4 py-3" scope="col">Kurta Length</th>
                    <th className="px-4 py-3" scope="col">Pant Length</th>
                  </tr>
                </thead>
                <tbody>
                  {womenGarmentData.map((row) => (
                    <tr key={row.size} className="border-t border-border">
                      <th className="px-4 py-3 font-semibold text-foreground" scope="row">{row.size}</th>
                      <td className="px-4 py-3 text-muted-foreground">{formatVal(row.bust, unit)}</td>
                      <td className="px-4 py-3 text-muted-foreground">{formatVal(row.waist, unit)}</td>
                      <td className="px-4 py-3 text-muted-foreground">{formatVal(row.hip, unit)}</td>
                      <td className="px-4 py-3 text-muted-foreground">{formatVal(row.kurta, unit)}</td>
                      <td className="px-4 py-3 text-muted-foreground">{formatVal(row.pant, unit)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {category === "women" && mode === "body" && (
            <div className="overflow-x-auto rounded-sm border border-border">
              <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
                <caption className="sr-only">Women&apos;s Body Size Recommendations</caption>
                <thead className="bg-secondary/55 text-xs font-semibold text-foreground">
                  <tr>
                    <th className="px-4 py-3" scope="col">Size</th>
                    <th className="px-4 py-3" scope="col">To Fit Natural Bust</th>
                    <th className="px-4 py-3" scope="col">Natural Waist</th>
                    <th className="px-4 py-3" scope="col">Natural Hip</th>
                    <th className="px-4 py-3" scope="col">Recommended Height</th>
                    <th className="px-4 py-3" scope="col">Modest Ease Note</th>
                  </tr>
                </thead>
                <tbody>
                  {womenBodyData.map((row) => (
                    <tr key={row.size} className="border-t border-border">
                      <th className="px-4 py-3 font-semibold text-foreground" scope="row">{row.size}</th>
                      <td className="px-4 py-3 font-medium text-foreground">{row.bodyBust}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.bodyWaist}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.bodyHip}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.height}</td>
                      <td className="px-4 py-3 text-xs text-primary font-medium">{row.ease}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {category === "men" && mode === "garment" && (
            <div className="overflow-x-auto rounded-sm border border-border">
              <table className="w-full min-w-[38rem] border-collapse text-left text-sm">
                <caption className="sr-only">Men&apos;s Garment Measurements</caption>
                <thead className="bg-secondary/55 text-xs font-semibold text-foreground">
                  <tr>
                    <th className="px-4 py-3" scope="col">Size</th>
                    <th className="px-4 py-3" scope="col">Garment Chest</th>
                    <th className="px-4 py-3" scope="col">Across Shoulder</th>
                    <th className="px-4 py-3" scope="col">Kurta Length</th>
                    <th className="px-4 py-3" scope="col">Sleeve Length</th>
                  </tr>
                </thead>
                <tbody>
                  {menGarmentData.map((row) => (
                    <tr key={row.size} className="border-t border-border">
                      <th className="px-4 py-3 font-semibold text-foreground" scope="row">{row.size}</th>
                      <td className="px-4 py-3 text-muted-foreground">{formatVal(row.chest, unit)}</td>
                      <td className="px-4 py-3 text-muted-foreground">{formatVal(row.shoulder, unit)}</td>
                      <td className="px-4 py-3 text-muted-foreground">{formatVal(row.kurta, unit)}</td>
                      <td className="px-4 py-3 text-muted-foreground">{formatVal(row.sleeve, unit)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {category === "men" && mode === "body" && (
            <div className="overflow-x-auto rounded-sm border border-border">
              <table className="w-full min-w-[38rem] border-collapse text-left text-sm">
                <caption className="sr-only">Men&apos;s Body Size Recommendations</caption>
                <thead className="bg-secondary/55 text-xs font-semibold text-foreground">
                  <tr>
                    <th className="px-4 py-3" scope="col">Size</th>
                    <th className="px-4 py-3" scope="col">To Fit Natural Chest</th>
                    <th className="px-4 py-3" scope="col">Collar Size</th>
                    <th className="px-4 py-3" scope="col">Recommended Height</th>
                    <th className="px-4 py-3" scope="col">Fit Ease Note</th>
                  </tr>
                </thead>
                <tbody>
                  {menBodyData.map((row) => (
                    <tr key={row.size} className="border-t border-border">
                      <th className="px-4 py-3 font-semibold text-foreground" scope="row">{row.size}</th>
                      <td className="px-4 py-3 font-medium text-foreground">{row.bodyChest}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.collar}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.height}</td>
                      <td className="px-4 py-3 text-xs text-primary font-medium">{row.ease}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {category === "children" && (
            <div className="overflow-x-auto rounded-sm border border-border">
              <table className="w-full min-w-[38rem] border-collapse text-left text-sm">
                <caption className="sr-only">Children&apos;s Wear Size Chart</caption>
                <thead className="bg-secondary/55 text-xs font-semibold text-foreground">
                  <tr>
                    <th className="px-4 py-3" scope="col">Age Group</th>
                    <th className="px-4 py-3" scope="col">Child Height</th>
                    <th className="px-4 py-3" scope="col">Kurta Chest</th>
                    <th className="px-4 py-3" scope="col">Kurta Length</th>
                    <th className="px-4 py-3" scope="col">Bottom Length</th>
                    <th className="px-4 py-3" scope="col">Growth Fit Advice</th>
                  </tr>
                </thead>
                <tbody>
                  {childrenData.map((row) => (
                    <tr key={row.age} className="border-t border-border">
                      <th className="px-4 py-3 font-semibold text-foreground" scope="row">{row.age}</th>
                      <td className="px-4 py-3 text-muted-foreground">{row.heightCm}</td>
                      <td className="px-4 py-3 text-muted-foreground">{formatVal(row.chest, unit)}</td>
                      <td className="px-4 py-3 text-muted-foreground">{formatVal(row.kurta, unit)}</td>
                      <td className="px-4 py-3 text-muted-foreground">{formatVal(row.bottom, unit)}</td>
                      <td className="px-4 py-3 text-xs text-primary font-medium">{row.advice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Visual Measurement Guidelines */}
        <section className="border-t border-border pt-5" aria-labelledby="measure-title">
          <h3 id="measure-title" className="font-display text-2xl font-medium">How to measure accurately</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {measureSteps.map(({ label, copy, icon: Icon }, index) => (
              <div key={label} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-sm border border-border bg-card p-4">
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

        {/* Modest Ease & Alteration Guarantee Note */}
        <div className="rounded-sm border-l-2 border-primary bg-secondary/45 px-4 py-3 text-xs leading-5 sm:text-sm sm:leading-6">
          <strong className="text-foreground">Modest Fit &amp; Alteration Guarantee:</strong> Sukoon House garments are tailored with a modest comfort ease cut (3 to 4 inches larger than natural body measurements) so you never feel restricted during prayer or daily movement. All kurtas and pants include <strong>2-inch internal seam margins</strong> for easy doorstep local alteration if needed.
        </div>
      </DialogContent>
    </Dialog>
  );
}