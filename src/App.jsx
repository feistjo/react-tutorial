import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Banner from "./components/Banner";

import TermPage from "./components/TermPage";
import { CourseEditForm } from "./components/CourseEditForm";
import { useDbData } from "./utilities/firebase";

const CourseEditFormForUrl = ({ courses }) => {
  const { id } = useParams();
  return <CourseEditForm courses={courses} id={id} />;
};

const Main = () => {
  const [data, error] = useDbData("/");

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  return (
    <div>
      <Banner title={data.title} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TermPage courses={data.courses} />} />
          <Route
            path="/course/:id/edit"
            element={<CourseEditFormForUrl courses={data.courses} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className="container">
      <Main />
    </div>
  </QueryClientProvider>
);

export default App;
