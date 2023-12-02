import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import Provider from "@/components/Provider";
import Nav from "@/components/Nav";
import Head from "next/head";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Interest',
  description: 'Your image recommendation',
  icon: '/assets/images/logo.svg',
  favicon: '/assets/images/logo.svg',
  'apple-icon': '/assets/images/logo.svg'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
	    <link rel="favicon" href="/assets/images/logo.svg" sizes="any" />
	    <link rel="icon" href="/assets/images/logo.svg" sizes="any" />
	    <link rel="apple-icon" href="/assets/images/logo.svg" sizes="any" />
    </head>
    
    <body>
        <Provider>
	        <div className={"app bg-white"}>
		       <div className={"min-h-full"}>
			       <header>
				       <Nav />
			       </header>
			       <main className={"container mx-auto"}>
				       {children}
			       </main>
		       </div>
	        </div>
        </Provider>
      </body>
    </html>
  )
}
