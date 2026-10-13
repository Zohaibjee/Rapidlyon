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
  const headingColor = tone === "dark" ? "text-[#F5F5EF]" : "text-[#171916]";
  const eyebrowColor = tone === "dark" ? "text-[#B6E76A]" : "text-[#73776D]";
  const descriptionColor = tone === "dark" ? "text-[#d7d9d2]" : "text-[#4a4d45]";

  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center"
          : "max-w-2xl text-left"
      }
    >
      {eyebrow ? (
        <p className={`mb-4 text-xs font-medium uppercase tracking-[0.2em] ${eyebrowColor}`}>
          {eyebrow}
        </p>
      ) : null}
      <Heading className={`text-3xl font-semibold tracking-[-0.06em] ${headingColor} md:text-5xl`}>
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
