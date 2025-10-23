import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

// PWA API 타입 확장
declare global {
  interface Navigator {
    getInstalledRelatedApps?: () => Promise<Array<{ platform: string; url: string }>>
  }
}

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // PWA 앱에서 실행 중인지 확인
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    if (isStandalone) {
      setIsInstalled(true)
      return
    }

    // beforeinstallprompt 이벤트 리스너
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }

    window.addEventListener('beforeinstallprompt', handler)

    // 이미 설치되었는지 확인
    if ('getInstalledRelatedApps' in navigator && navigator.getInstalledRelatedApps) {
      navigator.getInstalledRelatedApps().then((relatedApps) => {
        if (relatedApps.length > 0) {
          setIsInstalled(true)
        }
      }).catch(() => {
        // 에러 무시 (지원하지 않는 브라우저)
      })
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      setIsInstalled(true)
    }

    setDeferredPrompt(null)
  }

  // 설치되었거나 프롬프트가 없으면 버튼 숨김
  if (isInstalled || !deferredPrompt) {
    return null
  }

  return (
    <button className="install-button" onClick={handleInstall}>
      앱 설치
    </button>
  )
}
