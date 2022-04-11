export const normalizeArticles = (article) => {
  const normalized = article.map((element) => {
    const { id, title, summary, content, author, publishedAt } = element;
    return {
      id,
      title,
      summary,
      content,
      publishedAt,
      authorFullName: `${author.firstName} ${author.lastName}`,

      image: false,
    };
  });
  return normalized;
};
