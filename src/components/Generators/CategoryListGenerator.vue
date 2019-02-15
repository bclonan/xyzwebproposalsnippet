<template>
<div class="container is-fullhd">
<!--<div class="container is-fluid">
<div class="tabs is-centered">
  <ul>
    <li v-for="category in categoryList" :key="category.id" @click.stop="showCategory(category.category_name)" class="is-active">{{category.category_name}}</li>
</ul>
</div>
</div>
-->

<!-- thumbnails-->
<div class="container is-fluid">
<div class="columns is-multiline is-centered">
  <div v-for="item in websiteList" :key="item.id" class="column is-4">
    <div class="card">

  <div class="card-content">
    <div class="content">
  <img :src="item.thumb" :alt="item.name">
    </div>
  </div>
  <footer class="card-footer">
    <a @click.stop="previewPage(item)" class="card-footer-item">Preview</a>
  </footer>
</div>
  </div>

</div>
</div>






</div>
</template>

<script>
import PageThumb from '@/components/Elements/siteThumbs/PageThumb.vue'
   export default {
      name: "CategoryListGenerator",
      props: ['categoryList', 'websiteList'],
      components : {
         "page-thumbnail" : PageThumb
      },
      methods: {
         showCategory(cat) {
            this.$emit('filterCategories', cat)
         },
         previewPage(page) {
            this.$emit('preview', page)
         }
         
      }
   }
</script>

<style >

</style>