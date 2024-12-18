import "@/styles/globals.css"
import { CartProvider } from '@/contexts/CartContext'


export const metadata = {
    title: 'Kaana  Resort',
    description: 'At Kaana resort, we offer luxury accommodations, adventure tours, and all-inclusive packages. ',
    url: '',
    image: '/assets/images/logo_v1.png'
}

const RootLayout = ({children}) => {
  return (
    <html lang="es">
        <head>
            <title>{metadata.title}</title>
            <link rel="icon" type="image/png+xml" href={metadata.image} />
            <meta name="description" content={metadata.description} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta property="og:title" content={metadata.title} />
            <meta property="og:description" content={metadata.description} />
            <meta property="og:image" content={metadata.image} />
            <meta property="og:url" content={metadata.url} />
            <meta name="keywords" content="hotel, belize "></meta>            
        </head>
        <body>
            <main className='app'>
                <CartProvider>
                  {children}
                </CartProvider>
            </main>
        </body>
    </html>
  )
}

export default RootLayout