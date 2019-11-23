import { WriteDownEditorCoreStateType } from "./model";
import * as uuid4 from "uuid/v4";

export function getDefaultValues(): WriteDownEditorCoreStateType {
  const uid = uuid4.default();
  return {
    currentColumnNumber: 1,
    currentLineNumber: 1,
    numberOfLines: 1,
    arrayOfLines: [uid],
    keyContentMapping: new Map<string, string>([[uid, ""]])
  };
}
