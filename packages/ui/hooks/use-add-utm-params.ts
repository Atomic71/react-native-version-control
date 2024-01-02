const utmParams = {
  utm_source: "create-turbo",
  utm_medium: "basic",
  utm_campaign: "create-turbo",
};

export const useAddUtmParams = (): {
  getWithUtmParams: (href: string) => URL;
  getStringWithUtmParams: (href: string) => string;
} => {
  const getWithUtmParams = (href: string): URL => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call -- `URL.canParse` shows as an unsafe call to `any`
    if (!URL.canParse(href)) {
      throw new Error(`${href} cannot be parsed as a valid URL.`);
    }

    const url = new URL(href);
    const params = new URLSearchParams(url.search);

    for (const [key, val] of Object.entries(utmParams)) {
      params.set(key, val);
    }
    url.search = params.toString();
    return url;
  };

  const getStringWithUtmParams = (href: string): string =>
    getWithUtmParams(href).toString();

  return {
    getWithUtmParams,
    getStringWithUtmParams,
  };
};
