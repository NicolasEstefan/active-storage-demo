import { BrowserRouter, Route, Routes } from "react-router"
import { NewRecipePage } from "../pages/NewRecipePage"
import { RecipePage } from "../pages/RecipePage"

export function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4 py-12 font-sans text-slate-900 antialiased sm:py-20">
        <div className="mx-auto max-w-2xl">
          <Routes>
            <Route path="/" element={<NewRecipePage />} />
            <Route path="/recipes/:id" element={<RecipePage />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  )
}
