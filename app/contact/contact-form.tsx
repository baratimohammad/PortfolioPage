"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import {
  initialContactFormState,
  sendContact,
  type ContactFieldErrors,
  type ContactFormState,
} from "./actions";

type ClientErrors = ContactFieldErrors;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-subtle transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
      disabled={pending}
    >
      {pending ? "Sending..." : "Send message"}
    </button>
  );
}

const clientValidate = (formData: FormData): ClientErrors => {
  const errors: ClientErrors = {};
  const name = (formData.get("name") ?? "").toString().trim();
  const email = (formData.get("email") ?? "").toString().trim();
  const message = (formData.get("message") ?? "").toString().trim();
  const budget = (formData.get("budget") ?? "").toString().trim();

  if (name.length < 2) {
    errors.name = "Share at least 2 characters.";
  }

  const emailRegex =
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailRegex.test(email)) {
    errors.email = "Use a valid email address.";
  }

  if (message.length < 20) {
    errors.message = "Please add at least 20 characters of context.";
  }

  if (budget.length > 120) {
    errors.budget = "Keep this under 120 characters.";
  }

  return errors;
};

export function ContactForm() {
  const [state, formAction] = useFormState<ContactFormState, FormData>(
    sendContact,
    initialContactFormState,
  );
  const [clientErrors, setClientErrors] = useState<ClientErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const errors = clientValidate(formData);
    if (Object.keys(errors).length > 0) {
      event.preventDefault();
      setClientErrors(errors);
    } else {
      setClientErrors({});
    }
  };

  const fieldError = useMemo(
    () => ({
      name: clientErrors.name ?? state.fieldErrors?.name,
      email: clientErrors.email ?? state.fieldErrors?.email,
      message: clientErrors.message ?? state.fieldErrors?.message,
      budget: clientErrors.budget ?? state.fieldErrors?.budget,
    }),
    [clientErrors, state.fieldErrors],
  );

  type FieldName = "name" | "email" | "message" | "budget";
  const getDescribedBy = (field: FieldName) => {
    const ids: string[] = [];
    if (fieldError[field]) {
      ids.push(`${field}-error`);
    }
    if (field === "budget") {
      ids.push("budget-help");
    }
    if (field === "message") {
      ids.push("message-help");
    }
    return ids.length ? ids.join(" ") : undefined;
  };

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6"
    >
      {state.status === "success" && state.message ? (
        <div
          className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-600"
          role="status"
          aria-live="polite"
        >
          {state.message}
        </div>
      ) : null}
      {state.status === "error" && state.message ? (
        <div
          className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-600"
          role="alert"
          aria-live="assertive"
        >
          {state.message}
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-foreground">
          Full name
          <input
            type="text"
            name="name"
            required
            minLength={2}
            maxLength={80}
            placeholder="Max Barati"
            className="w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/50"
            aria-invalid={Boolean(fieldError.name)}
            aria-describedby={getDescribedBy("name")}
          />
          {fieldError.name ? (
            <p id="name-error" className="text-xs text-red-500">
              {fieldError.name}
            </p>
          ) : null}
        </label>

        <label className="space-y-2 text-sm font-medium text-foreground">
          Email
          <input
            type="email"
            name="email"
            required
            placeholder="maximobarati@gmail.com"
            className="w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/50"
            aria-invalid={Boolean(fieldError.email)}
            aria-describedby={getDescribedBy("email")}
          />
          {fieldError.email ? (
            <p id="email-error" className="text-xs text-red-500">
              {fieldError.email}
            </p>
          ) : null}
        </label>
      </div>

      {/* <label className="space-y-2 text-sm font-medium text-foreground">
        Project budget (optional)
        <input
          type="text"
          name="budget"
          placeholder="e.g. $25–40k or TBD"
          maxLength={120}
          className="w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/50"
          aria-invalid={Boolean(fieldError.budget)}
          aria-describedby={getDescribedBy("budget")}
        />
        {fieldError.budget ? (
          <p id="budget-error" className="text-xs text-red-500">
            {fieldError.budget}
          </p>
        ) : null}
        <p id="budget-help" className="text-xs text-muted-foreground">
          Helps me scope timelines faster but fully optional.
        </p>
      </label> */}

      <label className="space-y-2 text-sm font-medium text-foreground">
        Message
        <textarea
          name="message"
          required
          minLength={20}
          maxLength={1000}
          rows={6}
          placeholder="How can I help? Give me the details you think matter."
          className="w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/50"
          aria-invalid={Boolean(fieldError.message)}
          aria-describedby={getDescribedBy("message")}
        />
        {fieldError.message ? (
          <p id="message-error" className="text-xs text-red-500">
            {fieldError.message}
          </p>
        ) : null}
        <p id="message-help" className="text-xs text-muted-foreground">
          What problem are we solving? Who&apos;s involved? When do you need value in
          production?
        </p>
      </label>

      <div className="hidden" aria-hidden>
        <label htmlFor="company">Company</label>
        <input
          id="company"
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <SubmitButton />
    </form>
  );
}
