import {Button} from "@ui-kitten/components";
import {StyleSheet} from "react-native";

interface PatPerdueButtonProps {
    onPress?: () => void;
    title: string;
    backgroundColor?: string;
}

const PatPerdueButton = ({title, backgroundColor, onPress}: PatPerdueButtonProps) => {

    return (
        <Button style={[styles.button, {backgroundColor}]} size="large" onPress={onPress}>
            {title}
        </Button>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 20,
        borderRadius: 10,
        width: '100%',
        alignSelf: "center",
        fontFamily: "Work-Sans-800",
        fontSize: 20,
        borderColor: "transparent",
        marginTop: 10,
    }
})

export default PatPerdueButton;
