import { Button, Input, Layout, Text } from "@ui-kitten/components";
import ScreenContainer from "../components/ScreenContainer";
import { ScreenProps } from "../interfaces/ScreenProps";
import React, { useEffect, useState } from "react";
import PasswordInput from "../components/PasswordInput";
import { LoadingIndicator } from "./LoginScreen";
import { AxiosError } from "axios";
import { useApi } from "../hooks/UseApi";
import { Routes } from "../navigation/Route";
import OrSeparator from "../components/OrSeparator";
import PatPerdueButton from "../components/PatPerdueButton";

interface RegisterErrors {
  email?: string;
  username?: string;
  password?: string;
  passwordToVerify?: string;
}

const RegisterScreen = ({ navigation }: ScreenProps) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordToVerify, setPasswordToVerify] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<RegisterErrors>({});

  const api = useApi();

  const handleRegister = async () => {
    setLoading(true);
    api
      .post(
        "users",
        {
          email,
          password,
          passwordToVerify,
          username,
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then(() => {
        setLoading(false);
        navigation.navigate(Routes.LOGIN_SCREEN);
      })
      .catch((error: AxiosError) => {
        const message = error.response?.headers["x-error-message"];
        const errorField = error.response?.headers["x-error-field"];
        console.log(errorField);
        // @ts-ignore
        setErrors((old) => ({ [errorField]: message }));
        setLoading(false);
      });
  };

  const renderErrorCaption = (field: string) => (
    // @ts-ignore
    <Text style={{ color: "red", fontSize: 12 }}>{errors[field]}</Text>
  );

  return (
    <ScreenContainer withScroll backgroundColor={"#1B404E"}>
      <Layout style={{ padding: 10 }}>
        <Input
          style={{ marginBottom: 10, borderRadius: 10 }}
          value={email}
          onChangeText={(newValue) => setEmail(newValue)}
          label="Email"
          placeholder="Votre email"
          caption={() => renderErrorCaption("email")}
          status={errors["email"] ? "danger" : "basic"}
          keyboardType={"email-address"}
          size="large"
          cursorColor={"white"}
        />
        <Input
          style={{ marginBottom: 10, borderRadius: 10 }}
          value={username}
          onChangeText={(newValue) => setUsername(newValue)}
          label="Pseudo"
          placeholder="Votre username"
          caption={() => renderErrorCaption("username")}
          status={errors["username"] ? "danger" : "basic"}
          size="large"
          cursorColor={"white"}
        />
        <PasswordInput
          style={{ marginBottom: 10, borderRadius: 10 }}
          value={password}
          onChangeText={(newValue) => setPassword(newValue)}
          label="Mot de passe (8 caractères minimum)"
          placeholder="Votre mot de passe"
          caption={() => renderErrorCaption("password")}
          status={errors["password"] ? "danger" : "basic"}
          size="large"
          cursorColor={"white"}
        />
        <PasswordInput
          style={{ marginBottom: 10, borderRadius: 10 }}
          value={passwordToVerify}
          onChangeText={(newValue) => setPasswordToVerify(newValue)}
          label="Confirmation du mot de passe"
          placeholder="Confirmez votre mot de passe"
          caption={() => renderErrorCaption("passwordToVerify")}
          status={errors["passwordToVerify"] ? "danger" : "basic"}
          size="large"
          cursorColor={"white"}
        />
        <Button
          style={{
            marginBottom: 10,
            borderRadius: 10,
            backgroundColor:
              loading ||
              email.length === 0 ||
              username.length === 0 ||
              password.length < 8 ||
              password !== passwordToVerify
                ? "#55717AA3"
                : "#68A57D",
            borderColor:
              loading ||
              email.length === 0 ||
              username.length === 0 ||
              password.length < 8 ||
              password !== passwordToVerify
                ? "#55717AA3"
                : "#68A57D",
          }}
          size={"large"}
          onPress={handleRegister}
          disabled={
            loading ||
            email.length === 0 ||
            username.length === 0 ||
            password.length < 8 ||
            password !== passwordToVerify
          }
          // @ts-ignore
          accessoryLeft={loading ? LoadingIndicator : () => {}}
          textStyle={{
            color:
              loading ||
              email.length === 0 ||
              username.length === 0 ||
              password.length < 8 ||
              password !== passwordToVerify
                ? "#AAAAAA"
                : "#FFFFFF",
          }}
        >
          S'inscrire
        </Button>
        <OrSeparator color="#fff" />
        <PatPerdueButton
          title="Se connecter"
          backgroundColor="#68A57D"
          onPress={() => navigation.navigate(Routes.LOGIN_SCREEN)}
        />
        <PatPerdueButton
          title="Se connecter avec Google"
          backgroundColor="#55717AA3"
        />
        <PatPerdueButton
          title="Se connecter avec Facebook"
          backgroundColor="#55717AA3"
        />
      </Layout>
    </ScreenContainer>
  );
};

export default RegisterScreen;
