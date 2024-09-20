// src/analyzePdfLayout.js
function analyzePdfLayout(data, toleranceY = 1) {

    function areInSameLine(item1, item2, toleranceY) {
        return Math.abs(item1.transform[5] - item2.transform[5]) <= toleranceY * item1.height;
    }

    // 对文本元素按 transform[5]（垂直位置）进行降序排序
    data.items.sort((a, b) => b.transform[5] - a.transform[5]);

    // 增加行列字段
    data.items.forEach((item) => {
        item.row = -1;
        item.column = -1;
    });

    let currentRow = 0;
    let previousY = null;
    let previousHeight = null; // 用于存储上一条记录的变量

    // 标记行位置
    data.items.forEach((item) => {
        if (previousY === null || !areInSameLine({ transform: [0, 0, 0, 0, 0, previousY], height: previousHeight  }, item, toleranceY)) {
            currentRow++;
            previousY = item.transform[5];
            previousHeight = item.height; // 更新上一条记录
        }
        item.row = currentRow;
    });

    // 对每一行内的文本元素按 transform[4]（水平位置）进行排序并标记列位置
    const groupedByRow = data.items.reduce((acc, item) => {
        if (!acc[item.row]) acc[item.row] = [];
        acc[item.row].push(item);
        return acc;
    }, {});

    Object.keys(groupedByRow).forEach(row => {
        groupedByRow[row].sort((a, b) => a.transform[4] - b.transform[4]);
        groupedByRow[row].forEach((item, index) => {
            item.column = index + 1;
        });
    });

    // 按照行和列进行最终排序
    data.items.sort((a, b) => {
        if (a.row === b.row) {
            return a.column - b.column;
        }
        return a.row - b.row;
    });

    return data.items;
}

module.exports = analyzePdfLayout;
