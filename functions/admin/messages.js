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

function generateUUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

const token = generateUUID();
export async function onRequestPost(context) {
    const { name, message } = await context.request.json();
    if (!name || !message) {
        return new Response(JSON.stringify({ error: "Name and message required" }), { status: 400 });
    }

    const createdAt = new Date().toISOString();
    const token = generateUUID();// 生成唯一 token

    const { meta } = await context.env.DB.prepare(
        "INSERT INTO messages (name, message, created_at, author_token) VALUES (?, ?, ?, ?)"
    ).bind(name, message, createdAt, token).run();

    return new Response(JSON.stringify({ success: true, token, id: meta.last_row_id }), {
        headers: { "Content-Type": "application/json" }
    });
}