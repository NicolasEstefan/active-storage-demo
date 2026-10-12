import { useEffect, useState } from "react"

export interface Recipe {
  id: number
  title: string
  description: string | null
  created_at: string
  updated_at: string
  image_urls: string[]
  video_url?: string
}

type RecipeState =
  | { status: "loading" }
  | { status: "loaded"; recipe: Recipe }
  | { status: "not_found" }
  | { status: "error" }

export function useRecipe(id: string) {
  const [state, setState] = useState<RecipeState>({ status: "loading" })

  useEffect(() => {
    const controller = new AbortController()
    setState({ status: "loading" })

    fetch(`/recipes/${id}`, { headers: { Accept: "application/json" }, signal: controller.signal })
      .then(async (response) => {
        if (response.status === 404) setState({ status: "not_found" })
        else if (!response.ok) setState({ status: "error" })
        else setState({ status: "loaded", recipe: await response.json() })
      })
      .catch(() => {
        if (!controller.signal.aborted) setState({ status: "error" })
      })

    return () => controller.abort()
  }, [id])

  return state
}
