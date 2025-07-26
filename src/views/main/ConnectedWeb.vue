<template>
    <div class="terminal">
        <div class="output" id="output">
            {{ resultText }}
            Connected successfully.
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
            resultText: "$ webdb connect postgresql://localhost:5432/mydb \
                        Connecting to database...",
        }
    },
    mounted() {
        this.param.db = "JEV";
    },
    methods: {
        pushCli() {
            this.$fetchApi.post(
                API.CONN,
                this.param,
                (result) => {
                    console.log(result)
                    console.log("123123")
                },
                () => {
                    alert("전송 실패")
                }
            );
        }
    },
}
</script>