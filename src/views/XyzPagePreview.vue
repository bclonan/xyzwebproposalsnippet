<template>
  <body>
    <!-- preview header -->
    <nav class="level is-mobile has-shadow" style="min-height: 75px;
      background-color: orange;">
      <div class="level-item has-text-centered">
        <div class="field is-grouped">
          <p class="control">
            <a class="button is-link" @click.stop="selectDetails">
            Details
            </a>
          </p>
          <p class="control">
            <a class="button" @click.stop="resetSite">
            Pages
            </a>
          </p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="title is-size-1" style="color: white;">{{templateName}}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <div class="field is-grouped">
            <p class="control">
              <a v-if="ctaButton" :href="ctaLink" class="button is-medium preview-buy button is-primary">
              {{cta_text}}
              </a>
            </p>
          </div>
        </div>
      </div>
    </nav>
    <nav class="level is-mobile" v-if="pageViewMode == 'viewPage'">
      <div class="level-item has-text-centered is-size-4 sitename">
        {{previewData.name}}
      </div>
      <div class="level-item has-text-centered">
        <div>
          <span class="icon is-medium" @click.stop="changeViewMode('default')" :class="[ currentViewMode == 'default' ? 'is-active' : '']">
          <i class="fas fa-laptop"></i>
          </span>
          <span class="icon is-medium" @click.stop="changeViewMode('is-tablet')" :class="[ currentViewMode == 'is-tablet' ? 'is-active' : '']">
          <i class="fas fa-tablet"></i>
          </span>
          <span class="icon is-medium" @click.stop="changeViewMode('is-mobile')" :class="[ currentViewMode == 'is-mobile' ? 'is-active' : '']">
          <i class="fas fa-mobile"></i>
          </span>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <a class="button is-normal is-primary" @click.stop="resetSite">Go Back</a>
        </div>
      </div>
    </nav>
    <!--bottomsticky-->
    <nav class="level is-mobile bottominfo" v-if="pageViewMode == 'viewPage'">
      <div class="level-item has-text-centered" style="background: red;">
        <div>
          <p class="title is-size-1" style="color: white;">BEFORE</p>
        </div>
      </div>
      <div class="level-item has-text-centered" style="background: green;">
        <div>
          <p class="title is-size-1" style="color: white;">AFTER</p>
        </div>
      </div>
    </nav>
    <!--/bottomsticky-->
    <!-- pages and page view generator-->
    <div class="preview-body">
      <PreviewPageGenerator v-if="pageViewMode == 'viewPage'"
        :currentViewMode="currentViewMode"
        :previewData="previewData" />
      <CategoryListGenerator v-else-if="pageViewMode == 'pages'" 
        :categoryList="categoryList" 
        :websiteList="websiteList"
        @preview="selectPreviewUrl"
        @filterCategories="filterCats"
        />
    </div>
    <!-- /pages and page view generator-->
    <!-- Proposal generator-->
    <PropPagegenerator v-if="pageViewMode == 'details'" 
      :firstPage="firstPage"
      :proposalPageDetails="proposalPageDetails"
      :proposalPageContent="proposalPageContent"
      @changeProposalPage="propPage"
      />
    <!-- /Proposal generator-->
    <!-- Pricing generator-->
    <!-- /Pricing generator-->
  </body>
</template>

<script>
const uuidv1 = require('uuid/v1');
//Page Element Generators
//Handle editing story
import {
    handlePreviewData
} from "@/components/Mixins/handlePreviewData";
//Page Preview
import PreviewPageGenerator from "@/components/Generators/PreviewPageGenerator.vue";
//Category List
import CategoryListGenerator from "@/components/Generators/CategoryListGenerator.vue";
//Page Proposal
import PropPagegenerator from "@/components/Generators/ProposalPageGenerator.vue";
export default {
    name: 'PreviewMode',
    mixins: [handlePreviewData],
    components: {
        PreviewPageGenerator,
        CategoryListGenerator,
        PropPagegenerator
    },
    data() {
        return {
            trackVisId: uuidv1(),
            previewURL: null,
            templateName: null,
            showTemplates: true,
            choosenCategory: null,
            pageViewMode: 'pages',
            firstPage: '1',
            proposalPageContent: [{
                    page: '1',
                    block: 'text',
                    content: '# Marked in the browser\n\nRendered by **marked**.'
                },
                {
                    page: '1',
                    block: 'image',
                    content: '# Marked in the browser\n\nRendered by **marked**.'
                },
                {
                    page: '2',
                    block: 'image',
                    content: '# shouldnt be here at all\n\n\n## whoah'
                },
            ],
            proposalPageDetails: [{
                    name: 'Home',
                    nav_id: '1',
                    page: '1'
                },
                {
                    name: 'Pricing',
                    nav_id: '2',
                    page: '2'
                }
            ]
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

            this.pageViewMode = 'viewPage';
            this.previewData = i;
        },
        changeViewMode(mode) {
            this.currentViewMode = mode;
        },
        templateControls(templateMode) {
            this.showTemplates = templateMode;
        },
        resetSite() {
            this.pageViewMode = 'pages';
            this.previewData = null;
        },
        selectDetails() {

            this.pageViewMode = 'details';
        },
        propPage(propPageId) {
            this.firstPage = propPageId;
            return;
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


.pagename {
    font-size: 1.5em;
    margin-bottom: .6666em;
    color: #363636;
    font-weight: 600;
    line-height: 1.125;
   
}

.sitename {
  text-decoration: underline;
}

  .frameA>* {
    position: absolute;
    width: 50%;
    height: 100%;
    border: 0;
}

  .frameB>* {
    position: absolute;
    width: 50%;
    height: 100%;
    border: 0;
}

.bottominfo {
    z-index: 9999;
    bottom: 0;
    position: absolute;
    width: 100%;
}
</style>