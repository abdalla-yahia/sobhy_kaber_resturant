import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  const safeLocale = locale ?? 'ar';

  return {
    messages: (await import(`./src/messages/${safeLocale}.json`)).default,
    locale: safeLocale
  };
});
