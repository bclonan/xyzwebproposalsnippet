<template>
<body>
<!-- preview header -->
  <div class="preview-header">
    <h1 class="title is-3 has-text-weight-light" v-if="templateName && pageViewMode == false">{{templateName}}</h1>
    <h1 class="title is-3 has-text-weight-light" v-else-if="pageViewMode == true">{{previewData.name}}

     <a class="button is-normal is-primary" @click.stop="resetSite">Return</a>
     <a class="button is-normal is-warning" @click.stop="ViewReport">View Site Report</a>
    </h1>
        <h1 class="title is-3 has-text-weight-light" v-else-if="pageDataMode == true">{{previewData.name}}

     <a class="button is-normal is-warning" @click.stop="closeReport">Return</a>
    </h1>
    <h1 class="title is-3 has-text-weight-light" v-else>Website Previewer</h1>
    <div class="preview-icons is-hidden-mobile">
      <a @click.stop="changeViewMode('default')" :class="[ currentViewMode == 'default' ? 'is-active' : '']">
        <svg width="27" height="19" viewBox="0 0 27 19" xmlns="http://www.w3.org/2000/svg">
          <path fill="none" stroke="currentColor" d="M7 18.5h13"></path>
          <path fill="currentColor" d="M26 1v15H1V1h25m1-1H0v17h27V0z"></path>
        </svg>
      </a>
      <a @click.stop="changeViewMode('is-tablet')" :class="[ currentViewMode == 'is-tablet' ? 'is-active' : '']" data-screen-size="tablet">
        <svg width="14" height="19" viewBox="0 0 14 19" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M13 1v17H1V1h12m1-1H0v19h14V0z"></path>
        </svg>
      </a>
      <a @click.stop="changeViewMode('is-mobile')" :class="[ currentViewMode == 'is-mobile' ? 'is-active' : '']" data-screen-size="mobile">
        <svg width="10" height="17" viewBox="0 0 10 17" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M9 1v15H1V1h8m1-1H0v17h10V0z"></path>
        </svg>
      </a>
    </div>
    	<div>
    	<a v-if="ctaButton" :href="ctaLink" class="preview-buy button is-primary">{{ctaText}}</a>
	</div>
  </div>
  <div class="preview-body">  
<PreviewPageGenerator v-if="pageViewMode == true"
:currentViewMode="currentViewMode"
:previewData="previewData" />

<siteReportGenerator v-else-if="pageDataMode == true && pageViewMode == false"
:currentViewMode="currentViewMode"
:previewData="previewData" />

<CategoryListGenerator v-else-if="pageDataMode == false && pageViewMode == false" 
  :categoryList="categoryList" 
  :websiteList="websiteList"
  @preview="selectPreviewUrl"
  @filterCategories="filterCats"
  />


  </div>
 </body>
 
</template>

<script>
const uuidv1 = require('uuid/v1');
const juxtapose = require('juxtaposejs/build/js/juxtapose');
//Page Element Generators
//Handle editing story
import { handlePreviewData } from "@/components/Mixins/handlePreviewData";
//Page Preview
import PreviewPageGenerator from "@/components/Generators/PreviewPageGenerator.vue";
//Category List
import CategoryListGenerator from "@/components/Generators/CategoryListGenerator.vue";
//Page Report
import siteReportGenerator from "@/components/Generators/siteReportGenerator.vue";





export default {
  name: 'PreviewMode',
  mixins: [handlePreviewData],
  components: {
    PreviewPageGenerator,
    CategoryListGenerator,
    siteReportGenerator
  },
  data() {
    return {
      trackVisId: uuidv1(),
      previewURL : null,
      templateName : null,
      showTemplates : true,
      choosenCategory : null,
      pageViewMode : false,
      pageDataMode : false
    };
  },
  methods: {
    selectPreviewMode() {
      //console.log(event.target.value);
      // alert(event.target.selectedIndex);
    },
    filterCats(category) {
       //later todo fix and add
       this.choosenCategory = category;
    },
    selectPreviewUrl(i) {

      this.pageViewMode = true;
      this.previewData = i;
    },
    changeViewMode(mode) {
      this.currentViewMode = mode;
    },
    templateControls(templateMode){
      this.showTemplates = templateMode;
    },
    resetSite(){
         this.pageViewMode = false;
         this.previewData = null;
    },
    ViewReport() {
       this.pageViewMode = false;
       this.pageDataMode = true;
    },
    closeReport() {
       this.pageViewMode = true;
       this.pageDataMode = false;
    }
  }
}
</script>

<style>
@import url("../styles/bulma/css/bulma.css");
/* 1. Base */

html {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  
  min-height: 100vh;
  min-width: 300px;
  overflow-x: hidden;
}

.preview-section {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding-left: 1rem;
    padding-right: 1rem;
    margin: 0;
    width: 100%;
    height: 100%;
    background: #f8f8f8;
}

.preview-header {
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.preview-header .title {
    font-weight: 100 !important;
    margin-bottom: 0;
    line-height: 2rem;
}

.preview-header .preview-close {
    color: #999;
    transition: .1s ease-in-out;
    transition-property: all;
    transition-property: color, opacity;
}

.preview-header .preview-buy {
    min-width: 8rem;
    font-size: 1rem;
    min-height: 2.5rem;
}

.preview-body {
    display: flex;
    flex: auto;
}

.preview-icons {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
}

.preview-icons a {
    padding-left: 1rem;
    color: #999;
}

.preview-icons a.is-active {
    color: #555;
}

.preview-frame {
    height: calc(100vh - 90px);
    max-height: calc(100vh - 90px);
    position: relative;
    width: 100%;
    box-shadow: .3rem .3rem 4rem 0 rgba(0, 0, 0, 0.06);
    margin: auto !important;
    transition: .3s ease-out;
    transition-property: all;
    transition-property: width, height;
}

.preview-frame.is-tablet {
    width: 768px;
    height: 1024px;
}

.preview-frame.is-mobile {
    width: 360px;
    height: 640px;
}

@media (min-width:960px) {
    .preview-section {
        padding-left: 3rem;
        padding-right: 3rem;
    }
}

@media (min-width:1200px) {
    .preview-section {
        padding-left: 5rem;
        padding-right: 5rem;
    }

    .preview-header {
        height: 120px;
    }

    .preview-frame {
        height: calc(100vh - 120px);
        max-height: calc(100vh - 120px);
    }
}

.preview-frame>* {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 0;
}




</style>