<template>
    <div
        class="btn_area mt0"
        style="display: flex; justify-content: space-between; align-items: center"
        v-if="rowButton.length > 0 || dataTreeColumn != null"
    >
        <div>
            <br-button
                label="행 펼치기"
                v-if="dataTreeColumn != null"
                format="tertiary sm"
                @click="treeExpand(tabulator.getRows())"
            />
            <br-button
                label="행 접기"
                v-if="dataTreeColumn != null"
                format="tertiary sm"
                @click="treeCollapse(tabulator.getRows())"
            />
        </div>
        <div>
            <br-button
                class="right"
                label="행 추가"
                icon="add"
                v-if="rowButton[0] == 'C'"
                format="tertiary"
                size="sm"
                @click="addRow()"
            />
            <br-button
                class="right"
                label="저장"
                v-if="rowButton[1] == 'S'"
                format="primary sm"
                @click="$emit('save')"
            />
            <br-button
                class="right"
                label="삭제"
                v-if="rowButton[2] == 'D'"
                format="secondary sm"
                @click="deleteRow()"
            />
            <br-button
                class="right"
                label="엑셀다운로드"
                v-if="excelFlag == true"
                format="tertiary sm"
                @click="getExcel()"
            />
        </div>
    </div>
    <div ref="table" :id="id"></div>
</template>

<script>
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import { v4 as uuidv4 } from 'uuid';

