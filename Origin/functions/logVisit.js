// functions/logVisit.js

export async function onRequestGet(context) {
    try {
        // 获取用户 IP
        const ip = context.request.headers.get('CF-Connecting-IP') || 'unknown';
        console.log('Client IP:', context.request.headers.get('CF-Connecting-IP'));

        // 插入数据库
        await context.env.DB.prepare(
            "INSERT INTO visits (ip) VALUES (?)"
        ).bind(ip).run();

        // 返回成功响应
        return new Response(
            JSON.stringify({
                success: true,
                message: "访问记录已保存",
                ip: ip
            }),
            { headers: { "Content-Type": "application/json" } }
        );

    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "记录访问时出错",
                error: error.message
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}