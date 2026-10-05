import { useCallback, useState } from "react"
import { DirectUpload } from "@rails/activestorage"

export type UploadStatus = "uploading" | "uploaded" | "failed"

export interface Upload {
  id: number
  file: File
  progress: number
  status: UploadStatus
  signedId?: string
  error?: string
}

const DIRECT_UPLOADS_URL = "/rails/active_storage/direct_uploads"

export function useDirectUploads(url = DIRECT_UPLOADS_URL) {
  const [uploads, setUploads] = useState<Upload[]>([])

  const update = useCallback((id: number, changes: Partial<Upload>) => {
    setUploads((current) => current.map((upload) => (upload.id === id ? { ...upload, ...changes } : upload)))
  }, [])

  const add = useCallback(
    (files: Iterable<File>) => {
      for (const file of files) {
        const directUpload = new DirectUpload(file, url, {
          directUploadWillStoreFileWithXHR: (xhr) => {
            xhr.upload.addEventListener("progress", (event) => {
              if (event.lengthComputable) update(directUpload.id, { progress: event.loaded / event.total })
            })
          },
        })

        setUploads((current) => [...current, { id: directUpload.id, file, progress: 0, status: "uploading" }])

        directUpload.create((error, blob) => {
          if (error || !blob) {
            update(directUpload.id, { status: "failed", error: String(error) })
          } else {
            update(directUpload.id, { status: "uploaded", progress: 1, signedId: blob.signed_id })
          }
        })
      }
    },
    [url, update],
  )

  const remove = useCallback((id: number) => {
    setUploads((current) => current.filter((upload) => upload.id !== id))
  }, [])

  const clear = useCallback(() => setUploads([]), [])

  return {
    uploads,
    add,
    remove,
    clear,
    signedIds: uploads.flatMap((upload) => (upload.signedId ? [upload.signedId] : [])),
    isUploading: uploads.some((upload) => upload.status === "uploading"),
    hasErrors: uploads.some((upload) => upload.status === "failed"),
  }
}
