type MDYouTubeEmbedProps = {
  videoId: string
  title?: string
}

const MDYouTubeEmbed = ({ videoId, title = 'YouTube video' }: MDYouTubeEmbedProps) => {
  return (
    <span className="my-6 block overflow-hidden rounded-xl">
      <span className="block aspect-video w-full bg-gray-200 dark:bg-gray-800">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </span>
    </span>
  )
}

export default MDYouTubeEmbed
