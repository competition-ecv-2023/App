import {Icon, IconElement, Text, TopNavigation, TopNavigationAction} from "@ui-kitten/components";
import React from "react";
import {StatusBar} from "react-native";
import {NativeStackHeaderProps} from "@react-navigation/native-stack/lib/typescript/src/types";
import {BottomTabHeaderProps} from "@react-navigation/bottom-tabs";

const BackIcon = (props: any): IconElement => (
    <Icon
        {...props}
        name='arrow-back'
        pack={'ionicons'}
    />
);
const CustomHeader = (props: NativeStackHeaderProps|BottomTabHeaderProps) => {

    return (
        <TopNavigation
            title={evaProps => <Text {...evaProps} style={{fontWeight: "700"}}>{props.route.name}</Text>}
            style={{paddingTop: StatusBar.currentHeight}}
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

export default CustomHeader;
