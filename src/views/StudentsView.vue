<template>
    <div>
        <el-row justify="space-between" class="mb-20">
            <h1>O'quvchilar</h1>
            <el-button type="primary" @click="toggle=!toggle ,toggleBtn = true,pupil={phone:'+998 '}">
                <el-icon><Plus/></el-icon>
                Yangi o'quvchi
            </el-button>
        </el-row>
        <el-dialog v-model="toggle" width="500px" title="O'quchilar">
            <el-form :model="pupil">
                <el-form-item label="O'quvchi ismi:">
                    <el-input v-model="pupil.name"/>
            </el-form-item>
            <el-form-item label="O'quvchi tel raqami:">
                <el-input v-maska="`+### (##) ###-##-##`" v-model="pupil.phone"/>
            </el-form-item>
            <el-form-item label="O'quvchi guruhi:">
                    <el-select v-model="pupil.group" placeholder="Select">
                        <el-option v-for="item of allGroups"
                        :key="item._id"
                        :label="item.title"
                        :value="item._id"/>
                    </el-select>
                </el-form-item>
            <el-form-item>
                <el-button v-show="toggleBtn" type="primary" @click="add">Create</el-button>
                <el-button v-show="!toggleBtn" type="primary" @click="change">Change</el-button>
            </el-form-item>
            </el-form>
        </el-dialog>
        <el-table :data="allPupils" height="481">
            <el-table-column label="O'quvchi ismi" prop="name" />
            <el-table-column label="O'quvchi tel raqami" prop="phone" />
            <el-table-column label="O'quvchi guruhi" prop="group.title" />
                <!-- <template #default="scope">
                    <div v-for="item of allGroups" :key="item._id">
                        {{scope.row.group == item._id?item.title:scope.row.group.title}}
                    </div>
                </template>
            </el-table-column> -->
            <el-table-column align="right">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row._id)"
                    >Edit
                </el-button
                >
                    <el-button size="small" type="danger" @click="handDelete(scope.row._id)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default{
    data(){
        return{
            toggle:false,
            toggleBtn:true,
            pupil:{
                name:'',
                phone:'+998 ',
                group:''
            }
        }
    },
    methods:{
        add(){
            this.$store.dispatch("createPupil", this.pupil);
            this.toggle = !this.toggle
            this.pupil={}
        },
        change(){
            this.$store.dispatch("savePupil",this.pupil)
            this.toggle = !this.toggle
            this.pupil = {
                name:'',
                phone:'',
                group:''
            }
        },
        handDelete(id){
            this.$store.dispatch('deletePupil', id)
        },
        handleEdit(id){
            this.toggleBtn = false
            this.$store.dispatch('editPupil', id)
            .then(res =>{
                if(res.status === 200){
                    this.pupil = res.data
                    this.pupil.status = res.data.status.toString()
                    this.toggle = true
                }
            })
        }
    },
    computed:{
        allPupils(){
            return this.$store.getters.allPupils
        },
        allGroups(){
            return this.$store.getters.allGroups
        }
    },
    mounted(){
        this.$store.dispatch('active',5)
    }
}

</script>