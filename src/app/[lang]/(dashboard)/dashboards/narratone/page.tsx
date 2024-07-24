 // MUI Imports
 import Grid from '@mui/material/Grid'
 import ProtectedRoute from '@/context/ProtectedRoute'

 // Components Imports
 import WebsiteAnalyticsSlider from '@views/dashboards/analytics/WebsiteAnalyticsSlider'




 const Narratone = async () => {
   // Vars


   return (
    <ProtectedRoute>
     <Grid container spacing={6}>
       <Grid item xs={12} lg={6}>
         <WebsiteAnalyticsSlider />
       </Grid>
     </Grid>
     </ProtectedRoute>
   )
 }

 export default Narratone
