export async function onRequestGet(context) {
    const { results } = await context.env.DB.prepare("SELECT * FROM messages ORDER BY id DESC").all();
    return new Response(JSON.stringify(results), {
        headers: { "Content-Type": "application/json" }
    });
}

export async function onRequestPost(context) {
    const { name, message } = await context.request.json();
    if (!name || !message) {
        return new Response(JSON.stringify({ error: "Name and message required" }), { status: 400 });
    }
    await context.env.DB.prepare(
        "INSERT INTO messages (name, message, created_at) VALUES (?, ?, ?)"
    ).bind(name, message, new Date().toISOString()).run();

    return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" }
    });
}