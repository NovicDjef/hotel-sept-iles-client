/**
 * Utilitaires pour le chat
 */

/**
 * Ouvre le widget de chat
 */
export const openChatWidget = () => {
  if (typeof window !== 'undefined') {
    const event = new CustomEvent('openChat')
    window.dispatchEvent(event)
  }
}
