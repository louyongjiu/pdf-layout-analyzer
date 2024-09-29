// src/analyzePdfLayout.js
function analyzePdfLayout(data, pageHeight, toleranceY = 0.1) {
  data.items.forEach(item => {
    item.row = -1;
    item.column = -1;
    item.direction = getDirection(item);
  });

  data.items.sort((a, b) => compare(a, b, pageHeight, toleranceY));

  let rowIndex = 1;
  let columnIndex = 1;
  let lastItem = null;
  let maxYForLine = -1;
  let maxHeightForLine = -1;

  data.items.forEach(item => {
    const positionY = pageHeight - item.transform[5];
    const positionHeight = item.height;

    if (lastItem) {
      if (!overlap(positionY, positionHeight, maxYForLine, maxHeightForLine)) {
        rowIndex++;
        columnIndex = 1;
        maxYForLine = -1;
        maxHeightForLine = -1;
      }
    }
    maxYForLine = Math.max(maxYForLine, positionY);
    maxHeightForLine = Math.max(maxHeightForLine, positionHeight);

    lastItem = item;
    item.row = rowIndex;
    item.column = columnIndex;
    columnIndex++;
  });

  return data.items;
}

function getDirection(item) {
  const [scaleX, shearX, shearY, scaleY] = item.transform;

  if (scaleY > 0 && Math.abs(shearY) < scaleX && Math.abs(shearX) < scaleY && scaleX > 0) {
    return 0;
  } else if (scaleY < 0 && Math.abs(shearY) < Math.abs(scaleX) && Math.abs(shearX) < Math.abs(scaleY) && scaleX < 0) {
    return 180;
  } else if (Math.abs(scaleY) < Math.abs(shearX) && shearY > 0 && shearX < 0 && Math.abs(scaleX) < shearY) {
    return 90;
  } else if (Math.abs(scaleY) < shearX && shearY < 0 && shearX > 0 && Math.abs(scaleX) < Math.abs(shearY)) {
    return 270;
  } else {
    return 0;
  }
}

function overlap(y1, height1, y2, height2) {
  return within(y1, y2, 0.1) || (y2 <= y1 && y2 >= y1 - height1) || (y1 <= y2 && y1 >= y2 - height2);
}

function within(first, second, variance) {
  return Math.abs(first - second) < variance;
}

function compare(item1, item2, pageHeight, toleranceY) {
  const x1 = item1.transform[4];
  const x2 = item2.transform[4];

  const item1YBottom = pageHeight - item1.transform[5];
  const item2YBottom = pageHeight - item2.transform[5];

  const item1YTop = item1YBottom - item1.height;
  const item2YTop = item2YBottom - item2.height;

  const yDifference = Math.abs(item1YBottom - item2YBottom);

  if (yDifference < toleranceY || (item2YBottom >= item1YTop && item2YBottom <= item1YBottom) || (item1YBottom >= item2YTop && item1YBottom <= item2YBottom)) {
    return x1 - x2;
  } else {
    return item1YBottom < item2YBottom ? -1 : 1;
  }
}
