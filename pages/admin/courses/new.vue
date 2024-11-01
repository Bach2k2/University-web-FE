<template>
    <CourseEditor :defaultData="{
        subject: {
            email: null,
            major_id: '',
            title: '',
            credit: 0,
        },
        room: {
            id: '',
            room_type: {
                title: '',
                description: '',
            },
            title: '',
            capacity: 0,
            location: '',
        },
        title: '',
        start_date:null,
        end_date:null
    }" />
</template>

<script setup lang=ts>
definePageMeta({
    layout: 'adminlayout'
});
</script>