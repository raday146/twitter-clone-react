import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "../context/AuthContext";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry(failureCount, error) {
        if (error.status === 404) return false;
        else if (failureCount < 2) return true;
        else return false;
      },
    },
  },
});
const Providers = ({ childern }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {childern}
        <ReactQueryDevtools />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default Providers;
