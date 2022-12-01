<template>
<div>
    <el-row :gutter="12">
        <el-col :span="8">
            <el-card class="demo-progress" shadow="always" >
                <div>Xodimlar</div>
                <div>{{allWorkers.length}}/20</div>
                <el-progress :percentage="(allWorkers.length*100)/20"/>
            </el-card>
        </el-col>
        <el-col :span="8" class="mb-12">
            <el-card class="demo-progress" shadow="always" >
                <div>Yo'nalish</div>
                <div>{{allDirections.length}}/20</div>
                <el-progress :percentage="(allDirections.length*100)/20"/>
            </el-card>
        </el-col>
        <el-col :span="8">
            <el-card class="demo-progress" shadow="always" >
                <div>Guruh</div>
                <div>{{allGroups.length}}/20</div>
                <el-progress :percentage="(allGroups.length*100)/20"/>
            </el-card>
        </el-col>
        <el-col :span="8">
            <el-card class="demo-progress" shadow="always" >
                <div>O'quvchilar</div>
                <div>{{allPupils.length}}/20</div>
                <el-progress :percentage="(allPupils.length*100)/20"/>
            </el-card>
        </el-col>
        <el-col :span="8">
            <el-card class="demo-progress" shadow="always">
                <div>Chiqimlar</div>
                <div>{{allSpendings.length}}/20</div>
                <el-progress :percentage="(allSpendings.length*100)/20"/>
            </el-card>
        </el-col>
        <el-col :span="8" class="mb-12">
            <el-card shadow="always" class="demo-progress">
                <div>Kassa</div>
                <div>{{allPayment.length}}/20</div>
                <el-progress :percentage="(allPayment.length*100)/20"/>
            </el-card>
        </el-col>
        <!-- <el-col :span="8">
            <el-card shadow="always">
                <div>xodimlarga oylik berish</div>
                <div>{{allSpendings.length}}/20</div>
                <el-progress :percentage="(allSpendings.length*100)/20"/>
            </el-card>
        </el-col>
        <el-col :span="8">
            <el-card shadow="always">
                <div>hisobot bo'limi</div>
                <div>{{allSpendings.length}}/20</div>
                <el-progress :percentage="(allSpendings.length*100)/20"/>
            </el-card>
        </el-col> -->
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
        allPayment(){
            return this.$store.getters.allPayment
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
