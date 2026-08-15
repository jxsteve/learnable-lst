import './SectionHeading.css';

interface Props {
  tag: string;
  title: string;
  subtitle?: string;
  /** Renders the tag in the small bold primary style used by the blog section */
  variant?: 'default' | 'accent';
}

/**
 * The centred tag / title / subtitle block the design repeats across sections.
 * Figma: "main-content" (e.g. 32:1874, 32:1988).
 */
export default function SectionHeading({ tag, title, subtitle, variant = 'default' }: Props) {
  return (
    <header className={`section-heading section-heading--${variant}`}>
      <p className="section-heading__tag">{tag}</p>
      <h2 className="section-heading__title">{title}</h2>
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
    </header>
  );
}
