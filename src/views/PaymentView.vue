<template>
    <div>
        <el-row justify="space-between" class="mb-20">
            <h1>Kassa</h1>
            <el-button type="primary" @click="toggle=!toggle">
                <el-icon>
                    <Plus/>
                </el-icon>
                qo'shish
            </el-button>
        </el-row>
        <el-dialog v-model="toggle" width="500px" title="Kassa">
            <el-form v-model="payment">
                <el-form-item label="Gruppa">
                    <el-select v-model="payment.group" placeholder="tanlash">
                        <el-option v-for="item of groups"
                        :key="item._id"
                        :label="item.title"
                        :value="item._id"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="o'quvchi">
                    <el-select v-model="payment.pupil" placeholder="tanlash">
                        <el-option v-for="item of pupils"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="summa">
                    <el-input-number v-model="payment.summa"/>
                </el-form-item>
                <el-form-item label="kun">
                    <el-date-picker
                        v-model="payment.data"
                        type="date"
                        placeholder="Pick a day"
                    />
                </el-form-item>
                <el-form-item label="to'lov turi">
                    <el-select v-model="payment.typepayment" placeholder="tanlash">
                        <el-option v-for="item,index of type"
                        :key="index"
                        :label="item"
                        :value="item"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="izoh">
                    <el-input
                        :rows="2"             
                        v-model="payment.comment"
                        type="textarea"
                        placeholder="Please input"
                        />
                </el-form-item>
                <el-form-item>
                    <el-button @click="add" type="primary">
                        Saqlash
                    </el-button>
                </el-form-item>
            </el-form>
            {{payment}}
        </el-dialog>
        <el-table :data="allPayment">
            <el-table-column label="Guruh" />
            <el-table-column label="O'quvchi" />
            <el-table-column label="summa" />
            <el-table-column label="kun" />
            <el-table-column label="to'lov turi" />
            <el-table-column label="Izoh" />
        </el-table>
        {{allPayment}}
    </div>
</template>
<script>
export default{
    data(){
        return{
            toggle:false,
            type:['naqd','plastik','online'],
            payment:{
                group:"",
                pupil:"",
                summa:0,
                data:'',
                typepayment:'',
                comment:''
            }
        }
    },
    methods:{
        add(){
            this.$store.dispatch('createPayment',this.payment)
            this.toggle = !this.toggle
        }
    },
    computed:{
        groups(){
            return this.$store.getters.allGroups
        },
        pupils(){
            return this.$store.getters.allPupils
        },
        allPayment(){
            return this.$store.getters.allPayment
        }
    },
    mounted(){
        this.$store.dispatch('active',6)
    }
}
</script>

<style lang="scss">
// el-table{
//     background-color: red;
// }
</style>