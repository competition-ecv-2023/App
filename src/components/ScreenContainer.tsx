import React from "react";
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from "react-native";
import {Layout} from "@ui-kitten/components";

interface AuthenticationProviderProps {
    children: React.ReactNode;
    withScroll?: boolean;
}

const ScreenContainer = ({children, withScroll = false}: AuthenticationProviderProps) => {

    if (withScroll) {
        return (
            <ScrollView style={styles.container} contentContainerStyle={{flex: 1}}>
                <Layout style={{height: '100%'}}>
                    {children}
                </Layout>
            </ScrollView>
        )
    }

    return (
        <SafeAreaView
            style={styles.container}
        >
            <Layout style={{flex: 1}}>
                {children}
            </Layout>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default ScreenContainer;
