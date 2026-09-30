import type { DemoState, MediaAsset, PageContent, SiteSettings, UserRole } from './demo-data'
import { initialDemoState } from './demo-data'

export type DemoAction =
  | { type: 'state.restored'; state: DemoState }
  | { type: 'role.changed'; role: UserRole }
  | { type: 'page.created'; page: DemoState['pages'][number] }
  | { type: 'page.draftSaved'; id: string; content: PageContent; title: string; slug: string; seoDescription: string }
  | { type: 'page.published'; id: string }
  | { type: 'news.saved'; item: DemoState['news'][number] }
  | { type: 'news.published'; id: string }
  | { type: 'media.added'; asset: MediaAsset }
  | { type: 'media.removed'; id: string }
  | { type: 'settings.saved'; settings: SiteSettings }
  | { type: 'demo.reset' }

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case 'state.restored':
      return action.state
    case 'role.changed':
      return { ...state, role: action.role }
    case 'page.created':
      return { ...state, pages: [action.page, ...state.pages] }
    case 'page.draftSaved':
      return {
        ...state,
        pages: state.pages.map((page) => {
          if (page.id !== action.id) return page
          return {
            ...page,
            title: action.title,
            slug: action.slug,
            seoDescription: action.seoDescription,
            draft: action.content,
            status: page.published ? 'changed' : 'draft',
            updatedAt: 'только что',
            author: 'Олег Якунин',
          }
        }),
      }
    case 'page.published':
      return {
        ...state,
        pages: state.pages.map((page) =>
          page.id === action.id
            ? { ...page, published: { ...page.draft }, status: 'published', updatedAt: 'только что' }
            : page,
        ),
      }
    case 'news.saved': {
      const exists = state.news.some((item) => item.id === action.item.id)
      return {
        ...state,
        news: exists
          ? state.news.map((item) => item.id === action.item.id ? action.item : item)
          : [action.item, ...state.news],
      }
    }
    case 'news.published':
      return {
        ...state,
        news: state.news.map((item) => item.id === action.id ? { ...item, status: 'published', updatedAt: 'только что' } : item),
      }
    case 'media.added':
      return { ...state, media: [action.asset, ...state.media] }
    case 'media.removed':
      return { ...state, media: state.media.filter((asset) => asset.id !== action.id) }
    case 'settings.saved':
      return { ...state, settings: action.settings }
    case 'demo.reset':
      return structuredClone(initialDemoState)
    default: {
      const unreachable: never = action
      return unreachable
    }
  }
}
