import '../styles/globals.css'
import ServiceWorkerRegister from './components/ServiceWorkerRegister'
import Navbar from './components/NavBar'
import ProviderWrapper from './components/ProviderWrapper'

export const metadata = {
  title: 'Checkin Inventaire',
  description: "Application de checkin / checkout avec inventaire interactif",
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/icon-192.png',
    apple: '/icons/icon-192.png',
  },
}

export const viewport = {
  themeColor: "#0070f3",
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <ServiceWorkerRegister />
        <ProviderWrapper>
          <Navbar />
          {children}
        </ProviderWrapper>
      </body>
    </html>
  )
}
