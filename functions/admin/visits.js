// functions/admin/visits.js

function checkAdminPassword(context, ADMIN_PASSWORD) {
    const password = context.request.headers.get('X-Admin-Password');
    return password === ADMIN_PASSWORD;
}

export async function onRequestGet(context) {
    try {
        const ADMIN_PASSWORD = context.env.ADMIN_PASSWORD;

        // 校验管理员密码
        if (!checkAdminPassword(context, ADMIN_PASSWORD)) {
            return new Response('Unauthorized', { status: 401 });
        }

        // 查询访问记录
        const { results } = await context.env.DB
            .prepare("SELECT * FROM visits ORDER BY visit_time DESC")
            .all();

        // 返回 JSON
        return new Response(JSON.stringify(results), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "获取访问记录时出错",
                error: error.message
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}