export default {
    props: {
        columns: { type: Array, default: () => [] },
        id: { type: String, default: '' },
        apiUrl: { type: String, default: '' },
        param: { type: Object, default: () => {} },
        grid: { type: Object, default: null },
        excelName: { type: String, default: null },
        rowButton: { type: Array, default: () => [] },
        eventList: { type: Array, default: () => [] },
        dataTreeColumn: { type: String, default: null },
        data: { type: Array, default: () => [] },
        defaultRowData: { type: Object, default: () => ({}) },
        customAddRow: { type: Function, default: null },
    },
    emits: ['row-clicked', 'row-dbl-clicked', 'save'],
    data() {
        return {
            tabulator: null,
            excelFlag: false,
            selectRowFlag: this.rowButton[2] == 'D' ? true : false,
            response: [],
            oriResponse: [],
            updateRows: {
                addRows: [],
                updateRows: [],
                deleteRows: [],
            },
            createUUIDs: [],
            lastSelectedRow: null,
        };
    },
    mounted() {
        this.tabulator = new Tabulator(this.$refs.table, {
            ajaxURL: '/api' + this.apiUrl,
            ajaxParams: this.param,
            maxHeight: '500px',
            dataTree: this.dataTreeColumn != null ? true : false,
            dataTreeElementColumn: this.dataTreeColumn,
            dataTreeChildField: 'childRows',
            ajaxConfig: {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 'X-WES-UI-Menu': storeSession.getMenuSn(),
                    // 'X-WES-UI-User': storeSession.getUserId(),
                    // Authorization: storeSession.getTokenInfo()?.accessToken,
                },
            },
            ajaxResponse: (apiUrl, params, response) => {
                console.log(response.result)
                this.response = [];
                response.result.forEach((ele) => {
                    ele.__key__ = uuidv4();

                    if (Array.isArray(ele.childRows) && ele.childRows.length > 0) {
                        ele.childRows = this.addTreeResponse(ele.childRows);
                    }

                    this.response.push(ele);
                });
                this.oriResponse = JSON.parse(JSON.stringify(this.response));
                return this.response;
            },
            data: this.data.length > 0 ? this.data : undefined,
            layout: 'fitColumns',
            index: '__key__',
            placeholder: '데이터가 없습니다.',
            columns: this.columns,
            rowHeader: this.selectRowFlag
                ? {
                    formatter: 'rowSelection',
                    titleFormatter: 'rowSelection',
                    headerSort: false,
                    resizable: false,
                    frozen: true,
                    headerHozAlign: 'center',
                    hozAlign: 'center',
                    width: 50,
                }
                : false,
        });
        this.tabulator.on('rowDblClick', (e, row) => {
            this.rowDblClicked(row);
        });
        this.tabulator.on('rowClick', (e, row) => {
            this.rowClicked(row);
            if (this.dataTreeColumn) {
                this.lastSelectedRow = row.getData();
            }
        });
        this.tabulator.on('cellEdited', (cell) => {
            this.edited(cell);
            this.$emit('cellEdited', cell);
        });
        this.$emit('update:grid', this.tabulator);
        this.addEvent();
    },
    methods: {
        getExcel() {
            this.tabulator.download('xlsx', this.excelName || 'data.xlsx', { sheetName: 'sheet1' });
        },
        setExcelBtn() {
        },
        addTreeResponse(rows) {
            let childResponse = [];
            rows.forEach((row) => {
                row.__key__ = uuidv4();
                if (Array.isArray(row.childRows) && row.childRows.length > 0) {
                    row.childRows = this.addTreeResponse(row.childRows);
                }
                childResponse.push(row);
            });
            return childResponse;
        },
        addRow() {
            // 커스텀 addRow
            if (this.customAddRow) {
                this.customAddRow(this.tabulator);  // 외부에서 행 추가 책임
                return;
            }
            // 기본 로직
            let createUUID = uuidv4();
            this.createUUIDs.push(createUUID);
            const defaultRow = {
                __key__: createUUID,
                ...this.defaultRowData,
            };

            if (this.dataTreeColumn && this.lastSelectedRow != null && this.lastSelectedRow != {}) {
                this.addTreeRow(this.tabulator.getRows(), createUUID);
            } else {
                this.tabulator.addRow(defaultRow).then((row) => {
                    row.getElement().classList.add('added');
                });
            }
        },
        addTreeRow(rows, createUUID) {
            rows.forEach((row) => {
                const data = row.getData();
                if (data.__key__ === this.lastSelectedRow.__key__) {
                    let newChild = this.makeEmptyRow(this.columns, createUUID);
                    newChild = {
                        ...newChild,
                        ...this.defaultRowData,
                        upSn: this.lastSelectedRow[this.dataTreeColumn],
                    };
                    row.addTreeChild(newChild);
                    setTimeout(() => {
                        const children = row.getTreeChildren();
                        children.forEach((childRow) => {
                            const childData = childRow.getData();
                            if (this.createUUIDs.includes(childData.__key__)) {
                                childRow.getElement().classList.add('added');
                            }
                        });
                    }, 0);
                } else if (Array.isArray(data.childRows) && data.childRows.length > 0) {
                    this.addTreeRow(row.getTreeChildren(), createUUID);
                }
            });
        },

        makeEmptyRow(columns, uuid) {
            const row = { __key__: uuid };
            columns.forEach((col) => {
                if (typeof col.field === 'string') {
                    row[col.field] = undefined;
                }
            });
            return row;
        },
        deleteRow() {
            this.tabulator.getSelectedData().forEach((row) => {
                if (!this.createUUIDs.includes(row.__key__)) {
                    this.updateRows.deleteRows.push(row);
                }
            });
            this.deleteTreeRow(this.tabulator.getRows());

            this.tabulator.deselectRow();
        },
        deleteTreeRow(rows) {
            const deleteKeyRows = this.tabulator.getSelectedData().map((row) => row.__key__);
            rows.forEach((row) => {
                if (deleteKeyRows.includes(row.getData().__key__)) {
                    this.tabulator.deleteRow(row);
                }
                if (row.getData().childRows != null) {
                    this.deleteTreeRow(row.getTreeChildren());
                }
            });
        },
        getUpdateRows() {
            const deleteRows = this.updateRows.deleteRows.map((row) => row.__key__);
            this.getTreeAddRows(this.tabulator.getRows());

            this.tabulator.getEditedCells().forEach((ele) => {
                if (
                    !this.createUUIDs.includes(ele.getRow().getData().__key__) &&
                    !this.updateRows.addRows.some(
                        (obj) => obj.__key__ === ele.getRow().getData().__key__
                    )
                ) {
                    const rowData = ele.getRow().getData();
                    if (
                        !this.updateRows.updateRows.some((i) => i.__key__ === rowData.__key__) &&
                        !deleteRows.includes(rowData.__key__)
                    ) {
                        this.updateRows.updateRows.push(rowData);
                    }
                }
            });
            return this.updateRows;
        },
        getTreeAddRows(rows) {
            rows.forEach((row) => {
                if (
                    this.createUUIDs.includes(row.getData().__key__) &&
                    !this.updateRows.addRows.some((obj) => obj.__key__ === row.getData().__key__)
                ) {
                    this.updateRows.addRows.push(row.getData());
                }
                if (row.getData().childRows != null) {
                    this.getTreeAddRows(row.getTreeChildren());
                }
            });
        },
        rowDblClicked(row) {
            this.$emit('rowDblClicked', row);
        },
        rowClicked(row) {
            this.$emit('rowClicked', row);
        },
        addEvent() {
            this.eventList.forEach((ele) => {
                this.tabulator.on(ele.event, ele.eventFunc);
            });
        },
        treeExpand(rows) {
            rows.forEach((row) => {
                if (row.treeExpand) {
                    row.treeExpand();
                    this.treeExpand(row.getTreeChildren());
                }
            });
        },
        treeCollapse(rows) {
            rows.forEach((row) => {
                if (row.treeCollapse) {
                    row.treeCollapse();
                    this.treeCollapse(row.getTreeChildren());
                }
            });
        },
        setUpdateRows() {
            this.updateRows = {
                addRows: [],
                updateRows: [],
                deleteRows: [],
            };
            this.createUUIDs = [];
        },
        edited(cell) {
            this.oriResponse.forEach((item) => {
                if (item.__key__ === cell.getRow().getData().__key__) {
                    let flag = false;
                    Object.keys(item).forEach((key) => {
                        if (key != 'childRows') {
                            if (item[key] != cell.getRow().getData()[key]) {
                                flag = true;
                            }
                        }
                    });
                    if (!flag) {
                        flag = !Object.keys(item).includes(cell.getField());
                    }
                    if (flag) {
                        cell.getRow().getElement().classList.add('edited');
                    } else {
                        cell.getRow().getElement().classList.remove('edited');
                    }
                }
            });
        },
    },
};
</script>
