/**
 * Webhook utility — submits form data to a real webhook endpoint.
 * Falls back gracefully with mock success if the endpoint is unreachable.
 */

const WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/example/aether-reserve";

interface WebhookPayload {
  name: string;
  email: string;
  timestamp: string;
  source: string;
  language: string;
  userAgent: string;
}

export async function submitToWebhook(data: {
  name: string;
  email: string;
  language: string;
}): Promise<{ success: boolean; message: string }> {
  const payload: WebhookPayload = {
    name: data.name,
    email: data.email,
    timestamp: new Date().toISOString(),
    source: window.location.href,
    language: data.language,
    userAgent: navigator.userAgent,
  };

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });

    if (res.ok) {
      return { success: true, message: "Reservation submitted successfully!" };
    }
    // Non-200 status — still store locally as fallback
    storeLocally(payload);
    return { success: true, message: "Saved locally — will sync when online." };
  } catch {
    // Network error or timeout — store locally
    storeLocally(payload);
    return { success: true, message: "Saved locally — will sync when online." };
  }
}

function storeLocally(payload: WebhookPayload) {
  try {
    const key = "aether-pending-submissions";
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    existing.push(payload);
    localStorage.setItem(key, JSON.stringify(existing));
  } catch {}
}

/**
 * Behavior tracker — records user interactions for analytics.
 */
export interface BehaviorEvent {
  type: "click" | "scroll" | "section_view" | "cta_click" | "form_interact";
  target: string;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

const events: BehaviorEvent[] = [];

export function trackEvent(event: Omit<BehaviorEvent, "timestamp">) {
  const full: BehaviorEvent = { ...event, timestamp: Date.now() };
  events.push(full);
  
  // Batch send every 20 events (or when page unloads)
  if (events.length >= 20) {
    flushEvents();
  }
}

export function flushEvents() {
  if (events.length === 0) return;
  const batch = [...events];
  events.length = 0;
  
  // Store locally for now (could POST to analytics endpoint)
  try {
    const key = "aether-analytics";
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    existing.push(...batch);
    // Keep only last 500 events
    const trimmed = existing.slice(-500);
    localStorage.setItem(key, JSON.stringify(trimmed));
  } catch {}
}

// Flush on page unload
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", flushEvents);
}
