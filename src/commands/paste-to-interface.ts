import { TextEditor, commands, env, window, workspace } from "vscode";
import { getInterfaces } from "../utils/get-interfaces";

const { clipboard } = env;

class PasteToInterface {
  /**
   * 复制进来的内容
   */
  private pasteContent?: string;

  private editor?: TextEditor;

  /**
   * 类型命名
   */
  private typeName?: string;

  constructor() {
    const editor = window.activeTextEditor;
    if (editor) {
      this.editor = editor;
      this.init();
    }
  }

  async init() {
    this.pasteContent = (await clipboard.readText()).trim();
    if (!this.pasteContent) {
      window.showErrorMessage("剪切板内容为空");
      return;
    }
    this.typeName = await window.showInputBox({
      prompt: "请输入类型名称",
    });
    if (!this.typeName) {
      window.showErrorMessage("类型名称不能为空");
      return;
    }
    const filterKey =
      (workspace.getConfiguration().get("Eolink2TS.filterKey") as string) ||
      undefined;
    const readonly =
      (workspace.getConfiguration().get("Eolink2TS.readonly") as boolean);
    try {
      const jsonObj = JSON.parse(this.pasteContent);
      this.replace(
        getInterfaces(jsonObj, this.typeName, readonly, filterKey)
      );
    } catch (e: any) {
      window.showErrorMessage(e.message || "JSON 解析失败");
    }
  }

  /**
   * Replaces the selected text in the editor with the provided string.
   * @param replaceStr The string to replace the selected text with.
   */
  replace(replaceStr: string) {
    if (!this.editor) {
      return;
    }
    const selection = this.editor.selection;
    this.editor.edit((editBuilder) => {
      editBuilder.replace(selection, replaceStr);
      console.log("replace success");
    });
  }
}

export const pasteToInterfaceCommand = commands.registerCommand(
  "eolink2ts.paste2interface",
  () => {
    new PasteToInterface();
  }
);
