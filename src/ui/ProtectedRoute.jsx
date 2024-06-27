import { Navigate, useNavigate } from "react-router-dom";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  //1. load the authenticated user
  const { isLoadingUser, isAuthenticated, isFetching } = useUser();

  //3. If there is no authenticated user, redirect to login
  useEffect(() => {
    if (!isAuthenticated && !isLoadingUser && !isFetching) navigate("/login");
  }, [isAuthenticated, isFetching, isLoadingUser, navigate]);

  //2. While loading, show spinner,
  if (isLoadingUser)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4. if there is authenticated user, render app
  if (isAuthenticated) return children;
};

export default ProtectedRoute;
