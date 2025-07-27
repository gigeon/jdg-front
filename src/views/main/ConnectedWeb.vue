<template>
    <div class="btn_area">
        <button-form label="닫기"/>
    </div>
    <div class="terminal">
        <div class="output" id="output">
            {{ resultText }}
        </div>
        <div class="prompt-line">
            <span class="prompt">$</span>
            <input type="text" class="command-input" id="commandInput" autofocus v-model="param.inputText" @keydown.enter.prevent="pushCli()">
            <span class="cursor"></span>
        </div>
    </div>
</template>
<script>
const API = {
    CONN: "/conn"
}
export default{
    data(){
        return {
            param: {
                inputText: "",
                db: "",
            },
            resultText: "",
        }
    },
    mounted() {
        this.param.db = "JEV";
        this.resultText = `$ Connecting to ${this.param.db}...`;
        // if(true) {
        //     this.resultText = this.resultText + "\n Connected successfully.";
        // }
    },
    methods: {
        pushCli() {
            if(this.param.inputText == "exit") {
                this.$router.push("/home")
                return;
            }

            this.resultText += "\n$ " + this.param.inputText;
            console.log(this.resultText)
            this.$fetchApi.post(
                API.CONN,
                this.param,
                (result) => {
                    this.param.inputText = "";
                    this.resultText += "\n$ " + result.result;
                },
                () => {
                    alert("DB 연결 실패")
                    this.param.inputText = "";
                }
            );
        }
    },
}
</script>