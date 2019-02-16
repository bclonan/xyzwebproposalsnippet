<template>
   <div class="container is-fullhd">
      <div class="container is-fluid">
         <div class="columns is-multiline is-centered">
            <div v-for="item in websiteList" :key="item.id" class="column is-4">
               <div class="card">
                  <h3 class="has-text-centered pagename" style="padding:10px;">{{item.name}}</h3>
                  <div class="card-content">
                     <div class="content">
                        <img :src="item.before_thumb" :alt="item.name">
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
      props: ['websiteList'],
      components : {
         "page-thumbnail" : PageThumb
      },
      methods: {
         previewPage(page) {
            this.$emit('preview', page)
         }
         
      }
   }
</script>

<style >

</style>