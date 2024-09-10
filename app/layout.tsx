
interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  }
}

export default function RootLayout({ 
  children,
  params: {locale}
} : Readonly<RootLayoutProps>){
  return children
}