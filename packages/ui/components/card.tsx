import * as React from "react";
import { useAddUtmParams } from "../hooks/use-add-utm-params";

/**
 * This component displays a link with a title and a content.
 * @param className - CSS classes on the `a` tag
 * @param title - title of the card element
 * @param children - children displayed as content of the Card (in a `p` tag)
 * @param href - URL that the `a` tag points to
 * @returns JSX.Element
 */
export function Card({
  className,
  title,
  children,
  href,
}: Readonly<{
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}>): JSX.Element {
  const { getStringWithUtmParams } = useAddUtmParams();
  const hrefWithParams: string = getStringWithUtmParams(href);

  return (
    <a
      className={className}
      href={hrefWithParams}
      rel="noopener noreferrer"
      target="_blank"
    >
      <h2>
        {title} <span>-&gt;</span>
      </h2>
      <p>{children}</p>
    </a>
  );
}
