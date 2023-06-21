import React from "react";
import {StyleSheet, TouchableOpacity, Text} from "react-native";

interface OutlineButtonProps {
    onPress?: () => void;
    title: string;
}

const OutlineButton = ({onPress, title}: OutlineButtonProps) => {

    return (
        <TouchableOpacity onPress={onPress} style={{padding: 10}}>
            <Text style={styles.button}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 3,
        borderColor: "#F19B3F",
        textTransform: "uppercase",
        color: "#F19B3F",
        borderRadius: 8,
        textAlign: "center",
        fontFamily: "Work-Sans-900",
        fontSize: 16,
        padding: 15,
        marginTop: 20,
        marginBottom: 20,
    }
})

export default OutlineButton;
