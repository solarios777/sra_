

<script setup lang="ts">
import HeroSec from '@/components/HeroSec.vue';
import HomeCards from '@/components/HomeCards.vue';
import JobListings from '@/components/JobListings.vue';




</script>

<template>

  <HeroSec />
  <HomeCards/>
  <JobListings :limit="3" :show-button="true"/>
</template>
