import {Icon, IconElement, Text, TopNavigation, TopNavigationAction} from "@ui-kitten/components";
import React from "react";
import {StatusBar, StyleSheet} from "react-native";
import {NativeStackHeaderProps} from "@react-navigation/native-stack/lib/typescript/src/types";
import {BottomTabHeaderProps} from "@react-navigation/bottom-tabs";

const BackIcon = (props: any): IconElement => (
    <Icon
        {...props}
        name='arrow-back'
        pack={'ionicons'}
    />
);
const CustomHeader = (props: (NativeStackHeaderProps|BottomTabHeaderProps)&{backgroundColor?: string, textColor?: string}) => {

    return (
        <TopNavigation
            title={evaProps => <Text {...evaProps} style={{...styles.title, color: props.textColor}}>{props.route.name}</Text>}
            style={{...styles.TopNavigation, backgroundColor: props.backgroundColor}}
            alignment="center"
            accessoryLeft={() => {
                // @ts-ignore
                if (props.back) {
                    return (
                        <TopNavigationAction
                            icon={BackIcon}
                            onPress={() => props.navigation.goBack()}
                        />

                    )
                }
                return (<></>)
            }}/>
    )
}


const styles = StyleSheet.create({
    title: {
        fontWeight: "700",
        fontSize: 25,
    },
    TopNavigation: {
        marginTop: StatusBar.currentHeight,
        display: "flex",
        alignItems: "center",
        backgroundColor: "transparent"
    }
})

export default CustomHeader;
