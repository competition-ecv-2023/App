import ScreenContainer from "../components/ScreenContainer";
import {Button, Input, Layout} from "@ui-kitten/components";
import {useState} from "react";

const CodeVerificationScreen = () => {

    const [code, setCode] = useState("");

    return (
        <ScreenContainer withScroll>
            <Layout style={{padding: 10}}>
                <Input
                    style={{marginBottom: 10}}
                    value={code}
                    onChangeText={newValue => setCode(newValue)}
                    label="Code de vérification"
                    placeholder="Votre code de vérification"
                />

                <Button disabled={code.length === 0} onPress={() => alert('Fetch vérification compte')}>
                    Confirmer la vérification de mon compte
                </Button>
            </Layout>
        </ScreenContainer>
    )
}

export default CodeVerificationScreen;
