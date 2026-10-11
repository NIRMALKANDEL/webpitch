export type Rule =
  | { kind: "required"; message?: string }
  | { kind: "email"; message?: string }
  | { kind: "phone"; message?: string }
  | { kind: "min"; n: number; message?: string }
  | { kind: "max"; n: number; message?: string }
  | { kind: "url"; message?: string }
  | { kind: "pattern"; re: RegExp; message: string }
  | { kind: "checked"; message?: string };

export type Rules<K extends string> = Partial<Record<K, Rule[]>>;
export type Errors<K extends string> = Partial<Record<K, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9\s\-().]{7,20}$/;

export function validate<K extends string>(values: Record<K, string | boolean>, rules: Rules<K>): Errors<K> {
  const errors: Errors<K> = {};
  for (const key of Object.keys(rules) as K[]) {
    const raw = values[key];
    const v = typeof raw === "string" ? raw.trim() : raw;
    for (const r of rules[key] ?? []) {
      let bad = false;
      let msg = "";
      switch (r.kind) {
        case "required":
          bad = v === "" || v === false || v === undefined;
          msg = r.message ?? "This field is required.";
          break;
        case "checked":
          bad = v !== true;
          msg = r.message ?? "Please tick this box to continue.";
          break;
        case "email":
          bad = typeof v === "string" && v !== "" && !EMAIL.test(v);
          msg = r.message ?? "Enter a valid email address, like name@example.com.";
          break;
        case "phone":
          bad = typeof v === "string" && v !== "" && (!PHONE.test(v) || v.replace(/\D/g, "").length < 7);
          msg = r.message ?? "Enter a valid phone number, including the country code.";
          break;
        case "min":
          bad = typeof v === "string" && v !== "" && v.length < r.n;
          msg = r.message ?? `Please enter at least ${r.n} characters.`;
          break;
        case "max":
          bad = typeof v === "string" && v.length > r.n;
          msg = r.message ?? `Please keep this under ${r.n} characters.`;
          break;
        case "url":
          bad = typeof v === "string" && v !== "" && !/^(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/\S*)?$/i.test(v);
          msg = r.message ?? "Enter a valid web address, like example.com.";
          break;
        case "pattern":
          bad = typeof v === "string" && v !== "" && !r.re.test(v);
          msg = r.message;
          break;
      }
      if (bad) {
        errors[key] = msg;
        break;
      }
    }
  }
  return errors;
}

export const hasErrors = (e: object) => Object.keys(e).length > 0;
