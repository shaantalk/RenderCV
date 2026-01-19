import type { ITextContentData } from '#widgets/types'

interface TextContentProps {
  data: ITextContentData['propsData']
}

export function TextContent({ data }: TextContentProps) {
  const { content } = data

  // Ensure all links open in new tab
  const safeContent = content.replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" ')

  return (
    <div
      className="tiptap flex flex-col justify-center"
      dangerouslySetInnerHTML={{ __html: safeContent }}
    ></div>
  )
}
