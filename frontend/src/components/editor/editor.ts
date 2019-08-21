import { Component, Vue, Prop } from "vue-property-decorator";
import Job from "@/models/job";
import Blog from "@/models/blog";
import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from "tiptap";
import {
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  Bold,
  Italic,
  Strike,
  Underline,
  Image
} from "tiptap-extensions";

@Component({
  components: {
    EditorMenuBar,
    EditorContent,
    EditorMenuBubble
  }
})
export default class EditorComponent extends Vue {
  @Prop() job!: Job;
  @Prop() blog!: Blog;
  editor: any = new Editor({
    extensions: [
      new Heading({ levels: [3] }),
      new BulletList(),
      new OrderedList(),
      new ListItem(),
      new Bold(),
      new Italic(),
      new Strike(),
      new Underline(),
      new Image()
    ],
    content: this.job ? this.job.description : this.blog.content,
    onUpdate: () => {
      const html = this.editor.getHTML();
      this.job ? (this.job.description = html) : (this.blog.content = html);
    }
  });
  linkUrl: string = "";
  linkMenuIsActive: boolean = false;

  showImagePrompt(command: any) {
    const src = prompt("Enter the URL of your image here");
    if (src) {
      command({src});
    }
  }

  iconColor(bool: boolean) {
    if (!bool) {
      return "grey";
    }
  }

  beforeDestroy() {
    this.editor.destroy();
  }
}
