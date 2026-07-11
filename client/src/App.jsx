import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout     from './layouts/MainLayout'
import DashboardPage  from './pages/DashboardPage'
import InteractionPage from './pages/InteractionPage'
import HistoryPage    from './pages/HistoryPage'
import SettingsPage   from './pages/SettingsPage'
import NotFoundPage   from './pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/"             element={<DashboardPage />}   />
          <Route path="/interactions" element={<InteractionPage />}  />
          <Route path="/history"      element={<HistoryPage />}      />
          <Route path="/settings"     element={<SettingsPage />}     />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
