  <template>
   <div class="preview-frame" :class="currentViewMode">
      <iframe :src="previewData.before_url" :alt="previewData.name" style="width: 50%;
    left: 0;"></iframe>
       <iframe :src="previewData.after_url" :alt="previewData.name" style="width: 50%;
    right: 0;"></iframe>
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