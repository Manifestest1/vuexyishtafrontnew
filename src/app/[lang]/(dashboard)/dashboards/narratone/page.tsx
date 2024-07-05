 // MUI Imports
 import Grid from '@mui/material/Grid'

 // Components Imports
 import WebsiteAnalyticsSlider from '@views/dashboards/analytics/WebsiteAnalyticsSlider'




 const Narratone = async () => {
   // Vars


   return (
     <Grid container spacing={6}>
       <Grid item xs={12} lg={6}>
         <WebsiteAnalyticsSlider />
       </Grid>
     </Grid>
   )
 }

 export default Narratone
