import firebase from "firebase/app"

export default {
    actions: {
        async fetchCategories({commit, dispatch}) { // получаем категории
            try {
                const uid = await dispatch('getUid') // id пользователя
                const cats = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {} // объект категорий

                /*const categories = []
                Object.keys(cats).forEach(key => { // преобразование объекта в массив
                    categories.push({
                        title: cats[key].title,
                        limit: cats[key].limit,
                        id: key
                    })
                })
                return categories*/

                return Object.keys(cats).map(key => ({...cats[key], id: key})) // преобразование объекта в массив
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateCategory({commit, dispatch}, {title, limit, id}) {
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit}) // обновление записи в бд
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async createCategory({commit, dispatch}, {title, limit}) {
            try {
                const uid = await dispatch('getUid')
                const category = await firebase.database().ref(`/users/${uid}/categories`).push({title, limit}) // запись в бд
                return {title, limit, id:category.key}
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}
