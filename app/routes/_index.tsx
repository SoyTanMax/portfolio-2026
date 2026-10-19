import type { V2_MetaFunction } from "@remix-run/node";
import Hero from "~/components/Hero";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Max López - UX Engineer" },
    { name: "description", content: "I am a UX Engineer passionate about creating user-friendly and intuitive experiences." },
    { name: "keywords", content: "UX/UI Designer, Front-end Developer, User Experience, User Interface, Web Design, Front-end Development" },
    { property: "og:image", content: "https://i.ibb.co/sb66ykM/Bookmark.png" },
  ];
};

export default function Index() {
  return (
    <div>
      <Hero />
    </div>
  );
}
