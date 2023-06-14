import {Button, Input, Layout} from "@ui-kitten/components";
import ScreenContainer from "../components/ScreenContainer";
import {ScreenProps} from "../interfaces/ScreenProps";
import React, {useState} from "react";
import PasswordInput from "../components/PasswordInput";

const RegisterScreen = ({navigation}: ScreenProps) => {

    const [email, setEmail] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    return (
        <ScreenContainer withScroll>
            <Layout style={{padding: 10}}>
                <Input
                    style={{marginBottom: 10}}
                    value={email}
                    onChangeText={newValue => setEmail(newValue)}
                    label="Email"
                    placeholder="Votre email"
                />
                <Input
                    style={{marginBottom: 10}}
                    value={pseudo}
                    onChangeText={newValue => setPseudo(newValue)}
                    label="Pseudo"
                    placeholder="Votre pseudo"
                />
                <PasswordInput
                    style={{marginBottom: 10}}
                    value={password}
                    onChangeText={newValue => setPassword(newValue)}
                    label="Mot de passe"
                    placeholder="Votre mot de passe"
                />
                <PasswordInput
                    style={{marginBottom: 10}}
                    value={passwordConfirm}
                    onChangeText={newValue => setPasswordConfirm(newValue)}
                    label="Confirmation du mot de passe"
                    placeholder="Confirmez votre mot de passe"
                />
                <Button
                    style={{marginBottom: 10}}
                    size={"large"}
                    onPress={() => alert('Fetch inscription')}
                    disabled={email.length === 0 || pseudo.length === 0 || password.length <= 8 || password !== passwordConfirm}
                >
                    Créer mon compte
                </Button>
            </Layout>
        </ScreenContainer>
    )
}

export default RegisterScreen;
