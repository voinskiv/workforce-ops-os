type PagePlaceholderProps = {
  title: string;
  description: string;
};

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col">
      <header className="border-b pb-5">
        <h1 className="text-2xl font-semibold tracking-normal text-foreground">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </header>

      <div className="grid flex-1 place-items-center py-12">
        <div className="w-full max-w-xl rounded-md border border-dashed bg-card p-8 text-center">
          <p className="text-sm font-medium text-foreground">
            {title}
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Diese Ansicht ist für den MVP vorbereitet und wird in einem späteren
            Schritt mit operativen Aktionen erweitert.
          </p>
        </div>
      </div>
    </section>
  );
}
