interface ImageViewerProps {
  imageUrl: string
}

export default function ImageViewer({ imageUrl }: ImageViewerProps) {
  return (
    <div className="image-viewer">
      <img src={imageUrl} alt="Room Guide" />
    </div>
  )
}
