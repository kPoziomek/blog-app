export const getArticles = ({ articles }) => articles.articles;
export const getArticle = ({ articles }) => {
  return articles.article;
};
export const getMyArticles = ({ articles }) => {
  return articles.myArticles;
};
export const getMyArticle = ({ articles }) => articles.article;
export const loadingArticlesSelector = ({ articles }) => {
  return articles.loadingArticles;
};
export const loadingSingleArticleSelector = ({ articles }) => {
  return articles.loadingSingleArticle;
};

export const loadingMyArticleSelector = ({ articles }) => {
  return articles.loadingMyArticle;
};
export const isEditedArticleSelector = ({ articles }) => {
  return articles.isEdited;
};

export const navToHomePage = ({ articles }) => {
  return articles.navigateToHome;
};
