export const parseSiderItem = (listItem, mainKey, subKey, childrenKey) => {
  const newsObj = {
    name: "Tin tức",
    active: true,
  };

  const rankingObj = {
    name: "Xếp hạng",
    active: true,
  };

  let parseList = [];
  parseList.push(newsObj);

  if (!listItem || !listItem.length) return [];

  console.log('listItem', listItem);

  listItem.map((objItem) => {
    let newObj = {
      name: objItem[mainKey],
      active: true,
    };
    if (Array.isArray(objItem[childrenKey]) && objItem[childrenKey].length) {
      const listChildren = [];
      objItem[childrenKey].forEach((subObj) => {
        const newSubObj = {
          name: subObj[subKey],
          active: true,
        };
        listChildren.push(newSubObj);
      });
      newObj = { ...newObj, children: listChildren };
    }
    objItem = newObj;
    parseList.push(objItem);
  });
  parseList.push(rankingObj);
  console.log('parseSiderItem', parseList);
  return parseList;
};
