export const getRatingColor = (rating: number) => {
  let color;
  if ((Number(rating) > 8.5)) {
    return (color = "#A59400");
  }
  if ((Number(rating) > 7.4)) {
    return (color = "#308E21");
  }
  if ((Number(rating) > 6.2)) {
    return (color = "#777777");
  }
  return (color = "#C82020");
};