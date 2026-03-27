/**
 * Envoi automatique vers Make.com dès qu'un formulaire est soumis.
 * Make.com se charge ensuite de créer l'item dans Monday CRM.
 *
 * Variables d'environnement requises :
 *   MAKE_WEBHOOK_URL  — URL du webhook Make.com (ex: https://hook.eu2.make.com/xxxx)
 *
 * Pour configurer côté Make.com :
 *   1. Créer un scénario avec déclencheur "Custom Webhook"
 *   2. Copier l'URL et la coller dans MAKE_WEBHOOK_URL
 *   3. Ajouter une action "Monday.com — Create an Item" et mapper les champs
 */

export type CrmPayload =
  | { type: "SIMULATEUR"; data: Record<string, unknown> }
  | { type: "CONTACT"; data: Record<string, unknown> }
  | { type: "WAITLIST"; data: Record<string, unknown> };

export async function pushToCrm(payload: CrmPayload): Promise<void> {
  const webhookUrl = process.env.MAKE_WEBHOOK_URL;
  if (!webhookUrl) return; // Silently skip if not configured

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "ledxenergie.com",
        type: payload.type,
        timestamp: new Date().toISOString(),
        ...payload.data,
      }),
      signal: AbortSignal.timeout(5000),
    });
  } catch (err) {
    // Non-blocking: log but don't fail the main request
    console.error("[CRM Webhook] Failed to push to Make.com:", err);
  }
}
