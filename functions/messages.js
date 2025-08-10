export async function onRequestGet(context) {
    const url = new URL(context.request.url);
    const since = url.searchParams.get("since") || "1970-01-01T00:00:00Z";
    const start = Date.now();
    let results = [];

    while (Date.now() - start < 15000) { // 最多等待 15 秒
        const { results: msgs } = await context.env.DB
            .prepare("SELECT * FROM messages WHERE created_at > ? ORDER BY created_at DESC")
            .bind(since)
            .all();

        if (msgs.length > 0) {
            results = msgs;
            break;
        }

        await new Promise(r => setTimeout(r, 2000)); // 每2秒检查一次
    }

    return new Response(JSON.stringify(results), {
        headers: { "Content-Type": "application/json" }
    });
}

export async function onRequestPost(context) {
    const { name, message } = await context.request.json();
    if (!name || !message) {
        return new Response(JSON.stringify({ error: "Name and message required" }), { status: 400 });
    }
    const createdAt = new Date().toISOString();
    await context.env.DB.prepare(
        "INSERT INTO messages (name, message, created_at) VALUES (?, ?, ?)"
    ).bind(name, message, createdAt).run();

    return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" }
    });
}