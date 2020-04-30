import _ from "lodash"; //underscore js library upgrade
export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  //_.slice(items, startIndex);
  //get items from index to page limit
  return _(items).slice(startIndex).take(pageSize).value();
}
