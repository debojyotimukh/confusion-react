export const parseCommentDate = (dateStr) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  let date = new Date(dateStr);
  return date.toLocaleDateString("en-US", options);
};
