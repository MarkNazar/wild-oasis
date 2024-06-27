import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";

import useUser from "../features/authentication/useUser";
import { Navigate } from "react-router-dom";
import Spinner from "../ui/Spinner";

import CabinTable from "../features/cabins/CabinTable";
const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Login() {
  const { isLoadingUser, isAuthenticated, isFetching } = useUser();
  if (isLoadingUser)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  if (!isLoadingUser && isAuthenticated && !isFetching)
    return <Navigate to="/dashboard" />;
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Login to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
