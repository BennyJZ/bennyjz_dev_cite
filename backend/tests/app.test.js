import assert from "node:assert/strict";
import { once } from "node:events";
import { test } from "node:test";

process.env.SESSION_SECRET = "test-only-session-secret";
process.env.FRONTEND = "http://localhost:5173";
const { default: app } = await import("../app.js");

test("HTTP routes respond without requiring database access", async (t) => {
    const server = app.listen(0, "127.0.0.1");
    t.after(() => new Promise((resolve, reject) => {
        server.close(error => error ? reject(error) : resolve());
        server.closeAllConnections();
    }));
    await once(server, "listening");
    const base = `http://127.0.0.1:${server.address().port}`;

    const ping = await fetch(`${base}/ping`);
    assert.equal(await ping.text(), "pong");

    const auth = await fetch(`${base}/authCheck`, {
        headers: { Origin: process.env.FRONTEND }
    });
    assert.deepEqual(await auth.json(), { authenticated: false });
    assert.equal(auth.headers.get("access-control-allow-origin"), process.env.FRONTEND);
    assert.equal(auth.headers.get("access-control-allow-credentials"), "true");

    for (const path of ["/api/missing", "/auth/missing"]) {
        const res = await fetch(`${base}${path}`);
        assert.equal(res.status, 404);
        assert.deepEqual(await res.json(), { error: "Route not found" });
    }

    const update = await fetch(`${base}/auth/updateuser`, { method: "POST" });
    assert.equal(update.status, 401);

    const comment = await fetch(`${base}/api/projects/addcomment`, { method: "POST" });
    assert.equal(comment.status, 501);
    assert.deepEqual(await comment.json(), { error: "Comments are not implemented yet" });
});
