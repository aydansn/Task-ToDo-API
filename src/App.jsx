import { QueryClient, QueryClientProvider } from "react-query";
import TaskPage from "./pages/TaskPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TaskPage />
    </QueryClientProvider>
  );
}

export default App;
