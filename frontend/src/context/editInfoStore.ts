import { create } from "zustand";

interface EditInfo {
  expanded: number | string;
  editing: number | string;
  changeExpanded: (a: number | string) => void;
  changeEditing: (a: number | string) => void;
}

const EditInfoStore = create<EditInfo>((set) => ({
  expanded: -1,
  editing: -1,
  changeExpanded: (a) => set(() => ({ expanded: a })),
  changeEditing: (a) => set(() => ({ editing: a })),
}));

export default EditInfoStore;
