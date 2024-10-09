# pdf-layout-analyzer

`pdf-layout-analyzer` 是一个简单的 JavaScript 库，旨在将 PDF 文本元素按行和列进行排序，并确定它们的方向。此函数可用于处理 PDF 文档中的文本数据，帮助开发者更好地理解和利用 PDF 内容。

`pdf-layout-analyzer` is a simple JavaScript library designed to analyze the layout of PDF documents by sorting text elements into rows and columns, and determining their direction. This function can be used to process text data from PDF documents, helping developers better understand and utilize PDF content.

## 特性 / Features

- 返回结果中包含 `row` 和 `column` 标记字段 / Returns `row` and `column` fields in the results
- 对文本元素按行和列进行排序 / Sort text elements by rows and columns
- 可自定义Y方向的容差 / Customizable Y-direction tolerance

## 安装 / Installation

使用 npm 安装 / Install via npm:

```bash
npm install pdf-layout-analyzer
```

## 使用 / Usage

以下示例展示了如何使用 `pdf.js` 读取 PDF 文件，并使用 `analyzePdfLayout` 函数分析文本布局。

The following example demonstrates how to use `pdf.js` to read a PDF file and analyze the text layout using the `analyzePdfLayout` function.

```javascript
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import analyzePdfLayout from "pdf-layout-analyzer";

// 加载 PDF 文件
// Load the PDF file
const loadingTask = getDocument('path/to/your/document.pdf');

loadingTask.promise.then(pdf => {
  console.log('PDF loaded');

  // 获取第一页
  // Get the first page
  pdf.getPage(1).then(page => {
    console.log('Page loaded');

    // 获取视口
    // Get the viewport
    const viewport = page.getViewport({ scale: 1.0 });

    // 获取文本内容
    // Get the text content
    return page.getTextContent().then(textContent => {
      const pageHeight = viewport.height;  // 获取实际 PDF 页面的高度 / Get the actual PDF page height
      const toleranceY = 0.1;   // Y方向容差 / Y-direction tolerance

      // 分析 PDF 布局
      // Analyze the PDF layout
      const analyzedData = analyzePdfLayout(textContent, pageHeight, toleranceY);

      console.log(analyzedData);
    });
  });
}).catch(err => {
  console.error('Error: ' + err);
});
```

### 输出结果 / Output Result

经过 `analyzePdfLayout` 处理后，`analyzedData` 将包含每个文本项的行、列和方向信息。例如：

After processing with `analyzePdfLayout`, `analyzedData` will contain the row, column, and direction information for each text item. For example:

```json
[
  { "transform": [1, 0, 0, 1, 100, 200], "height": 20, "row": 1, "column": 1, "direction": 0 },
  { "transform": [1, 0, 0, 1, 150, 180], "height": 20, "row": 1, "column": 2, "direction": 0 },
  { "transform": [1, 0, 0, 1, 200, 160], "height": 20, "row": 1, "column": 3, "direction": 0 },
  // 更多项... / More items...
]
```

## API

### `analyzePdfLayout(data, pageHeight, toleranceY)`

- **参数 / Parameters**:
  - `data`: 包含 PDF 文本项的对象，格式为 `{ items: [...] }`。/ An object containing PDF text items, formatted as `{ items: [...] }`.
  - `pageHeight`: PDF 页面高度。/ The height of the PDF page.
  - `toleranceY`: Y方向的容差，用于判断文本项是否在同一行。/ Y-direction tolerance used to determine if text items are on the same line.

- **返回值 / Return Value**: 返回处理后的文本项数组，每个项包含 `row`, `column`, 和 `direction` 字段。/ Returns an array of processed text items, each containing `row`, `column`, and `direction` fields.

### 相关辅助函数 / Related Helper Functions

- `getDirection(item)`: 计算文本项的方向。/ Calculates the direction of a text item.
- `overlap(y1, height1, y2, height2)`: 判断两个文本项是否重叠。/ Determines if two text items overlap.
- `within(first, second, variance)`: 判断两个值是否在一定范围内。/ Checks if two values are within a certain range.
- `compare(item1, item2, pageHeight, toleranceY)`: 对文本项进行比较，以便排序。/ Compares text items for sorting.

## 贡献 / Contributing

欢迎任何形式的贡献！请提交问题或拉取请求。/ Contributions are welcome! Please submit issues or pull requests.

## 许可证 / License

MIT 许可证。请查看 [LICENSE](LICENSE) 文件以获取更多信息。/ MIT License. Please see the [LICENSE](LICENSE) file for more information.
## 联系 / Contact

如有问题，欢迎通过 [GitHub Issues](https://github.com/louyongjiu/pdf-layout-analyzer/issues) 联系我。/ If you have any questions, feel free to reach out via [GitHub Issues](https://github.com/louyongjiu/pdf-layout-analyzer/issues).

---

如需了解更多信息，请查看 [项目主页](https://github.com/louyongjiu/pdf-layout-analyzer)。/ For more information, please visit the [project homepage](https://github.com/louyongjiu/pdf-layout-analyzer).