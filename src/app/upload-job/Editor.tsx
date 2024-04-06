"use client";

import React from "react";
import RichTextEditor, { EditorValue } from "react-rte";
import { set } from "nprogress";

export default function Editor({
  description,
  setDescription,
  className,
}: {
  description: string;
  setDescription: (description: string) => void;
  className: string;
}) {
  const [value, setValue] = React.useState<EditorValue>(
    RichTextEditor.createEmptyValue()
  );
  return (
    <RichTextEditor
      onChange={(newValue) => {
        setValue(newValue);
        setDescription(newValue.toString("html"));
      }}
      value={value}
      className={className}
    />
  );
}
