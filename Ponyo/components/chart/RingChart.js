import { Text, View } from "react-native";
// import ActivityRings from "react-native-activity-rings"; 


function RingChart({p1,p2,p3,width,height}) {
        const activityData = [ 
          { value: p1,color:"#F2FA9B" }, 
          { value: p2 ,color:"#FFB800"}, 
          { value: p3 ,color:"#FF0000"}
        ];
       
        const activityConfig = { 
          width: width ,
          height: height
        };
       
        return (
            <View>
           {/* <ActivityRings data={activityData} config={activityConfig} />  */}
           </View>
         
         );
       }  
    
export default RingChart;
