import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Banner from "./components/Banner";

import TermPage from "./components/TermPage";
import { CourseEditForm } from "./components/CourseEditForm";
import { useDbData } from "./utilities/firebase";

import { useProfile } from "./utilities/profile";

const CourseEditFormForUrl = ({ courses }) => {
  const { id } = useParams();
  return <CourseEditForm courses={courses} id={id} />;
};

const Main = () => {
  const [data, error] = useDbData("/");
  const [profile, profileLoading, profileError] = useProfile();

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
  if (profileLoading) return <h1>Loading user profile</h1>;
  if (!profile) return <h1>No profile data</h1>;

  return (
    <div>
      <Banner title={data.title} user={profile.user} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <TermPage courses={data.courses} isAdmin={profile.isAdmin} />
            }
          />
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
