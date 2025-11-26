import { use } from "react";
import EditorClient from "./EditorClient";

export default function Page(props) {
  const { slug } = use(props.params);

  return <EditorClient slug={slug} />;
}
