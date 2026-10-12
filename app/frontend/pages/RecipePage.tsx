import { Link, useParams } from "react-router"
import { Card } from "../components/Card"
import { PageHeader } from "../components/PageHeader"
import { useRecipe, type Recipe } from "../hooks/useRecipe"

const dateFormat = new Intl.DateTimeFormat(undefined, { dateStyle: "long" })

function BackLink() {
  return (
    <Link
      to="/"
      className="mb-6 inline-flex items-center gap-1.5 rounded-lg text-sm font-medium text-slate-500 transition hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
    >
      <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
      </svg>
      New recipe
    </Link>
  )
}

function RecipeSkeleton() {
  return (
    <div className="animate-pulse space-y-4" aria-label="Loading recipe">
      <div className="h-4 w-32 rounded bg-slate-200" />
      <div className="h-9 w-2/3 rounded-lg bg-slate-200" />
      <div className="h-48 rounded-2xl bg-slate-200/70" />
    </div>
  )
}

function Message({ title, body }: { title: string; body: string }) {
  return (
    <Card>
      <h1 className="text-lg font-semibold">{title}</h1>
      <p className="mt-1 text-sm text-slate-600">{body}</p>
    </Card>
  )
}

function RecipeDetail({ recipe }: { recipe: Recipe }) {
  return (
    <>
      <PageHeader title={recipe.title}>Created {dateFormat.format(new Date(recipe.created_at))}</PageHeader>
      <Card>
        <div className="space-y-8">
          <section>
            <h2 className="mb-2 text-sm font-medium text-slate-700">Description</h2>
            {recipe.description ? (
              <p className="leading-relaxed whitespace-pre-line text-slate-700">{recipe.description}</p>
            ) : (
              <p className="text-sm text-slate-400">No description.</p>
            )}
          </section>

          {recipe.video_url && (
            <section>
              <h2 className="mb-2 text-sm font-medium text-slate-700">Video</h2>
              <video src={recipe.video_url} controls className="aspect-video w-full rounded-xl bg-slate-900" />
            </section>
          )}

          {recipe.image_urls.length > 0 && (
            <section>
              <h2 className="mb-2 text-sm font-medium text-slate-700">Images</h2>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {recipe.image_urls.map((url, index) => (
                  <li key={url}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="group block overflow-hidden rounded-xl bg-slate-100 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      <img
                        src={url}
                        alt={`${recipe.title} image ${index + 1}`}
                        className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </Card>
    </>
  )
}

export function RecipePage() {
  const { id } = useParams()
  const state = useRecipe(id!)

  return (
    <>
      <BackLink />
      {state.status === "loading" && <RecipeSkeleton />}
      {state.status === "not_found" && <Message title="Recipe not found" body="It may have been deleted, or the link is wrong." />}
      {state.status === "error" && <Message title="Something went wrong" body="The recipe could not be loaded. Please try again." />}
      {state.status === "loaded" && <RecipeDetail recipe={state.recipe} />}
    </>
  )
}
