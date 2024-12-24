import { Outlet, Route, Routes } from 'react-router';
import BaseLayout from './views/BaseLayout';
import Home from './views/Home';
import AboutUs from './views/AboutUs'
import AvailableCats from './views/AvailableCats';

function App() {
  return (
    <Routes>
      <Route
        element={
          <BaseLayout>
            <Outlet />
          </BaseLayout>
        }
      >
        <Route path={'/'} element={<Home />} />
        <Route path={'/about'} element={<AboutUs />} />
        <Route path={'/available-cats'} element={<AvailableCats />} />
      </Route>
    </Routes>
  );
}

export default App;
