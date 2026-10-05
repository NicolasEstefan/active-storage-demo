import type { Upload } from "../hooks/useDirectUploads"
import { FilePreview } from "./FilePreview"

interface UploadListProps {
  uploads: Upload[]
  onRemove: (id: number) => void
}

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function UploadStatusLine({ upload }: { upload: Upload }) {
  if (upload.status === "failed") {
    return <p className="truncate text-xs text-rose-600">{upload.error}</p>
  }

  if (upload.status === "uploaded") {
    return (
      <p className="flex items-center gap-1 text-xs font-medium text-emerald-600">
        <svg className="size-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
        Uploaded · {formatBytes(upload.file.size)}
      </p>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-indigo-500 transition-[width] duration-200"
          style={{ width: `${Math.round(upload.progress * 100)}%` }}
        />
      </div>
      <span className="w-9 text-right text-xs text-slate-500 tabular-nums">{Math.round(upload.progress * 100)}%</span>
    </div>
  )
}

export function UploadList({ uploads, onRemove }: UploadListProps) {
  if (uploads.length === 0) return null

  return (
    <ul className="mt-3 space-y-2">
      {uploads.map((upload) => (
        <li key={upload.id} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-2 pr-3">
          <FilePreview file={upload.file} />
          <div className="min-w-0 flex-1 space-y-1">
            <p className="truncate text-sm font-medium text-slate-800">{upload.file.name}</p>
            <UploadStatusLine upload={upload} />
          </div>
          <button
            type="button"
            onClick={() => onRemove(upload.id)}
            aria-label={`Remove ${upload.file.name}`}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
          >
            <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </li>
      ))}
    </ul>
  )
}
