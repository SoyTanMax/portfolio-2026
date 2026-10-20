/** What fills the colored stage next to a story beat. */
export type StoryVisual =
  | { type: "image"; src: string; alt: string; /** Less padding for wide images that need the room. */ tight?: boolean }
  | { type: "stat"; value: string; label: string }
  | { type: "split"; items: { title: string; body: string }[] };

export interface StoryBeat {
  label: string;
  body: string;
  visual: StoryVisual;
}

export interface Project {
  id: string;
  title: string;
  /** One line: context · what it is · role. */
  tagline: string;
  /** Kept online and listed under "More work", but not told as a story on the home page. */
  archived?: boolean;
  /** The short scroll story shown on the home page. */
  story?: {
    eyebrow: string;
    /** Light tint of the project's brand color, used as the stage background. */
    stage: string;
    beats: StoryBeat[];
  };
}
