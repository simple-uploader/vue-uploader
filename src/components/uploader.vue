<template>
    <div class="uploader">
        <slot :files="files" :file-list="fileList" :started="started"></slot>
    </div>
</template>

<script>
    import Uploader from 'simple-uploader.js';

    const COMPONENT_NAME = 'uploader';

    const EVENT_UPLOAD_START = 'upload-start';
    const EVENT_FILE_ADDED = 'file-added';
    const EVENT_FILE_REMOEED = 'file-removed';
    const EVENT_FILES_SUBMITTED = 'files-submitted';
    const EVENT_FILE_SUCCESS = 'file-success';

    export default {
        name: COMPONENT_NAME,
        props: {
            options: {
                type: Object,
                default() {
                    return {};
                }
            },
            autoStart: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                started: false,
                files: [],
                fileList: []
            };
        },
        methods: {
            uploadStart() {
                this.$emit(EVENT_UPLOAD_START);
                this.started = true;
            },
            fileAdded(file) {
                this.$emit(EVENT_FILE_ADDED, file);
                if (file.ignored) {
                    // is ignored, filter it
                    return false;
                }
            },
            fileRemoved(file) {
                this.$emit(EVENT_FILE_REMOEED, file);
                this.files = this.uploader.files;
                this.fileList = this.uploader.fileList;
            },
            filesSubmitted(files, fileList) {
                this.$emit(EVENT_FILES_SUBMITTED, files, fileList);
                this.files = this.uploader.files;
                this.fileList = this.uploader.fileList;
                if (this.autoStart) {
                    this.uploader.upload();
                }
            },
            fileSuccess(rootFile, file, message) {
                this.$emit(EVENT_FILE_SUCCESS, rootFile, file, JSON.parse(message));
            }
        },
        created() {
            const uploader = new Uploader(this.options);
            this.uploader = uploader;
            uploader.on('uploadStart', this.uploadStart);
            uploader.on('fileAdded', this.fileAdded);
            uploader.on('fileRemoved', this.fileRemoved);
            uploader.on('filesSubmitted', this.filesSubmitted);
            uploader.on('fileSuccess', this.fileSuccess);
        },
        destroyed() {
            const uploader = this.uploader;
            uploader.off('uploadStart', this.uploadStart);
            uploader.off('fileAdded', this.fileAdded);
            uploader.off('fileRemoved', this.fileRemoved);
            uploader.off('filesSubmitted', this.filesSubmitted);
            uploader.off('fileSuccess', this.fileSuccess);
            this.uploader = null;
        }
    };
</script>

<style>
    .uploader {
        position: relative;
    }
</style>
