import { useState } from 'react';
import {View,Text} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
function Piechart({width,height,data,children}){
  return(
     <PieChart style={{width:width,height:height}} data={data} innerRadius={"95%"} padAngle={0} />
  )
}
export default Piechart;