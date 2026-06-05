type PageHeadingProps = {
  title: string;
  description: string;
};

export function PageHeading({ title, description }: PageHeadingProps) {
  return (
    <header className="mb-6 border-b pb-5">
      <h1 className="text-2xl font-semibold tracking-normal text-foreground">
        {title}
      </h1>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </header>
  );
}
