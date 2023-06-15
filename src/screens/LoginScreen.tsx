import {Button, ButtonProps, Input, Layout, Spinner, Text} from "@ui-kitten/components";
import ScreenContainer from "../components/ScreenContainer";
import React, {useEffect, useState} from "react";
import {Routes} from "../navigation/Route";
import {ScreenProps} from "../interfaces/ScreenProps";
import PasswordInput from "../components/PasswordInput";
import {useAuthentication} from "../context/Authentication";
import {ImageProps, View} from "react-native";

const LoadingIndicator = (props: ImageProps): React.ReactElement => (
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
        <ScreenContainer withScroll>
            <Layout style={{height: '50%', alignItems: "center", justifyContent: "center"}}>
                <Text category={'h1'}>
                    Pat'Perdue
                </Text>
            </Layout>
            <Layout style={{padding: 10, alignItems: "center", justifyContent: "space-evenly"}}>
                <Input
                    style={{marginBottom: 10}}
                    value={email}
                    onChangeText={newValue => setEmail(newValue)}
                    label="Email"
                    placeholder="Votre email"
                />
                <PasswordInput
                    style={{marginBottom: 10}}
                    value={password}
                    label="Mot de passe"
                    placeholder="Mot de passe"
                    onChangeText={newValue => setPassword(newValue)}
                />
                <Button
                    style={{marginBottom: 10}}
                    size={"large"}
                    onPress={handleLogin}
                    disabled={loading || email.length === 0 || password.length <= 8}
                    // @ts-ignore
                    accessoryLeft={loading ? LoadingIndicator : () => {}}
                >
                    Me connecter
                </Button>
                <Text category={'label'} onPress={() => navigation.navigate(Routes.REGISTER_SCREEN)}>
                    Pas encore de compte ? <Text style={{textDecorationLine: "underline"}}>Inscrivez-vous</Text>
                </Text>
            </Layout>
        </ScreenContainer>
    )
}

export default LoginScreen;
