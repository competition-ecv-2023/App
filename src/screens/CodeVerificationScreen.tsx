import ScreenContainer from "../components/ScreenContainer";
import {Button, Input, Layout, Text} from "@ui-kitten/components";
import {useState} from "react";

const CodeVerificationScreen = () => {

    const [code, setCode] = useState("");

    return (
        <ScreenContainer withScroll>
            <Layout style={{padding: 10}}>
                <Text style={{textAlign: "center", padding: 10, marginBottom: 20}}>
                    Un code à 6 chiffres vous a été envoyé pour confirmer votre inscription à l'application Pat'Perdue.
                </Text>
                <Input
                    style={{marginBottom: 10, borderRadius: 10}}
                    value={code}
                    onChangeText={newValue => setCode(newValue)}
                    label="Code de vérification"
                    placeholder="Votre code de vérification"
                    size="large"
                    cursorColor={'white'}
                />

                <Button
                    style={{
                        backgroundColor: code.length === 0 ? '#55717AA3' : '#68A57D',
                        borderColor: code.length === 0 ? '#55717AA3' : '#68A57D',
                        marginTop: 20,
                        borderRadius: 10
                    }}
                    disabled={code.length === 0}
                    onPress={() => alert('Fetch vérification compte')}
                    size="large"
                >
                    Se connecter
                </Button>
            </Layout>
        </ScreenContainer>
    )
}

export default CodeVerificationScreen;
