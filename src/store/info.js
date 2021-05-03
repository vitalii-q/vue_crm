import firebase from "firebase/app";

export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info) {
            state.info = info // изменяем state
        },
        clearInfo(state) {
            state.info = {}
        }
    },
    actions: {
        async updateInfo({dispatch, commit, getters}, toUpdate) {
            try {
                const uid = await dispatch('getUid') // получаем текущего пользователя
                const updateDate = {...getters.info, ...toUpdate} // ... оператор спрэд
                await firebase.database().ref(`/users/${uid}/info`).update(updateDate)
                commit('setInfo', updateDate)
            } catch (e) {
                console.log(e)
                commit('setError', e)
                throw e
            }
        },
        async fetchInfo({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid') // получаем текущего пользователя
                const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val() // получаем инфо текущего юзера
                commit('setInfo', info)
            } catch (e) {
                //console.log(e)
            }
        }
    },
    getters: {
        info: s => s.info
    }
}
