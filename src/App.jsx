import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useJsonQuery } from "./utilities/fetch";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Banner from "./components/Banner";

import TermPage from "./components/TermPage";
import { CourseEditForm } from "./components/CourseEditForm";

const CourseEditFormForUrl = ({ courses }) => {
  const { id } = useParams();
  return <CourseEditForm courses={courses} id={id} />;
};

const Main = () => {
  const [data, isLoading, error] = useJsonQuery(
    "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php"
  );

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;

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
