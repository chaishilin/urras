<template>
  <div class="publicPage">
    <app-header></app-header>
    <program-public-list></program-public-list>
  </div>
</template>

<script>
import Anarres from "@/components/Anarres";
import AppHeader from "@/components/appHeader.vue";
import programPublicList from '@/components/programPublicList'
export default {
  data() {
    return {};
  },
  components: {
    Anarres,
    AppHeader,
    programPublicList,
  },
  methods: {},
};
</script>