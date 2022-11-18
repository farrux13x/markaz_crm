const worker = {
    state:() =>({
        allWorkers:[],
    }),
    getters:{
        allWorkers(state){
            return state.allWorkers
        }
    },
    mutations:{
        allWorkers(state,payload){
            state.allWorkers = payload
        },
        addWorker(state,payload){
            state.allWorkers.push(payload)
        },
        saveWorker(state,payload){
            state.allWorkers = state.allWorkers.map(worker =>{
                if(worker._id === payload._id){
                    return payload
                }
                return worker
            })
        },
        delete(state,payload){
            state.allWorkers = state.allWorkers.filter(worker => {
                if(worker._id === payload) return false
                return worker
            })
        }
    },
    actions:{
        allWorkers(context){
            context.dispatch('getAxios','worker')
            .then(res =>{
                if(res.status === 200){
                    context.commit('allWorkers', res.data)
                }
            })
        },
        createWorker(context,payload){
            context.dispatch('postAxios',{
                url:'worker/create',
                data:payload
            }).then(res =>{
                if(res.status === 200){
                    context.commit('addWorker', res.data)
                }
            })
        },
        editWorker(context,payload){
            return context.dispatch('getAxios',`worker/edit/${payload}`)
        },
        saveWorker(context,payload){
            context.dispatch('postAxios',{
                url:`worker/save/${payload._id}`,
                data:payload
            }).then(res =>{
                if(res.status === 200){
                    context.commit('saveWorker', payload)
                }
            })
        },
        deleteWorker(context,payload){
            context.dispatch('deleteAxios',`worker/delete/${payload}`)
            .then(res =>{
                if(res.status === 200){
                    context.commit('delete', payload)
                }
            })    
        }
    }
}

export default worker