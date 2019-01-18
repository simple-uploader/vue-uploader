<template>
    <uploader :options="options" class="uploader-example" ref="uploader">
        <uploader-unsupport></uploader-unsupport>
        <uploader-drop>
            <p>Drop files here to upload or</p>
            <uploader-btn>select files</uploader-btn>
            <uploader-btn :attrs="attrs">select images</uploader-btn>
            <uploader-btn :directory="true">select folder</uploader-btn>
        </uploader-drop>
        <!-- <uploader-files></uploader-files> -->
        <uploader-list></uploader-list>
    </uploader>
</template>

<script>
    export default {
        data() {
            return {
                options: {
                    target: '//localhost:3000/upload', // '//jsonplaceholder.typicode.com/posts/',
                    testChunks: false
                },
                attrs: {
                    accept: 'image/*'
                }
            };
        },
        mounted() {
            this.$nextTick(() => {
                window.uploader = this.$refs.uploader.uploader;
            });
        }
    };
</script>

<style>
    .uploader-example {
        width: 880px;
        padding: 15px;
        margin: 40px auto 0;
        font-size: 12px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .4);
    }

    .uploader-example .uploader-btn {
        margin-right: 4px;
    }

    .uploader-example .uploader-list {
        max-height: 440px;
        overflow: auto;
        overflow-x: hidden;
    }
</style>
