const ADMIN_PASSWORD = context.env.ADMIN_PASSWORD;

// 统一校验管理员密码
function checkAdminPassword(context) {
    const password = context.request.headers.get('X-Admin-Password');
    if (password !== ADMIN_PASSWORD) {
        return false;
    }
    return true;
}

export async function onRequestGet(context) {
    if (!checkAdminPassword(context)) {
        return new Response('Unauthorized', { status: 401 });
    }
    const { results } = await context.env.DB.prepare("SELECT * FROM messages ORDER BY created_at DESC").all();
    return new Response(JSON.stringify(results), {
        headers: { "Content-Type": "application/json" }
    });
}

export async function onRequestPut(context) {
    if (!checkAdminPassword(context)) {
        return new Response('Unauthorized', { status: 401 });
    }
    const { id } = context.params;
    const { message } = await context.request.json();
    if (!message) {
        return new Response('Bad Request', { status: 400 });
    }
    await context.env.DB.prepare("UPDATE messages SET message = ? WHERE id = ?")
        .bind(message, id)
        .run();
    return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" }
    });
}

export async function onRequestDelete(context) {
    if (!checkAdminPassword(context)) {
        return new Response('Unauthorized', { status: 401 });
    }
    const { id } = context.params;
    await context.env.DB.prepare("DELETE FROM messages WHERE id = ?")
        .bind(id)
        .run();
    return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" }
    });
}