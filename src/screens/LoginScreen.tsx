import {Button, Icon, Input, Layout, Text} from "@ui-kitten/components";
import ScreenContainer from "../components/ScreenContainer";
import React, {useState} from "react";
import {TouchableOpacity} from "react-native";
import {Routes} from "../navigation/Route";
import {ScreenProps} from "../interfaces/ScreenProps";
import PasswordInput from "../components/PasswordInput";

const LoginScreen = ({navigation}: ScreenProps) => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    }

    const renderIcon = (props: any): React.ReactElement => (
        <TouchableOpacity activeOpacity={0.5} onPress={toggleSecureEntry}>
            <Icon
                {...props}
                name={secureTextEntry ? 'eye-off' : 'eye'}
            />
        </TouchableOpacity>
    );

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
                    onPress={() => alert('Fetch login')}
                    disabled={email.length === 0 || password.length <= 8}
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
