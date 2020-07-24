<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="param.orderNo" placeholder="订单号" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                stripe
                ref="multipleTable"
                >

                <el-table-column prop="ip" label="IP"></el-table-column>
                <el-table-column prop="port" label="端口"></el-table-column>
                <el-table-column prop="serviceName" label="服务名称"></el-table-column>
                <el-table-column prop="domain" label="域名"></el-table-column>
                <el-table-column prop="weight" label="权重"></el-table-column>
                <el-table-column prop="zone" label="nginx-zone"></el-table-column>
                <el-table-column prop="join" label="加入负载">
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.join"
                                :active-value="true"
                                :inactive-value="false"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                @change="joinChange(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="join" label=操作>
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button
                                v-show="scope.row.join"
                                type="text"
                                @click="handleRefresh(scope.row)">刷新到 nginx</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="param.pageNo"
                    :page-sizes="[10,20,50]"
                    :page-size="param.pageSize"
                    :total="total"
                    :page-count="pageCount"
                    @size-change="handlePageSizeChange"
                    @current-change="handlePageNoChange"
                ></el-pagination>
            </div>
        </div>

        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="IP">
                    <el-input v-model="form.ip"></el-input>
                </el-form-item>
                <el-form-item label="端口">
                    <el-input v-model="form.port"></el-input>
                </el-form-item>
                <el-form-item label="权重">
                    <el-input v-model="form.weight"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="确定刷新到 nginx ?" :visible.sync="refreshVisible" width="30%">
            <span slot="footer" class="dialog-footer">
                <el-button @click="refreshVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmRefresh">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {get,post} from '../util/http';

    export default {
    name: 'basetable',
    data() {
        return {
            param: {
                pageNo: 1,
                pageSize: 10
            },
            tableData:[],

            editVisible: false,
            refreshVisible: false,

            total: 0,
            pageCount:0,
            form: {},
            refreshId: ""
        };
    },
    created () {
        this.getData();
    },
    methods: {
        getData() {
            get('/node/page', this.param)
                .then((response) => {
                    this.total=response.totalElements;
                    this.pageCount = response.totalPages;
                    this.tableData=response.content;
                })
        },
        handleSearch() {
            this.getData();
        },
        handlePageNoChange(val) {
            this.param.pageNo=val;
            this.getData();
        },
        handlePageSizeChange(val){

        },
        joinChange(val) {
            console.log(val);
            if (val.join){
                get('/nginx/add', {id:val.id})
                    .then((response) => {
                        console.log(response);
                        this.noticeMessage();
                    })
            } else {
                get('/nginx/delete', {id:val.id})
                    .then((response) => {
                        console.log(response);
                        this.noticeMessage();
                    })
            }
        },
        handleEdit(row) {
            this.form = row;
            this.editVisible = true;
        },
        saveEdit() {
            this.editVisible = false;
            this.form.weight=parseInt(this.form.weight);
            post('/node/update', this.form);
            this.noticeMessage();
            this.getData();
        },
        handleRefresh(row) {
            this.refreshVisible = true;
            this.refreshId=row.id;
        },
        confirmRefresh() {
            this.noticeMessage();
            this.getData();
        },
        noticeMessage() {
            this.$message({
                showClose: true,
                message: '操作成功',
                type: 'success'
            });
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.pagination {
    margin: 20px 0;
    text-align: right;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
el-table-column {
    align: center;
}
</style>
