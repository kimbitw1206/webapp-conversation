import { getLocaleOnServer } from '@/i18n/server'

import './styles/globals.css'
import './styles/markdown.scss'

const LocaleLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const locale = await getLocaleOnServer()
  return (
    <html lang={locale ?? 'en'} className="h-full">
      <head>
        {/* 強制的に見た目を修正する命令をここに埋め込みます */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* 1. 横スクロールを完全に禁止し、幅を画面にフィットさせる */
          html, body {
            overflow-x: hidden !important;
            width: 100% !important;
            position: relative;
          }
          /* 2. Workflow Process (実行ログ) を物理的に消す */
          [class*="workflow-process"], 
          [class*="ExecutionProcess"], 
          [class*="workflow-executor"],
          .chat-step-content { 
            display: none !important; 
            height: 0 !important;
          }
        ` }} />
      </head>
      <body className="h-full">
        {/* 不要なスクロール設定(overflow-x-auto)と固定幅(w-screen)を削除しました */}
        <div className="w-full h-full">
          {children}
        </div>
      </body>
    </html>
  )
}

export default LocaleLayout
