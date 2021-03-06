import { MM_FAVICON_URL, MM_FB_APP_ID, MM_FB_PAGE_ID, MM_FB_PAGE_URL, MM_SITE_ASSETS_URL, MM_SITE_NAME, MM_SITE_URL } from '../constants'
import { PROJECTS_BELONGS_MM, PROJECTS_NEED_GOOGLE_MAP, PROJECTS_NEED_GOOGLE_RECAPTCHA, SCRIPT_GOOGLE_MAP, SCRIPT_GOOGLE_RECAPTCHA } from '../constants'
import { READR_FAVICON_URL, READR_FB_APP_ID, READR_FB_PAGE_ID, READR_FB_PAGE_URL, READR_SITE_ASSETS_URL, READR_SITE_NAME, READR_SITE_URL } from '../constants'

import { get } from 'lodash'

function getMetaInfo (vm) {
  const { metaInfo } = vm.$options
  if (metaInfo) {
    return typeof metaInfo === 'function'
      ? metaInfo.call(vm)
      : metaInfo
  }
}

const serverMetaInfoMixin = {
  created () {
    const metaInfo = getMetaInfo(this)
    if (metaInfo) {
      const project = get(this.$route, 'params.project')

      const siteName = PROJECTS_BELONGS_MM.includes(project) ? MM_SITE_NAME : READR_SITE_NAME
      const title = metaInfo.title ? `${metaInfo.title} - ${siteName}` : `${siteName}`
      const description = metaInfo.description || ` `
      const locale = metaInfo.locale || 'zh_TW'
      const metaUrl = metaInfo.metaUrl || ` `
      const metaImage = metaInfo.metaImage || ` `
      const favicon = PROJECTS_BELONGS_MM.includes(project) ? MM_FAVICON_URL : READR_FAVICON_URL
      const fbAppId = PROJECTS_BELONGS_MM.includes(project) ? MM_FB_APP_ID : READR_FB_APP_ID
      const fbPageId = PROJECTS_BELONGS_MM.includes(project) ? MM_FB_PAGE_ID : READR_FB_PAGE_ID
      const fbPageUrl = PROJECTS_BELONGS_MM.includes(project) ? MM_FB_PAGE_URL : READR_FB_PAGE_URL

      this.$ssrContext.title = title
      this.$ssrContext.description = description
      this.$ssrContext.locale = locale
      this.$ssrContext.metaUrl = PROJECTS_BELONGS_MM.includes(project) ? MM_SITE_URL + metaUrl : READR_SITE_URL + metaUrl
      this.$ssrContext.metaImage = PROJECTS_BELONGS_MM.includes(project) ? MM_SITE_ASSETS_URL + metaImage : READR_SITE_ASSETS_URL + metaImage
      this.$ssrContext.siteName = siteName
      this.$ssrContext.favicon = favicon
      this.$ssrContext.fbAppId = fbAppId
      this.$ssrContext.fbPageId = fbPageId
      this.$ssrContext.fbPageUrl = fbPageUrl
      this.$ssrContext.scriptGoogleMap = PROJECTS_NEED_GOOGLE_MAP.includes(project) ? SCRIPT_GOOGLE_MAP : ` `
      this.$ssrContext.scriptGoogleReCaptcha = PROJECTS_NEED_GOOGLE_RECAPTCHA.includes(project) ? SCRIPT_GOOGLE_RECAPTCHA : ` `
    }
  }
}

const clientMetaInfoMixin = {
  mounted () {
    const metaInfo = getMetaInfo(this)
    if (metaInfo) {
      const project = get(this.$route, 'params.project')

      const siteName = PROJECTS_BELONGS_MM.includes(project) ? MM_SITE_NAME : READR_SITE_NAME
      const title = metaInfo.title ? `${metaInfo.title} - ${siteName}` : `${siteName}`
      const description = metaInfo.description || ` `
      const locale = metaInfo.locale || 'zh_TW'
      const metaUrl = metaInfo.metaUrl || ` `
      const metaImage = metaInfo.metaImage || ` `
      const favicon = PROJECTS_BELONGS_MM.includes(project) ? MM_FAVICON_URL : READR_FAVICON_URL
      const fbAppId = PROJECTS_BELONGS_MM.includes(project) ? MM_FB_APP_ID : READR_FB_APP_ID
      const fbPageId = PROJECTS_BELONGS_MM.includes(project) ? MM_FB_PAGE_ID : READR_FB_PAGE_ID
      const fbPageUrl = PROJECTS_BELONGS_MM.includes(project) ? MM_FB_PAGE_URL : READR_FB_PAGE_URL

      document.title = title
      document.head.querySelector(`meta[property='og:title']`).content = title
      document.head.querySelector(`meta[name=description]`).content = description
      document.head.querySelector(`meta[property='og:description']`).content = description
      document.head.querySelector(`meta[property='og:locale']`).content = locale
      document.head.querySelector(`meta[property='og:url']`).content = PROJECTS_BELONGS_MM.includes(project) ? MM_SITE_URL + metaUrl : READR_SITE_URL + metaUrl
      document.head.querySelector(`meta[property='og:image']`).content = PROJECTS_BELONGS_MM.includes(project) ? MM_SITE_ASSETS_URL + metaImage : READR_SITE_ASSETS_URL + metaImage
      document.head.querySelector(`meta[property='og:site_name']`).content = siteName
      document.head.querySelector(`link[rel='apple-touch-icon']`).href = favicon
      document.head.querySelector(`link[rel='shortcut icon']`).href = favicon
      document.head.querySelector(`meta[property='fb:app_id']`).content = fbAppId
      document.head.querySelector(`meta[property='fb:pages']`).content = fbPageId
      document.head.querySelector(`meta[property='article:author']`).content = fbPageUrl
      document.head.querySelector(`meta[property='article:publisher']`).content = fbPageUrl
    }
  }
}

export default process.env.VUE_ENV === 'server'
  ? serverMetaInfoMixin
  : clientMetaInfoMixin
