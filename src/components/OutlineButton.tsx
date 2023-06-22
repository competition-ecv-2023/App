import React from "react";
import {StyleSheet, TouchableOpacity, Text} from "react-native";

interface OutlineButtonProps {
    onPress?: () => void;
    title: string;
    disabled?: boolean;
}

const OutlineButton = ({onPress, title, disabled}: OutlineButtonProps) => {

    return (
        <TouchableOpacity onPress={onPress} style={{padding: 10}} disabled={disabled}>
            <Text style={[styles.button, disabled ? styles.disabled : {}]}>{title}</Text>
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
    },
    disabled: {
        borderColor: "#e4e4e4",
        color: "#e4e4e4"
    }
})

export default OutlineButton;
