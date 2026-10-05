import { RecipeForm } from "./RecipeForm"

export function App() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4 py-12 font-sans text-slate-900 antialiased sm:py-20">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <p className="text-sm font-semibold tracking-wide text-indigo-600 uppercase">Active Storage demo</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">New recipe</h1>
          <p className="mt-3 text-slate-600">
            Images and video upload straight to storage while you fill in the form.
          </p>
        </header>
        <RecipeForm />
      </div>
    </main>
  )
}
