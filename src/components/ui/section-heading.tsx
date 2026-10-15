type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  level?: "h1" | "h2";
  tone?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  level = "h2",
  tone = "light",
}: SectionHeadingProps) {
  const Heading = level;
  const headingColor = tone === "dark" ? "text-paper" : "text-ink";
  const eyebrowColor = tone === "dark" ? "text-accent" : "text-muted";
  const descriptionColor = tone === "dark" ? "text-divider-strong" : "text-body-emphasis";

  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center"
          : "max-w-2xl text-left"
      }
    >
      {eyebrow ? (
        <p className={`mb-4 text-xs font-medium uppercase tracking-label ${eyebrowColor}`}>
          {eyebrow}
        </p>
      ) : null}
      <Heading className={`text-3xl font-semibold tracking-display ${headingColor} md:text-5xl`}>
        {title}
      </Heading>
      {description ? (
        <p className={`mt-4 text-base leading-7 ${descriptionColor} md:text-lg`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
