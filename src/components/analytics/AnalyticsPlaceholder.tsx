type AnalyticsPlaceholderProps = {
  measurementId?: string;
};

export const AnalyticsPlaceholder = ({
  measurementId = process.env.NEXT_PUBLIC_ANALYTICS_ID,
}: AnalyticsPlaceholderProps) => {
  if (!measurementId) {
    return null;
  }

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <script
        id="analytics-placeholder"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}');
          `,
        }}
      />
    </>
  );
};
