const fb = require('@/services/firebase/init.js');
export const handlePreviewData = {
  data() {
    return {
      previewURL : null,
      websiteList : [{}],
      categoryList : [{}],
      templateName : null,
      ctaButton : null,
      ctaText : null,
      ctaLink : null,
      currentViewMode: 'default'

    };
  },
  methods: {
    fetchPreviewData() {
      let lID = this.$route.params.id;
      let previewCol = fb.leadWebPreview.doc(lID);

      previewCol.get()
        .then(doc => {
          if (!doc.exists) {
            this.$router.push({
              path: `/`
            })
          }
          else {
            
            let liveID = doc.data().live_id;
            let checkLive = doc.data().isLive;
            let livDataColumn = fb.leadWebPreview.doc(lID).collection("live").doc(liveID);
            if(!checkLive){
               this.$router.push({
                  path: `/`
               })
            } else {
               // Get live dat
            livDataColumn.get()
            .then(doc => {
             if (!doc.exists) {
              this.$router.push({
                path: `/`
              })
             } else {
            this.templateName = doc.data().previewTitle;
            this.websiteList = doc.data().previewList;
            this.categoryList = doc.data().previewCategories;

            this.ctaButton = doc.data().cta_button;
            this.ctaLink = doc.data().cta_link;
            this.ctaText = doc.data().cta_text;


          }
        }).catch(err => {
          console.log(err)
          this.$router.push({
            path: `/`
          })
        });
            
            
            
            
            
            
            // end live dat
            }
          }
        }).catch(err => {
          console.log(err)
          this.$router.push({
            path: `/`
          })
        });

    }

  },
  created() {
    this.fetchPreviewData();

  }
};