import type {
  TableOfContents as TableOfContentsProps,
  ContentWithMedia as ContentWithMediaProps,
} from '@/payload-types'
import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
import { JSXConvertersFunction, LinkJSXConverter } from '@payloadcms/richtext-lexical/react'
import { ContentWithMedia } from '@/blocks/ContentWithMedia/Component'
import { TableOfContents } from '@/blocks/TableOfContent/Component'
import { internalDocToHref } from './internalLink'
import { headingConverter } from './headingConverter'

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<TableOfContentsProps | ContentWithMediaProps>


export const jsxConverter: JSXConvertersFunction<NodeTypes> = ({defaultConverters}) => ({
  ...defaultConverters,
  ...LinkJSXConverter({internalDocToHref}),
  ...headingConverter,
  blocks: {
    contentWithMedia: ({node}) => <ContentWithMedia {...node.fields} />,
    tableOfContents: ({node}) => <TableOfContents {...node.fields} />,
  }
})