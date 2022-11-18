const spending = {
    state:()=>({
        allSpendings:[],
        spending:{}
    }),
    getters:{
        allSpendings(state){
            return state.allSpendings
        },
        spending(state){
            return state.spending
        }
    },
    mutations:{
        allSpendings(state,paylaod){
            state.allSpendings = paylaod
        },
        spending(state,payload){
            state.spending = payload
        },
        addSpending(state,payload){
            state.allSpendings.push(payload)
        },
        saveSpending(state,payload){
            state.allSpendings = state.allSpendings.map(spending =>{
                if(spending._id === payload._id){
                    return payload
                }
                return spending
            })
        },
        delete(state,payload){
            state.allSpendings = state.allSpendings.filter(spending => {
                if(spending._id === payload) return false
                return spending
            })
        }
    },
    actions:{
        allSpendings(context){
            context.dispatch('getAxios','spending')
            .then(res =>{
                if(res.status === 200){
                    context.commit('allSpendings',res.data)
                }
            })
        },
        createSpending(context,payload){
            context.dispatch('postAxios',{
                url:'spending/create',
                data:payload
            }).then(res =>{
                if(res.status === 200){
                    context.commit('addSpending',res.data)
                }
            })
        },
        editSpending(context,payload){
            return context.dispatch('getAxios',`spending/edit/${payload}`)
        },
        saveSpending(context,payload){
            context.dispatch('postAxios',{
                url:`spending/save/${payload._id}`,
                data:payload
            }).then(res =>{
                if(res.status === 200){
                    context.commit('saveSpending', payload)
                }
            })
        },
        deleteSpending(context,payload){
            context.dispatch('deleteAxios',`spending/delete/${payload}`)
            .then(res =>{
                if(res.status === 200){
                    context.commit('delete', payload)
                }
            })    
        }
    }
}
export default spending