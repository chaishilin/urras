<template>
  <div class="programListPage">
    <app-header></app-header>
    <program-list></program-list>
  </div>
</template>

<script>
import Anarres from "@/components/Anarres";
import AppHeader from "@/components/appHeader.vue";
import ProgramList from "@/components/programList.vue";
export default {
  data() {
    return {};
  },
  components: {
    Anarres,
    AppHeader,
    ProgramList,
  },
  methods: {},
};
</script>