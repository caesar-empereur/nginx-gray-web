<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">查看当前nginx负载</el-button>
                <el-button type="primary" @click="handleAdd">新增服务节点</el-button>
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
                                v-show="!scope.row.join"
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
            <el-form ref="editForm" :rules="editRules" :model="editForm" label-width="70px">
                <el-form-item label="IP" prop="ip">
                    <el-input v-model="editForm.ip"></el-input>
                </el-form-item>
                <el-form-item label="端口" prop="port">
                    <el-input v-model="editForm.port"></el-input>
                </el-form-item>
                <el-form-item label="权重" prop="weight">
                    <el-input v-model="editForm.weight"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="新增" :visible.sync="addVisible" width="30%">
            <el-form ref="addForm" :rules="addRules" :model="addForm" label-width="70px">
                <el-form-item label="IP" prop="ip">
                    <el-input v-model="addForm.ip"></el-input>
                </el-form-item>
                <el-form-item label="端口" prop="port">
                    <el-input v-model="addForm.port"></el-input>
                </el-form-item>
                <el-form-item label="权重" prop="weight">
                    <el-input v-model="addForm.weight"></el-input>
                </el-form-item>
                <el-form-item label="服务名称" prop="serviceName">
                    <el-input v-model="addForm.serviceName"></el-input>
                </el-form-item>
                <el-form-item label="域名" prop="domain">
                    <el-input v-model="addForm.domain"></el-input>
                </el-form-item>
                <el-form-item label="nginx-zone" prop="zone">
                    <el-input v-model="addForm.zone"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="确定刷新到 nginx ?" :visible.sync="refreshVisible" width="30%">
            <span slot="footer" class="dialog-footer">
                <el-button @click="refreshVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmRefreshToNginx">确 定</el-button>
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
            addVisible: false,
            refreshVisible: false,

            total: 0,
            pageCount:0,
            editForm: {
                ip: '',
                port: '',
                weight: ''
            },
            addForm: {
                ip: '',
                port: '',
                weight: '',
                serviceName: '',
                domain: '',
                zone: ''
            },
            refreshId: "",

            editRules: {
                ip: [
                    { required: true}
                ],
                port: [
                    { required: true}
                ],
                weight: [
                    { required: true}
                ]
            },
            addRules: {
                ip: [
                    { required: true}
                ],
                port: [
                    { required: true}
                ],
                weight: [
                    { required: true}
                ],
                serviceName: [
                    { required: true}
                ],
                domain: [
                    { required: true}
                ],
                zone: [
                    { required: true}
                ]
            }
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
            get('/nginx/list', {backends:'zone_for_backends'})
                .then((response) => {
                    this.noticeMessage(response.message);
                })
        },
        handlePageNoChange(val) {
            this.param.pageNo=val;
            this.getData();
        },
        handlePageSizeChange(val){

        },
        joinChange(val) {
            if (val.join){
                get('/nginx/add', {id:val.id})
                    .then((response) => {
                        console.log(response);
                        this.noticeMessage(response.message);
                        this.getData();

                    })
            } else {
                get('/nginx/delete', {id:val.id})
                    .then((response) => {
                        console.log(response);
                        this.noticeMessage(response.message);
                        this.getData();

                    })
            }
        },
        handleEdit(row) {
            this.editForm = row;
            this.editVisible = true;
        },
        handleAdd() {
            this.addVisible=true;
        },
        saveEdit() {
            this.$refs['editForm'].validate((valid) => {
                if (valid) {
                    this.editVisible = false;
                    this.editForm.weight=parseInt(this.editForm.weight);
                    post('/node/update', this.editForm);
                    this.noticeMessage();
                    this.getData();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        saveAdd() {
            this.$refs['addForm'].validate((valid) => {
                if (valid) {
                    this.addVisible=false;
                    this.addForm.weight=parseInt(this.addForm.weight);
                    post('/node/add', this.addForm);
                    this.noticeMessage();
                    this.getData();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        handleRefresh(row) {
            this.refreshVisible = true;
            this.refreshId=row.id;
        },
        confirmRefreshToNginx() {
            get('/nginx/update', {id:this.refreshId})
                .then((response) => {
                    console.log(response);
                    this.noticeMessage(response.message);
                })
        },


        noticeMessage(msg) {
            if (msg){
                msg = 'nginx返回信息：' + msg;
                this.$message({
                    showClose: true,
                    message: msg,
                    type: 'success'
                });
            } else {
                this.$message({
                    showClose: true,
                    message: '操作成功',
                    type: 'success'
                });
            }
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
