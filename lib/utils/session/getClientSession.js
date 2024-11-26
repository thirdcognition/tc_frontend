"use client";

import { createClient } from "../supabase/client";
import UserSession from "./userSession.js";

async function _getSession() {
    const supaClient = globalThis.supaClient || createClient();
    globalThis.supaClient = supaClient;
    const supaSessionResponse =
        globalThis.supaSession && globalThis.supaSession.error == null
            ? globalThis.supaSession
            : await supaClient.auth.getSession();
    globalThis.supaSession = supaSessionResponse;
    const {
        data: { session: session }
    } = supaSessionResponse;

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

let getSessionDef;

export default async function getSession() {
    getSessionDef = getSessionDef || _getSession();
    return getSessionDef;
}
