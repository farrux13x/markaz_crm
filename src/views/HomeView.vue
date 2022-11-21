<template>
<div>
    <el-row :gutter="12">
        <el-col :span="8">
            <el-card shadow="always" style="background:#409EFF">
                <div class="demo-progress">
                    <el-progress type="circle" :percentage="`${(allWorkers.length*100)/20}`"/>
                </div> 
                {{allWorkers.length}}/20
                <div>Xodimlar</div>
            </el-card>
        </el-col>
        <el-col :span="8">
            <el-card shadow="always" style="background: #eebe77">
                <div>Yo'nalish</div>
                <div>{{allDirections.length}}</div>    
            </el-card>
        </el-col>
        <el-col :span="8" class="mb-12">
            <el-card shadow="always" style="background: #f89898">
                <div>Guruh</div>
                <div>{{allGroups.length}}</div>    
            </el-card>
        </el-col>
        <el-col :span="8">
            <el-card shadow="always" style="background: #95d475">
                <div>O'quvchilar</div>
                <div>{{allPupils.length}}</div>
            </el-card>
        </el-col>
        <el-col :span="8">
            <el-card shadow="always">Chiqimlar{{allSpendings.length}}</el-card>
        </el-col>
        <el-col :span="8" class="mb-12">
            <el-card shadow="always">Kassa</el-card>
        </el-col>
        <el-col :span="8">
            <el-card shadow="always">xodimlarga oylik berish</el-card>
        </el-col>
        <el-col :span="8">
            <el-card shadow="always">hisobot bo'limi</el-card>
        </el-col>
    </el-row>
</div>
</template>

<script>

export default {
    computed:{
        allWorkers(){
            return this.$store.getters.allWorkers
        },
        allGroups(){
            return this.$store.getters.allGroups
        },
        allDirections(){
            return this.$store.getters.allDirections
        },
        allPupils(){
            return this.$store.getters.allPupils
        },
        allSpendings(){
            return this.$store.getters.allSpendings
        }
    },
    mounted(){
        this.$store.dispatch('active',1)
    }
}
</script>
