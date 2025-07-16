// store/session.js
import moment from "moment";

const STORAGE_KEY = "session";

function getSessionFromStorage() {
    try {
        const val = sessionStorage.getItem(STORAGE_KEY);
        if (val) return JSON.parse(decodeURIComponent(atob(val)));
    } catch (e) {
        console.error("세션 불러오기 실패", e);
    }
    return null;
}

function saveSessionToStorage(session) {
    try {
        sessionStorage.setItem(STORAGE_KEY, btoa(encodeURIComponent(JSON.stringify(session))));
    } catch (e) {
        console.error("세션 저장 실패", e);
    }
}

export default {
    namespaced: true,
    state: {
        session: getSessionFromStorage(),
    },
    getters: {
        getUser: state => state.session?.user || null,
        getMenuList: state => state.session?.menuList || [],
        tokenRemainingSeconds: state => {
            const expire = state.session?.token?.accessTokenExpireDate;
            if (!expire) return 0;
                return moment(expire).diff(moment(), "seconds");
        },
    },
    mutations: {
        setSession(state, session) {
            state.session = session;
            saveSessionToStorage(session);
        },
        removeSession(state) {
            state.session = null;
            sessionStorage.removeItem(STORAGE_KEY);
        },
    },
    actions: {
        saveSession({ commit }, session) {
            // 토큰 만료시간 계산
            const seconds = session?.token?.accessTokenExpireSeconds || 0;
            const expireDate = moment().add(seconds, "seconds").toISOString();
            session.token.accessTokenExpireDate = expireDate;
            commit("setSession", session);
        },
        clearSession({ commit }) {
            commit("removeSession");
        },
    },
};