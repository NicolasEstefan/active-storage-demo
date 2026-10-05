import { useState, type SubmitEvent } from "react"
import { useDirectUploads } from "../hooks/useDirectUploads"
import { FileDropzone } from "./FileDropzone"
import { UploadList } from "./UploadList"

interface CreatedRecipe {
  id: number
  title: string
}

const inputClassName =
  "block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-xs placeholder:text-slate-400 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"

export function RecipeForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [createdRecipe, setCreatedRecipe] = useState<CreatedRecipe>()
  const images = useDirectUploads()
  const video = useDirectUploads()

  const isUploading = images.isUploading || video.isUploading
  const hasUploadErrors = images.hasErrors || video.hasErrors

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setErrors([])
    setCreatedRecipe(undefined)

    try {
      const response = await fetch("/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          recipe: { title, description, images: images.signedIds, video: video.signedIds[0] },
        }),
      })
      const data = await response.json()

      if (response.ok) {
        setCreatedRecipe(data)
        setTitle("")
        setDescription("")
        images.clear()
        video.clear()
      } else {
        setErrors(data.errors ?? ["Something went wrong."])
      }
    } catch {
      setErrors(["Could not create the recipe. Please try again."])
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur sm:p-8"
    >
      {createdRecipe && (
        <div className="flex items-center justify-between gap-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <span>
            Recipe <strong className="font-semibold">{createdRecipe.title}</strong> created.
          </span>
          <a href={`/recipes/${createdRecipe.id}`} target="_blank" rel="noreferrer" className="font-medium underline underline-offset-2 hover:text-emerald-950">
            View JSON
          </a>
        </div>
      )}

      {errors.length > 0 && (
        <ul className="space-y-1 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-slate-700">
          Title
        </label>
        <input
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Milanesa a la napolitana"
          className={inputClassName}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-slate-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={4}
          placeholder="Ingredients, steps, tips..."
          className={`${inputClassName} resize-y`}
        />
      </div>

      <div>
        <h2 className="mb-2 text-sm font-medium text-slate-700">Images</h2>
        <FileDropzone label="Choose images" hint="PNG, JPG, WEBP" accept="image/*" multiple onFiles={images.add} />
        <UploadList uploads={images.uploads} onRemove={images.remove} />
      </div>

      <div>
        <h2 className="mb-2 text-sm font-medium text-slate-700">Video</h2>
        <FileDropzone
          label="Choose a video"
          hint="MP4, WEBM, MOV"
          accept="video/*"
          onFiles={(files) => {
            video.clear()
            video.add(files)
          }}
        />
        <UploadList uploads={video.uploads} onRemove={video.remove} />
      </div>

      <div className="flex items-center justify-end gap-4 border-t border-slate-100 pt-6">
        {isUploading && <span className="text-sm text-slate-500">Waiting for uploads to finish...</span>}
        {hasUploadErrors && <span className="text-sm text-rose-600">Remove failed uploads to continue.</span>}
        <button
          type="submit"
          disabled={isSubmitting || isUploading || hasUploadErrors}
          className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-600/30 transition hover:bg-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Create recipe"}
        </button>
      </div>
    </form>
  )
}
