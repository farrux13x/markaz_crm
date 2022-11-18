<template>
    <div>
        <el-row justify="space-between" class="mb-20">
            <h1>Chiqimlar</h1>
            <el-button type="primary" @click="toggle=!toggle,toggleBtn = true">
                <el-icon><Plus/></el-icon>
                Qo'shish
            </el-button>
        </el-row>
        <el-dialog v-model="toggle" width="500px">
            <el-form :model="spending">
                <el-form-item label="Chiqim qiymati">
                    <el-input-number v-model="spending.summa" />
                </el-form-item>
                <el-form-item label="Izoh">
                            <el-input :rows="2"             v-model="spending.comment"
                            type="textarea"
                            placeholder="Please input"/>
                </el-form-item>
                <el-form-item>
                    <el-button v-show="toggleBtn" type="primary" @click="add">Create</el-button>
                    <el-button v-show="!toggleBtn" type="primary" @click="change">Change</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-table :data="allSpendings">
            <el-table-column label="summa">
                <template #default="scope">
                    {{scope.row.summa.toLocaleString()}} so'm
                </template>
            </el-table-column>
            <el-table-column label="comment" prop="comment"/>
            <el-table-column align="right">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row._id)">Edit</el-button>
                    <el-button type="danger" size="small" @click="handDelete(scope.row._id)">Delete</el-button>
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
            spending:{
                summa:0,
                comment:''
            }
        }
    },
    methods:{
        add(){
            this.$store.dispatch('createSpending', this.spending)
            this.$store.dispatch('allSpendings')
            this.spending={}
            this.toggle = !this.toggle
        },
        change(){
            this.$store.dispatch("saveSpending",this.spending)
            this.toggle = !this.toggle
            this.spending = {}
        },
        handleEdit(id){
            this.toggleBtn = false
            this.$store.dispatch('editSpending', id)
            .then(res =>{
                if(res.status === 200){
                    this.spending = res.data
                    // this.spending.status = res.data.status.toString()
                    this.toggle = true
                }
            })
        },
        handDelete(id){
            this.$store.dispatch('deleteSpending',id)
        }
    },
    computed:{
        allSpendings(){
            return this.$store.getters.allSpendings
        }
    },
    mounted(){
        this.$store.dispatch('active',5)
    }
}
</script>