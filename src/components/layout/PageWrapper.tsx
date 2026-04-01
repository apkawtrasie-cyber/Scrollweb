interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <main className="relative min-h-screen bg-bg-dark">
      {children}
    </main>
  );
}
