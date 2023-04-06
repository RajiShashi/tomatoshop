function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
  }
  
  function emptyOrRows(rows) {
    if (!rows) {
      return [];
    }
    return rows;
  }

function convertDate(date) {
  let dateVal = date.split('-');
  return new Date(dateVal[1]+'-'+dateVal[0]+'-'+dateVal[2]).getTime();
}  
  
  module.exports = {
    getOffset,
    emptyOrRows,
    convertDate
  }