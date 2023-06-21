<template>
    <div class="container">
        <h1 class="title">页面不见了</h1>
        <p class="big-404">404</p>
        <div class="content">
            <p>很抱歉，您所查找的页面不存在。</p>
            <p>但是不要担心，我们有一些有趣的建议：</p>
            <ul>
                <li>出去透透气，放松一下</li>
                <li>给朋友打个电话，说句话</li>
                <li>看一本书或者听点音乐</li>
                <li>喝杯茶或者咖啡，歇歇脚</li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.container {
    text-align: center;
    padding: 20px;
    font-size: 1.2rem;
}

.title {
    font-size: 3rem;
    color: #f44336;
}

.big-404 {
    font-size: 12rem;
    font-weight: bold;
    color: #f44336;
    margin: 0;

}

.big-404:hover {
    animation: explode 1s ease-in-out forwards;
}

@keyframes explode {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    100% {
        transform: scale(2.5);
        opacity: 0;
    }
}

.content {
    margin-top: 40px;
    animation: fadeIn 2s;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: translateY(-20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0px);
    }
}


ul {
    list-style: none;
    padding-left: 0;
}

li {
    margin: 10px 0;
}


</style>
