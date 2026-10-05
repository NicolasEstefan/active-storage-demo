import { useState, type ChangeEvent, type DragEvent } from "react"

interface FileDropzoneProps {
  label: string
  hint: string
  accept: string
  multiple?: boolean
  onFiles: (files: File[]) => void
}

function matchesAccept(file: File, accept: string) {
  return accept.split(",").some((pattern) => {
    const type = pattern.trim()
    return type.endsWith("/*") ? file.type.startsWith(type.slice(0, -1)) : file.type === type
  })
}

export function FileDropzone({ label, hint, accept, multiple = false, onFiles }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)

  function handleFiles(files: File[]) {
    const accepted = files.filter((file) => matchesAccept(file, accept))
    if (accepted.length > 0) onFiles(multiple ? accepted : accepted.slice(0, 1))
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    handleFiles(Array.from(event.target.files ?? []))
    event.target.value = ""
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault()
    setIsDragging(false)
    handleFiles(Array.from(event.dataTransfer.files))
  }

  return (
    <label
      onDragOver={(event) => {
        event.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed px-6 py-8 text-center transition focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 ${
        isDragging ? "border-indigo-500 bg-indigo-50" : "border-slate-200 bg-slate-50/50 hover:border-indigo-300 hover:bg-indigo-50/40"
      }`}
    >
      <svg className="mb-2 size-8 text-indigo-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
      </svg>
      <span className="text-sm font-medium text-slate-700">
        <span className="text-indigo-600">{label}</span> or drag and drop
      </span>
      <span className="text-xs text-slate-500">{hint}</span>
      <input type="file" accept={accept} multiple={multiple} onChange={handleChange} className="sr-only" />
    </label>
  )
}
