import React, { useContext, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper
} from "./styles";
import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";
import { ActivityIndicator, Alert } from "react-native";
import { useTheme } from "styled-components";

export const SignIn = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { signInWIthGoogle, signInWithApple } = useAuth();

  const handleSignInWIthGoogle = async () => {
    try {
      setIsLoading(true);
      return await signInWIthGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta google");
      setIsLoading(false);
    }
  };

  const handleSignInWIthApple = async () => {
    try {
      setIsLoading(true);
      return await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta apple");
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas {"\n"}
            finanças de forma {"\n"}
            muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu Login com uma {"\n"}
          das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            onPress={handleSignInWIthGoogle}
            title="Entrar com Google"
            svg={GoogleSvg}
          />
          <SignInSocialButton
            onPress={handleSignInWIthApple}
            title="Entrar com Apple"
            svg={AppleSvg}
          />

          {isLoading && <ActivityIndicator color={theme.colors.shape} />}
        </FooterWrapper>
      </Footer>
    </Container>
  );
};
