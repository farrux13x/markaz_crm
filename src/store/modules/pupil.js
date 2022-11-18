// import axios from "axios"

const pupil = {
    state:() =>({
        allPupils:[],
        pupil:{}
    }),
    getters:{
        allPupils(state){
            return state.allPupils
        },
        pupil(state){
            return state.pupil
        }
    },
    mutations:{
        allPupils(state,payload){
            state.allPupils = payload
        },
        pupil(state,payload){
            state.pupil = payload
        },
        addPupil(state,payload){
            state.allPupils.push(payload)
        },
        savePupil(state,payload){
            state.allPupils = state.allPupils.map(pupil =>{
                if(pupil._id === payload._id){
                    return payload
                }
                return pupil
            })
        },
        deletePupil(state,payload){
            state.allPupils = state.allPupils.filter(pupil => {
                if(pupil._id === payload) return false
                return pupil
            })
        }
    },
    actions:{
        allPupils(context){
            context.dispatch('getAxios','pupil')
            .then(res =>{
                if(res.status === 200){
                    context.commit('allPupils', res.data)
                }
            })
        },
        createPupil(context,payload){
            context.dispatch('postAxios',{
                url:'pupil/create',
                data:payload
            }).then(res =>{
                if(res.status === 200){
                    context.commit('addPupil', res.data)
                }
            })
        },
        editPupil(context,payload){
            return context.dispatch('getAxios',`pupil/edit/${payload}`)
        },
        savePupil(context,payload){
            context.dispatch('postAxios',{
                url:`pupil/save/${payload._id}`,
                data:payload
            }).then(res =>{
                if(res.status === 200){
                    context.commit('savePupil', payload)
                }
            })
        },
        deletePupil(context,payload){
            context.dispatch('deleteAxios',`pupil/delete/${payload}`)
            .then(res =>{
                if(res.status === 200){
                    context.commit('deletePupil', payload)
                }
            })    
        }
    }
}

export default pupil