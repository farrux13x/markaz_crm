<template>
    <div>
        <el-row justify="space-between" class="mb-20">
            <h1>Xodimlar</h1>
            <el-button type="primary" @click="toggle = !toggle,toggleBtn = true,worker={
                name:'',
                phone:'+998 ',
                who:0,
                salary:0
            }">
                <el-icon><Plus/></el-icon>
                Qo'shish
            </el-button>
        </el-row>
        <el-dialog v-model="toggle" width="600px" title="Xodimlar">
            <el-form :model="worker">
                <el-form-item label="Xodim ismi">
                    <el-input v-model="worker.name"/>
                </el-form-item>
                <el-form-item label="Xodim tel raqami">
                    <el-input v-maska="`+### (##) ###-##-##`" v-model="worker.phone"/>
                </el-form-item>
                <el-form-item label="Xodim lavozimi">
                    <el-select v-model="worker.who" placeholder="Select">
                        <el-option
                            v-for="item,index of who"
                            :key="index"
                            :label="item"
                            :value="index"
                            controls-position="right"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="Xodim oyligi">
                    <el-input-number v-model="worker.salary" controls-position="right"></el-input-number>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-show="toggleBtn"
                        @click="add">
                        Create
                    </el-button>
                    <el-button type="primary" v-show="!toggleBtn" @click="change">Change</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-table :data="allWorkers">
            <el-table-column label="Xodim ismi" prop="name" />
            <el-table-column label="Xodim tel raqami" prop="phone" />
            <el-table-column label="narxi" prop="salary">
                <template #default="scope">
                    {{scope.row.salary.toLocaleString()}} so'm
                </template>
            </el-table-column>
            <el-table-column label="Xodim lavozmi" prop="who">
                <template #default="scope">
                    {{who[scope.row.who]}}
                </template>
            </el-table-column>
            s
            <el-table-column align="right">
            <template #header>
                <el-input v-model="search" placeholder="Qidiruv"/>
            </template>
            <template #default="scope">
                <el-button @click="handEdit(scope.row._id)">Edit</el-button>
                <el-button type="danger" @click="handDelete(scope.row._id)">Delete</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>

export default {
    data(){
        return{
            toggle:false,
            toggleBtn:true,
            search:'',
            who:['dasturchi','marketolig'],
            worker:{
                name:'',
                phone:'+998 ',
                who:0,
                salary:0
            }
        }
    },
    methods:{
        add(){
            this.$store.dispatch('createWorker',this.worker)
            console.log(this.worker)
            this.toggle = !this.toggle
            this.worker = {}
        },
        handDelete(id){
            this.$store.dispatch('deleteWorker',id)
            this.allGroups.forEach(element => {
                if(element.worker._id == id){
                    this.$store.dispatch('deleteGroup', element._id)
                }
            });
        },
        handEdit(id){
            this.toggleBtn = false
            this.$store.dispatch('editWorker', id)
            .then(res =>{
                if(res.status === 200){
                    this.worker = res.data
                    this.worker.status = res.data.status.toString()
                    this.toggle = true
                }
            })
        },
        change(){
            this.$store.dispatch("saveWorker",this.worker)
            this.toggle = !this.toggle
            this.worker = {}
        },
    },
    computed:{
        allWorkers(){
            return this.$store.getters.allWorkers
        },
        allGroups(){
            return this.$store.getters.allGroups
        }
    },
    mounted(){
        this.$store.dispatch('active',1)
    }
}
</script>
