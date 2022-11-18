<template>
    <div>
        <el-row justify="space-between" class='mb-20'>
        <h1>Yo'nalish</h1>
        <el-button type="primary" @click="toggle = !toggle,toggleBtn = true, form={
                title:'',
                status:''
            }">
            <el-icon><Plus/></el-icon>
            Yangi yo'nalish
        </el-button>
        </el-row>
        <el-dialog v-model="toggle" width="500px" 
            title="Yonalishlar">
            <el-form :model="form" >
                <el-form-item   prop="form.title" label="Yo'nalish nomi">
                    <el-input v-model="form.title" />
                </el-form-item>
                <el-form-item label="Yo'nalish holati">
                    <el-switch active-value="1" inactive-value="0" v-model="form.status" />
                </el-form-item>
                <el-form-item>
                    <el-button @click="add" v-show="toggleBtn" type="primary" >Create</el-button>
                    <el-button v-show="!toggleBtn" type="primary" @click="change">Change</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-table :data="allDirections">
            <el-table-column label="nomi" prop="title" />
            <el-table-column label="vaqti" prop="createdAt">
                <template #default="scope">
                    {{format(scope.row.createdAt)}}
                </template>
            </el-table-column>
            <el-table-column label="o'zgargan vaqti" prop="updatedAt">
                <template #default="scope">
                    {{format(scope.row.updatedAt)}}
                </template>
            </el-table-column>
            <el-table-column label="holati" prop="status" >
                <template #default="scope">
                    {{scope.row.status == 1 ? 'Faol' :'Nofaol'}}
                </template>
            </el-table-column>
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
        {{allGroups}}
    </div>
</template>

<script>
export default {
    data(){
        return{
            search:'',
            toggle:false,
            toggleBtn:true,
            a:{},
            form:{
                title:'',
                status:''
            }
        }
    },
    methods:{
        format(data){
            let forma = new Date(data)
            return `${forma.getFullYear(data)}.${forma.getMonth(data)+1}.${forma.getDay(data)} ${forma.getHours(data)}:${forma.getMinutes(data)}`
        },
        add(){
            this.$store.dispatch('createDirection', this.form)
            this.toggle = !this.toggle
            this.form = {
                title:'',
                status:0
            }
        },
        change(){
            this.$store.dispatch("saveDirection",this.form)
            this.toggle = !this.toggle
            this.form = {
                title:'',
                status:0
            }
        },
        handleDelete(id){
            this.$store.dispatch('deleteDirection', id)
            this.allDirections.forEach(element => {
                if(element.direction._id == id){
                    this.$store.dispatch('deleteGroup', element._id)
                }
            });
            
        },
        handleEdit(id){
            this.toggleBtn = false
            this.$store.dispatch('editDirection', id)
            .then(res =>{
                if(res.status === 200){
                    this.form = res.data
                    this.form.status = res.data.status.toString()
                    this.toggle = true
                }
            })
        }
    },
    computed:{
        allDirections(){
            return this.$store.getters.allDirections
        },
        allGroups(){
            return this.$store.getters.allGroups
        }
    },
    mounted(){
        this.$store.dispatch('active',2)
    }
}
</script>

<style lang="scss">
.el-dialog {
    display: block;
}
</style>