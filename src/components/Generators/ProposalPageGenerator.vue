<template>
  <section class="main-content columns is-fullheight">
    <aside class="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
      <p class="menu-label is-hidden-touch">Navigation</p>
      <ul class="menu-list">
        <li v-for="navItem in proposalPageDetails" :key="navItem.nav_id"
          >
          <a class="" :class="[ isCNav == navItem.id ? 'is-active' : '']" @click.stop="changePage(navItem.nav_id)">
          {{navItem.name}}
          </a>
        </li>
      </ul>
    </aside>
    <div class="container column is-10">
       
      <div class="section" v-html="previewText">
      </div>
    </div>
  </section>
</template>

<script>
var marked = require('marked');
export default {
    name: 'proposalPageGenerator',
    props: ['firstPage', 'proposalPageDetails', 'proposalPageContent'],
    data() {
        return {
            pageID: '',
            activePage: ''
        }
    },
    methods: {
        changePage(pageID) {
            this.$emit('changeProposalPage', pageID);
            return;
        }
    },
    computed: {
        isCurrentPage() {
            let cPage = this.proposalPageDetails[0];
            this.activePage = cPage;
            return cPage;
        },
        previewText() {
            const propContent = this.proposalPageContent;
            let activeNav = this.firstPage;
            let content = propContent.filter(function(mdcontent) {
                return mdcontent.page === activeNav;
            }).map(function(jedi) {
                return jedi.content;
            });

            console.log(content.join(''))
            marked.setOptions({
                renderer: new marked.Renderer(),
                gfm: true,
                tables: true,
                breaks: true,
                pedantic: false,
                sanitize: true,
                smartLists: true,
                smartypants: false
            });
            return marked(content.join(''))
        },
        isCNav() {
            return this.firstPage;
        }
    }
}
</script>

<style scoped>
@import url("../../styles/md/gitmd.css");
</style>