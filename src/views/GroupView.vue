<template>
    <div>
        <el-row justify="space-between" class="mb-20">
            <h1>Guruh</h1>
            <el-button type="primary" @click="toggle = !toggle,toggleBtn = true,group={}">
                <el-icon><Plus/></el-icon>
                Yangi guruh
            </el-button>
        </el-row>
        <el-dialog v-model="toggle" width="500px" title="Guruh">
            <el-form :model="group">
                <el-form-item label="Guruh nomi">
                    <el-input v-model="group.title" />
                </el-form-item>
                <el-form-item label="Gurh yo'nalishi">
                    <el-select v-model="group.direction" placeholder="Select">
                        <el-option v-for="item of directiona" 
                        :key="item._id"
                        :label="item.title"
                        :value="item._id"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="Guruh xodimi">
                    <el-select v-model="group.worker" placeholder="Select">
                        <el-option v-for="item of allWorkers"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id"/>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input-number v-model="group.price"/>
                </el-form-item>
                <el-form-item>
                    <el-button v-show="toggleBtn" @click="add" type="primary">Saqlash</el-button>
                    <el-button v-show="!toggleBtn" type="primary" @click="change">Change</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        
        <el-table :data="allGroups">
            <el-table-column label="nomi" prop="title"/>
            <el-table-column label="narxi" prop="price">
                <template #default="scope">
                    {{scope.row.price.toLocaleString()}} so'm
                </template>
            </el-table-column>
            <el-table-column label="yo'nalish" prop="direction.title" />
            <el-table-column label="ustoz" prop="worker.name" />
            <el-table-column align="right">
            <template #header>
                <el-input v-model="search" size="small" placeholder="Type to search" />
            </template>
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.row._id)"
                    >Edit
                </el-button
                >
                <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.row._id)"
                    >Delete
                </el-button
                >
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default{
    data(){
        return{
            search:"",
            toggleBtn:true,
            toggle:false,
            who:['dasturchi','marketolig'],
            group:{
                title:'',
                direction:'',
                worker:'',
                price:0
            }
        }
    },
    computed:{
        allWorkers(){
            return this.$store.getters.allWorkers.filter(worker => {
                if(worker.who !== 0) return false
                return worker
            })
        },
        directiona(){
            return this.$store.getters.allDirections
        },
        allGroups(){
            return this.$store.getters.allGroups
        },
        allPupils(){
            return this.$store.getters.allPupils
        }
    },
    methods:{
        add(){
            this.$store.dispatch('createGroup',this.group)
            this.toggle = !this.toggle
            this.group = {}
        },
        change(){
            this.$store.dispatch("saveGroup",this.group)
            this.toggle = !this.toggle
            this.group = {
                title:'',
                direction:'',
                worker:'',
                price:0
            }
        },
        handleDelete(id){
            this.$store.dispatch('deleteGroup',id)
            this.allPupils.forEach(element => {
                if(element.group._id == id){
                    this.$store.dispatch('deletePupil', element._id)
                }
            });
        },
        handleEdit(id){
            this.toggleBtn = false
            this.$store.dispatch('editGroup', id)
            .then(res =>{
                if(res.status === 200){
                    this.group = res.data
                    this.group.status = res.data.status.toString()
                    this.toggle = true
                }
            })
        }
    },
    mounted(){
        this.$store.dispatch('active',4)
    }

}
</script>