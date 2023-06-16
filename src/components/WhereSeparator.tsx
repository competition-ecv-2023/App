import {View} from "react-native";
import {Text} from "@ui-kitten/components";

interface WhereSeparatorProps {
    color?: string;
}
const WhereSeparator = ({color = "#1B404E"}) => (
    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 25}}>
        <View style={{width: "40%", backgroundColor: color, opacity: 0.64, height: 1}}/>
        <Text style={{color: color, fontFamily: "Work-Sans-700"}}>ou</Text>
        <View style={{width: "40%", backgroundColor: color, opacity: 0.64, height: 1}}/>
    </View>
)

export default WhereSeparator;
