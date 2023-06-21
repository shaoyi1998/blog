<template>
    <Editor
        style="width: 100%"
        :init="init_config"
    />
</template>

<script setup>
import {ref} from "vue";
import {front_url} from "../units/my_global_url.js";
import 'tinymce/tinymce'
import 'tinymce/icons/default/icons'
import 'tinymce/themes/silver/theme'
import 'tinymce/models/dom/model'
import 'tinymce/skins/ui/oxide/skin.css'
import 'tinymce/skins/ui/oxide/content.min.css'
import 'tinymce/skins/content/default/content.css'
import 'tinymce/plugins/lists/plugin'
import 'tinymce/plugins/link/plugin'
import 'tinymce/plugins/image/plugin'
import 'tinymce/plugins/table/plugin'
import 'tinymce/plugins/fullscreen/plugin'
import 'tinymce/plugins/codesample/plugin'
import 'tinymce/plugins/charmap/plugin'
import 'tinymce/plugins/insertdatetime/plugin'
import 'tinymce/plugins/preview/plugin'
import 'tinymce/plugins/advlist/plugin'
import 'tinymce/plugins/code/plugin'
import 'tinymce/plugins/help/plugin'
import 'tinymce/plugins/quickbars/plugin'
import 'tinymce/plugins/wordcount/plugin'
import Editor from "@tinymce/tinymce-vue";

const init_config = ref({
    language_url: './zh-Hans.js',
    language: "zh-Hans",
    relative_urls: true,
    document_base_url: front_url,
    plugins: 'quickbars image wordcount codesample fullscreen charmap insertdatetime preview table lists advlist',
    toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright alignjustify | indent outdent image bullist numlist table backcolor insertdatetime codesample charmap  preview  wordcount fullscreen',
    images_file_types: 'jpg,svg,webp,png,jpeg',
    skin_url: "tinymce/skins/ui/oxide/",
    content_css: 'tinymce/skins/content/default/content.css',
    promotion: false,
    branding: false,
    paste_data_images: true,
    // images_upload_url: ''
})
</script>

<style scoped>

</style>