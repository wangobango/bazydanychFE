import ApiClient from '../api/ApiClient';

export const AUTHORIZED_USER = 'auth_user';

export const UserStore = {
    namespaced: true,
    state: {
        authorizedUser: null,        
    },

    mutations: {
        setAuthorizedUser(state, response) {
            state.authorizedUser = response;
        },
    },

    actions: {
        isAuthorized({commit, state}) {
            return state.authorizedUser != null;
        },

        async signin({commit, state}, request) {
            let response = await ApiClient.signin(request);
            this.dispatch('emit', {key: AUTHORIZED_USER, message: response.user})
            commit('setAuthorizedUser', response.user);
        },

        async signout({commit, state}) {
            await ApiClient.signout();
            commit('setAuthorizedUser', null);
            this.dispatch('emit', {key: AUTHORIZED_USER, message: null})
        },

        setUser({commit}, user) {
            commit('setAuthorizedUser', user);
            this.dispatch('emit', {key: AUTHORIZED_USER, message: user})
        },

    },

}
