export default function OrganizationSchema() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Crello Technologies",
    url: "https://www.crello.dev",
    logo: "https://www.crello.dev/logo.png",
    description:
      "Custom software development company building web applications, AI solutions, SaaS platforms, and mobile apps.",
    sameAs: [
      "https://www.linkedin.com/company/crellotech",
      "https://github.com/CrelloTech",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://www.crello.dev",
    name: "Crello Technologies",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organization),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(website),
        }}
      />
    </>
  );
}