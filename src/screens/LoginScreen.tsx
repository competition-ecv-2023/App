import {Button, ButtonProps, Input, Layout, Spinner, Text} from "@ui-kitten/components";
import ScreenContainer from "../components/ScreenContainer";
import React, {useEffect, useState} from "react";
import {Routes} from "../navigation/Route";
import {ScreenProps} from "../interfaces/ScreenProps";
import PasswordInput from "../components/PasswordInput";
import {useAuthentication} from "../context/Authentication";
import {ImageProps, StatusBar, View} from "react-native";
import {Image} from "expo-image";
import OrSeparator from "../components/OrSeparator";
import PatPerdueButton from "../components/PatPerdueButton";

export const LoadingIndicator = (props: ImageProps): React.ReactElement => (
    <View style={[props.style, {alignItems: "center", justifyContent: "center"}]}>
        <Spinner size='small' />
    </View>
);

const LoginScreen = ({navigation}: ScreenProps) => {

    const {login} = useAuthentication();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        return () => setLoading(false);
    }, [])

    const handleLogin = async () => {
        setLoading(true);
        const loginStatus: boolean = await login({email, passwordToVerify: password}) as boolean
        if (!loginStatus) {
            setLoading(false);
        }
    }

    return (
        <ScreenContainer withScroll backgroundColor={'#1B404E'}>
            <Layout style={{height: '35%', alignItems: "center", justifyContent: "center", paddingTop: StatusBar.currentHeight}}>
                <Image
                    source={require('../../assets/patperdue_logo.png')}
                    style={{
                        width: '75%',
                        height: '100%',
                    }}
                    contentFit={'contain'}
                />
            </Layout>
            <Layout style={{padding: 10, alignItems: "center", justifyContent: "space-evenly"}}>
                <Input
                    style={{marginBottom: 10, borderRadius: 10}}
                    size={"large"}
                    value={email}
                    onChangeText={newValue => setEmail(newValue)}
                    label="Email"
                    placeholder="Votre email"
                    keyboardType={"email-address"}
                    cursorColor={'white'}
                />
                <PasswordInput
                    style={{marginBottom: 20, borderRadius: 10}}
                    size={"large"}
                    value={password}
                    label="Mot de passe"
                    placeholder="Mot de passe"
                    onChangeText={newValue => setPassword(newValue)}
                    cursorColor={'white'}
                />
                <Button
                    style={{
                        marginBottom: 10,
                        borderRadius: 10,
                        width: "100%",
                        backgroundColor: loading || email.length === 0 || password.length < 8
                        ? '#55717AA3'
                        : '#68A57D',
                        borderColor: loading || email.length === 0 || password.length < 8
                        ? '#55717AA3'
                        : '#68A57D'}}
                    size={"large"}
                    onPress={handleLogin}
                    disabled={loading || email.length === 0 || password.length < 8}
                    // @ts-ignore
                    accessoryLeft={loading ? LoadingIndicator : () => {}}
                >
                    Se connecter
                </Button>
                <Text category={'label'} onPress={() => navigation.navigate(Routes.REGISTER_SCREEN)}>
                    Pas encore de compte ? <Text style={{textDecorationLine: "underline"}}>Inscrivez-vous</Text>
                </Text>
                <OrSeparator color="#fff"/>
                <PatPerdueButton title="Se connecter avec Google" backgroundColor="#55717AA3"/>
                <PatPerdueButton title="Se connecter avec Facebook" backgroundColor="#55717AA3"/>
            </Layout>
        </ScreenContainer>
    )
}

export default LoginScreen;
