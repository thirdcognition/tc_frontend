import "server-only";
import { createClient } from "../supabase/server";
import UserSession from "./userSession.js";

export default async function getSession() {
    const supaClient = await createClient();
    const {
        data: { session: session }
    } = await supaClient.auth.getSession();

    if (session && "access_token" in session) {
        globalThis.userSessions = globalThis.userSessions || {};
        const userSession =
            globalThis.userSessions[session.access_token] ||
            new UserSession(supaClient, session);

        globalThis.userSessions[session.access_token] = userSession;

        await userSession.initDefer;

        return userSession;
    }
    return new UserSession(supaClient);
}
