// 统一校验管理员密码
function checkAdminPassword(context, ADMIN_PASSWORD) {
    const password = context.request.headers.get('X-Admin-Password');
    if (password !== ADMIN_PASSWORD) {
        return false;
    }
    return true;
}

export async function onRequestGet(context) {
    const ADMIN_PASSWORD = context.env.ADMIN_PASSWORD;
    if (!checkAdminPassword(context, ADMIN_PASSWORD)) {
        return new Response('Unauthorized', { status: 401 });
    }
    const { results } = await context.env.DB.prepare("SELECT * FROM messages ORDER BY created_at DESC").all();
    return new Response(JSON.stringify(results), {
        headers: { "Content-Type": "application/json" }
    });
}

export async function onRequestPut(context) {
    const ADMIN_PASSWORD = context.env.ADMIN_PASSWORD;
    if (!checkAdminPassword(context, ADMIN_PASSWORD)) {
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
    const ADMIN_PASSWORD = context.env.ADMIN_PASSWORD;
    const adminPassword = context.request.headers.get('X-Admin-Password');
    const { id } = context.params;
    // If admin password is provided and correct, allow delete
    if (adminPassword) {
        if (adminPassword !== ADMIN_PASSWORD) {
            return new Response(JSON.stringify({ success: false, message: "Invalid admin password." }), {
                status: 401,
                headers: { "Content-Type": "application/json" }
            });
        }
        await context.env.DB.prepare("DELETE FROM messages WHERE id = ?")
            .bind(id)
            .run();
        return new Response(JSON.stringify({ success: true, message: "Message deleted by admin." }), {
            headers: { "Content-Type": "application/json" }
        });
    }

    // If no admin password, check author_token in request body
    let token;
    try {
        const body = await context.request.json();
        token = body.token;
    } catch (e) {
        return new Response(JSON.stringify({ success: false, message: "Missing or invalid request body." }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }

    if (!token) {
        return new Response(JSON.stringify({ success: false, message: "Missing token." }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }
    // Get author_token from DB for this message
    const { results } = await context.env.DB.prepare("SELECT author_token FROM messages WHERE id = ?")
        .bind(id)
        .all();
    if (!results || results.length === 0) {
        return new Response(JSON.stringify({ success: false, message: "Message not found." }), {
            status: 404,
            headers: { "Content-Type": "application/json" }
        });
    }
    const author_token = results[0].author_token;
    if (token !== author_token) {
        return new Response(JSON.stringify({ success: false, message: "Invalid author token." }), {
            status: 403,
            headers: { "Content-Type": "application/json" }
        });
    }
    // Token matches, allow delete
    await context.env.DB.prepare("DELETE FROM messages WHERE id = ?")
        .bind(id)
        .run();
    return new Response(JSON.stringify({ success: true, message: "Message deleted by author." }), {
        headers: { "Content-Type": "application/json" }
    });
}