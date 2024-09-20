

# pdf-layout-analyzer

一个简单的 JavaScript 库，用于分析 PDF 文档中的布局。该库能够将 PDF 文档中的文本元素按行和列进行排序，适用于需要处理 PDF 文档布局的场景。

A simple JavaScript library for analyzing the layout of PDF documents. This library can sort text elements in PDF documents by rows and columns, suitable for scenarios that require handling PDF document layouts.

## 特性 / Features

- 返回结果中包含 `row` 和 `column` 标记字段 / Returns `row` and `column` fields in the results
- 对文本元素按行和列进行排序 / Sort text elements by rows and columns
- 可自定义容忍度 / Customizable tolerance

## 安装 / Installation

使用 npm 安装 / Install via npm:

```bash
npm install pdf-layout-analyzer
```

## 使用 / Usage

```javascript
const analyzePdfLayout = require('pdf-layout-analyzer');

const data = {
    items: [
        // 示例数据 / Example data
    ]
};

const sortedItems = analyzePdfLayout(data);
console.log(sortedItems);
```

## API

### `analyzePdfLayout(data, toleranceY)`

- **参数 / Parameters**:
  - `data`: 一个对象，包含 `items` 数组，数组中的每个元素应包含 `transform` 和 `height` 属性。/ An object containing an `items` array, where each element should have `transform` and `height` properties.
  - `toleranceY`: 可选，默认为 `1`，用于定义行之间的容忍度。/ Optional, defaults to `1`, used to define the tolerance between rows.

- **返回 / Returns**: 返回按行和列排序后的文本元素数组，每个元素包含 `row` 和 `column` 字段。/ Returns an array of text elements sorted by rows and columns, with each element containing `row` and `column` fields.

## 示例 / Example

```javascript
const data = {
    items: [
        { transform: [0, 0, 0, 0, 0, 10], height: 10 },
        { transform: [0, 0, 0, 0, 0, 15], height: 10 },
        { transform: [0, 0, 0, 0, 0, 5], height: 10 },
        // 更多元素 / More elements...
    ]
};

const sortedItems = analyzePdfLayout(data);
console.log(sortedItems);
/*
 输出示例:
 [
     { transform: [...], height: 10, row: 1, column: 1 },
     { transform: [...], height: 10, row: 1, column: 2 },
     ...
 ]
*/
```

## 贡献 / Contributing

欢迎提交问题和请求功能，或直接提交代码贡献。如果你想贡献代码，请遵循以下步骤：

Contributions, issues, and feature requests are welcome. If you want to contribute code, please follow these steps:

1. Fork 这个仓库 / Fork this repository
2. 创建你的特性分支 (`git checkout -b feature/YourFeature`) / Create your feature branch (`git checkout -b feature/YourFeature`)
3. 提交你的更改 (`git commit -m 'Add some feature'`) / Commit your changes (`git commit -m 'Add some feature'`)
4. 推送到分支 (`git push origin feature/YourFeature`) / Push to the branch (`git push origin feature/YourFeature`)
5. 创建一个新的 Pull Request / Create a new Pull Request

## 许可证 / License

该项目使用 MIT 许可证，更多详情请查看 [LICENSE](LICENSE) 文件。/ This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 联系 / Contact

如有问题，欢迎通过 [GitHub Issues](https://github.com/louyongjiu/pdf-layout-analyzer/issues) 联系我。/ If you have any questions, feel free to reach out via [GitHub Issues](https://github.com/louyongjiu/pdf-layout-analyzer/issues).
