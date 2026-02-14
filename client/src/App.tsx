import { useGetFormsQuery } from './app/api';

function App() {
  const { data, isLoading, error } = useGetFormsQuery();

  if (isLoading) return <div>Loading ..</div>;
  if (error) return <div>Error...</div>;

  return (
    <div className="text-3xl font-bold text-red-500">
      {data?.forms.map((f) => (
        <>
          <p>{f.id}</p>
          <p>{f.title}</p>
          <p>{f.description}</p>
          <hr />
        </>
      ))}
    </div>
  );
}

export default App;
