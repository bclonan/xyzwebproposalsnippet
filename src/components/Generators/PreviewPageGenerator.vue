  <template>
   <div class="preview-frame" :class="currentViewMode">
      <iframe :src="previewData.url" :alt="previewData.name"></iframe>
    </div>
  </template>
  
  <script>
     export default {
        name: 'previewPageGenerator',
        props: ['previewData', 'currentViewMode']
     }
  </script>
  
  <style>
  
  </style>