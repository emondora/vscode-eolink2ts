# Eolink2TS

将 Eolink 的 Apikit 数据转换为 Typescript 的 interface

## 用法示例
1. 从 Eolink 接口详情界面，找到 `复制 Apikit 格式数据` 按钮点击复制 Apikit 元数据
2. 打开期望粘贴接口定义的文件
3. 使用快捷键`alt + shift + v`
4. 在顶部弹出的输入框中输入接口名称
5. 文件中生成定义，操作完毕

## 详细说明

1. 仅支持生成 interface
2. 支持复合类型生成子 interface，子 interface 名称为该字段名
3. 默认添加 readonly，可修改 eolink2ts.readonly 配置项
4. 默认不添加过滤顶层指定字段，可修改 eolink2ts.filterKey 配置项，使用方法看下方示例说明
```json
[
  {
    "key": "retCode",
    "type": "string",
    "description": "返回编码",
    "required": true
  },
  {
    "key": "retMsg",
    "type": "string",
    "description": "返回信息",
    "required": true
  },
  {
    "key": "data",
    "type": "object",
    "description": "返回体",
    "required": true
  }
]
```
假如有以上数据，其中 retCode 与 retMsg 是公共定义，使用者只关心 data 字段里面的定义，则可以设置 filterKey 为 data，将其他字段过滤掉。
注意：以上方法仅支持过滤最顶层字段

## 配置项

| 名称     | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| eolink2ts.readonly | 是否添加 readonly | boolean | true |
| eolink2ts.filterKey | 设置需要过滤出来的字段名称 | string | null |

## 使用要求

VSCode: 1.51.0

### 0.0.1

首页发布，支持嵌套的 Interface 生成，支持过滤指定字段
