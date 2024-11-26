import { User as UserModel } from "@/lib_js/models/user.js";

class UserSession {
    supabase;
    supaUser = null;
    session = null;
    userModel = null;
    initDefer;

    constructor(client, session) {
        this.supabase = client;
        this.session = session;
        this.initDefer = this.initialize();
    }

    async initialize() {
        let supaUser = this.session?.user;
        if (!supaUser) {
            ({
                data: { user: supaUser }
            } = await this.supabase.auth.getUser());
        }

        if (supaUser) {
            this.supaUser = supaUser;
            this.userModel = new UserModel(this.supabase, supaUser.id);
            await this.userModel.initialize();
        }
    }

    getUser() {
        return this.userModel;
    }
}

export default UserSession;
