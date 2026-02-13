import { useHelloQuery } from './app/api';

function App() {
  const { data, isLoading, error } = useHelloQuery();

  if (isLoading) return <div>Loading ..</div>;
  if (error) return <div>Error...</div>;

  return <div className="text-3xl font-bold text-red-500">{data?.hello}</div>;
}

export default App;

