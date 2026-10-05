import { useEffect, useState } from "react"

interface FilePreviewProps {
  file: File
}

export function FilePreview({ file }: FilePreviewProps) {
  const [url, setUrl] = useState<string>()

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file)
    setUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  const className = "size-14 shrink-0 rounded-lg bg-slate-100 object-cover"

  if (!url) return <div className={className} />
  if (file.type.startsWith("video/")) return <video src={url} className={className} muted />
  return <img src={url} alt="" className={className} />
}
