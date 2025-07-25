import storeCode from "@/js/store/store-code";

export default{ 
    /**
     * 그리드  셀렉트 박스
     */
    // editSelect(col) {
    //     const option = col.options || storeCode.getters.getCodeList({ cmmnCodeId: col.cmmnCodeId }).reduce((acc, item) => {
    //         acc[item.code] = item.codeNm;
    //         return acc;
    //     }, {});
    //     return {
    //         ...col,
    //         editor: "list",
    //         editorParams: {
    //             values: option || null,
    //         },
    //         formatter: (cell) => {
    //             const value = cell.getValue();
    //             return option[value];
    //         }
    //     }
    // },

    /**
     * 그리드 input 박스
     */
    editInput(col) {
        return {
            ...col,
            editor: "input",
            editorParams: {
                elementAttributes :{
                    maxlength : col.maxlength,
                }
            }
        }
    },

    /**
     * 그리드 숫자 박스
     */
    editNumber(col) {
        return {
            ...col,
            editor: "number",
            min: col.min,
            max: col.max,
            step: col.step,
            editorParams: {
                elementAttributes :{
                    maxlength : col.maxlength,
                }
            }
        }
    },

    eidtOrgnzt(col) {
        const option = storeCode.getters.getOrgnztList().reduce((acc, item) => {
            acc[item.orgnztId] = item.orgnztNm;
            return acc;
        }, {});
        return {
            ...col,
            editor: "list",
            editorParams: {
                values: option,
            },
            formatter: (cell) => {
                const value = cell.getValue();
                return option[value];
            }
        }
    },
    
    editBoolean(col) {
        const option = {
            true: "Y",
            false: "N"
        }
        return {
            ...col,
            editor: "list",
            editorParams: {
                values: option || null,
            },
            formatter: (cell) => {
                const value = cell.getValue();
                return option[value];
            }
        }
    },
    
    editAuth(col) {
        const option = storeCode.getters.getAuthList().reduce((acc, item) => {
            acc[item.authorId] = item.authorNm;
            return acc;
        }, {});
        return {
            ...col,
            editor: "list",
            editorParams: {
                values: option || null,
            },
            formatter: (cell) => {
                const value = cell.getValue();
                return option[value];
            }
        }
    }


}