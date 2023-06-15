import {Button} from "@ui-kitten/components";
import {StyleSheet} from "react-native";

interface PatPerdueButtonProps {
    onPress?: () => void;
    title: string;
    backgroundColor?: string;
}

const PatPerdueButton = ({title, backgroundColor, onPress}: PatPerdueButtonProps) => {

    return (
        <Button style={[styles.button, {backgroundColor}]} onPress={onPress}>
            {title}
        </Button>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignSelf: "center",
        fontFamily: "Work-Sans-800",
        fontSize: 20
    }
})

export default PatPerdueButton;
