export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const leadName =
    typeof body?.lead_name === "string" ? body.lead_name.trim() : "";
  const leadEmail =
    typeof body?.lead_email === "string" ? body.lead_email.trim() : "";
  const leadMessage =
    typeof body?.lead_message === "string" ? body.lead_message.trim() : "";
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!leadName || !emailPattern.test(leadEmail) || !leadMessage) {
    return Response.json(
      { error: "Please provide a name, valid email address, and message." },
      { status: 400 },
    );
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL?.trim();

  if (!webhookUrl) {
    return Response.json(
      { error: "Lead processing is temporarily unavailable." },
      { status: 503 },
    );
  }

  const leadId = crypto.randomUUID();
  const leadSource =
    typeof body.lead_source === "string" && body.lead_source.trim()
      ? body.lead_source.trim()
      : "website";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lead_id: leadId,
        lead_name: leadName,
        lead_email: leadEmail,
        lead_message: leadMessage,
        lead_source: leadSource,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      return Response.json(
        { error: "Lead processing failed. Please try again later." },
        { status: 502 },
      );
    }

    return Response.json({ success: true, lead_id: leadId });
  } catch {
    if (controller.signal.aborted) {
      return Response.json(
        { error: "Lead processing timed out. Please try again later." },
        { status: 504 },
      );
    }

    return Response.json(
      { error: "Unable to process your lead. Please try again later." },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
