import React from "react";
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from "react-native";
import {Layout} from "@ui-kitten/components";

interface AuthenticationProviderProps {
    children: React.ReactNode;
    withScroll?: boolean;
    backgroundColor?: string;
}

const ScreenContainer = ({children, withScroll = false, backgroundColor = 'white'}: AuthenticationProviderProps) => {

    if (withScroll) {
        return (
            <ScrollView style={{...styles.container, backgroundColor}} nestedScrollEnabled>
                <Layout style={{height: "100%", backgroundColor: "transparent"}}>
                    {children}
                </Layout>
            </ScrollView>
        )
    }

    return (
        <SafeAreaView
            style={{...styles.container, backgroundColor}}
        >
            <Layout style={{flex: 1, backgroundColor: "transparent"}}>
                {children}
            </Layout>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default ScreenContainer;
